var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PaiHang = (function (_super) {
    __extends(PaiHang, _super);
    function PaiHang() {
        var _this = _super.call(this) || this;
        _this.sum = 0;
        _this.yeshu = 1;
        _this.data = [];
        _this.type = 1;
        _this.skinName = "paihang";
        return _this;
    }
    PaiHang.prototype.createChildren = function () {
        this.rad1.addEventListener("touchTap", this.Rad1, this);
        this.rad2.addEventListener("touchTap", this.Rad2, this);
        this.lab_close.addEventListener("touchTap", this.Close, this);
        this.lab_more.addEventListener(egret.TouchEvent.TOUCH_TAP, this.More, this);
        this.init();
    };
    PaiHang.prototype.Rad1 = function () {
        this.lab_more.visible = true;
        this.yeshu = 1;
        this.type = 1;
        this.data = [];
        this.sum = 0;
        this.init();
    };
    PaiHang.prototype.Rad2 = function () {
        this.lab_more.visible = true;
        this.yeshu = 1;
        this.type = 2;
        this.data = [];
        this.sum = 0;
        this.init();
    };
    PaiHang.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    PaiHang.prototype.init = function () {
        var context = this;
        var data = {
            type: this.type
        };
        FachUtils.Post("/user/rank/" + this.yeshu + "/10", data, function (res) {
            if (res.status) {
                context.data = context.data.concat(res.resource);
                context.list.dataProvider = new eui.ArrayCollection(context.data);
                context.list.itemRenderer = PaiHang_Item;
                context.group.validateNow();
                context.sum = res.sum;
            }
            else {
                context.list.dataProvider = new eui.ArrayCollection(context.data);
                context.list.itemRenderer = PaiHang_Item;
                context.group.validateNow();
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    PaiHang.prototype.More = function () {
        if (this.data.length >= this.sum) {
            PopoP.getTips("暂无更多数据");
            this.lab_more.visible = false;
            return;
        }
        this.yeshu++;
        this.init();
    };
    return PaiHang;
}(eui.Component));
__reflect(PaiHang.prototype, "PaiHang");
//# sourceMappingURL=PaiHang.js.map