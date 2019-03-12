class JiShi extends eui.Component {
	private lab: eui.Label;
	public timer: DateTimer;
	private img: eui.Image;
	private sumTime;
	public status;//  0 未加工 1加工中 2已完成
	public constructor(sumTime?) {
		super();
		this.sumTime = sumTime;
		this.skinName = "jishi";

	}

	public createChildren() {
		this.timer = new DateTimer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.Timer, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Removed, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
	}

	private startTime;
	public setDate(sumtimer, status, startTime?) {
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
	}

	private Timer() {
		this.lab.text = "剩余时间:  " + DataUtils.DaoJiShi(this.sumTime);
		if (this.sumTime <= new Date().getTime() - Director.getInstance().ShiJianCha) {
			this.timer.stop();
			this.lab.text = "加工完成";
			var jiagong = <JiaGong>Director.getInstance().gameLayer.getChildByName("jiagong");
			jiagong.initDate();
			this.img.scaleY = 1;
			//	this.parent.removeChild(this);
		}
	}

	private Frame() {

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

		} else {
			this.img.width = 399;
			this.img.scaleY = 1;
		}

	}

	private Removed() {

		this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this)
		this.timer.stop();
	}


}