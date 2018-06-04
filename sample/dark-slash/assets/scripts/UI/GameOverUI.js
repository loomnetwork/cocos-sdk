cc.Class({
    extends: cc.Component,

    properties: {
        killNum: cc.Label,
    },

    init (game) {
        this.game = game;
        this.hide();
    },

    // use this for initialization
    show () {
        const self = this;
        this.game.loadKillNum(function(value) {
            self.killNum.string = value;
        });
        this.node.setPosition(0, 0);
    },

    hide () {
        this.node.x = 3000;
    },

    restart () {
        this.game.restart();
    }
});
