 
declare function JsToApp(scene);
class HaoYou extends eui.Component {
	public lab_close: eui.Label;
	public rec_add: eui.Rect;
	public rec_new: eui.Rect;
	public rec_wechat: eui.Rect;
	public group: eui.Group;
	public list: eui.List;
	public lab_more: eui.Label;

	public rec_haoyou: eui.Rect;
	private sum = 0;
	private yeshu = 1;
	public data = [];
	public constructor() {
		super();
		this.skinName = "haoyou";
	}

	public createChildren() {
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

		var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		this.rec_haoyou.visible = game.rec_haoyou.visible;
		this.init();
	}

	private Remove(e: egret.Event) {


	}

	public init() {

		var context = this;
		FachUtils.Get("/user/friends/" + this.yeshu + "/30", function (res) {
			if (res.status) {
				context.data = context.data.concat(res.resource);
				context.list.dataProvider = new eui.ArrayCollection(context.data);
				context.list.itemRenderer = HaoYou_Iten;
				context.group.validateNow();
				context.sum = res.sum;
			} else {
				PopoP.getTips(res.message);
			}

		}, function (res) {

		});

	}

	private More() {

		if (this.data.length >= this.sum) {
			PopoP.getTips("暂无更多数据");

			this.lab_more.parent.removeChild(this.lab_more);
			return;
		}
		this.yeshu++;
		this.init();
	}

	private TouchAdd(e: egret.TouchEvent) {

		Director.getInstance().pushScene(new HaoYou_Add());
	}

	private TouchNew(e: egret.TouchEvent) {
		this.rec_haoyou.visible = false;
		Director.getInstance().pushScene(new HaoYou_New());
	}

	private TouchWechat(e: egret.TouchEvent) {
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
	}


	public CallBack() {
		console.log("回调成功");

	}
	private change(e: egret.TouchEvent) {
		var rec = e.target;
		rec.fillColor = 0xA1D8EB;
		egret.setTimeout(function () {
			rec.fillColor = 0xffffff;
		}, this, 100);
	}


	private Close() {
		Director.getInstance().removeScene(this);
	}
}