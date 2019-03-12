var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChangAn = (function (_super) {
    __extends(ChangAn, _super);
    // public lab_tiem: eui.Label;
    // public group: eui.Group;
    function ChangAn(data) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skin/changan.exml";
        //	this.lab_tiem.text = DataUtils.DaoJiShi(data.senile);
        _this.lab_shouhuo.text = DataUtils.div(Math.floor(DataUtils.mul(data.number, 100)), 100) + "只";
        if (data.pond >= 12) {
            _this.lab_shengyu.text = DataUtils.div(Math.floor(DataUtils.mul(Fach.max3 - data.number, 100)), 100) + "只";
        }
        else if (data.pond >= 6) {
            _this.lab_shengyu.text = DataUtils.div(Math.floor(DataUtils.mul(Fach.max2 - data.number, 100)), 100) + "只";
        }
        else if (data.pond >= 0) {
            _this.lab_shengyu.text = DataUtils.div(Math.floor(DataUtils.mul(Fach.max1 - data.number, 100)), 100) + "只";
        }
        return _this;
    }
    return ChangAn;
}(eui.Component));
__reflect(ChangAn.prototype, "ChangAn");
//# sourceMappingURL=ChangAn.js.map