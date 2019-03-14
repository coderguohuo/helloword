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
var FenXiang_YaoQIanShu = (function (_super) {
    __extends(FenXiang_YaoQIanShu, _super);
    function FenXiang_YaoQIanShu() {
        var _this = _super.call(this) || this;
        _this.skinName = "fenxiang_tidu";
        return _this;
    }
    FenXiang_YaoQIanShu.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.img_fenxiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.FenXiang, this);
        this.getJinDu();
        this.getFenXiangCanShu();
        this.lab_title.text = "邀请好友助力  找回丢失红包";
        this.lab_note.text = "邀请更多好友，找回红包越多";
        this.img.source = "fenxiang_yaoqianshu_png";
    };
    FenXiang_YaoQIanShu.prototype.getFenXiangCanShu = function () {
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
    FenXiang_YaoQIanShu.prototype.getJinDu = function () {
        // var context = this;
        // FachUtils.Get("/plant/land/share/" + this._id, function (res) {
        // 	if (res.status) {
        // 		context.lab_jindu.text = res.resource.inviteCount + "/" + context.lockSum;
        // 	}
        // }, function (res) {
        // });
    };
    FenXiang_YaoQIanShu.prototype.FenXiang = function () {
        JsToApp(this);
    };
    FenXiang_YaoQIanShu.prototype.CallBack = function () {
        console.log("回调成功");
    };
    FenXiang_YaoQIanShu.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    FenXiang_YaoQIanShu.prototype.JSCallbackFunctionName = function () {
        PopoP.getTips("分享成功");
    };
    return FenXiang_YaoQIanShu;
}(eui.Component));
__reflect(FenXiang_YaoQIanShu.prototype, "FenXiang_YaoQIanShu");
//# sourceMappingURL=FenXiang_YaoQIanShu.js.map