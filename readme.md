
# Loom SDK for Cocos Creator

## Prerequisites

> Python 2.7

> Git

> NodeJS, NPM

> Loom, [Install](https://loomx.io/developers/docs/en/prereqs.html)

## Generate LoomJS SDK

* `git submodule update --init`, update git submodule
* `./tools/genCocoSDK.py`

`Loom SDK for Cocos Creator` is the directory `cocossdk`, which is generated by command `./tools/genCocoSDK.py`

## Test Steps

* update git submodule, run command `git submodule update --init`
* generate and pack `Loom Cocos SDK`, run command `./tools/genCocoSDK.py`
* sync `Loom Cocos SDK` to `sample/loomDemoForCreator`, run command `./tools/syncLoomJSToSample.py`
* entry directory `blueprint/build`, run `Loom Block Chain` services, run command `../../loom run`
* open `sample/loomDemoForCreator` with `Cocos Creator` and run

## Notice

* `Loom Block Chain` configuration, Contract's usage, take a look at [this](https://loomx.io/developers/docs/en/prereqs.html)

## Sample

Sample `dark-slash` come from `Cocos Creator` [Tutorial Project](https://github.com/cocos-creator/tutorial-dark-slash)

---

## 环境依赖:

> Python 2.7

> Git

> NodeJS, NPM

> Loom, [Install](https://loomx.io/developers/docs/en/prereqs.html)

## 生成 LoomJS SDK

* `git submodule update --init`, 更新 `git` 子工程
* 运行命令 `./tools/genCocoSDK.py`

`./tools/genCocoSDK.py` 会在工程根目录下生成的 `cocossdk` 目录, 这就是 Loom SDK 在 Cocos Creator 上的适配包

## 测试步骤:

* 更新 `git` 子工程, 运行 `git submodule update --init`
* 生成并打包 `Loom Cocos SDK`, 运行 `./tools/genCocoSDK.py`
* 同步生成好的包到 `sample/loomDemoForCreator`, 运行 `./tools/syncLoomJSToSample.py`
* 进入 `blueprint/build` 目录, 运行 `Loom Block Chain` 服务, 运行 `../../loom run`
* 用 `Cocos Creator` 打开 `sample/loomDemoForCreator`, 运行

## 说明

* `Loom Block Chain` 的配置, 运行, 合约的使用, 参见[这里](https://loomx.io/developers/docs/en/prereqs.html)

## Sample

Sample `dark-slash` 来自于 `Cocos Creator` 的[样例工程](https://github.com/cocos-creator/tutorial-dark-slash)

