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
var CangKu_Item = (function (_super) {
    __extends(CangKu_Item, _super);
    function CangKu_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "beibao_item1";
        return _this;
    }
    CangKu_Item.prototype.createChildren = function () {
        console.log(this.currentState);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
    };
    CangKu_Item.prototype.Touch = function () {
        if (this.data == null) {
            return;
        }
        Director.getInstance().gameLayer.addChild(new CangKu_XiangQing(this.data));
    };
    CangKu_Item.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        this.lab_name.text = this.data.name;
        this.img.source = Fach.host + this.data.img;
        this.lab_num.text = "x " + DataUtils.floot(this.data.count);
        this.img.maxHeight = this.group.width;
        this.img.maxWidth = this.group.height;
        if (this.data.type == 1) {
            this.img_bg.visible = true;
        }
        else if (this.data.type == 2) {
            this.img_bg.visible = false;
        }
    };
    return CangKu_Item;
}(eui.ItemRenderer));
__reflect(CangKu_Item.prototype, "CangKu_Item");
//# sourceMappingURL=CangKu_Item.js.map