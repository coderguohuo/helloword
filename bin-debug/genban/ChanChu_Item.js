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
var ChanChu_Item = (function (_super) {
    __extends(ChanChu_Item, _super);
    function ChanChu_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "beibao_item1";
        return _this;
    }
    ChanChu_Item.prototype.createChildren = function () {
        console.log(this.currentState);
        //	this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
    };
    ChanChu_Item.prototype.Touch = function () {
        if (this.data == null) {
            return;
        }
        Director.getInstance().gameLayer.addChild(new CangKu_XiangQing(this.data));
    };
    ChanChu_Item.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        this.lab_name.text = this.data.name;
        if (this.data.name == "金币" || this.data.name == "经验") {
            this.img.source = this.data.img;
        }
        else {
            this.img.source = Fach.host + this.data.img;
        }
        this.lab_num.text = "x " + DataUtils.floot(this.data.count);
        this.img.maxHeight = this.group.width;
        this.img.maxWidth = this.group.height;
        this.img_bg.visible = true;
    };
    return ChanChu_Item;
}(eui.ItemRenderer));
__reflect(ChanChu_Item.prototype, "ChanChu_Item");
//# sourceMappingURL=ChanChu_Item.js.map