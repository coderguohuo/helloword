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
var ResLoading = (function (_super) {
    __extends(ResLoading, _super);
    function ResLoading() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skin/aResLoadingSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        return _this;
    }
    ResLoading.prototype.onAdded = function () {
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    ResLoading.prototype.onRemoved = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    };
    ResLoading.prototype.update = function () {
        if (this.circle) {
            this.circle.rotation += 3;
        }
    };
    ResLoading.getInstance = function () {
        if (this.loading == null) {
            this.loading = new ResLoading();
        }
        return this.loading;
    };
    return ResLoading;
}(eui.Component));
__reflect(ResLoading.prototype, "ResLoading");
//# sourceMappingURL=ResLoading.js.map