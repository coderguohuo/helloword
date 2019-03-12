class BaHe_Result extends eui.Component {
	public rec_yes: eui.Rect;
	public img_title: eui.Image;
	public img_bg: eui.Image;
	public img_lab: eui.Image;
	public lab_title: eui.Label;
	public lab_num: eui.Label;

	public constructor() {
		super();
		this.skinName = "bahe_result"
	}

	public createChildren() {
		this.rec_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);

	}

	private data;
	private jiangpindata = [];
	public setDate(data) {
		this.data = data;
		switch (data.tuggingRecords.winner) {//1 机器人赢 2 我赢 0 平手
			case 0:
				this.img_lab.source = "pingju_png";
				this.img_title.source = "title_yellow_png";
				this.img_bg.source = "dadou_shibai1_png";
				this.lab_title.textColor = 0xffffff;
				//平局奖红包
				this.jiangpindata[0] = {
					name: "红包",
					count: data.tuggingRecords.hb,
					img: "hongbao2_png",
					bendi: 1
				}
				break;


			case 1:
				this.img_lab.source = "dadou_shibai_png";
				this.img_title.source = "title_blue_png";
				this.img_bg.source = "dadou_shibai1_png";
				this.lab_title.textColor = 0xffffff;

				this.jiangpindata = data.tuggingRecords.props
				break;


			case 2:
				this.img_lab.source = "dadouchenggong_png";
				this.img_title.source = "title_red_png";
				this.img_bg.source = "dadou_shibai2_png";
				this.lab_title.textColor = 0xFFE485;

					this.jiangpindata[0] = {
					name: "红包",
					count: data.tuggingRecords.hb,
					img: "hongbao2_png",
					bendi: 1
				}
				break;
		}

	}


	private Yes() {

		var context = this;

		FachUtils.Get("/tug/harvest/" + this.data.tuggingRecords._id, function (res) {
			if (res.status) {
				var item = new BaHe_LingQu();
				item.setDate(context.jiangpindata);
				Director.getInstance().pushSceneScal(item);
				Director.getInstance().removeSceneNoTw(context);
			}
		}, function (res) {

		});

	}
}