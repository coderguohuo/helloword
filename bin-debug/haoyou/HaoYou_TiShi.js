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
var HaoYou_TiShi = (function (_super) {
    __extends(HaoYou_TiShi, _super);
    function HaoYou_TiShi(type, data, hbdata) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.data = data;
        _this.hbdata = hbdata;
        _this.skinName = "haoyou_tishi";
        return _this;
    }
    HaoYou_TiShi.prototype.createChildren = function () {
        this.img_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
        if (this.type == 1) {
            //红包
            this.lab_title.text = "你抢到好友的红包";
            this.img_money.source = "hongbao2_png";
        }
        else {
            //佣金
            this.lab_title.text = "你抢到好友的佣金";
            this.img_money.source = "hy_yongjin_png";
        }
        this.lab_num.text = DataUtils.floot(this.hbdata.hb) + "元";
        this.lab_text.text = this.data.nickname;
    };
    HaoYou_TiShi.prototype.Yes = function () {
        //	Director.getInstance().getUser();
        this.parent.removeChild(this);
        // Director.getInstance().removeScene(this);
    };
    return HaoYou_TiShi;
}(eui.Component));
__reflect(HaoYou_TiShi.prototype, "HaoYou_TiShi");
//# sourceMappingURL=HaoYou_TiShi.js.map