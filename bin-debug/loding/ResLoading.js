var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ResLoading = (function (_super) {
    __extends(ResLoading, _super);
    function ResLoading() {
        var _this = _super.call(this) || this;
        _this.loadGroups = []; //要加载的组
        _this.skinName = "src/loding/ResLoadingSkin.exml";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addStage, _this);
        return _this;
    }
    ResLoading.getInstance = function () {
        if (this.loading == null) {
            this.loading = new ResLoading();
        }
        return this.loading;
    };
    ResLoading.prototype.addStage = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
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