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
var ZhuanPan_TiShi = (function (_super) {
    __extends(ZhuanPan_TiShi, _super);
    function ZhuanPan_TiShi() {
        var _this = _super.call(this) || this;
        _this.skinName = "zhuanpan_tishi";
        return _this;
    }
    ZhuanPan_TiShi.prototype.createChildren = function () {
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.img_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
    };
    ZhuanPan_TiShi.prototype.setDate = function (type) {
        this.type = type;
        switch (this.type) {
            case 1://金币不足
                this.lab_title.text = "金币不足";
                this.img.source = "gold2_png";
                this.lab_note.text = "请先种植农场获得金币";
                break;
            case 2://券不足
                this.lab_title.text = "幸运券不足";
                this.img.source = "zhaohuanquan_png";
                this.lab_note.text = "是否花费钻石去购买";
                break;
        }
    };
    ZhuanPan_TiShi.prototype.Yes = function () {
        switch (this.type) {
            case 1://金币不足
                Director.getInstance().removeScene(this);
                break;
            case 2://券不足
                PopoP.getTips("暂不可购买");
                break;
        }
    };
    ZhuanPan_TiShi.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    return ZhuanPan_TiShi;
}(eui.Component));
__reflect(ZhuanPan_TiShi.prototype, "ZhuanPan_TiShi");
//# sourceMappingURL=ZhuanPan_TiShi.js.map