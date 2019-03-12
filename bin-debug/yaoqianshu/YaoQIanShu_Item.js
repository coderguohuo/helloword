var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var YaoQIanShu_Item = (function (_super) {
    __extends(YaoQIanShu_Item, _super);
    function YaoQIanShu_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "yaoqianshu_item";
        return _this;
    }
    YaoQIanShu_Item.prototype.dataChanged = function () {
        this.lab_hb.text = DataUtils.floot(this.data.hb);
        this.lab_name.text = this.data.stealFromNick;
        if (this.data.userAvatar != null && this.data.userAvatar != "") {
            this.img_icon.source = this.data.userAvatar;
        }
        else {
            this.img_icon.source = "icon1_png";
        }
    };
    return YaoQIanShu_Item;
}(eui.ItemRenderer));
__reflect(YaoQIanShu_Item.prototype, "YaoQIanShu_Item");
//# sourceMappingURL=YaoQIanShu_Item.js.map