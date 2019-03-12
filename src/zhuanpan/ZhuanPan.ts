class ZhuanPan extends eui.Component {

	public lab_close: eui.Label;
	public rad0: eui.RadioButton;
	public btn_yes: eui.Image;
	public img_selsect: eui.Image;
	public lab_goldnum: eui.Label;
	public lab_quannum: eui.Label;
	public rec_gold: eui.Rect;
	public rec_quan: eui.Rect;

	public constructor() {
		super();
		this.skinName = "zhuanpan"
	}

	private rads: eui.RadioButton[] = [];
	private timer: egret.Timer;
	public createChildren() {
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
	}

	private init() {
	var context = this;
		if (ListBeans.getInstance().zhuanpan != null) {
			var res = ListBeans.getInstance().zhuanpan;
			context.initDate(res.resource);
			context.lab_goldnum.text = "x" + DataUtils.floot(res.ext.wheelFeeGold);
			context.lab_goldnum.text = "x" + DataUtils.floot(res.ext.wheelFeeCoupon);
		} else {
		
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

	}

	private data;//全部奖项
	private initDate(data) {
		this.data = data;
		for (var i = 0; i < data.length; i++) {
			var item = new ZhuanPan_Item();
			item.setDate(data[i]);
			item.x = this.rads[i].x;
			item.y = this.rads[i].y;
			this.addChild(item);
		}
	}
	private initView() {
		var index = this.getChildIndex(this.rad0);
		for (var i = 0; i < 10; i++) {
			this.rads.push(<eui.RadioButton>this.getChildAt(index + i))
		}
	}

	private type = 1;
	private Quan() {
		this.img_selsect.x = this.rec_quan.x;
		this.type = 2;


	}


	private Gold() {
		this.img_selsect.x = this.rec_gold.x;
		this.type = 1;

	}

	private Com() {
		console.log("Com");
		this.startindex = this.index;
		this.btn_yes.touchEnabled = true;
		var item = new ZhuanPan_Result()
		item.anchorOffsetX = item.width / 2;
		item.anchorOffsetY = item.height / 2;
		item.x = item.width / 2;
		item.y = item.height / 2;
		item.scaleX = 0.4;
		item.scaleY = 0.4
		egret.Tween.get(item).to({
			scaleX: 1,
			scaleY: 1
		}, 200);
		item.setDate(this.data[this.dataresult.select]);

		egret.setTimeout(function () {
			this.addChild(item);
		}, this, 500)

	}

	private remove() {
		console.log("stop");

		this.timer.stop();
	}

	private dataresult;//抽奖的结果
	private Yes() {
		TWUtils.TwCanTouch(this.btn_yes);
		if (this.timer.running) {
			PopoP.getTips("转盘转动中....");
			return;
		}
		var cotext = this;
		var data = {
			type: this.type
		}

		this.timer.reset();
		this.timer.repeatCount = 1000;
		FachUtils.Post("/wheelSet/lottery", data, function (res) {
			if (res.status) {
				cotext.timer.start();
				cotext.dataresult = res.resource;
				cotext.timer.repeatCount = cotext.timer.currentCount - cotext.timer.currentCount % 10 + 10 + res.resource.select + 1 + (10 - cotext.startindex);
			} else if (res.statusCode == 102) {
				//没有金币
				var item = new ZhuanPan_TiShi()
				item.setDate(cotext.type);
				Director.getInstance().pushScene(item)
			} else {
				PopoP.getTips(res.message)
			}
		}, function (res) {

		});

	}

	private isStop = false;
	private index = 0;
	private startindex = 0;
	private XuanZhuan() {
		console.log(this.index);
		this.rads[this.index].selected = true;
		this.index = this.index + 1;
		if (this.index == 10) {
			this.index = 0
		}


	}
	private Close() {
		if (this.timer.running) {
			PopoP.getTips("转盘转动中....");
			return;
		}
		Director.getInstance().removeSceneNoTw(this);
	}

}