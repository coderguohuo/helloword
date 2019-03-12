class GeRen_ShengJi extends eui.Component {

	public img_icon: eui.Image;
	public lab_name: eui.Label;
	public rec_jingyan: eui.Rect;
	public lab_jingyan: eui.Label;
	public lab_lv: eui.Label;
	public lab_shengming: eui.Label;
	public lab_qizhi: eui.Label;
	public lab_baoji: eui.Label;
	public lab_gold: eui.Label;
	public img_shengji: eui.Image;
	private lab_close: eui.Label;

	public constructor() {
		super();
		this.skinName = "geren_shengji"
	}
	private user;
	public createChildren() {

		this.img_shengji.addEventListener("touchTap", this.ShengJi, this);
		this.lab_close.addEventListener("touchTap", this.Close, this);
		this.addEventListener(GameEvent.getUserInfo, this.init, this);
		this.init();

	}

	private init() {
		var context = this;
		FachUtils.Get("/user/ability", function (res) {
			if (res.status) {
				context.lab_shengming.text = DataUtils.floot(res.resource.hp);
				context.lab_qizhi.text = DataUtils.floot(res.resource.vitality);
				context.lab_baoji.text = DataUtils.floot(DataUtils.mul(100, res.resource.crit_rate)) + "%";
				context.lab_gold.text = DataUtils.floot(res.resource.upGradeGold);

			}

		}, function (res) {

		});


		this.user = JSON.parse(egret.localStorage.getItem("user"));
		this.lab_lv.text = this.user.class;
		this.lab_jingyan.text = (parseInt(this.user.experience) - (parseInt(this.user.nextExe) - this.user.needExe)) + "/" + (parseInt(this.user.nextExe) - (parseInt(this.user.nextExe) - this.user.needExe));
		this.lab_name.text = this.user.nickname;

		if (this.user.avatar != null && this.user.avatar != "") {
			this.img_icon.source = this.user.avatar;
		} else {
			this.img_icon.source = "icon1_png";
		}



		//经验条
		var str = DataUtils.sub(this.user.nextExe, this.user.needExe);
		var scale = DataUtils.div((this.user.experience - str), this.user.needExe)
		if (scale <= 0) {
			scale = 0
		} else if (scale >= 1) {
			scale = 1;
		}
		if (this.user.needExe <= 0) {
			scale = 1;
		}
		this.rec_jingyan.width = scale * 400 + 20;
	}
	private Close() {
		Director.getInstance().removeSceneNoTw(this);
	}

	private ShengJi() {
		var context = this;
		FachUtils.Get("/user/upgrade", function (res) {
			if (res.status) {
				Director.getInstance().getUser(true);

				var item = new ShengJi_CG(res.resource);
				context.addChild(item);
				PopoP.getTips(res.message);
			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {

		});
	}
}