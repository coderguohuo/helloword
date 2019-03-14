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
        _this.loadGroups = []; //要加载的组
        _this.skinName = "resource/skin/aResLoadingSkin.exml";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.Complete, _this);
        return _this;
    }
    ResLoading.prototype.Complete = function () {
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    ResLoading.getInstance = function () {
        if (this.loading == null) {
            this.loading = new ResLoading();
        }
        return this.loading;
    };
    ResLoading.prototype.removeStage = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    };
    ResLoading.prototype.update = function () {
        this.circle.rotation += 3;
    };
    ResLoading.prototype.setProgress = function (current, total) {
        this.textLabel.text = current + "/" + total;
    };
    return ResLoading;
}(eui.Component));
__reflect(ResLoading.prototype, "ResLoading");
//# sourceMappingURL=ResLoading.js.map