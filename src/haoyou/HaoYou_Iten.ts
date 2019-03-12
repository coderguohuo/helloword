class HaoYou_Iten extends eui.ItemRenderer {
	public img: eui.Image;
	public lab_name: eui.Label;
	public lab_userid: eui.Label;
	public group: eui.Group;
	public lab_jishi: eui.Label;
	public img_yong: eui.Image;
	public img_hongbao: eui.Image;
	public lab_note: eui.Label;
	private timer: DateTimer;
	public constructor() {
		super();
		this.skinName = "haoyou_item";

		this.timer = new DateTimer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.Timer, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Removed, this);
		this.img_hongbao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouQuHongBao, this);
		this.img_yong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchYongJin, this);
	}

	private TouchYongJin(e: egret.TouchEvent) {
		var point = <egret.Point>this.img_yong.localToGlobal(this.img_yong.x, this.img_yong.y)

		PopoP.getTips("佣金功能暂未开放");

	}
	public dataChanged() {

		if (this.data.avatar != null && this.data.avatar != "") {
			this.img.source = this.data.avatar;
		} else {
			this.img.source = "icon1_png";
		}

		this.lab_name.text = this.data.nickname;
		this.lab_userid.text = this.data.userid;
		if (this.data.commisonCanSteal) {
			this.img_yong.visible = true;
			this.img_yong.parent.setChildIndex(this.img_yong, 1);
		} else {
			this.img_yong.visible = false;
			this.img_yong.parent.setChildIndex(this.img_yong, 0);
		}

		if (this.data.nextHavest == 1) {
			if (this.data.nextHavestTime <= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
				this.lab_note.text = "";
				this.lab_jishi.text = "";
				this.img_hongbao.visible = true;
			} else {

				if (this.data.commisonCanSteal) {

				} else {

					this.lab_jishi.text = DataUtils.DaoJiShi(this.data.nextHavestTime);
					this.img_hongbao.visible = false;
					this.timer.start();
				}
			}

		} else {
			this.timer.stop();
			this.lab_note.text = "";
			this.lab_jishi.text = "";
			this.img_hongbao.visible = false;
		}
	}

	private Timer() {
		this.lab_jishi.text = DataUtils.DaoJiShi(this.data.nextHavestTime);
		if (this.data.nextHavestTime <= (new Date().getTime() - Director.getInstance().ShiJianCha)) {

			this.timer.stop();
			this.lab_note.text = "";
			this.lab_jishi.text = "";
			this.img_hongbao.visible = true;


		}
	}

	private TouQuHongBao(e: egret.TouchEvent) {
		var context = this;
		var data = {

		}
		FachUtils.Post("/plant/plt/steal/" + this.data._id, data, function (res) {
			if (res.status) {
				var sum = DataUtils.add(DataUtils.add(DataUtils.add(res.resource.ess, res.resource.experience), res.resource.gold), res.resource.hb);
				if (sum == 0) {
					PopoP.getTips("偷取失败,此用户已被偷光光了");
					context.img_hongbao.visible = false;
					return;
				}
				var item = new GameTitle(1, e, context.img_hongbao, res.resource, context.data);
				Director.getInstance().gameLayer.addChild(item)

			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {

		});
	}

	private Removed() {

		this.timer.stop();
	}
}