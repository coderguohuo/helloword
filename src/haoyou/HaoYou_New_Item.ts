class HaoYou_New_Item extends eui.ItemRenderer {

	public img: eui.Image;
	public lab_name: eui.Label;
	public lab_userid: eui.Label;
	public btn_yes: eui.Button;

	public constructor() {
		super();
		this.skinName = "haoyou_add_item"
	}
	public createChildren() {
		this.btn_yes.label = "同意添加";
		this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Add, this);
	}

	public dataChanged() {
		this.img.source = this.data.from_avatar;

		if (this.data.from_avatar != null && this.data.from_avatar != "") {
			this.img.source = this.data.from_avatar;
		} else {
			this.img.source = "icon1_png";
		}
		this.lab_name.text = this.data.from_nickname;
		this.lab_userid.text = this.data.from;
	}


	private Add() {
		var context = this;
		var data = {
			status: 1
			//0 拒绝
		}
		FachUtils.Post("/user/aplly/" + this.data._id, data, function (res) {
			if (res.status) {
				context.btn_yes.label = "已添加";
				var haoyou=<HaoYou>Director.getInstance().gameLayer.getChildByName("haoyou");
				haoyou.data=[];
				haoyou.init();
			}else{
				PopoP.getTips(res.message);
			}
		}, function (res) {

		});
	}
}