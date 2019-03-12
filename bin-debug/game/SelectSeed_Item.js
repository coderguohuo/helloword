var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectSeed_Item = (function (_super) {
    __extends(SelectSeed_Item, _super);
    function SelectSeed_Item() {
        var _this = _super.call(this) || this;
        _this.isClock = false;
        _this.skinName = "selectSeed_Item";
        _this.rec_up.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Touch, _this);
        _this.rec_down.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Down, _this);
        return _this;
    }
    SelectSeed_Item.prototype.createChildren = function () {
        console.log(1);
    };
    SelectSeed_Item.prototype.dataChanged = function () {
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
    SelectSeed_Item.prototype.Down = function () {
        if (this.isClock) {
            // 锁着状态,弹出种子 解锁页面
            Director.getInstance().pushScene(new Seed_XiangQIng(this.data, 1));
        }
        else {
            Director.getInstance().pushScene(new Seed_XiangQIng(this.data, 2));
        }
    };
    SelectSeed_Item.prototype.updateLandToGrow = function (seedData, tuDiBean, delay) {
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
    SelectSeed_Item.prototype.findEmptyLandAndPlant = function (seedData) {
        var game = Director.getInstance().gameLayer.getChildByName("game");
        var curSelectedLand = game.tudi_selected_pond;
        var willBean = null;
        if (curSelectedLand == 0) {
            for (var i = 0; i < game.TuDiBeans.length; ++i) {
                var bean = game.TuDiBeans[i];
                var data = bean.data;
                if (data.status == 1) {
                    willBean = bean;
                    break;
                }
            }
        }
        else {
            willBean = game.TuDiBeans[curSelectedLand - 1];
        }
        if (willBean) {
            this.updateLandToGrow(seedData, willBean, 200);
            FachUtils.Post("/plant/" + curSelectedLand, { id: seedData._id }, function (res) {
                if (res.status) {
                    game.tudi_selected_pond = 0;
                }
                else if (res.status == 1081) {
                    Director.getInstance().pushScene(new Seed_XiangQIng(seedData, 2));
                    PopoP.getTips(res.message);
                }
                else {
                    PopoP.getTips(res.message);
                }
            }, function (res) { }, false);
        }
        else {
            Director.getInstance().pushScene(new Seed_XiangQIng(seedData, 2));
            PopoP.getTips("无闲置土地了哦");
        }
    };
    SelectSeed_Item.prototype.Touch = function (e) {
        e.stopPropagation();
        var game = Director.getInstance().gameLayer.getChildByName("game");
        var context = this;
        var data = {
            id: this.data._id
        };
        if (this.isClock) {
            // 锁着状态,弹出种子 解锁页面
            Director.getInstance().pushScene(new Seed_XiangQIng(this.data, 1));
            return;
        }
        var self = this;
        var curSeedData = self.data;
        self.findEmptyLandAndPlant(curSeedData);
        // 注释 之前逻辑
        // FachUtils.Post("/plant/" + game.tudi_selected_pond, data, function (res) {
        // 	if (res.status) {
        // 		game.tudi_selected_pond = 0;
        // 		// game.remoSelectSeed();
        // 		Director.getInstance().getUser(true);
        // 	} else if (res.statusCode == 1081) {
        // 		// 无闲置土地 ,弹出种子收益详情
        // 		Director.getInstance().pushScene(new Seed_XiangQIng(context.data, 2));
        // 			PopoP.getTips(res.message);
        // 		//		game.remoSelectSeed();
        // 	} else {
        // 		PopoP.getTips(res.message);
        // 	}
        // }, function (res) {
        // });
    };
    return SelectSeed_Item;
}(eui.ItemRenderer));
__reflect(SelectSeed_Item.prototype, "SelectSeed_Item");
//# sourceMappingURL=SelectSeed_Item.js.map