class HaoYou_New extends eui.Component {
	public lab_close: eui.Label;
	public group: eui.Group;
	public list: eui.List;

	private data = [];
	public constructor() {
		super();
		this.skinName = "haoyou_new"
	}

	public createChildren() {
		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
 
		this.init();
	}

	private init() {

		var context = this;
		FachUtils.Get("/user/apllys", function (res) {
			if (res.status) {
				 
				context.list.dataProvider = new eui.ArrayCollection(res.resource);			
				context.list.itemRenderer = HaoYou_New_Item;			 
				context.group.validateNow();
			} else {
				PopoP.getTips(res.message);
			}

		}, function (res) {

		});
	}

	private Close() {
		Director.getInstance().removeScene(this);
	}
}