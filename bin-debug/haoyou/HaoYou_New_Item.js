var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HaoYou_New_Item = (function (_super) {
    __extends(HaoYou_New_Item, _super);
    function HaoYou_New_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "haoyou_add_item";
        return _this;
    }
    HaoYou_New_Item.prototype.createChildren = function () {
        this.btn_yes.label = "同意添加";
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Add, this);
    };
    HaoYou_New_Item.prototype.dataChanged = function () {
        this.img.source = this.data.from_avatar;
        if (this.data.from_avatar != null && this.data.from_avatar != "") {
            this.img.source = this.data.from_avatar;
        }
        else {
            this.img.source = "icon1_png";
        }
        this.lab_name.text = this.data.from_nickname;
        this.lab_userid.text = this.data.from;
    };
    HaoYou_New_Item.prototype.Add = function () {
        var context = this;
        var data = {
            status: 1
        };
        FachUtils.Post("/user/aplly/" + this.data._id, data, function (res) {
            if (res.status) {
                context.btn_yes.label = "已添加";
                var haoyou = Director.getInstance().gameLayer.getChildByName("haoyou");
                haoyou.data = [];
                haoyou.init();
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    return HaoYou_New_Item;
}(eui.ItemRenderer));
__reflect(HaoYou_New_Item.prototype, "HaoYou_New_Item");
//# sourceMappingURL=HaoYou_New_Item.js.map