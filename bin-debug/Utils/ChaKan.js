var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChaKan = (function (_super) {
    __extends(ChaKan, _super);
    function ChaKan(data, num) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.num = num;
        _this.skinName = "resource/skin/main/chakan.exml";
        _this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Close, _this);
        _this.initDate();
        return _this;
    }
    ChaKan.prototype.initDate = function () {
        this.lab_time.text = DataUtils.datePase(this.data.createTime);
        if (this.num == 1) {
            this.lab_content.text = this.data.note;
        }
        else {
            this.lab_content.text = this.data.content;
        }
    };
    ChaKan.prototype.Close = function () {
        SoundsMgr.clickCell();
        this.parent.removeChild(this);
    };
    return ChaKan;
}(eui.Component));
__reflect(ChaKan.prototype, "ChaKan");
//# sourceMappingURL=ChaKan.js.map