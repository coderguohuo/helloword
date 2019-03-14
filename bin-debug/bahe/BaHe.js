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
var BaHe = (function (_super) {
    __extends(BaHe, _super);
    function BaHe(data) {
        var _this = _super.call(this) || this;
        _this.isHttp = false;
        _this.data = data;
        _this.skinName = "bahe";
        return _this;
    }
    BaHe.prototype.createChildren = function () {
        this.btn_yaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.YaoQing, this);
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
        this.item = new BaHeDragon();
        this.item.horizontalCenter = 0;
        this.item.bottom = 450;
        this.item.setDate("拔河比赛_1");
        this.addChild(this.item);
        this.timer = new DateTimer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.Timer, this);
        this.init();
    };
    BaHe.prototype.Timer = function () {
        this.lab_time.text = DataUtils.DaoJiShi(this.data.tuggingRecords.createTime + this.data.tugSetting.taskMinutes * 60 * 1000);
        if (this.lab_time.text == "00:00:00") {
            this.timer.stop();
            if (!this.isHttp) {
                this.isHttp = true;
                egret.setTimeout(function () {
                    this.getResult();
                }, this, 1500);
            }
        }
    };
    BaHe.prototype.getResult = function () {
        var context = this;
        FachUtils.Get2("/tug/eventStatus", function (res) {
            if (res.status) {
                if (res.resource.joinStatus == 2) {
                    //上次参加活动未领取奖品
                    context.playTw(res.resource);
                }
            }
        }, function (res) {
        });
    };
    /**
     * 播放动画
     */
    BaHe.prototype.playTw = function (data) {
        switch (data.tuggingRecords.winner) {
            case 0:
                this.item.PlayAni1();
                break;
            case 1:
                this.item.PlayAni4();
                break;
            case 2:
                this.item.PlayAni2();
                break;
        }
        var itembage = new BaHe_Result();
        itembage.setDate(data);
        egret.setTimeout(function () {
            Director.getInstance().pushSceneScal(itembage);
            Director.getInstance().removeSceneNoTw(this);
        }, this, 500);
    };
    BaHe.prototype.Remove = function () {
        this.timer.stop();
    };
    BaHe.prototype.setDate = function (data) {
        this.data = data;
    };
    BaHe.prototype.init = function () {
        for (var i = 0; i < this.data.tuggingRecords.myInvite; i++) {
            var img = new eui.Image();
            img.source = "icon1_png";
            this.group_me.addChild(img);
        }
        for (var i = 0; i < this.data.tuggingRecords.aiInvite; i++) {
            var img = new eui.Image();
            img.source = "icon1_png";
            this.group_other.addChild(img);
        }
        this.lab_time.text = DataUtils.DaoJiShi(this.data.tuggingRecords.createTime + this.data.tugSetting.taskMinutes * 60 * 1000);
        this.timer.start();
        var sum = this.data.tuggingRecords.myStrength + this.data.tuggingRecords.aiStrength;
        this.lab_jindu_my.text = this.data.tuggingRecords.myStrength;
        this.img_jindu_my.width = this.data.tuggingRecords.myStrength / sum * 250;
        this.lab_jindu_other.text = this.data.tuggingRecords.aiStrength;
        this.img_jindu_other.width = this.data.tuggingRecords.aiStrength / sum * 250;
    };
    BaHe.prototype.YaoQing = function () {
        Director.getInstance().pushScene(new FengXIang_BaHe());
    };
    BaHe.prototype.Close = function () {
        Director.getInstance().removeSceneNoTw(this);
    };
    return BaHe;
}(eui.Component));
__reflect(BaHe.prototype, "BaHe");
//# sourceMappingURL=BaHe.js.map