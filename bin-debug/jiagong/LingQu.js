var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LingQu = (function (_super) {
    __extends(LingQu, _super);
    function LingQu(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.skinName = "lingqu";
        return _this;
    }
    LingQu.prototype.createChildren = function () {
        SoundsMgr.win();
        this.img_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
        this.lab_name.text = this.data.name;
        this.img.source = Fach.host + this.data.img;
    };
    LingQu.prototype.Yes = function () {
        var game = Director.getInstance().gameLayer.getChildByName("game");
        game.houseCom(Fach.host + this.data.img);
        this.parent.removeChild(this);
    };
    return LingQu;
}(eui.Component));
__reflect(LingQu.prototype, "LingQu");
//# sourceMappingURL=LingQu.js.map