class GuanJia2 extends eui.Component {
	public lab_close: eui.Label;
	public lab_time: eui.Label;

	public constructor() {
		super();
		this.skinName = "guanjia2"
	}


	public createChildren() {
		var user = JSON.parse(egret.localStorage.getItem("user"));

		var t = new Date().getTime() - Director.getInstance().ShiJianCha;
		console.log(DataUtils.format("yyyy-MM-dd", new Date(user.guanjiaTime)));

		this.lab_time.text = DataUtils.TimeToStr((user.guanjiaTime - t)/1000);
		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
	}

	private Close() {
		Director.getInstance().removeScene(this);
	}
}