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
var JiaGong_Item = (function (_super) {
    __extends(JiaGong_Item, _super);
    function JiaGong_Item() {
        var _this = _super.call(this) || this;
        _this.unClock = false;
        _this.skinName = "jiagong_item";
        return _this;
    }
    JiaGong_Item.prototype.createChildren = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        //	this.img.filters = [this.colorFlilter];
        this.user = JSON.parse(egret.localStorage.getItem("user"));
    };
    JiaGong_Item.prototype.dataChanged = function () {
        this.img.source = Fach.host + this.data.img;
        this.lab_name.text = this.data.name;
        if (this.user.class >= this.data.u_class) {
            this.img.filters = null;
            this.unClock = true;
        }
        else {
            this.img.filters = [this.colorFlilter];
            this.unClock = false;
        }
    };
    JiaGong_Item.prototype.Onselect = function () {
        this.rec_select.visible = true;
        //	this.img.filters = null;
    };
    JiaGong_Item.prototype.OnCancelSelect = function () {
        //	this.img.filters = [this.colorFlilter];
        this.rec_select.visible = false;
    };
    JiaGong_Item.prototype.getCurrentState = function () {
        if (this.selected) {
            this.Onselect();
        }
        else {
            this.OnCancelSelect();
        }
        return this.selected + "";
    };
    return JiaGong_Item;
}(eui.ItemRenderer));
__reflect(JiaGong_Item.prototype, "JiaGong_Item");
//# sourceMappingURL=JiaGong_Item.js.map