class GongGao extends eui.Component {
	public lab_close: eui.Label;
	public lab_title: eui.Label;
	public lab_content: eui.Label;
	public lab_time: eui.Label;

	public constructor() {
		super();
		this.skinName = "gonggao";
	}

	public createChildren() {
		this.lab_close.addEventListener("touchTap", this.Close, this);
		var context = this;
		FachUtils.Get("/message/notes/1/1", function (res) {
			if (res.status) {
				if (res.sum == 0) {
					PopoP.getTips("暂无公告信息");
					return;
				}

				context.lab_title.text = res.resource[0].title;
				context.lab_content.text = res.resource[0].content;
				context.lab_time.text = DataUtils.format("yyyy-MM-dd hh:mm", new Date(res.resource[0].createTime));

			}
		}, function (res) {

		});
	}

	private Close() {
		Director.getInstance().removeSceneNoTw(this);
	}
}