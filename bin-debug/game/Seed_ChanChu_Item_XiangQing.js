var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Seed_ChanChu_Item_XiangQing = (function (_super) {
    __extends(Seed_ChanChu_Item_XiangQing, _super);
    function Seed_ChanChu_Item_XiangQing(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.skinName = "beibao_xiangqing";
        return _this;
    }
    //显示 种子可能产出的商品,不能点击出售
    Seed_ChanChu_Item_XiangQing.prototype.createChildren = function () {
        //this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        //	this.rec_sell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchSell, this);
        this.img.source = Fach.host + this.data.img;
        this.lab_name.text = this.data.name;
        this.lab_yongtu.text = this.data.use;
        this.lab_xq.text = this.data.des;
        this.img.maxHeight = this.group.height;
        this.img.maxWidth = this.group.width;
        //	this.img.addEventListener(egret.Event.RESIZE, this.Size, this);
        this.btn_yes.visible = false;
        this.group_sell.visible = false;
    };
    Seed_ChanChu_Item_XiangQing.prototype.Size = function () {
        if (this.img.width > this.group.width) {
            var scr = this.group.width / this.img.width;
            this.img.height = this.img.height * scr;
            this.img.width = this.img.width * scr;
        }
        if (this.img.height > this.group.height) {
            var scr2 = this.group.height / this.img.height;
            this.img.height = this.img.height * scr2;
            this.img.width = this.img.width * scr2;
        }
    };
    Seed_ChanChu_Item_XiangQing.prototype.Yes = function () {
    };
    Seed_ChanChu_Item_XiangQing.prototype.Close = function () {
        SoundsMgr.clickCell();
        this.parent.removeChild(this);
    };
    Seed_ChanChu_Item_XiangQing.prototype.TouchSell = function () {
    };
    Seed_ChanChu_Item_XiangQing.prototype.Sell = function () {
        var context = this;
        FachUtils.Get("/warahouse/sell/" + this.data._id, function (res) {
            if (res.status) {
                var cangku = Director.getInstance().gameLayer.getChildByName("cangku");
                cangku.init();
                PopoP.getTips(res.message);
                Director.getInstance().getUser();
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    return Seed_ChanChu_Item_XiangQing;
}(eui.Component));
__reflect(Seed_ChanChu_Item_XiangQing.prototype, "Seed_ChanChu_Item_XiangQing");
//# sourceMappingURL=Seed_ChanChu_Item_XiangQing.js.map