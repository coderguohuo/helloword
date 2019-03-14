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
var SelectAnimal_Item = (function (_super) {
    __extends(SelectAnimal_Item, _super);
    function SelectAnimal_Item() {
        var _this = _super.call(this) || this;
        _this.isClock = false;
        _this.skinName = "selectSeed_Item";
        _this.rec_up.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Touch, _this);
        _this.rec_down.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Down, _this);
        return _this;
    }
    SelectAnimal_Item.prototype.Down = function () {
        if (this.isClock) {
            // 锁着状态,弹出种子 解锁页面
            Director.getInstance().pushScene(new Animal_XiangQing(this.data, 1));
        }
        else {
            Director.getInstance().pushScene(new Animal_XiangQing(this.data, 2));
        }
    };
    SelectAnimal_Item.prototype.createChildren = function () {
    };
    SelectAnimal_Item.prototype.dataChanged = function () {
        this.lab_name.text = this.data.name;
        this.lab_shouyi.text = DataUtils.floot(this.data.firHb) + "元";
        this.img.source = Fach.host + this.data.img;
        if (this.data.prop.needProp == -1) {
            this.lab_zhongzhi.text = this.data.plantPrice == 0 ? "免费" : DataUtils.floot(this.data.plantPrice);
        }
        else {
            this.lab_zhongzhi.text = this.data.prop.needCount;
            this.img_seed.source = this.data.prop.img;
        }
        if (this.data.unclockStatus <= 1) {
            this.img_suo.visible = true;
            this.touchEnabled = false;
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            this.img.filters = [this.colorFlilter];
            this.isClock = true;
        }
        else {
            this.isClock = false;
            this.img_suo.visible = false;
            this.img.filters = null;
        }
    };
    SelectAnimal_Item.prototype.updateLandToGrow = function (seedData, tuDiBean, delay) {
        if (delay === void 0) { delay = 0; }
        var needTime = seedData.growTime * 1000;
        var curTime = new Date().getTime() - Director.getInstance().ShiJianCha;
        var curData = tuDiBean.data;
        curData.status = 2; // 生长中 
        curData.plantTime = curTime + delay;
        curData.harvestTime = curData.plantTime + needTime;
        curData.animationId = seedData.animationId;
        tuDiBean.init();
        var game = Director.getInstance().gameLayer.getChildByName("game");
        game.updateMoney({ type: "gold", addNum: -seedData.plantPrice });
    };
    // 点击动物判断是否可以饲养 不经后端直接反馈玩家
    SelectAnimal_Item.prototype.findEmptyLandAndPlant = function (seedData) {
        var game = Director.getInstance().gameLayer.getChildByName("game");
        var curSelectedLand = game.animal_selected_pond;
        var willBean = null;
        var needGold = seedData.plantPrice;
        var curGold = game.getGold();
        if (curGold < needGold) {
            PopoP.getTips("金币不足哦");
            return;
        }
        if (curSelectedLand > 0) {
            var bean = game.animalBeans[curSelectedLand - 1];
            if (bean.data.status != 1) {
                curSelectedLand = 0;
            }
        }
        if (curSelectedLand == 0) {
            for (var i = 0; i < game.animalBeans.length; ++i) {
                var bean = game.animalBeans[i];
                var data = bean.data;
                if (data.status == 1) {
                    willBean = bean;
                    break;
                }
            }
        }
        else {
            willBean = game.animalBeans[curSelectedLand - 1];
        }
        if (willBean) {
            this.updateLandToGrow(seedData, willBean, 200);
            FachUtils.Post("/animal/" + curSelectedLand, { id: seedData._id }, function (res) {
                if (res.status) {
                    game.animal_selected_pond = 0;
                }
                else if (res.status == 1081) {
                    Director.getInstance().pushScene(new Animal_XiangQing(seedData, 2));
                    PopoP.getTips(res.message);
                }
                else {
                    PopoP.getTips(res.message);
                }
            }, function (res) { }, false);
        }
        else {
            Director.getInstance().pushScene(new Animal_XiangQing(seedData, 2));
            PopoP.getTips("无闲置空间了哦");
        }
    };
    SelectAnimal_Item.prototype.Touch = function (e) {
        e.stopPropagation();
        var game = Director.getInstance().gameLayer.getChildByName("game");
        var context = this;
        var data = {
            id: this.data._id
        };
        if (this.isClock) {
            // 锁着状态,弹出种子 解锁页面
            Director.getInstance().pushScene(new Animal_XiangQing(this.data, 1));
            //game.remoSelectSeed();
            return;
        }
        var self = this;
        var curAnimalData = self.data;
        self.findEmptyLandAndPlant(curAnimalData);
        // FachUtils.Post("/animal/" + game.animal_selected_pond, data, function (res) {
        // 	if (res.status) {
        // 		game.animal_selected_pond = 0;
        // 		//	game.remoSelectSeed();
        // 		Director.getInstance().getUser(true);
        // 	} else if (res.statusCode == 1081) {
        // 		// 无闲置土地 ,弹出种子收益详情
        // 		Director.getInstance().pushScene(new Animal_XiangQing(context.data, 2));
        // 			PopoP.getTips(res.message);
        // 	//	game.remoSelectSeed();
        // 	} else {
        // 		PopoP.getTips(res.message);
        // 	}
        // }, function (res) {
        // });
    };
    return SelectAnimal_Item;
}(eui.ItemRenderer));
__reflect(SelectAnimal_Item.prototype, "SelectAnimal_Item");
//# sourceMappingURL=SelectAnimal_Item.js.map