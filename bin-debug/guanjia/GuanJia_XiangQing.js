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
var GuanJia_XiangQing = (function (_super) {
    __extends(GuanJia_XiangQing, _super);
    function GuanJia_XiangQing() {
        var _this = _super.call(this) || this;
        _this.skinName = "guanjia_xiangqing";
        return _this;
    }
    GuanJia_XiangQing.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.img_guyong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GuYong, this);
        this.lab_price.text = SysTemSet.set.guanjiaDimond;
    };
    GuanJia_XiangQing.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    GuanJia_XiangQing.prototype.GuYong = function () {
        var context = this;
        FachUtils.Get("/user/buyGuanjia", function (res) {
            if (res.status) {
                Director.getInstance().getUser();
            }
            PopoP.getTips(res.message);
        }, function (res) {
        });
    };
    return GuanJia_XiangQing;
}(eui.Component));
__reflect(GuanJia_XiangQing.prototype, "GuanJia_XiangQing");
//# sourceMappingURL=GuanJia_XiangQing.js.map