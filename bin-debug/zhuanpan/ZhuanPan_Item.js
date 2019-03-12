var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ZhuanPan_Item = (function (_super) {
    __extends(ZhuanPan_Item, _super);
    function ZhuanPan_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "zhuanpan_item";
        return _this;
    }
    ZhuanPan_Item.prototype.createChildren = function () {
    };
    ZhuanPan_Item.prototype.setDate = function (data) {
        // type 1 经验 2 精华 3 金币 4 红包 5 体力 6 钻石 7 道具 8 谢谢参与
        switch (data.type) {
            case 1:
                this.img.source = "jingyan_png";
                this.lab_name.text = '经验';
                this.lab_num.text = "x" + DataUtils.floot(data.experience);
                break;
            case 2:
                this.img.source = "nengliang_png";
                this.lab_name.text = '健康能量';
                this.lab_num.text = "x" + DataUtils.floot(data.plt_sessence);
                break;
            case 3:
                this.img.source = "gold2_png";
                this.lab_name.text = '金币';
                this.lab_num.text = "x" + DataUtils.floot(data.gold);
                break;
            case 4:
                this.img.source = "hongbao2_png";
                this.lab_name.text = '红包';
                this.lab_num.text = "x" + DataUtils.floot(data.hb);
                break;
            case 5:
                this.img.source = "tiliping_png";
                this.lab_name.text = '体力瓶';
                this.lab_num.text = "x" + DataUtils.floot(data.tl);
                break;
            case 6:
                this.img.source = "zuanshi4_png";
                this.lab_name.text = '钻石';
                this.lab_num.text = "x" + DataUtils.floot(data.dimond);
                break;
            case 7:
                this.lab_name.text = data.propName;
                this.img.source = Fach.host + data.propImg;
                this.lab_num.text = "x" + DataUtils.floot(data.propCount);
                break;
            case 8:
                this.img.source = "xiexiecanyu_png";
                this.lab_name.text = '谢谢参与';
                this.lab_num.text = "";
                break;
        }
    };
    return ZhuanPan_Item;
}(eui.Component));
__reflect(ZhuanPan_Item.prototype, "ZhuanPan_Item");
//# sourceMappingURL=ZhuanPan_Item.js.map