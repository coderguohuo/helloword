class QiangDao extends eui.Component {
	public rec_qiang: eui.Rect;
	public rec_zhua: eui.Rect;
	public lab_title: eui.Label;
	public lab_name: eui.Label;
	public img_close: eui.Image;
	public img_icon: eui.Image;

	public constructor() {
		super();
		this.skinName = "qiangdao"
	}

	public createChildren() {
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.QiangHuiLai, this);

		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ZhuaGenBan, this);

	}

	public data;
	public setDate(data) {
		this.data = data;
		this.init();
	}

	public cb: CallBackFunc;
	public setCb(cb) {
		this.cb = cb;
	}

	private init() {


		if (this.data.other.avatar != null && this.data.other.avatar != "") {
			this.img_icon.source = this.data.avatar;

		} else {
			this.img_icon.source = "icon1_png";
		}
		this.lab_name.text = this.data.other.nickname;
	}

	private QiangHuiLai() {

		this.Yes();


		if (this.cb != null) {
			this.cb.back();
		}
	}

	private Yes() {
		var context = this;
		var data = {
			user_id: this.data._id,
			work_id: this.data.work_id
		}
		FachUtils.Post("/cathSlave/cath", data, function (res) {

			if (res.status) {
				Director.getInstance().pushScene(new DaDou(res, context.data));
			} else {
				PopoP.getTips(res.message);
			}

			Director.getInstance().removeScene(context);
		}, function (res) {

		});
	}


	private ZhuaGenBan() {
		Director.getInstance().pushScene(new GenBan());
		Director.getInstance().removeScene(this);
		if (this.cb != null) {
			this.cb.back();
		}
	}

	private Close() {

		Director.getInstance().removeScene(this);
	}
}