// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import createContract from './SimpleContract'


cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        const self = this;
        this.contract = null;
        createContract(function(err, c) {
            if (err) {
                cc.log('ERROR! create contract failed' + JSON.stringify(err));
                return;
            }
            self.contract = c;
        });
    },

    onBtnSave() {
        if (null == this.contract) {
            cc.log('ERROR! contract is null');
            return;
        }
        cc.log('button save clicked');
        const stringScore = '' + Math.round(cc.random0To1() * 255);
        this.contract.store('score', stringScore, function(e) {
            if (e) {
                cc.log('ERROR! store failed');
                return;
            }
            cc.log('SUCCESS! store success:' + stringScore);
        });
    },

    onBtnGet() {
        if (null == this.contract) {
            cc.log('ERROR! contract is null');
            return;
        }
        cc.log('button get clicked');
        this.contract.load('score', function(e, result) {
            if(e) {
                cc.log('ERROR! load failed:' + JSON.stringify(e));
                cc.log(e.stack)
                cc.log(e.toString());
                return;
            }
            cc.log('SUCCESS! load value finish');
            cc.log(result);
        });
    },

    // update (dt) {},
});
