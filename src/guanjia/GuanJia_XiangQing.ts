class GuanJia_XiangQing extends eui.Component {
	public lab_close: eui.Label;
	public img_guyong: eui.Image;
	public lab_price: eui.Label;

	public constructor() {
		super();
		this.skinName = "guanjia_xiangqing"
	}

	public createChildren() {
		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.img_guyong.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GuYong, this);
		this.lab_price.text = SysTemSet.set.guanjiaDimond;
	}

	private Close() {
		Director.getInstance().removeScene(this);
	}


	private GuYong() {
		var context = this;
		FachUtils.Get("/user/buyGuanjia", function (res) {
			if (res.status) {
				Director.getInstance().getUser();
			}
			PopoP.getTips(res.message);
		}, function (res) {

		});

	}
}