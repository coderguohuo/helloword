class VipJieSuo extends eui.Component {
	public lab_close: eui.Label;
	public img_jiesuo: eui.Image;
	public lab_num: eui.Label;

	public constructor() {
		super();
		this.skinName = "vipjiesuo"
	}

	public createChildren() {
		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);

		this.img_jiesuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.JieSuo, this);
	}


	private JieSuo() {
		var context = this;

		var url;
		if (this.data.type == 1) {
			url = "/plant/land/dimond/";
		} else {
			url = "/animal/land/dimond/";
		}
		FachUtils.Get(url + this.data._id, function (res) {
			if (res.status) {
				Director.getInstance().getUser(true);
				Director.getInstance().removeSceneNoTw(context);
			}
			PopoP.getTips(res.message);
		}, function (res) {

		});

	}
	private data;
	public setDate(data) {
		this.data = data;
		this.lab_num.text = this.data.price
	}

	private Close() {
		Director.getInstance().removeSceneNoTw(this);
	}
}