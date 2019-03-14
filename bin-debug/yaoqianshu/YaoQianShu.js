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
var YaoQianShu = (function (_super) {
    __extends(YaoQianShu, _super);
    function YaoQianShu() {
        var _this = _super.call(this) || this;
        _this.jingpin = [];
        _this.skinName = "yaoqianshu";
        return _this;
    }
    YaoQianShu.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.btn_facai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.FaCai, this);
        this.img_zhaohui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ZhaoHUi, this);
        this.game = Director.getInstance().gameLayer.getChildByName("game");
        this.init();
    };
    YaoQianShu.prototype.setType = function (type) {
        var context = this;
        switch (type) {
            case 1:
                FachUtils.Get("/message/hbRecord/1/200", function (res) {
                    if (res.status) {
                        context.list.dataProvider = new eui.ArrayCollection(res.resource);
                        context.list.itemRenderer = YaoQIanShu_Item;
                        context.group.validateNow();
                        if (res.sum == 0) {
                            PopoP.getTips("您还没有被好友偷取红包");
                        }
                    }
                }, function (res) {
                });
                this.group_zhaohui.visible = true;
                this.group_facai.visible = false;
                break;
            case 2:
                var data;
                FachUtils.Get("/hb/offLineRewards", function (res) {
                    if (res.status) {
                        var arr = res.resource.props;
                        if (res.resource.dimond != 0) {
                            data = {
                                count: res.resource.dimond,
                                name: "钻石",
                                img: "zuanshi4_png",
                                bendi: 1
                            };
                            arr.push(data);
                        }
                        if (res.resource.experience != 0) {
                            data = {
                                count: res.resource.experience,
                                name: "经验",
                                img: "jingyan_png",
                                bendi: 1
                            };
                            arr.push(data);
                        }
                        if (res.resource.gold != 0) {
                            data = {
                                count: res.resource.gold,
                                name: "金币",
                                img: "gold2_png",
                                bendi: 1
                            };
                            arr.push(data);
                        }
                        if (res.resource.hb != 0) {
                            data = {
                                count: res.resource.hb,
                                name: "红包",
                                img: "hongbao2_png",
                                bendi: 1
                            };
                            arr.push(data);
                        }
                        if (res.resource.plt_sessence != 0) {
                            data = {
                                count: res.resource.plt_sessence,
                                name: "健康能量",
                                img: "nengliang_png",
                                bendi: 1
                            };
                            arr.push(data);
                        }
                        if (res.resource.tl != 0) {
                            data = {
                                count: res.resource.tl,
                                name: "体力",
                                img: "tiliping_png",
                                bendi: 1
                            };
                            arr.push(data);
                        }
                        context.jingpin = arr;
                    }
                }, function (res) {
                });
                this.group_zhaohui.visible = false;
                this.group_facai.visible = true;
                break;
        }
    };
    YaoQianShu.prototype.init = function () {
        var context = this;
    };
    YaoQianShu.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    YaoQianShu.prototype.FaCai = function () {
        var context = this;
        FachUtils.Get("/hb/offLineRewards/harvest", function (res) {
            if (res.status) {
                context.Xiangzi(context.xz1);
                context.Xiangzi(context.xz2);
                context.Xiangzi(context.xz3);
                context.Xiangzi(context.xz4);
                context.game.img_yqs_menu.visible = false;
                egret.setTimeout(function () {
                    context.tw();
                }, context, 1500);
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    YaoQianShu.prototype.Xiangzi = function (img) {
        //	this.xz1.source = "xiangzi2_png";
        egret.Tween.get(img).to({
            rotation: -10,
        }, 100).to({
            rotation: 10,
        }, 100).to({
            rotation: -10,
        }, 100).to({
            rotation: 10,
        }, 100).to({
            rotation: -10,
        }, 100).to({
            rotation: 10,
        }, 100).to({
            rotation: -10,
        }, 100).to({
            rotation: 10,
        }, 100).to({
            rotation: -10,
        }, 100).to({
            rotation: 10,
        }, 100).to({
            rotation: -10,
        }, 100).to({
            rotation: 10,
        }, 100).to({
            rotation: 0
        }, 100).call(function () {
            img.source = "xiangzi2_png";
        }, this);
    };
    YaoQianShu.prototype.tw = function () {
        var item = new BaHe_LingQu();
        item.setDate(this.jingpin);
        Director.getInstance().pushSceneScal(item);
        Director.getInstance().removeSceneNoTw(this);
    };
    YaoQianShu.prototype.ZhaoHUi = function () {
        Director.getInstance().pushSceneNoTw(new FenXiang_YaoQIanShu());
    };
    return YaoQianShu;
}(eui.Component));
__reflect(YaoQianShu.prototype, "YaoQianShu");
//# sourceMappingURL=YaoQianShu.js.map