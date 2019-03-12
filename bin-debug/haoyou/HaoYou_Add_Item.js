var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HaoYou_Add_Item = (function (_super) {
    __extends(HaoYou_Add_Item, _super);
    function HaoYou_Add_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "haoyou_add_item";
        return _this;
    }
    HaoYou_Add_Item.prototype.createChildren = function () {
        this.btn_yes.label = "添加好友";
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Add, this);
    };
    HaoYou_Add_Item.prototype.dataChanged = function () {
        if (this.data.avatar != null && this.data.avatar != "") {
            this.img.source = this.data.avatar;
        }
        else {
            this.img.source = "icon1_png";
        }
        this.lab_name.text = this.data.nickname;
        this.lab_userid.text = this.data.userid;
    };
    HaoYou_Add_Item.prototype.Add = function () {
        var context = this;
        FachUtils.Post("/user/friend/" + this.data.userid, {}, function (res) {
            if (res.status) {
                PopoP.getTips(res.message);
                context.btn_yes.label = "已发送";
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    return HaoYou_Add_Item;
}(eui.ItemRenderer));
__reflect(HaoYou_Add_Item.prototype, "HaoYou_Add_Item");
//# sourceMappingURL=HaoYou_Add_Item.js.map