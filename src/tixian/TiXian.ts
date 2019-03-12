class TiXian extends eui.Component {

	public lab_close: eui.Label;
	public img_tixian: eui.Image;
	public lab_num: eui.Label;
	private user;
	public constructor() {
		super();
		this.skinName = "tixian"
	}


	public createChildren() {

		this.lab_close.addEventListener("touchTap", this.Close, this);
		this.img_tixian.addEventListener("touchTap", this.TiXian, this);

		this.user = JSON.parse(egret.localStorage.getItem("user"));

		this.initView();
		this.lab_num.text = DataUtils.floot(this.user.hb) + " 元";

	}

	private initView() {

		 
	}

	private TiXian() {
		TWUtils.TwCanTouch(this.img_tixian);
		if (this.user.hb < 30) {
			PopoP.getTips("满30元才能提现哦~");
		} else {
			PopoP.getTips("提现功能暂未开放");
		}

	}
	private Close() {
		Director.getInstance().removeSceneNoTw(this);
	}
}