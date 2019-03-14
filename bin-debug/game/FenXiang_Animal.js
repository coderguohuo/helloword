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
var FenXiang_Animal = (function (_super) {
    __extends(FenXiang_Animal, _super);
    function FenXiang_Animal(_id, lockSum) {
        var _this = _super.call(this) || this;
        _this._id = _id;
        _this.lockSum = lockSum;
        _this.skinName = "fenxiang_tidu";
        return _this;
    }
    FenXiang_Animal.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.img_fenxiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.FenXiang, this);
        this.initView();
        this.getJinDu();
        this.getFenXiangCanShu();
    };
    FenXiang_Animal.prototype.initView = function () {
        this.img.source = "fenxiang_animal_png";
    };
    FenXiang_Animal.prototype.getFenXiangCanShu = function () {
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
    FenXiang_Animal.prototype.getJinDu = function () {
        var context = this;
        FachUtils.Get("/plant/land/share/" + this._id, function (res) {
            if (res.status) {
                context.lab_jindu.text = res.resource.inviteCount + "/" + context.lockSum;
            }
        }, function (res) {
        });
    };
    FenXiang_Animal.prototype.FenXiang = function () {
        JsToApp(this);
    };
    FenXiang_Animal.prototype.CallBack = function () {
        console.log("回调成功");
    };
    FenXiang_Animal.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    FenXiang_Animal.prototype.JSCallbackFunctionName = function () {
        PopoP.getTips("分享成功");
    };
    return FenXiang_Animal;
}(eui.Component));
__reflect(FenXiang_Animal.prototype, "FenXiang_Animal");
//# sourceMappingURL=FenXiang_Animal.js.map