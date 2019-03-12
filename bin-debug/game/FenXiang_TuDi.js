var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FenXiang_TuDi = (function (_super) {
    __extends(FenXiang_TuDi, _super);
    function FenXiang_TuDi(_id, lockSum) {
        var _this = _super.call(this) || this;
        _this._id = _id;
        _this.lockSum = lockSum;
        _this.skinName = "fenxiang_tidu";
        return _this;
    }
    FenXiang_TuDi.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.img_fenxiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.FenXiang, this);
        this.getJinDu();
        this.getFenXiangCanShu();
    };
    FenXiang_TuDi.prototype.getFenXiangCanShu = function () {
        var context = this;
        var data = {
            id: 1000
        };
        FachUtils.Post("/plant/land/share/settings", data, function (res) {
            if (res.status) {
                context.fenXiangdata = res.resource;
            }
        }, function (res) {
        });
    };
    FenXiang_TuDi.prototype.getJinDu = function () {
        var context = this;
        FachUtils.Get("/plant/land/share/" + this._id, function (res) {
            if (res.status) {
                context.lab_jindu.text = res.resource.inviteCount + "/" + context.lockSum;
            }
        }, function (res) {
        });
    };
    FenXiang_TuDi.prototype.FenXiang = function () {
        JsToApp(this);
    };
    FenXiang_TuDi.prototype.CallBack = function () {
        console.log("回调成功");
    };
    FenXiang_TuDi.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    FenXiang_TuDi.prototype.JSCallbackFunctionName = function () {
        PopoP.getTips("分享成功");
    };
    return FenXiang_TuDi;
}(eui.Component));
__reflect(FenXiang_TuDi.prototype, "FenXiang_TuDi");
//# sourceMappingURL=FenXiang_TuDi.js.map