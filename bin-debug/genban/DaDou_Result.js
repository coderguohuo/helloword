var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DaDou_Result = (function (_super) {
    __extends(DaDou_Result, _super);
    function DaDou_Result(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.skinName = "dadou_result";
        return _this;
    }
    DaDou_Result.prototype.createChildren = function () {
        this.rec_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.No, this);
        this.rec_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
        if (this.data.resource.attacker == this.data.resource.winner) {
            this.group_no.visible = false;
            this.group_yes.visible = true;
        }
        else {
            this.group_no.visible = true;
            this.group_yes.visible = false;
        }
        Director.getInstance().getUser();
    };
    DaDou_Result.prototype.CallBack = function (cb) {
        this.cb = cb;
    };
    DaDou_Result.prototype.No = function () {
        this.cb.args[0] = 4;
        this.cb.back();
        this.parent.removeChild(this);
    };
    DaDou_Result.prototype.Yes = function () {
        this.cb.args[0] = 4;
        this.cb.back();
        this.parent.removeChild(this);
    };
    return DaDou_Result;
}(eui.Component));
__reflect(DaDou_Result.prototype, "DaDou_Result");
//# sourceMappingURL=DaDou_Result.js.map