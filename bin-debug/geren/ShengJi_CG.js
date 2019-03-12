var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShengJi_CG = (function (_super) {
    __extends(ShengJi_CG, _super);
    function ShengJi_CG(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.skinName = "shengji_chenggong";
        return _this;
    }
    ShengJi_CG.prototype.createChildren = function () {
        this.addEventListener("touchTap", this.Close, this);
        this.lab_lvlast.text = this.data[0].class;
        this.lab_hpLast.text = this.data[0].setting.hp;
        this.lab_qizhiLast.text = this.data[0].setting.vitality;
        this.lab_baojiLast.text = DataUtils.floot(DataUtils.mul(100, this.data[0].setting.crit_rate)) + "%";
        this.lab_lv.text = this.data[1].class;
        this.lab_hp.text = this.data[1].setting.hp;
        this.lab_qizhi.text = this.data[1].setting.vitality;
        this.lab_baoji.text = DataUtils.floot(DataUtils.mul(100, this.data[1].setting.crit_rate)) + "%";
    };
    ShengJi_CG.prototype.Close = function () {
        this.parent.removeChild(this);
    };
    return ShengJi_CG;
}(eui.Component));
__reflect(ShengJi_CG.prototype, "ShengJi_CG");
//# sourceMappingURL=ShengJi_CG.js.map