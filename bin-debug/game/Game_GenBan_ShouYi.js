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
var Game_GenBan_ShouYi = (function (_super) {
    __extends(Game_GenBan_ShouYi, _super);
    function Game_GenBan_ShouYi() {
        var _this = _super.call(this) || this;
        _this.skinName = "game_genban_shouyi";
        return _this;
    }
    Game_GenBan_ShouYi.prototype.createChildren = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
    };
    Game_GenBan_ShouYi.prototype.setDate = function (data) {
        this.data = data;
        this.group.removeChildren();
        for (var i = 0; i < data.props.length; i++) {
            var img = new eui.Image;
            img.width = 45;
            img.height = 45;
            if (data.props[i].name == "金币" || data.props[i].name == "经验") {
                img.source = data.props[i].img;
            }
            else {
                img.source = Fach.host + data.props[i].img;
            }
            this.group.addChild(img);
        }
    };
    Game_GenBan_ShouYi.prototype.Touch = function () {
        var item = new ChanChu();
        item.setDate(this.data);
        Director.getInstance().pushScene(item);
    };
    return Game_GenBan_ShouYi;
}(eui.Component));
__reflect(Game_GenBan_ShouYi.prototype, "Game_GenBan_ShouYi");
//# sourceMappingURL=Game_GenBan_ShouYi.js.map