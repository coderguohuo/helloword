var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TWUtils = (function () {
    function TWUtils(btn) {
        this.btn = btn;
    }
    TWUtils.TwCanTouch = function (btn) {
        btn.touchEnabled = false;
        SoundsMgr.playBtn();
        var onComplete1 = function () {
            egret.Tween.get(btn).to({
                scaleX: 1, scaleY: 1,
                x: btn.x - btn.width * 0.1,
                y: btn.y - btn.height * 0.1
            }, 100, egret.Ease.elasticOut).call(function () {
                btn.touchEnabled = true;
            }, this);
        };
        egret.Tween.get(btn).to({
            scaleX: 0.9, scaleY: 0.9,
            x: btn.x + btn.width * 0.1,
            y: btn.y + btn.height * 0.1
        }, 200, egret.Ease.sineIn).call(onComplete1, this);
    };
    TWUtils.Tw = function (btn) {
        SoundsMgr.playBtn();
        var onComplete1 = function () {
            egret.Tween.get(btn).to({
                scaleX: 1, scaleY: 1,
                x: btn.x - btn.width * 0.1,
                y: btn.y - btn.height * 0.1
            }, 100, egret.Ease.elasticOut).call(function () {
            }, this);
        };
        egret.Tween.get(btn).to({
            scaleX: 0.9, scaleY: 0.9,
            x: btn.x + btn.width * 0.1,
            y: btn.y + btn.height * 0.1
        }, 200, egret.Ease.sineIn).call(onComplete1, this);
    };
    TWUtils.TwNoTouch = function (btn) {
        var onComplete1 = function () {
            egret.Tween.get(btn).to({
                scaleX: 1, scaleY: 1, x: btn.x - btn.width / 4,
                y: btn.y - btn.height / 4
            }, 100, egret.Ease.elasticOut).call(function () {
            }, this);
        };
        egret.Tween.get(btn).to({
            scaleX: 0.5, scaleY: 0.5,
            x: btn.x + btn.width / 4,
            y: btn.y + btn.height / 4
        }, 200, egret.Ease.sineIn).call(onComplete1, this);
    };
    TWUtils.playAnimation2 = function (btn) {
        var tw = egret.Tween.get(btn);
        tw.to({ x: btn.x += 20, y: btn.y += 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: btn.x -= 20, y: btn.y -= 20 }, 100, egret.Ease.bounceIn);
        tw.to({ x: btn.x += 20, y: btn.y += 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: btn.x -= 20, y: btn.y -= 20 }, 100, egret.Ease.bounceIn);
        tw.to({ x: btn.x += 20, y: btn.y += 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: btn.x -= 20, y: btn.y -= 20 }, 100, egret.Ease.bounceIn);
    };
    return TWUtils;
}());
__reflect(TWUtils.prototype, "TWUtils");
//# sourceMappingURL=TWUtils.js.map