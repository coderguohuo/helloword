var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FengXIang_BaHe = (function (_super) {
    __extends(FengXIang_BaHe, _super);
    function FengXIang_BaHe() {
        var _this = _super.call(this) || this;
        _this.skinName = "fenxiang_tidu";
        return _this;
    }
    FengXIang_BaHe.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.img_fenxiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.FenXiang, this);
        this.getJinDu();
        this.getFenXiangCanShu();
        this.lab_title.text = "邀请更多好友  助力红包争夺赛";
        this.lab_note.text = "邀请好友越多，获胜几率越大";
        this.img.source = "fenxiang_bahe_png";
    };
    FengXIang_BaHe.prototype.getFenXiangCanShu = function () {
        var context = this;
        var data = {
            id: 1000
        };
        // FachUtils.Post("/plant/land/share/settings", data, function (res) {
        // 	if (res.status) {
        // 		context.fenXiangdata = res.resource;
        // 	}
        // }, function (res) {
        // });
    };
    FengXIang_BaHe.prototype.getJinDu = function () {
        // var context = this;
        // FachUtils.Get("/plant/land/share/" + this._id, function (res) {
        // 	if (res.status) {
        // 		context.lab_jindu.text = res.resource.inviteCount + "/" + context.lockSum;
        // 	}
        // }, function (res) {
        // });
    };
    FengXIang_BaHe.prototype.FenXiang = function () {
        JsToApp(this);
    };
    FengXIang_BaHe.prototype.CallBack = function () {
        console.log("回调成功");
    };
    FengXIang_BaHe.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    FengXIang_BaHe.prototype.JSCallbackFunctionName = function () {
        PopoP.getTips("分享成功");
    };
    return FengXIang_BaHe;
}(eui.Component));
__reflect(FengXIang_BaHe.prototype, "FengXIang_BaHe");
//# sourceMappingURL=FengXIang_BaHe.js.map