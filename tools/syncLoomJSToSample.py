#!/usr/bin/env python
# coding=utf-8

import os
import shutil

PROJECT_ROOT = os.path.join(os.path.dirname(__file__), '..')

def main():
    COCOS_SDK_ROOT = os.path.join(PROJECT_ROOT, 'cocossdk')

    src_files = [ os.path.join(COCOS_SDK_ROOT, f) for f in os.listdir(COCOS_SDK_ROOT)]

    dst_folder = os.path.join(PROJECT_ROOT, 'sample', 'loomDemoForCreator', 'assets', 'script', 'loom')
    for src in src_files:
        shutil.copy(src, dst_folder)

    print('>>>Done')


if __name__ == '__main__':
    main()

