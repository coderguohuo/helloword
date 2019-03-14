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
var TiShi = (function (_super) {
    __extends(TiShi, _super);
    function TiShi(str, callback) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.skinName = "resource/skin/tishi.exml";
        _this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.QueRen, _this);
        _this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.No, _this);
        _this.lab_content.text = str;
        return _this;
    }
    TiShi.prototype.initDate = function () {
    };
    TiShi.prototype.initListener = function () {
    };
    TiShi.prototype.No = function () {
        this.parent.removeChild(this);
    };
    TiShi.prototype.QueRen = function () {
        this.callback.exec();
        this.parent.removeChild(this);
    };
    return TiShi;
}(eui.Component));
__reflect(TiShi.prototype, "TiShi");
//# sourceMappingURL=TiShi.js.map