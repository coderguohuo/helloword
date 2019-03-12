class Game_GenBan_ShouYi extends eui.Component {
	public group: eui.Group;
	public list: eui.List;

	public constructor() {
		super();
		this.skinName = "game_genban_shouyi"
	}

	public createChildren() {
		 
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
	}
	public data;
	public setDate(data) {
	 
		this.data = data;
		this.group.removeChildren();
		for (var i = 0; i < data.props.length; i++) {
			var img = new eui.Image;
			img.width = 45;
			img.height = 45;
			if (data.props[i].name == "金币" || data.props[i].name == "经验") {
				img.source = data.props[i].img;
			} else {
				img.source = Fach.host + data.props[i].img;
			}
			this.group.addChild(img);

		}
	 
	}

	public Touch() {
		var item = new ChanChu()
		item.setDate(this.data);
		Director.getInstance().pushScene(item);
	}
}