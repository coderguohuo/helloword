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
var GuanJia2 = (function (_super) {
    __extends(GuanJia2, _super);
    function GuanJia2() {
        var _this = _super.call(this) || this;
        _this.skinName = "guanjia2";
        return _this;
    }
    GuanJia2.prototype.createChildren = function () {
        var user = JSON.parse(egret.localStorage.getItem("user"));
        var t = new Date().getTime() - Director.getInstance().ShiJianCha;
        console.log(DataUtils.format("yyyy-MM-dd", new Date(user.guanjiaTime)));
        this.lab_time.text = DataUtils.TimeToStr((user.guanjiaTime - t) / 1000);
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
    };
    GuanJia2.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    return GuanJia2;
}(eui.Component));
__reflect(GuanJia2.prototype, "GuanJia2");
//# sourceMappingURL=GuanJia2.js.map