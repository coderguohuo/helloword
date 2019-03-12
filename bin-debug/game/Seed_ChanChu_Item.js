var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Seed_ChanChu_Item = (function (_super) {
    __extends(Seed_ChanChu_Item, _super);
    function Seed_ChanChu_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "beibao_item1";
        return _this;
    }
    Seed_ChanChu_Item.prototype.createChildren = function () {
        console.log(this.currentState);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
    };
    Seed_ChanChu_Item.prototype.Touch = function () {
        if (this.data == null) {
            return;
        }
        Director.getInstance().gameLayer.addChild(new Seed_ChanChu_Item_XiangQing(this.data));
    };
    Seed_ChanChu_Item.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        this.lab_name.text = this.data.name;
        this.img.source = Fach.host + this.data.img;
        if (this.data.count != null) {
            this.lab_num.text = "x " + DataUtils.floot(this.data.count);
        }
        else {
            this.lab_num.text = "";
        }
        this.img.maxHeight = this.group.width;
        this.img.maxWidth = this.group.height;
        if (this.data.type == 1) {
            this.img_bg.visible = true;
        }
        else if (this.data.type == 2) {
            this.img_bg.visible = false;
        }
    };
    return Seed_ChanChu_Item;
}(eui.ItemRenderer));
__reflect(Seed_ChanChu_Item.prototype, "Seed_ChanChu_Item");
//# sourceMappingURL=Seed_ChanChu_Item.js.map