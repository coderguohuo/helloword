var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GetMoney = (function (_super) {
    __extends(GetMoney, _super);
    function GetMoney() {
        var _this = _super.call(this) || this;
        _this.skinName = "getmoney";
        return _this;
    }
    GetMoney.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.btn_nc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Nc, this);
        this.btn_mc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Mc, this);
        this.btn_haoyou.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HaoYou, this);
        this.game = Director.getInstance().gameLayer.getChildByName("game");
    };
    GetMoney.prototype.Nc = function () {
        this.game.group_game.scrollH = 187;
        this.game.group_game.scrollV = 183;
        Director.getInstance().removeSceneNoTw(this);
    };
    GetMoney.prototype.Mc = function () {
        this.game.group_game.scrollH = 750;
        this.game.group_game.scrollV = 380;
        Director.getInstance().removeSceneNoTw(this);
    };
    GetMoney.prototype.HaoYou = function () {
        Director.getInstance().pushScene(new HaoYou());
        Director.getInstance().removeSceneNoTw(this);
    };
    GetMoney.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    return GetMoney;
}(eui.Component));
__reflect(GetMoney.prototype, "GetMoney");
//# sourceMappingURL=GetMoney.js.map