class PaiHang extends eui.Component {
	public group: eui.Group;
	public list: eui.List;
	public rad1: eui.RadioButton;
	public rad2: eui.RadioButton;
	public lab_close: eui.Label;
	public lab_more: eui.Label;


	private sum = 0;
	private yeshu = 1;
	public data = [];
	public constructor() {
		super();
		this.skinName = "paihang";
	}
	private type = 1;
	public createChildren() {

		this.rad1.addEventListener("touchTap", this.Rad1, this);
		this.rad2.addEventListener("touchTap", this.Rad2, this);
		this.lab_close.addEventListener("touchTap", this.Close, this);
		this.lab_more.addEventListener(egret.TouchEvent.TOUCH_TAP, this.More, this);
		this.init();

	}

	private Rad1() {
		this.lab_more.visible = true;
		this.yeshu = 1;
		this.type = 1;
		this.data = [];
		this.sum = 0;
		this.init();
	}

	private Rad2() {
		this.lab_more.visible = true;
		this.yeshu = 1;
		this.type = 2;
		this.data = [];
		this.sum = 0;
		this.init();
	}

	private Close() {
		Director.getInstance().removeSceneNoTw(this);
	}



	private init() {
		var context = this;
		var data = {
			type: this.type
		}
		FachUtils.Post("/user/rank/" + this.yeshu + "/10", data, function (res) {
			if (res.status) {
				context.data = context.data.concat(res.resource);
				context.list.dataProvider = new eui.ArrayCollection(context.data);
				context.list.itemRenderer = PaiHang_Item;
				context.group.validateNow();
				context.sum = res.sum;
			} else {

				context.list.dataProvider = new eui.ArrayCollection(context.data);
				context.list.itemRenderer = PaiHang_Item;
				context.group.validateNow();
				PopoP.getTips(res.message)
			}
		}, function (res) {

		})
	}
	private More() {

		if (this.data.length >= this.sum) {
			PopoP.getTips("暂无更多数据");

			this.lab_more.visible = false;
			return;
		}
		this.yeshu++;
		this.init();
	}
}