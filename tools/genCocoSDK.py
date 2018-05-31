#!/usr/bin/env python
# coding=utf-8

import os
import shutil
import subprocess

PROJECT_ROOT = os.path.join(os.path.dirname(__file__), '..')

def pack_loomjs(useYarn = False):
    loomjs_root = os.path.join(PROJECT_ROOT, 'deps', 'loom-js')
    print('>>> Package Loom JS')

    print('clean loomjs')
    run('git checkout -f', cwd = loomjs_root)

    print('sync loomjs npm dependencies')
    if useYarn:
        run('yarn', cwd = loomjs_root)
    else:
        run('npm update', cwd = loomjs_root)

    print('exclude google protobuf from loomjs')
    exclude_google_protobuf_in_loomjs(os.path.join(loomjs_root, 'webpack.config.js'))

    print('fix tweetnacl for Cocos Creator')
    modify_tweetnacl(os.path.join(loomjs_root, 'node_modules', 'tweetnacl'))

    print('build loomjs')
    if useYarn:
        run('yarn run build:browser', cwd = loomjs_root)
    else:
        run('npm run build:browser', cwd = loomjs_root)

    return os.path.join(loomjs_root, 'dist', 'loom.umd.js')

def exclude_google_protobuf_in_loomjs(configfile):
    def m(lines):
        idx = 0
        modify = False
        for line in lines:
            if  'output:' in line:
                lines.insert(idx, '''  externals: {
    'google-protobuf': 'google-protobuf'
  },
''')
                modify = True
                break
            idx += 1
        return modify
    modify_file(configfile, m)

def modify_tweetnacl(folder):
    src_file = os.path.join(folder, 'nacl-fast.js')

    def m(lines):
        print('modify tweetnacl')
        idx = 0
        modify = False
        for line in lines:
            if  "var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;" in line:
                lines[idx] = "  var crypto = typeof window !== 'undefined' ? (window.crypto || window.msCrypto) : null;\n"
                modify = True
                break
            idx += 1
        return modify

    modify_file(src_file, m)


def modify_file(filepath, cb):
    with open(filepath, 'r') as file:
        lines = file.readlines()

    modify = cb(lines)

    if not modify:
        print('WARNING! {0} have not been modified'.format(filepath))
        return

    with open(filepath, 'w') as file:
        file.write(''.join(lines))

def project_root():
    return os.path.join(os.path.dirname(__file__), '..')

def run(command, cwd = None, shell=False):
    if shell:
        cmd = command
    else:
        cmd = command.split(' ')
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=shell, cwd=cwd)
    stdout, stderr = p.communicate()
    ret = p.returncode
    if 0 != ret:
        print(stderr)
        raise Exception("run: {0} failed".format(command))

def is_yarn_installed():
    exist = True
    try:
        run('hash yarn')
    except Exception as e:
        exist = False

    return exist    

def main():
    COCOS_SDK_ROOT = os.path.join(PROJECT_ROOT, 'cocossdk')
    loomjs = pack_loomjs(useYarn=is_yarn_installed())

    # clean cocos sdk output folder
    if os.path.exists(COCOS_SDK_ROOT):
        shutil.rmtree(COCOS_SDK_ROOT)
    os.mkdir(COCOS_SDK_ROOT)

    src_files = [
        loomjs,
        os.path.join(PROJECT_ROOT, 'src', 'A-loom-polyfill-for-cocos.js'),
        os.path.join(PROJECT_ROOT, 'src', 'google-protobuf.js')
    ]
    for src in src_files:
        shutil.copy2(src, COCOS_SDK_ROOT)

    print('loomjs for Cocos Creator is package under folder cocossdk')
    print('>>>Done')


if __name__ == '__main__':
    main()
