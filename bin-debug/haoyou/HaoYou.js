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
var HaoYou = (function (_super) {
    __extends(HaoYou, _super);
    function HaoYou() {
        var _this = _super.call(this) || this;
        _this.sum = 0;
        _this.yeshu = 1;
        _this.data = [];
        _this.skinName = "haoyou";
        return _this;
    }
    HaoYou.prototype.createChildren = function () {
        this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
        this.rec_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchAdd, this);
        this.rec_new.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchNew, this);
        this.rec_wechat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchWechat, this);
        this.rec_add.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.change, this);
        this.rec_new.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.change, this);
        this.rec_wechat.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.change, this);
        this.addEventListener(egret.Event.REMOVED, this.Remove, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
        this.lab_more.addEventListener(egret.TouchEvent.TOUCH_TAP, this.More, this);
        var game = Director.getInstance().gameLayer.getChildByName("game");
        this.rec_haoyou.visible = game.rec_haoyou.visible;
        this.init();
    };
    HaoYou.prototype.Remove = function (e) {
    };
    HaoYou.prototype.init = function () {
        var context = this;
        FachUtils.Get("/user/friends/" + this.yeshu + "/30", function (res) {
            if (res.status) {
                context.data = context.data.concat(res.resource);
                context.list.dataProvider = new eui.ArrayCollection(context.data);
                context.list.itemRenderer = HaoYou_Iten;
                context.group.validateNow();
                context.sum = res.sum;
            }
            else {
                PopoP.getTips(res.message);
            }
        }, function (res) {
        });
    };
    HaoYou.prototype.More = function () {
        if (this.data.length >= this.sum) {
            PopoP.getTips("暂无更多数据");
            this.lab_more.parent.removeChild(this.lab_more);
            return;
        }
        this.yeshu++;
        this.init();
    };
    HaoYou.prototype.TouchAdd = function (e) {
        Director.getInstance().pushScene(new HaoYou_Add());
    };
    HaoYou.prototype.TouchNew = function (e) {
        this.rec_haoyou.visible = false;
        Director.getInstance().pushScene(new HaoYou_New());
    };
    HaoYou.prototype.TouchWechat = function (e) {
        JsToApp(this);
        // switch (egret.Capabilities.os) {
        // 	case "iOS":
        // 		console.log("iOS");
        // 		break;
        // 	case "Android":
        // 		console.log("Android");
        // 		var data = {
        // 			"title": "标题内容",
        // 			"thumb": "http://domain/in/image.jpg",
        // 			"description": "描述文本",
        // 			"scene": "game01",
        // 			"webUrl": "/login.html",
        // 			"cb": "JSCallbackFunctionName"
        // 		}
        // 		var json = JSON.stringify(data);
        // 		JMMALL.shareLink({
        // 			"title": "标题内容",
        // 			"thumb": "https://www.baidu.com/img/bd_logo1.png?where=super",
        // 			"description": "描述文本",
        // 			"scene": "game01",
        // 			"webUrl": "/login.html",
        // 			"cb": "JSCallbackFunctionName"
        // 		});
        // 		break;
        // 	default:
        // 		PopoP.getTips("未识别手机系统");
        // 		break;
        // }
    };
    HaoYou.prototype.CallBack = function () {
        console.log("回调成功");
    };
    HaoYou.prototype.change = function (e) {
        var rec = e.target;
        rec.fillColor = 0xA1D8EB;
        egret.setTimeout(function () {
            rec.fillColor = 0xffffff;
        }, this, 100);
    };
    HaoYou.prototype.Close = function () {
        Director.getInstance().removeScene(this);
    };
    return HaoYou;
}(eui.Component));
__reflect(HaoYou.prototype, "HaoYou");
//# sourceMappingURL=HaoYou.js.map