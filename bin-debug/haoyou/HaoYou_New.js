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
var HaoYou_New = (function (_super) {
    __extends(HaoYou_New, _super);
    function HaoYou_New() {
        var _this = _super.call(this) || this;
        _this.data = [];
        _this.skinName = "haoyou_new";
        return _this;
    }
    HaoYou_New.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.init();
    };
    HaoYou_New.prototype.init = function () {
        var context = this;
        FachUtils.Get("/user/apllys", function (res) {
            if (res.status) {
                context.list.dataProvider = new eui.ArrayCollection(res.resource);
                context.list.itemRenderer = HaoYou_New_Item;
                context.group.validateNow();
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    HaoYou_New.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    return HaoYou_New;
}(eui.Component));
__reflect(HaoYou_New.prototype, "HaoYou_New");
//# sourceMappingURL=HaoYou_New.js.map