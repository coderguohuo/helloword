var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VipJieSuo = (function (_super) {
    __extends(VipJieSuo, _super);
    function VipJieSuo() {
        var _this = _super.call(this) || this;
        _this.skinName = "vipjiesuo";
        return _this;
    }
    VipJieSuo.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.img_jiesuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.JieSuo, this);
    };
    VipJieSuo.prototype.JieSuo = function () {
        var context = this;
        var url;
        if (this.data.type == 1) {
            url = "/plant/land/dimond/";
        }
        else {
            url = "/animal/land/dimond/";
        }
        FachUtils.Get(url + this.data._id, function (res) {
            if (res.status) {
                Director.getInstance().getUser(true);
                Director.getInstance().removeSceneNoTw(context);
            }
            PopoP.getTips(res.message);
        }, function (res) {
        });
    };
    VipJieSuo.prototype.setDate = function (data) {
        this.data = data;
        this.lab_num.text = this.data.price;
    };
    VipJieSuo.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    return VipJieSuo;
}(eui.Component));
__reflect(VipJieSuo.prototype, "VipJieSuo");
//# sourceMappingURL=VipJieSuo.js.map