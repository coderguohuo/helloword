class BaHe extends eui.Component {
	public lab_close: eui.Label;
	public btn_yaoqing: eui.Image;
	public group_other: eui.Group;
	public group_me: eui.Group;
	public lab_time: eui.Label;
	public img_jindu_my: eui.Image;
	public img_jindu_other: eui.Image;
	public lab_jindu_other: eui.Label;
	public lab_jindu_my: eui.Label;

	private item: BaHeDragon;
	public constructor(data) {
		super();
		this.data = data;
		this.skinName = "bahe";
	}
	private timer: DateTimer;
	public createChildren() {
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
	}

	private isHttp = false;
	private Timer() {
		this.lab_time.text = DataUtils.DaoJiShi(this.data.tuggingRecords.createTime + this.data.tugSetting.taskMinutes * 60 * 1000);

		if (this.lab_time.text == "00:00:00") {
		 
			this.timer.stop();

			if (!this.isHttp) {
				this.isHttp = true;
				egret.setTimeout(function () {
					this.getResult();
				}, this, 1500)
			}

		}
	}

	private getResult() {
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

	}

	/**
	 * 播放动画
	 */
	public playTw(data) {

		switch (data.tuggingRecords.winner) {//1 机器人赢 2 我赢 0 平手
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

		var itembage = new BaHe_Result()
		itembage.setDate(data);
		egret.setTimeout(function () {
			Director.getInstance().pushSceneScal(itembage);
			Director.getInstance().removeSceneNoTw(this);
		}, this, 500);

	}









	private Remove() {
		this.timer.stop();
	}
	private data;
	public setDate(data) {
		this.data = data;

	}

	public init() {
		for (var i = 0; i < this.data.tuggingRecords.myInvite; i++) {
			var img = new eui.Image();
			img.source = "icon1_png"
			this.group_me.addChild(img);
		}

		for (var i = 0; i < this.data.tuggingRecords.aiInvite; i++) {
			var img = new eui.Image();
			img.source = "icon1_png"
			this.group_other.addChild(img);
		}

		this.lab_time.text = DataUtils.DaoJiShi(this.data.tuggingRecords.createTime + this.data.tugSetting.taskMinutes * 60 * 1000);
		this.timer.start();


		var sum = this.data.tuggingRecords.myStrength + this.data.tuggingRecords.aiStrength;
		this.lab_jindu_my.text = this.data.tuggingRecords.myStrength;
		this.img_jindu_my.width = this.data.tuggingRecords.myStrength / sum * 250;

		this.lab_jindu_other.text = this.data.tuggingRecords.aiStrength;
		this.img_jindu_other.width = this.data.tuggingRecords.aiStrength / sum * 250;

	}


	private YaoQing() {

		Director.getInstance().pushScene(new FengXIang_BaHe());
	}

	private Close() {
		Director.getInstance().removeSceneNoTw(this);
	}
}