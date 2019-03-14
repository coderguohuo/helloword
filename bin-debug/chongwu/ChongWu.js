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
var ChongWu = (function (_super) {
    __extends(ChongWu, _super);
    function ChongWu() {
        var _this = _super.call(this) || this;
        _this.num = 0;
        _this.skinName = "chongwu";
        return _this;
    }
    ChongWu.prototype.createChildren = function () {
        this.lab_close.addEventListener("touchTap", this.Close, this);
        this.btn_yes.addEventListener("touchTap", this.ShengJi, this);
        this.btn_weiyang.addEventListener("touchTap", this.WeiYang, this);
        this.rec_chongwu.addEventListener("touchTap", this.ChongWu, this);
        this.addEventListener(GameEvent.getUserInfo, this.initDate, this);
        this.init();
        this.initDate();
    };
    ChongWu.prototype.init = function () {
        var item = new DogDragon("");
        this.item = item;
        this.item.horizontalCenter = 0;
        item.x = 300;
        item.y = 400;
        this.addChild(item);
        item.PlayAni1();
    };
    ChongWu.prototype.initDate = function () {
        var context = this;
        FachUtils.Get("/pet/dog", function (res) {
            if (res.status) {
                context.lab_qizhi.text = DataUtils.floot(res.resource.vitality);
                context.lab_shanghai.text = DataUtils.floot(res.resource.baseDamage);
                context.lab_baojilv.text = DataUtils.mul(100, res.resource.crit_rate) + "%";
                context.lab_shengming.text = DataUtils.floot(res.resource.hp);
                context.lab_baofugan.text = DataUtils.floot(res.resource.bsd);
                if (res.resource.bsd < 30) {
                    context.item.PlayAni2();
                }
                context.lab_baoji.text = DataUtils.floot(res.resource.baseDamage);
                context.lab_lv.text = "LV." + res.resource.class;
                context.rec_lv.width = ((res.resource.feedCount / res.resource.nexClass_needFeed) > 1 ? 1 : (res.resource.feedCount / res.resource.nexClass_needFeed)) * 500;
                context.lab_gold.text = res.resource.feedGold;
                context.lab_zhandouli.text = "(战斗力 " + DataUtils.mul(res.resource.damageRate, 100) + "%)";
                if (res.resource.feedCount == res.resource.nexClass_needFeed) {
                    context.btn_yes.visible = true;
                    context.btn_weiyang.visible = false;
                    context.lab_gold.text = res.resource.upGradeGold;
                }
                else {
                    context.btn_yes.visible = false;
                    context.btn_weiyang.visible = true;
                }
                var str;
                for (var i = 0; i < res.resource.spendProps.length; i++) {
                    if (i == 0) {
                        context.group1.visible = true;
                    }
                    else if (i == 1) {
                        context.group2.visible = true;
                    }
                    else if (i == 2) {
                        context.group3.visible = true;
                    }
                    if (res.resource.spendProps[i].hasCount < res.resource.spendProps[i].needCount) {
                        str =
                            '<font color=0xEA1F1F>' + res.resource.spendProps[i].hasCount + '</font>' +
                                '<font color=0x333333> / ' + res.resource.spendProps[i].needCount + '</font>';
                    }
                    else {
                        str =
                            '<font color=0x1BA81F>' + res.resource.spendProps[i].hasCount + '</font>' +
                                '<font color=0x1BA81F> / ' + res.resource.spendProps[i].needCount + '</font>';
                    }
                    context.lab_num1.textFlow = new egret.HtmlTextParser().parser(str);
                    context.img_shiwu1.source = Fach.host + res.resource.spendProps[i].img;
                }
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    ChongWu.prototype.ChongWu = function () {
        this.num++;
        this.num = this.num % 3;
        switch (this.num) {
            case 0:
                this.item.PlayAni1();
                break;
            case 1:
                this.item.PlayAni4();
                break;
            case 2:
                this.item.PlayAni5();
                break;
        }
    };
    ChongWu.prototype.WeiYang = function () {
        var context = this;
        FachUtils.Get("/pet/feed", function (res) {
            if (res.status) {
                Director.getInstance().getUser();
                context.item.PlayAni5();
                PopoP.getTips(res.message);
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    ChongWu.prototype.ShengJi = function () {
        var context = this;
        FachUtils.Get("/pet/upgrade", function (res) {
            if (res.status) {
                Director.getInstance().getUser();
                context.item.PlayAni3();
                PopoP.getTips(res.message);
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    ChongWu.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    return ChongWu;
}(eui.Component));
__reflect(ChongWu.prototype, "ChongWu");
//# sourceMappingURL=ChongWu.js.map