class KuaiDi extends eui.Component {
	public img: eui.Image;
	public img_close: eui.Image;
	public lab_name: eui.Label;
	public lab_num: eui.Label;
	public ed_name: eui.EditableText;
	public ed_pohone: eui.EditableText;
	public ed_num: eui.EditableText;
	public ed_sheng: eui.EditableText;
	public ed_shi: eui.EditableText;
	public ed_qu: eui.EditableText;
	public ed_zhen: eui.EditableText;
	public ed_jie: eui.EditableText;
	public btn_yes: eui.Image;

	private data;
	public constructor(data) {
		super();
		this.data = data;
		this.skinName = "kuaidi";
	}

	private user;
	public createChildren() {
		this.lab_num.text = "x " + this.data.count;
		this.img.source = Fach.host + this.data.img;
		this.lab_name.text = this.data.name;
		this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.user = JSON.parse(egret.localStorage.getItem("user"));
		if (this.user.addressed == 1) {
			this.ed_name.text = this.user.name;
			this.ed_pohone.text = this.user.phone;

			var arr = this.user.address.split(":");

			this.ed_sheng.text = arr[0];
			this.ed_shi.text = arr[1];
			this.ed_qu.text = arr[2];
			this.ed_zhen.text = arr[3];
			this.ed_jie.text = arr[4];

		}
	}

	private Close() {
		SoundsMgr.clickCell();
		Director.getInstance().removeScene(this);
	}

	private Yes() {
		var context = this;

		if (this.ed_pohone.text == "" || this.ed_name.text == "") {
			PopoP.getTips("请输入完整信息");
			return;
		}
		var address = this.ed_sheng.text + ":" +
			this.ed_shi.text + ":" +
			this.ed_qu.text + ":" +
			this.ed_zhen.text + ":" +
			this.ed_jie.text;
		var data = {
			address: address,
			name: this.ed_name.text,
			phone: this.ed_pohone.text
		}
		FachUtils.Post("/workshop/sendToHome/" + this.data._id, data, function (res) {
			if (res.status) {
				PopoP.getTips(res.message);
				context.updateAddress();
				context.Close();
			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {
			PopoP.getTips(res.message);
		});

	}

	public updateAddress() {
		var address = this.ed_sheng.text + ":" +
			this.ed_shi.text + ":" +
			this.ed_qu.text + ":" +
			this.ed_zhen.text + ":" +
			this.ed_jie.text;
		var data = {
			address: address,
			name: this.ed_name.text,
			phone: this.ed_pohone.text
		}
		var cangku = <CangKu>Director.getInstance().gameLayer.getChildByName("cangku");
		FachUtils.Post("/user/updateUser", data, function (res) {
			if (res.status) {
		//		PopoP.getTips(res.message)
				cangku.init();
			} else {
				//PopoP.getTips(res.message)
			}
		}, function (res) {

		})
	}

}