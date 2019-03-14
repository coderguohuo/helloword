var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Tips = (function (_super) {
    __extends(Tips, _super);
    function Tips() {
        var _this = _super.call(this) || this;
        // this.bg = new eui.Image();
        // this.bg.source = RES.getRes("tips_png");
        // this.bg.scale9Grid = new egret.Rectangle(55, 12, 9, 4);
        var bg = new eui.Rect();
        bg.fillColor = 0x333333;
        bg.fillAlpha = 0.6;
        bg.strokeWeight = 2;
        bg.ellipseWidth = 30;
        bg.strokeColor = 0x211e1e;
        _this.bg = bg;
        _this.addChild(_this.bg);
        _this.width = 121;
        _this.height = 30;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.label = new eui.Label();
        _this.addChild(_this.label);
        _this.x = egret.MainContext.instance.stage.stageWidth / 2;
        _this.y = egret.MainContext.instance.stage.stageHeight - 100;
        egret.MainContext.instance.stage.addChildAt(_this, 100000);
        _this.label.touchEnabled = false;
        _this.bg.touchEnabled = false;
        return _this;
    }
    Tips.prototype.show = function (str) {
        this.label.text = str;
        this.label.anchorOffsetX = this.label.width / 2;
        this.label.anchorOffsetY = this.label.height / 2;
        this.label.x = this.width / 2;
        this.label.y = this.height / 2;
        this.bg.width = this.label.width + 50;
        this.bg.height = this.label.height + 35;
        this.bg.anchorOffsetX = this.bg.width / 2;
        this.bg.anchorOffsetY = this.bg.height / 2;
        this.bg.x = this.width / 2;
        this.bg.y = this.height / 2;
        var tw = egret.Tween.get(this);
        tw.to({ x: egret.MainContext.instance.stage.stageWidth / 2, y: egret.MainContext.instance.stage.stageHeight - 200 }, 1500, egret.Ease.backOut)
            .call(this.callback, this);
    };
    Tips.prototype.callback = function () {
        this.parent.removeChild(this);
    };
    return Tips;
}(egret.DisplayObjectContainer));
__reflect(Tips.prototype, "Tips");
//# sourceMappingURL=Tips.js.map