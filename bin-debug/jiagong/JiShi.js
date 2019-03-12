var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JiShi = (function (_super) {
    __extends(JiShi, _super);
    function JiShi(sumTime) {
        var _this = _super.call(this) || this;
        _this.sumTime = sumTime;
        _this.skinName = "jishi";
        return _this;
    }
    JiShi.prototype.createChildren = function () {
        this.timer = new DateTimer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.Timer, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Removed, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
    };
    JiShi.prototype.setDate = function (sumtimer, status, startTime) {
        this.status = status;
        switch (status) {
            case 0:
                this.timer.stop();
                this.lab.text = "加工需耗时:" + DataUtils.TimeToStr(sumtimer);
                break;
            case 1:
                this.startTime = startTime;
                this.sumTime = sumtimer;
                this.timer.start();
                this.lab.text = "剩余时间:  " + DataUtils.DaoJiShi(this.sumTime);
                break;
            case 2:
                this.timer.stop();
                this.lab.text = "加工完成";
                break;
        }
    };
    JiShi.prototype.Timer = function () {
        this.lab.text = "剩余时间:  " + DataUtils.DaoJiShi(this.sumTime);
        if (this.sumTime <= new Date().getTime() - Director.getInstance().ShiJianCha) {
            this.timer.stop();
            this.lab.text = "加工完成";
            var jiagong = Director.getInstance().gameLayer.getChildByName("jiagong");
            jiagong.initDate();
            this.img.scaleY = 1;
        }
    };
    JiShi.prototype.Frame = function () {
        if (this.status == 1) {
            this.img.width = ((this.sumTime - this.startTime) - (new Date().getTime() - Director.getInstance().ShiJianCha - this.startTime)) / (this.sumTime - this.startTime) * 399;
            if (this.img.width > 400) {
                this.img.width = 399;
            }
            if (this.img.width <= 20) {
                this.img.scaleY = 0.9;
            }
            if (this.img.width <= 10) {
                this.img.scaleY = 0.8;
            }
        }
        else {
            this.img.width = 399;
            this.img.scaleY = 1;
        }
    };
    JiShi.prototype.Removed = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
        this.timer.stop();
    };
    return JiShi;
}(eui.Component));
__reflect(JiShi.prototype, "JiShi");
//# sourceMappingURL=JiShi.js.map