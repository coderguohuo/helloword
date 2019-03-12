class BeiTou extends eui.Component {
	public lab_title: eui.Label;
	public lab_text: eui.Label;
	public lab_num: eui.Label;
	public img_close: eui.Image;
	public img_money: eui.Image;
	public img_icon: eui.Image;
	public img_yes: eui.Image;
	public labs: eui.Label;

	private data;
	public constructor(data) {
		super();
		this.data = data;
		this.skinName = "beitou"
	}


	public createChildren() {

		if (this.data.news.stealers.length > 1) {
			this.labs.text = "等"
		} else {
			this.labs.text = ""
		}

		if (this.data.news.stealers[0].avatar != null && this.data.news.stealers[0].avatar != "") {
			this.img_icon.source = this.data.news.stealers[0].avatar
		} else {
			this.img_icon.source = "icon1_png";
		}

		this.lab_text.text = this.data.news.stealers[0].username
		this.lab_num.text = DataUtils.floot(this.data.news.hb) + "元";

		this.img_yes.addEventListener("touchTap", this.Yes, this);
		this.img_close.addEventListener("touchTap", this.Close, this);
	}

	private Yes() {
		var context = this;
		var data = {
			ids: this.data.news.ttRecordIds
		}
		FachUtils.Post("/plant/steal/read", data, function (res) {
		//	PopoP.getTips(res.message)
			Director.getInstance().removeSceneNoTw(context);
		}, function (res) {

		});
	}

	private Close() {
		Director.getInstance().removeSceneNoTw(this);
	}
}