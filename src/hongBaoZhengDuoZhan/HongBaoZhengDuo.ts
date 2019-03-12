class HongBaoZhengDuo extends eui.Component {

	public img_close: eui.Image;
	public btn_canjia: eui.Image;
	public group: eui.Group;
	public lab_content: eui.Label;

	public constructor() {
		super();
		this.skinName = "hongbaozhengduo";
	}

	public createChildren() {
		this.img_close.addEventListener("touchTap", this.Close, this);
		this.btn_canjia.addEventListener("touchTap", this.CanJia, this);
	}

	private data;
	private cb:CallBackFunc;
	/**
	 * 参加成功后修改date数据
	 */
	public setBack(data, cb) {

		this.data = data;
		this.cb = cb;
		this.lab_content.text=this.data.tugSetting.gameRule;
	}

	private CanJia() {
		var context = this;
		FachUtils.Get("/tug/joinTug", function (res) {
			if (res.status) {
				context.data.joinStatus = 1;
			 context.cb.back();
				Director.getInstance().removeScene(context);
			}
			PopoP.getTips(res.message)
		}, function (res) {

		});
	}
	private Close() {
		Director.getInstance().removeScene(this);
	}


}