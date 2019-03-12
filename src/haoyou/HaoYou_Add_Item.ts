class HaoYou_Add_Item extends eui.ItemRenderer {

	public img: eui.Image;
	public lab_name: eui.Label;
	public lab_userid: eui.Label;
	public btn_yes: eui.Button;

	public constructor() {
		super();
		this.skinName = "haoyou_add_item"
	}
	public createChildren() {
		this.btn_yes.label = "添加好友";
		this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Add, this);
	}

	public dataChanged() {

		if (this.data.avatar != null && this.data.avatar != "") {
			this.img.source = this.data.avatar;
		} else {
			this.img.source = "icon1_png";
		}

		this.lab_name.text = this.data.nickname;
		this.lab_userid.text = this.data.userid;

	}


	private Add() {

		var context = this;
		FachUtils.Post("/user/friend/" + this.data.userid, {}, function (res) {
			if (res.status) {
				PopoP.getTips(res.message);
				context.btn_yes.label = "已发送";
			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {

		});

	}
}