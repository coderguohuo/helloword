declare function JsToApp(scene);
class FengXIang_BaHe extends eui.Component {
	public lab_close: eui.Label;
	public lab_title: eui.Label;
	public lab_note: eui.Label;
	public lab_num: eui.Label;
	public img: eui.Image;
	public lab_jindu: eui.Label;
	public img_fenxiang: eui.Image;


	private _id;
	private lockSum;
	public constructor() {
		super();

		this.skinName = "fenxiang_tidu";
	}

	public createChildren() {
	 

		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.img_fenxiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.FenXiang, this);
		this.getJinDu();
		this.getFenXiangCanShu();


		this.lab_title.text = "邀请更多好友  助力红包争夺赛";
		this.lab_note.text = "邀请好友越多，获胜几率越大";
		this.img.source = "fenxiang_bahe_png";

	}

	//从后台拿分享的参数

	private fenXiangdata;
	private getFenXiangCanShu() {
		var context = this;
		var data = {
			id: 1000
		}
		// FachUtils.Post("/plant/land/share/settings", data, function (res) {
		// 	if (res.status) {

		// 		context.fenXiangdata = res.resource;

		// 	}
		// }, function (res) {

		// });

	}

	private getJinDu() {
		// var context = this;
		// FachUtils.Get("/plant/land/share/" + this._id, function (res) {
		// 	if (res.status) {
		// 		context.lab_jindu.text = res.resource.inviteCount + "/" + context.lockSum;
		// 	}
		// }, function (res) {

		// });
	}


	private FenXiang() {
	JsToApp(this);
	}

		public CallBack() {
		console.log("回调成功");

	}
	public Close() {
		Director.getInstance().removeScene(this);
	}

	public JSCallbackFunctionName() {
		PopoP.getTips("分享成功");

	}
}