class HaoYou_TiShi extends eui.Component {
	public lab_title: eui.Label;
	public lab_text: eui.Label;
	public lab_num: eui.Label;
	public img_close: eui.Image;
	public img_money: eui.Image;
	public img_icon: eui.Image;
	public img_yes: eui.Image;

	private type;
	private data;
	private hbdata;
	public constructor(type, data, hbdata) {
		super();
		this.type = type;
		this.data = data;
		this.hbdata = hbdata;
		this.skinName = "haoyou_tishi"
	}

	public createChildren() {

		this.img_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
		if (this.type == 1) {
			//红包
			this.lab_title.text = "你抢到好友的红包";
			this.img_money.source = "hongbao2_png"

		} else {
			//佣金

			this.lab_title.text = "你抢到好友的佣金";
			this.img_money.source = "hy_yongjin_png";

		}
		this.lab_num.text = DataUtils.floot(this.hbdata.hb) + "元";
		this.lab_text.text = this.data.nickname;
	}

	private Yes() {
		//	Director.getInstance().getUser();
		this.parent.removeChild(this);
		// Director.getInstance().removeScene(this);

	}
}