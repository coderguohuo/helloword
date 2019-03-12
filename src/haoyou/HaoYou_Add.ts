class HaoYou_Add extends eui.Component {
	public lab_close: eui.Label;
	public btn_sousuo: eui.Button;
	public ed_sousuo: eui.EditableText;
	public lab_myid: eui.Label;
	public group: eui.Group;
	public list: eui.List;

	public constructor() {
		super();
		this.skinName = "haoyou_add"
	}


	public createChildren() {
		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.btn_sousuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SouSuo, this);
		var user = JSON.parse(egret.localStorage.getItem("user"));
		this.lab_myid.text = "我的ID: " + user.userid;
		var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		game.rec_haoyou.visible = false;
	}

	private SouSuo() {
		var context = this;
		if (this.ed_sousuo.text == "") {
			PopoP.getTips("请输入要搜索的账号");
			return;
		}
		FachUtils.Get("/user/search/" + this.ed_sousuo.text, function (res) {
			if (res.status) {
				var data = [res.resource];
				context.list.dataProvider = new eui.ArrayCollection(data);
				context.list.itemRenderer = HaoYou_Add_Item;
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