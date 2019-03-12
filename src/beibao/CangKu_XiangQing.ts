class CangKu_XiangQing extends eui.Component {
	public btn_yes: eui.Image;
	public img: eui.Image;
	public img_close: eui.Image;
	public lab_name: eui.Label;
	public lab_yongtu: eui.Label;
	public lab_xq: eui.Label;
	private data;
	private group: eui.Group;

	public rec_sell: eui.Rect;

	public lab_gold: eui.Label;

	public constructor(data) {
		super();
		this.data = data;
		this.skinName = "beibao_xiangqing"
	}


	public createChildren() {
		this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.rec_sell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchSell, this);

		this.img.source = Fach.host + this.data.img;
		this.lab_name.text = this.data.name;
		this.lab_yongtu.text = this.data.use;
		this.lab_xq.text = this.data.des;
		this.lab_gold.text = "+" + DataUtils.mul(this.data.soldPrice, this.data.count) + "金币";
		if (this.data.type == 1) {
			this.btn_yes.visible = false;
		} else {
			this.btn_yes.visible = true;
		}
		this.img.maxHeight = this.group.height;
		this.img.maxWidth = this.group.width;
		//	this.img.addEventListener(egret.Event.RESIZE, this.Size, this);
	}
	private Size() {

		if (this.img.width > this.group.width) {
			var scr = this.group.width / this.img.width;
			this.img.height = this.img.height * scr;
			this.img.width = this.img.width * scr;
		}

		if (this.img.height > this.group.height) {
			var scr2 = this.group.height / this.img.height;
			this.img.height = this.img.height * scr2;
			this.img.width = this.img.width * scr2;
		}
	}

	private Yes() {
		if (this.data.sendStrCount > this.data.count) {
			PopoP.getTips("最低快递数量为" + this.data.sendStrCount + "个");
			return;
		}
		this.Close();
		Director.getInstance().pushScene(new KuaiDi(this.data));

	}

	private Close() {
		SoundsMgr.clickCell();
		this.parent.removeChild(this);
	}


	private TouchSell() {
		var cb = new CallBackFunc().handler(this.Sell, this, []);
		Director.getInstance().gameLayer.addChild(new TiShi("是否确认出售" + this.data.name, cb));
		this.parent.removeChild(this);
	}

	private Sell() {
		var context = this;
		FachUtils.Get("/warahouse/sell/" + this.data._id, function (res) {
			if (res.status) {
				var cangku = <CangKu>Director.getInstance().gameLayer.getChildByName("cangku");
				cangku.init();
				PopoP.getTips(res.message);
				Director.getInstance().getUser();
			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {
			PopoP.getTips(res.message);
		});
	}

}