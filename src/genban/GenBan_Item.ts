class GenBan_Item extends eui.ItemRenderer {
	public img_icon: eui.Image;
	public img_youzhuren: eui.Image;
	public lab_name: eui.Label;
	public rec_yes: eui.Rect;

	public constructor() {
		super();
		this.skinName = "genban_item"
	}

	private genban: GenBan;
	private user;
	public createChildren() {
		this.rec_yes.addEventListener("touchTap", this.Touch, this);
		this.genban = <GenBan>Director.getInstance().gameLayer.getChildByName("genban");

	}

	public dataChanged() {
		this.lab_name.text = this.data.nickname;

		if (this.data.avatar != null && this.data.avatar != "") {
			this.img_icon.source = this.data.avatar;
		} else {
			this.img_icon.source = "icon1_png";
		}

		if (this.data.catchedStatus) {

		} else {
			this.img_youzhuren.visible = false;
			this.rec_yes.fillColor = 0x2FC332;
		}
	}

	private Touch() {

		if (this.data.catchedStatus) {
			//有主人

			if (this.data.master.username) {
				this.user = JSON.parse(egret.localStorage.getItem("user"));
				if (this.user.username == this.data.master.username) {
					PopoP.getTips("他已经是您的跟班了,请换一个人抓捕");
					return;
				}
			}
			Director.getInstance().pushSceneNoTw(new QingGenBan(this.data))
			return;
		}


		var context = this;
		var data = {
			user_id: this.data._id,
			work_id: this.genban._id
		}
		FachUtils.Post("/cathSlave/cath", data, function (res) {

			if (res.status) {
				Director.getInstance().popScene();
				Director.getInstance().pushScene(new DaDou(res, context.data));
			} else {
				PopoP.getTips(res.message)
			}
		}, function (res) {

		});




	}

}