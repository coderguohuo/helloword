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
var Seed_XiangQIng = (function (_super) {
    __extends(Seed_XiangQIng, _super);
    function Seed_XiangQIng(data, type) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.type = type;
        _this.skinName = "seed_xiangQing";
        return _this;
    }
    Seed_XiangQIng.prototype.createChildren = function () {
        this.img_close.addEventListener("touchTap", this.Close, this);
        this.img_jiesuo.addEventListener("touchTap", this.JieSuo, this);
        this.img_hecheng.addEventListener("touchTap", this.HeCheng, this);
        this.setType();
        this.init();
    };
    Seed_XiangQIng.prototype.setType = function () {
        switch (this.type) {
            case 1:
                //黄色
                this.lab_seedName.strokeColor = 0xD88A3D;
                this.img_bg.source = "seed_xiangqing_un_png";
                this.img_suo.visible = true;
                this.img_jiesuo.visible = true;
                this.group_btn.visible = true;
                break;
            case 2:
                //蓝色
                this.img_bg.source = "seed_xiangqing_png";
                this.img_suo.visible = false;
                this.img_jiesuo.visible = false;
                this.group_btn.visible = false;
                this.img_hecheng.visible = false;
                break;
        }
    };
    Seed_XiangQIng.prototype.init = function () {
        var context = this;
        FachUtils.Get("/plant/userDetail/" + this.data._id, function (res) {
            if (res.status) {
                context.initDate(res.resource.plant);
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    Seed_XiangQIng.prototype.initDate = function (data) {
        this.img.source = Fach.host + data.img1;
        this.lab_seedName.text = data.name;
        this.lab_gold.text = DataUtils.floot(data.maxGold);
        this.lab_hongbao.text = DataUtils.floot(data.firHb);
        this.lab_nengliang.text = DataUtils.floot(data.maxEssence);
        this.lab_clock.text = "(" + data.hasUnlockTime + "/" + data.unlockTime + ")";
        this.lab_needGold.text = DataUtils.floot(data.everyPrice);
        if (data.props != null) {
            if (data.props == 0) {
                this.img_wu.visible = true;
            }
            else {
                this.img_wu.visible = false;
                var context = this;
                context.list.dataProvider = new eui.ArrayCollection(data.props);
                context.list.itemRenderer = Seed_ChanChu_Item;
                if (data.props.length == 4) {
                    context.list.scaleX = 0.8;
                    context.list.scaleY = 0.8;
                }
                else if (data.props.length == 5) {
                    context.list.scaleX = 0.8;
                    context.list.scaleY = 0.8;
                }
            }
        }
        else {
            this.img_wu.visible = true;
        }
        if (data.hasUnlockTime == data.unlockTime) {
            //解锁完成  未合成
            this.group_btn.visible = false;
            this.img_jiesuo.visible = false;
            this.img_hecheng.visible = true;
        }
        switch (data.qualityId) {
            case 0:
                this.lab_pinzhi.text = "奇迹品质";
                break;
            case 1:
                this.lab_pinzhi.text = "普通品质";
                break;
            case 2:
                this.lab_pinzhi.text = "高级品质";
                break;
            case 3:
                this.lab_pinzhi.text = "稀有品质";
                break;
            case 4:
                this.lab_pinzhi.text = "超凡品质";
                break;
            case 5:
                this.lab_pinzhi.text = "史诗品质";
                break;
            case 6:
                this.lab_pinzhi.text = "传奇品质";
                break;
        }
    };
    //解锁
    Seed_XiangQIng.prototype.JieSuo = function () {
        var context = this;
        FachUtils.Get("/plant/unlock/" + this.data._id, function (res) {
            if (res.status) {
                Director.getInstance().getUser();
                context.JieSuoChengGong(res.resource.plant);
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    Seed_XiangQIng.prototype.JieSuoChengGong = function (data) {
        this.img.source = Fach.host + data.img1;
        this.lab_seedName.text = data.name;
        this.lab_gold.text = DataUtils.floot(data.maxGold);
        this.lab_hongbao.text = DataUtils.floot(data.firHb);
        this.lab_nengliang.text = DataUtils.floot(data.maxEssence);
        this.lab_clock.text = "(" + data.hasUnlockTime + "/" + data.unlockTime + ")";
        this.lab_needGold.text = DataUtils.floot(data.everyPrice);
        if (data.hasUnlockTime == data.unlockTime) {
            //解锁完成  未合成
            // this.type = 2;
            // this.setType();
            this.group_btn.visible = false;
            this.img_jiesuo.visible = false;
            this.img_hecheng.visible = true;
        }
    };
    Seed_XiangQIng.prototype.HeCheng = function () {
        var context = this;
        FachUtils.Get("/plant/cb/" + this.data._id, function (res) {
            if (res.status) {
                context.type = 2;
                context.setType();
                PopoP.getTips(res.message);
                //回调 刷新
                var selectSeed = Director.getInstance().gameLayer.getChildByName("selectseed");
                selectSeed.HeChengCallBack();
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
            PopoP.getTips(res.message);
        });
    };
    Seed_XiangQIng.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    return Seed_XiangQIng;
}(eui.Component));
__reflect(Seed_XiangQIng.prototype, "Seed_XiangQIng");
//# sourceMappingURL=Seed_XiangQIng.js.map