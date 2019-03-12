var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameTitle = (function (_super) {
    __extends(GameTitle, _super);
    function GameTitle(type, e, img, hbdata, haoyoudata) {
        var _this = _super.call(this) || this;
        _this.haoyoudata = haoyoudata;
        _this.type = type;
        _this.touchx = e.stageX;
        _this.touchy = e.stageY;
        _this.img = img;
        _this.hbdata = hbdata;
        _this.skinName = "game_title";
        return _this;
    }
    GameTitle.prototype.createChildren = function () {
        this.y = -200;
        egret.Tween.get(this).to({
            y: 0
        }, 500).call(function () {
            this.Fly();
        }, this);
        this.initUser();
    };
    GameTitle.prototype.Remove = function () {
        var context = this;
        egret.Tween.get(this).to({
            y: -200
        }, 500).call(function () {
            context.parent.removeChild(this);
        }, this);
    };
    GameTitle.prototype.Fly = function () {
        var timer = new egret.Timer(100, 6);
        timer.addEventListener(egret.TimerEvent.TIMER, this.JingHuaFly.bind(this, this.hbdata), this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.Complete, this);
        timer.start();
        this.HongBaoFly(this.hbdata);
    };
    GameTitle.prototype.Complete = function () {
        this.img.visible = false;
        Director.getInstance().gameLayer.addChild(new HaoYou_TiShi(this.type, this.haoyoudata, this.hbdata));
    };
    GameTitle.prototype.initUser = function () {
        this.user = JSON.parse(egret.localStorage.getItem("user"));
        this.lab_gold.text = DataUtils.floot(this.user.gold);
        this.lab_hongbao.text = DataUtils.floot(this.user.hb);
        this.lab_nengLiang.text = DataUtils.floot(this.user.plt_sessence);
        if (this.user.avatar != null && this.user.avatar != "") {
            this.img_icon.source = this.user.avatar;
        }
        else {
            this.img_icon.source = "icon1_png";
        }
        this.rec_tili.width = this.user.power / 100 * 90; //体力
        this.lab_lv.text = this.user.class; //等级
        if (this.user.appLevel.levelName == "会员") {
            this.img_lv.source = "chenghao0_png";
        }
        else if (this.user.appLevel.levelName == "白银店主") {
            this.img_lv.source = "chenghao1_png";
        }
        else if (this.user.appLevel.levelName == "黄金店主") {
            this.img_lv.source = "chenghao2_png";
        }
        else if (this.user.appLevel.levelName == "销售经理") {
            this.img_lv.source = "chenghao4_png";
        }
        else {
            this.img_lv.source = "";
        }
    };
    GameTitle.prototype.JingHuaFly = function (data, event) {
        var context = this;
        var sum = event.currentTarget.repeatCount;
        var currentCount = event.currentTarget.currentCount;
        if (currentCount <= 3) {
            this.GoldFly(data, currentCount);
        }
        var goldImg = new egret.Bitmap(RES.getRes("nengliang_png"));
        goldImg.width = 60;
        goldImg.height = 60;
        goldImg.anchorOffsetX = goldImg.width / 2;
        goldImg.anchorOffsetY = goldImg.height / 2;
        var randomNum = Math.round((Math.random() * 20 + 1)); //随机增减xy值（使得金币看起来是散乱的）
        var randomFlag = Math.round((Math.random() * 4 + 1)); //四个标记
        var randomR = Math.round((Math.random() * 180));
        goldImg.rotation = randomR;
        this.addChildAt(goldImg, this.getChildIndex(this.top_nengliang) - 1); //游戏层添加金币（自己决定）
        goldImg.x = this.touchx - goldImg.width / 2;
        goldImg.y = this.touchy - goldImg.height / 2;
        var onComplete2 = function () {
            if (this.contains(goldImg)) {
                this.removeChild(goldImg); //清空金币
                goldImg = null;
            }
        };
        var onComplete1 = function () {
            this.lab_nengLiang.text = DataUtils.floot(Number(this.lab_nengLiang.text) + data.ess / sum) + "";
            egret.Tween.get(this.top_nengliang).to({
                scaleX: 1.1,
                scaleY: 1.1
            }, 200).call(function () {
                this.top_nengliang.scaleX = 1;
                this.top_nengliang.scaleY = 1;
            }, this);
            egret.Tween.get(goldImg).to({ alpha: 0 }, 200).call(onComplete2, this); //隐藏金币
            if (sum == currentCount) {
                Director.getInstance().getUser(true);
                context.Remove();
            }
        };
        goldImg.visible = true;
        var goldX = this.top_nengliang.x + this.top_nengliang.width / 2;
        var goldY = this.top_nengliang.y + this.top_nengliang.height / 2;
        SoundsMgr.removeCell(currentCount);
        egret.Tween.get(goldImg).to({ x: goldX, y: goldY, alpha: 1 }, 800, egret.Ease.sineOut).call(onComplete1, this);
    };
    GameTitle.prototype.GoldFly = function (data, num) {
        var goldImg = new egret.Bitmap(RES.getRes("gold2_png"));
        goldImg.anchorOffsetX = goldImg.width / 2;
        goldImg.anchorOffsetY = goldImg.height / 2;
        var randomNum = Math.round((Math.random() * 20 + 1)); //随机增减xy值（使得金币看起来是散乱的）
        var randomFlag = Math.round((Math.random() * 4 + 1)); //四个标记
        var randomR = Math.round((Math.random() * 180));
        goldImg.rotation = randomR;
        this.addChildAt(goldImg, this.getChildIndex(this.top_gold) - 1); //游戏层添加金币（自己决定）
        goldImg.x = this.touchx - goldImg.width / 2;
        goldImg.y = this.touchy - goldImg.height / 2;
        var onComplete2 = function () {
            if (this.contains(goldImg)) {
                this.removeChild(goldImg); //清空金币
                goldImg = null;
            }
        };
        var onComplete1 = function () {
            this.lab_gold.text = DataUtils.floot(Number(this.lab_gold.text) + data.gold / 3) + "";
            egret.Tween.get(this.top_gold).to({
                scaleX: 1.1,
                scaleY: 1.1
            }, 200).call(function () {
                this.top_gold.scaleX = 1;
                this.top_gold.scaleY = 1;
            }, this);
            egret.Tween.get(goldImg).to({ alpha: 0 }, 200).call(onComplete2, this); //隐藏金币
        };
        goldImg.visible = true;
        var goldX = this.top_gold.x + this.top_gold.width / 2;
        var goldY = this.top_gold.y + this.top_gold.height / 2;
        egret.Tween.get(goldImg).to({ x: goldX, y: goldY, alpha: 1 }, 800, egret.Ease.sineOut).call(onComplete1, this);
    };
    GameTitle.prototype.HongBaoFly = function (data) {
        var goldImg = new egret.Bitmap(RES.getRes("hongbao2_png"));
        goldImg.width = 60;
        goldImg.height = 65;
        goldImg.anchorOffsetX = goldImg.width / 2;
        goldImg.anchorOffsetY = goldImg.height / 2;
        var randomNum = Math.round((Math.random() * 20 + 1)); //随机增减xy值（使得金币看起来是散乱的）
        var randomFlag = Math.round((Math.random() * 4 + 1)); //四个标记
        var randomR = Math.round((Math.random() * 180));
        goldImg.rotation = randomR;
        this.addChildAt(goldImg, this.getChildIndex(this.top_hongbao) - 1); //游戏层添加金币（自己决定）
        goldImg.x = this.touchx - goldImg.width / 2;
        goldImg.y = this.touchy - goldImg.height / 2;
        var onComplete2 = function () {
            if (this.contains(goldImg)) {
                this.removeChild(goldImg); //清空金币
                goldImg = null;
            }
        };
        var onComplete1 = function () {
            this.lab_hongbao.text = DataUtils.floot(Number(this.lab_hongbao.text) + data.hb) + "";
            egret.Tween.get(this.top_hongbao).to({
                scaleX: 1.1,
                scaleY: 1.1
            }, 200).call(function () {
                this.top_hongbao.scaleX = 1;
                this.top_hongbao.scaleY = 1;
            }, this);
            egret.Tween.get(goldImg).to({ alpha: 0 }, 200).call(onComplete2, this); //隐藏金币
        };
        goldImg.visible = true;
        var goldX = this.top_hongbao.x + this.top_hongbao.width / 2;
        var goldY = this.top_hongbao.y + this.top_hongbao.height / 2;
        egret.Tween.get(goldImg).to({ x: goldX, y: goldY, alpha: 1 }, 800, egret.Ease.sineOut).call(onComplete1, this);
    };
    return GameTitle;
}(eui.Component));
__reflect(GameTitle.prototype, "GameTitle");
//# sourceMappingURL=GameTitle.js.map