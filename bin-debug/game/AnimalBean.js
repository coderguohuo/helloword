var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimalBean = (function (_super) {
    __extends(AnimalBean, _super);
    function AnimalBean(img) {
        var _this = _super.call(this) || this;
        _this.isChengShu = false;
        _this.skinName = "tudiBean";
        _this.tudi = img;
        _this.tudi.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.Touch, _this);
        _this.img_shouhuo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ShouHuo, _this);
        _this.img_yijian.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.yiJianShouHuo, _this);
        return _this;
        //this.initview();
    }
    AnimalBean.prototype.createChildren = function () {
        this.game = Director.getInstance().gameLayer.getChildByName("game");
        this.timer = new DateTimer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.Timer, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Removed, this);
        this.gif = new AnimalDragon();
        this.gif.name = "animal";
        this.gif.horizontalCenter = 0;
        this.gif.bottom = 10;
        this.group_1.addChildAt(this.gif, 0);
        this.group_1.scaleX = 0.7;
        this.group_1.scaleY = 0.7;
        var spMask = new egret.Shape();
        spMask.graphics.beginFill(0x000000);
        spMask.graphics.drawRect(0, 0, this.group.width, this.group.height);
        spMask.graphics.endFill();
        spMask.x = this.group.x;
        spMask.y = this.group.y;
        this.addChild(spMask);
        this.group.mask = spMask;
        //	this.tudi.parent.addChildAt(this, (this.tudi.parent.getChildIndex(this.tudi) + 12))
    };
    AnimalBean.prototype.Timer = function () {
        this.lab_daojishi.text = DataUtils.DaoJiShi(this.data.harvestTime);
        if (this.data.harvestTime < (new Date().getTime() - Director.getInstance().ShiJianCha)) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
            this.timer.stop();
            this.data.status = 3;
            if (!this.isChengShu) {
                this.init();
                this.game.AnimalYJSH();
            }
        }
    };
    AnimalBean.prototype.Touch = function (e) {
        e.stopPropagation();
        if (this.data.status == 0) {
            var str = "";
            switch (this.lockDate.cdtTpye) {
                case 1:
                    str = "此土地将于" + this.lockDate.personClass + "级解锁";
                    PopoP.getTips(str);
                    break;
                case 2:
                    str = "邀请" + this.lockDate.inviteCount + "个好友解锁土地";
                    Director.getInstance().pushScene(new FenXiang_Animal(this.data._id, this.lockDate.inviteCount));
                    break;
                case 3:
                    str = "花费" + this.lockDate.dimond + "颗钻石解锁土地";
                    var item = new VipJieSuo();
                    var vipdata = {
                        _id: this.data._id,
                        price: this.lockDate.dimond,
                        type: 2
                    };
                    item.setDate(vipdata);
                    Director.getInstance().pushScene(item);
                    break;
            }
        }
        else if (this.data.status == 1) {
            var game = Director.getInstance().gameLayer.getChildByName("game");
            // game.tudi_selected.x = this.tudi.x;
            // game.tudi_selected.y = this.tudi.y;
            // game.tudi_selected.visible = true;
            //game.group_game.addChildAt(game.tudi_selected, game.group_game.getChildIndex(this.tudi) + 1);
            game.animal_selected_pond = this.data.code;
            game.addSelectAnimal();
        }
    };
    AnimalBean.prototype.setDate = function (data) {
        this.data = data;
        this.init();
    };
    AnimalBean.prototype.setLockDate = function (data) {
        this.lockDate = data;
    };
    AnimalBean.prototype.init = function () {
        this.harvestDate = null;
        // 0 未解锁 1 解锁闲置 2 生长中 3 已成熟
        if (this.data.status == 0) {
            this.img_yijian.visible = false;
            this.img_shouhuo.visible = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
            this.removeImg();
            this.tudi.source = "tudianimal1_png";
        }
        else if (this.data.status == 1) {
            this.img_shouhuo.visible = false;
            this.img_yijian.visible = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
            this.removeImg();
            this.tudi.source = "tudianimal0_png";
            if (!this.tudi.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.tudi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
            }
        }
        else if (this.data.status == 2) {
            if (!this.tudi.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.tudi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
            }
            this.group.visible = true;
            this.x = this.tudi.x + this.tudi.width / 2 - this.width / 2;
            this.y = this.tudi.y + this.tudi.height - this.height - 20;
            //已植植物
            var sum = 0; //成熟的总总周期
            var startTime = this.data.plantTime;
            this.lab_daojishi.text = DataUtils.DaoJiShi(this.data.harvestTime);
            var gifstr = "";
            switch (this.data.animationId) {
                case 1000:
                    gifstr = "nainiu";
                    this.gif.scaleX = 1.1;
                    this.gif.scaleY = 1.1;
                    break;
                case 1001:
                    gifstr = "xiaoyang";
                    this.gif.scaleX = 1.1;
                    this.gif.scaleY = 1.1;
                    break;
                case 1002:
                    gifstr = "check2";
                    this.gif.scaleX = 1.6;
                    this.gif.scaleY = 1.6;
                    break;
                case 1003:
                    gifstr = "农场-小鸭";
                    this.gif.scaleX = 1.6;
                    this.gif.scaleY = 1.6;
                    break;
                case 1004:
                    gifstr = "白灰兔子小";
                    this.gif.scaleX = 1.3;
                    this.gif.scaleY = 1.3;
                    break;
                case 1005:
                    gifstr = "pig2";
                    this.gif.scaleX = 1.1;
                    this.gif.scaleY = 1.1;
                    break;
            }
            this.gif.setDate(gifstr);
            this.addEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
            this.timer.start();
            this.isChengShu = false;
        }
        else if (this.data.status == 3) {
            this.isChengShu = true;
            //该收获了
            if (!this.tudi.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this.tudi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
            }
            this.x = this.tudi.x + this.tudi.width / 2 - this.width / 2;
            this.y = this.tudi.y + this.tudi.height - this.height - 20;
            //已植植物
            var startTime = this.data.plantTime;
            this.lab_daojishi.text = DataUtils.DaoJiShi(this.data.harvestTime);
            var gifstr = "";
            switch (this.data.pltId) {
                case 1000:
                    gifstr = "奶牛";
                    this.gif.scaleX = 0.8;
                    this.gif.scaleY = 0.8;
                    break;
                case 1001:
                    gifstr = "山羊";
                    this.gif.scaleX = 0.9;
                    this.gif.scaleY = 0.9;
                    break;
                case 1002:
                    gifstr = "百花母鸡";
                    this.gif.scaleX = 1.1;
                    this.gif.scaleY = 1.1;
                    break;
                case 1003:
                    gifstr = "大白鸭";
                    this.gif.scaleX = 1.1;
                    this.gif.scaleY = 1.1;
                    break;
                case 1004:
                    gifstr = "白灰兔子";
                    this.gif.scaleX = 1.3;
                    this.gif.scaleY = 1.3;
                    break;
                case 1005:
                    gifstr = "pig";
                    this.gif.scaleX = 0.8;
                    this.gif.scaleY = 0.8;
                    break;
            }
            this.gif.setDate(gifstr);
            var context = this;
            context.img_shouhuo.visible = true;
            this.group.visible = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
            //	this.timer.stop();
            //	this.gif.chengShu();
            //成熟的植物放进game 集合
            var index = this.game.canShouHUoAnimal.indexOf(this.data);
            if (index == -1) {
                this.game.canShouHUoAnimal.push(this.data);
            }
        }
    };
    AnimalBean.prototype.Frame = function () {
        this.img_daojishi.width = ((new Date().getTime() - Director.getInstance().ShiJianCha) - this.data.plantTime) / (this.data.harvestTime - this.data.plantTime) * 200;
    };
    AnimalBean.prototype.ShouHuo = function () {
        // var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
        // if (game.canShouHUoAnimal.length > 1) {//多个动物成熟
        // 	this.yiJianShouHuo();
        // 	return;
        // }
        var cb = new CallBackFunc().handler(this.GuanJia, this, []);
        var item = new Tw_ShouHuo(this.data, this.img_shouhuo, 2);
        item.setCb(cb);
        Director.getInstance().pushSceneNoTw(item);
    };
    //如果管家已收获,刷新页面
    AnimalBean.prototype.GuanJia = function () {
        this.data.status = 1;
        this.init();
        this.game.TuDiYJSH();
    };
    AnimalBean.prototype.yiJianShouHuo = function () {
        var context = this;
        var game = Director.getInstance().gameLayer.getChildByName("game");
        var arr = [];
        for (var i = 0; i < game.canShouHUoAnimal.length; i++) {
            arr.push(game.canShouHUoAnimal[i]);
        }
        var cb = new CallBackFunc().handler(this.GuanJia, this, []);
        var item = new Tw_YiJianShouHuo(arr, this.img_yijian, 2);
        item.setCb(cb);
        Director.getInstance().pushSceneNoTw(item);
    };
    AnimalBean.prototype.removeImg = function () {
        var item = this.group_1.getChildByName("animal");
        if (item != null) {
            this.gif.setDate("");
        }
    };
    AnimalBean.prototype.Removed = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
    };
    return AnimalBean;
}(eui.Component));
__reflect(AnimalBean.prototype, "AnimalBean");
//# sourceMappingURL=AnimalBean.js.map