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
var CangKu_XiangQing = (function (_super) {
    __extends(CangKu_XiangQing, _super);
    function CangKu_XiangQing(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.skinName = "beibao_xiangqing";
        return _this;
    }
    CangKu_XiangQing.prototype.createChildren = function () {
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.rec_sell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchSell, this);
        this.img.source = Fach.host + this.data.img;
        this.lab_name.text = this.data.name;
        this.lab_yongtu.text = this.data.use;
        this.lab_xq.text = this.data.des;
        this.lab_gold.text = "+" + DataUtils.mul(this.data.soldPrice, this.data.count) + "金币";
        if (this.data.type == 1) {
            this.btn_yes.visible = false;
        }
        else {
            this.btn_yes.visible = true;
        }
        this.img.maxHeight = this.group.height;
        this.img.maxWidth = this.group.width;
        //	this.img.addEventListener(egret.Event.RESIZE, this.Size, this);
    };
    CangKu_XiangQing.prototype.Size = function () {
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
    CangKu_XiangQing.prototype.Yes = function () {
        if (this.data.sendStrCount > this.data.count) {
            PopoP.getTips("最低快递数量为" + this.data.sendStrCount + "个");
            return;
        }
        this.Close();
        Director.getInstance().pushScene(new KuaiDi(this.data));
    };
    CangKu_XiangQing.prototype.Close = function () {
        SoundsMgr.clickCell();
        this.parent.removeChild(this);
    };
    CangKu_XiangQing.prototype.TouchSell = function () {
        var cb = new CallBackFunc().handler(this.Sell, this, []);
        Director.getInstance().gameLayer.addChild(new TiShi("是否确认出售" + this.data.name, cb));
        this.parent.removeChild(this);
    };
    CangKu_XiangQing.prototype.Sell = function () {
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
    return CangKu_XiangQing;
}(eui.Component));
__reflect(CangKu_XiangQing.prototype, "CangKu_XiangQing");
//# sourceMappingURL=CangKu_XiangQing.js.map