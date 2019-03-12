var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HaoYou_Add = (function (_super) {
    __extends(HaoYou_Add, _super);
    function HaoYou_Add() {
        var _this = _super.call(this) || this;
        _this.skinName = "haoyou_add";
        return _this;
    }
    HaoYou_Add.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.btn_sousuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SouSuo, this);
        var user = JSON.parse(egret.localStorage.getItem("user"));
        this.lab_myid.text = "我的ID: " + user.userid;
        var game = Director.getInstance().gameLayer.getChildByName("game");
        game.rec_haoyou.visible = false;
    };
    HaoYou_Add.prototype.SouSuo = function () {
        var context = this;
        if (this.ed_sousuo.text == "") {
            PopoP.getTips("请输入要搜索的账号");
            return;
        }
        FachUtils.Get("/user/search/" + this.ed_sousuo.text, function (res) {
            if (res.status) {
                var data = [res.resource];
                context.list.dataProvider = new eui.ArrayCollection(data);
                context.list.itemRenderer = HaoYou_Add_Item;
                context.group.validateNow();
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    HaoYou_Add.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    return HaoYou_Add;
}(eui.Component));
__reflect(HaoYou_Add.prototype, "HaoYou_Add");
//# sourceMappingURL=HaoYou_Add.js.map