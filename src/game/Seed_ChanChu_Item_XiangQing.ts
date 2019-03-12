class Seed_ChanChu_Item_XiangQing extends eui.Component {
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

	public group_sell: eui.Group;
	public constructor(data) {
		super();
		this.data = data;
		this.skinName = "beibao_xiangqing"
	}

	//显示 种子可能产出的商品,不能点击出售
	public createChildren() {
		//this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		//	this.rec_sell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchSell, this);

		this.img.source = Fach.host + this.data.img;
		this.lab_name.text = this.data.name;
		this.lab_yongtu.text = this.data.use;
		this.lab_xq.text = this.data.des;
	 
	 
		this.img.maxHeight = this.group.height;
		this.img.maxWidth = this.group.width;
		//	this.img.addEventListener(egret.Event.RESIZE, this.Size, this);
		this.btn_yes.visible = false;
		this.group_sell.visible = false;
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
		 

	}

	private Close() {
		SoundsMgr.clickCell();
		this.parent.removeChild(this);
	}


	private TouchSell() {
	 
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