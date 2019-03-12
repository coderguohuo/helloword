var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KongTiShi = (function () {
    function KongTiShi() {
    }
    KongTiShi.KO = function (str, group) {
        var effectTips = new egret.TextField();
        effectTips.text = str;
        effectTips.size = 26;
        effectTips.textColor = 0x333333;
        effectTips.x = group.width / 2 - effectTips.width / 2;
        effectTips.y = group.height / 2 - effectTips.height / 2;
        group.addChild(effectTips);
    };
    return KongTiShi;
}());
__reflect(KongTiShi.prototype, "KongTiShi");
//# sourceMappingURL=KongTiShi.js.map