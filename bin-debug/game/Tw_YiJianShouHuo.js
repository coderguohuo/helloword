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
var Tw_YiJianShouHuo = (function (_super) {
    __extends(Tw_YiJianShouHuo, _super);
    function Tw_YiJianShouHuo(arrdata, img, type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.arrdata = arrdata;
        _this.img = img;
        _this.skinName = "tw_shouhuo";
        _this.btn_shouqu.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ShouHuoType, _this);
        _this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Close, _this);
        return _this;
    }
    Tw_YiJianShouHuo.prototype.createChildren = function () {
        this.btn_shouqu.visible = false;
        this.user = JSON.parse(egret.localStorage.getItem("user"));
        switch (this.type) {
            case 1:
                this.shouyiSeed();
                break;
            case 2:
                this.shouyiAnimal();
                break;
        }
    };
    //预览收益
    Tw_YiJianShouHuo.prototype.shouyiSeed = function () {
        var context = this;
        var data = {
            lands: this.arrdata
        };
        FachUtils.Post("/plant/totalHarvest", data, function (res) {
            if (res.status) {
                context.data = res.resource.harvest;
                context.initDate();
                context.btn_shouqu.visible = true;
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    Tw_YiJianShouHuo.prototype.setCb = function (cb) {
        this.cb = cb;
    };
    Tw_YiJianShouHuo.prototype.shouyiAnimal = function () {
        var context = this;
        // FachUtils.Get("/animal/harvestPreview/" + this.tudidata._id, function (res) {
        // 	if (res.status) {
        // 		context.data = res.resource.harvest;
        // 		context.initDate();
        // 		context.btn_shouqu.visible = true;
        // 	} else {
        // 		context.btn_shouqu.visible = false;
        // 		PopoP.getTips(res.message);
        // 	}
        // }, function (res) {
        // })
        var data = {
            lands: this.arrdata
        };
        FachUtils.Post("/animal/totalHarvest", data, function (res) {
            if (res.status) {
                context.data = res.resource.harvest;
                context.initDate();
                context.btn_shouqu.visible = true;
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    Tw_YiJianShouHuo.prototype.initDate = function () {
        if (this.data.props.length == 0) {
            //	KongTiShi.KO("好运气都用光了 (╥﹏╥) ", this.group);
            // if (this.user.guanjiaTime && this.user.guanjiaTime >= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
            // 	//有管家
            // 	KongTiShi.KO("管家已经帮您收获了", this.group);
            // } else {
            // 	//PopoP.getTips("没有管家")	
            // }
            this.img_wu.visible = true;
        }
        else {
            this.img_wu.visible = false;
            var data = this.data.props;
            var context = this;
            context.list.dataProvider = new eui.ArrayCollection(data);
            context.list.itemRenderer = Seed_ChanChu_Item;
            if (data.length == 4) {
                context.list.scaleX = 0.8;
                context.list.scaleY = 0.8;
            }
            else if (data.length == 5) {
                context.list.scaleX = 0.8;
                context.list.scaleY = 0.8;
            }
        }
        this.lab_gold.text = DataUtils.floot(this.data.gold);
        this.lab_hongbao.text = DataUtils.floot(this.data.hb);
        this.lab_nengliang.text = DataUtils.floot(this.data.plt_sessence);
        if (this.data.hb == 0) {
            this.group_hb.height = 0;
            this.group_hb.visible = false;
            this.group_hb.parent.addChildAt(this.group_hb, 100);
        }
        else {
            this.group_hb.height = 70;
            this.group_hb.visible = true;
        }
        if (this.user.guanjiaTime && this.user.guanjiaTime >= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
            //有管家
            PopoP.getTips("管家已经帮您收获了");
            var sum = this.data.gold + this.data.hb + this.data.plt_sessence + this.data.props.length;
            console.log(sum + 1);
            if (sum <= 0) {
                console.log("~~~~~~~~~~~~~~~~~~");
                this.btn_shouqu.visible = false;
                this.cb.back();
            }
        }
        else {
            //PopoP.getTips("没有管家")
        }
    };
    Tw_YiJianShouHuo.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    Tw_YiJianShouHuo.prototype.ShouHuoType = function () {
        if (this.type == 1) {
            this.ShouHuoSeed();
        }
        else {
            this.ShouHuoAnimal();
        }
    };
    Tw_YiJianShouHuo.prototype.ShouHuoSeed = function () {
        var game = Director.getInstance().gameLayer.getChildByName("game");
        var context = this;
        //删除可收获集合里的索引
        var data = {
            lands: this.arrdata
        };
        context.img.visible = false;
        for (var i = 0; i < context.arrdata.length; i++) {
            var index = game.canShouHUoSeed.indexOf(context.arrdata[i]);
            if (index != -1) {
                game.canShouHUoSeed.splice(index, 1);
            }
        }
        context.Close();
        game.yiJianShouHUo(context.arrdata, 1, context.data);
        FachUtils.Post("/plant/oneKeyHarvest", data, function (res) {
            if (res.status) {
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    Tw_YiJianShouHuo.prototype.ShouHuoAnimal = function () {
        var game = Director.getInstance().gameLayer.getChildByName("game");
        var context = this;
        //删除可收获集合里的索引
        var data = {
            lands: this.arrdata
        };
        context.img.visible = false;
        for (var i = 0; i < context.arrdata.length; i++) {
            var index = game.canShouHUoAnimal.indexOf(context.arrdata[i]);
            console.log(index);
            if (index != -1) {
                game.canShouHUoAnimal.splice(index, 1);
            }
        }
        context.Close();
        game.yiJianShouHUo(context.arrdata, 2, context.data);
        FachUtils.Post("/animal/oneKeyHarvest", data, function (res) {
            if (res.status) {
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    return Tw_YiJianShouHuo;
}(eui.Component));
__reflect(Tw_YiJianShouHuo.prototype, "Tw_YiJianShouHuo");
//# sourceMappingURL=Tw_YiJianShouHuo.js.map