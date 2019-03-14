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
var ChongZhi = (function (_super) {
    __extends(ChongZhi, _super);
    function ChongZhi() {
        var _this = _super.call(this) || this;
        _this.price = 0;
        _this.type = 1;
        _this.skinName = "chongzhi";
        return _this;
    }
    ChongZhi.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this);
        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this);
        this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this);
        this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this);
        this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this);
        this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this);
        this.btn7.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this);
        this.btn8.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this);
        this.btn9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this);
        this.rec_alipay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchRec, this);
        this.rec_wechat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchRec, this);
        this.rec_bank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchRec, this);
        this.rec_alipay.name = "1";
        this.rec_alipay.name = "2";
        this.rec_alipay.name = "3";
    };
    ChongZhi.prototype.TouchBtn = function (e) {
        this.price = Number(e.target.name);
    };
    ChongZhi.prototype.TouchRec = function (e) {
        this.type = Number(e.target.name);
        this.img_type.x = e.target.x;
    };
    ChongZhi.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    return ChongZhi;
}(eui.Component));
__reflect(ChongZhi.prototype, "ChongZhi");
//# sourceMappingURL=ChongZhi.js.map