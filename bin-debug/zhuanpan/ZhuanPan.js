var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ZhuanPan = (function (_super) {
    __extends(ZhuanPan, _super);
    function ZhuanPan() {
        var _this = _super.call(this) || this;
        _this.rads = [];
        _this.type = 1;
        _this.isStop = false;
        _this.index = 0;
        _this.startindex = 0;
        _this.skinName = "zhuanpan";
        return _this;
    }
    ZhuanPan.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
        this.rec_gold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Gold, this);
        this.rec_quan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Quan, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
        this.initView();
        this.timer = new egret.Timer(100, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.XuanZhuan, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.Com, this);
        this.init();
    };
    ZhuanPan.prototype.init = function () {
        var context = this;
        if (ListBeans.getInstance().zhuanpan != null) {
            var res = ListBeans.getInstance().zhuanpan;
            context.initDate(res.resource);
            context.lab_goldnum.text = "x" + DataUtils.floot(res.ext.wheelFeeGold);
            context.lab_goldnum.text = "x" + DataUtils.floot(res.ext.wheelFeeCoupon);
        }
        else {
            FachUtils.Get("/wheelSet/wheels", function (res) {
                if (res.status) {
                    context.initDate(res.resource);
                    ListBeans.getInstance().zhuanpan = res;
                    context.lab_goldnum.text = "x" + DataUtils.floot(res.ext.wheelFeeGold);
                    context.lab_goldnum.text = "x" + DataUtils.floot(res.ext.wheelFeeCoupon);
                }
            }, function (res) {
            });
        }
    };
    ZhuanPan.prototype.initDate = function (data) {
        this.data = data;
        for (var i = 0; i < data.length; i++) {
            var item = new ZhuanPan_Item();
            item.setDate(data[i]);
            item.x = this.rads[i].x;
            item.y = this.rads[i].y;
            this.addChild(item);
        }
    };
    ZhuanPan.prototype.initView = function () {
        var index = this.getChildIndex(this.rad0);
        for (var i = 0; i < 10; i++) {
            this.rads.push(this.getChildAt(index + i));
        }
    };
    ZhuanPan.prototype.Quan = function () {
        this.img_selsect.x = this.rec_quan.x;
        this.type = 2;
    };
    ZhuanPan.prototype.Gold = function () {
        this.img_selsect.x = this.rec_gold.x;
        this.type = 1;
    };
    ZhuanPan.prototype.Com = function () {
        console.log("Com");
        this.startindex = this.index;
        this.btn_yes.touchEnabled = true;
        var item = new ZhuanPan_Result();
        item.anchorOffsetX = item.width / 2;
        item.anchorOffsetY = item.height / 2;
        item.x = item.width / 2;
        item.y = item.height / 2;
        item.scaleX = 0.4;
        item.scaleY = 0.4;
        egret.Tween.get(item).to({
            scaleX: 1,
            scaleY: 1
        }, 200);
        item.setDate(this.data[this.dataresult.select]);
        egret.setTimeout(function () {
            this.addChild(item);
        }, this, 500);
    };
    ZhuanPan.prototype.remove = function () {
        console.log("stop");
        this.timer.stop();
    };
    ZhuanPan.prototype.Yes = function () {
        TWUtils.TwCanTouch(this.btn_yes);
        if (this.timer.running) {
            PopoP.getTips("转盘转动中....");
            return;
        }
        var cotext = this;
        var data = {
            type: this.type
        };
        this.timer.reset();
        this.timer.repeatCount = 1000;
        FachUtils.Post("/wheelSet/lottery", data, function (res) {
            if (res.status) {
                cotext.timer.start();
                cotext.dataresult = res.resource;
                cotext.timer.repeatCount = cotext.timer.currentCount - cotext.timer.currentCount % 10 + 10 + res.resource.select + 1 + (10 - cotext.startindex);
            }
            else if (res.statusCode == 102) {
                //没有金币
                var item = new ZhuanPan_TiShi();
                item.setDate(cotext.type);
                Director.getInstance().pushScene(item);
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    ZhuanPan.prototype.XuanZhuan = function () {
        console.log(this.index);
        this.rads[this.index].selected = true;
        this.index = this.index + 1;
        if (this.index == 10) {
            this.index = 0;
        }
    };
    ZhuanPan.prototype.Close = function () {
        if (this.timer.running) {
            PopoP.getTips("转盘转动中....");
            return;
        }
        Director.getInstance().removeSceneNoTw(this);
    };
    return ZhuanPan;
}(eui.Component));
__reflect(ZhuanPan.prototype, "ZhuanPan");
//# sourceMappingURL=ZhuanPan.js.map