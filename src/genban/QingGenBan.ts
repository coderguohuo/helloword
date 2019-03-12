class QingGenBan extends eui.Component {
	public lab_title: eui.Label;
	public lab_name: eui.Label;
	public img_close: eui.Image;
	public img_icon: eui.Image;
	public img_yes: eui.Image;

	private data;
	public constructor(data) {
		super();
		this.data = data;
		this.skinName = "qianggenban"
	}

	public createChildren() {
		this.img_close.addEventListener("touchTap", this.Close, this);
		this.img_yes.addEventListener("touchTap", this.Yes, this);
		this.init();

	}

	private init() {
		this.lab_name.text = this.data.master.nickname;
		if (this.data.master.avatar != null && this.data.master.avatar != "") {
			this.img_icon.source = this.data.avatar;
		} else {
			this.img_icon.source = "icon1_png";
		}
	}

	private Close() {
		Director.getInstance().removeScene(this);
	}

	private Yes() {
		var context = this;
		var data = {
			user_id: this.data._id,
			work_id:  this.data.work_id
		}
		FachUtils.Post("/cathSlave/cath", data, function (res) {

			if (res.status) {
				Director.getInstance().pushScene(new DaDou(res, context.data));
			}else {
				PopoP.getTips(res.message);
			}

			Director.getInstance().removeScene(context);
		}, function (res) {

		});
	}
}