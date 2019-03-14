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
var CangKu = (function (_super) {
    __extends(CangKu, _super);
    function CangKu() {
        var _this = _super.call(this) || this;
        _this.wupin = [];
        _this.daoju = [];
        _this.skinName = "beibao";
        _this.name = "cangku";
        return _this;
    }
    CangKu.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.init();
    };
    CangKu.prototype.init = function () {
        var context = this;
        context.daoju = [];
        context.wupin = [];
        FachUtils.Get("/user/warahouse", function (res) {
            if (res.status) {
                for (var i = 0; i < res.resource.length; i++) {
                    if (res.resource[i].type == 1) {
                        context.daoju.push(res.resource[i]);
                    }
                    else if (res.resource[i].type == 2) {
                        context.wupin.push(res.resource[i]);
                    }
                }
                if (context.daoju.length < 15) {
                    context.daoju.length = 15;
                }
                else {
                    context.daoju.length = Math.ceil(context.daoju.length / 5) * 5;
                }
                if (context.wupin.length < 10) {
                    context.wupin.length = 10;
                }
                else {
                    context.wupin.length = Math.ceil(context.wupin.length / 5) * 5;
                }
                context.list_beibao.dataProvider = new eui.ArrayCollection(context.daoju);
                context.list_beibao.currentState = "daoju";
                context.list_beibao.itemRenderer = CangKu_Item;
                context.list_beibao.itemRenderer.currentState = "daoju";
                context.group_beibao.validateNow();
                context.list_wupin.dataProvider = new eui.ArrayCollection(context.wupin);
                context.list_wupin.currentState = "wupin";
                context.list_wupin.itemRenderer = CangKu_Item;
                context.list_wupin.itemRenderer.currentState = "wupin";
                context.group_wupin.validateNow();
                for (var i = 0; i < context.list_beibao.numChildren; i++) {
                    context.list_beibao.$children[i].currentState = "daoju";
                }
                for (var i = 0; i < context.list_wupin.numChildren; i++) {
                    context.list_wupin.$children[i].currentState = "wupin";
                }
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
        new eui.Button;
        this.list_wupin.itemRendererFunction;
    };
    CangKu.prototype.Close = function () {
        SoundsMgr.clickCell();
        this.parent.removeChild(this);
    };
    return CangKu;
}(eui.Component));
__reflect(CangKu.prototype, "CangKu");
//# sourceMappingURL=CangKu.js.map