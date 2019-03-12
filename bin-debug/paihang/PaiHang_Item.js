var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PaiHang_Item = (function (_super) {
    __extends(PaiHang_Item, _super);
    function PaiHang_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "paihang_item";
        return _this;
    }
    PaiHang_Item.prototype.dataChanged = function () {
        if (this.itemIndex < 3) {
            this.img_pai.source = "paihang_" + (this.itemIndex + 1) + "_png";
            this.lab_paiming.text = "";
        }
        else {
            this.img_pai.source = "paihang_4_png";
            this.lab_paiming.text = (this.itemIndex + 1) + "";
        }
        this.lab_name.text = this.data.name,
            this.lab_hongbao.text = DataUtils.floot(this.data.hb) + "";
        if (this.data.avatar != null && this.data.avatar != "") {
            this.img_icon.source = this.data.avatar;
        }
        else {
            this.img_icon.source = "icon1_png";
        }
    };
    return PaiHang_Item;
}(eui.ItemRenderer));
__reflect(PaiHang_Item.prototype, "PaiHang_Item");
//# sourceMappingURL=PaiHang_Item.js.map