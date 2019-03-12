class GenBan extends eui.Component {
	public lab_close: eui.Label;
	public lab_huan: eui.Label;
	public group: eui.Group;
	public list: eui.List;

	private data;
	public constructor() {
		super();

		this.skinName = "genban";
		this.name = "genban";
	}

	public createChildren() {
		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.lab_huan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HuanYiPi, this);
		this.init();
	}

	public _id;
	//建筑的id
	public setDate(data) {
		this.data = data;
		this._id = this.data.work_id
	}

	private HuanYiPi() {
		this.init();
	}
	private init() {
		var context = this;
		var data = {
			count: 9
		}
		FachUtils.Post("/cathSlave/randusers", data, function (res) {
			if (res.status) {

				context.list.dataProvider = new eui.ArrayCollection(res.resource);

				context.list.itemRenderer = GenBan_Item;

				context.group.validateNow();
			}

		}, function (res) {

		});



	}

	private Close() {
		Director.getInstance().removeSceneNoTw(this);
	}
}