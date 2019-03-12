var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PopoP = (function () {
    function PopoP() {
    }
    PopoP.getTips = function (str) {
        new Tips().show(str);
    };
    PopoP.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
            target.play();
        }
        else {
            target.stop();
        }
    };
    return PopoP;
}());
__reflect(PopoP.prototype, "PopoP");
//# sourceMappingURL=PopoP.js.map