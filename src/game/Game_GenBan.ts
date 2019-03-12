class Game_GenBan extends eui.Component {
	public group_ren: eui.Group;
	public img_icon: eui.Image;
	public lab_name: eui.Label;
	public lab_note: eui.Label;
	public lab: eui.Label;
	public img: eui.Image;

	public constructor() {
		super();
		this.skinName = "game_genban";
	}

	public createChildren() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
	}

	private Touch() {

		//this.rec.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
		// var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		// var e = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
		switch (this.type) {
			case 0:
				var genban = new GenBan();
				genban.setDate(this.data);
				Director.getInstance().pushSceneNoTw(genban);
				break;

			case 1:

				if (this.data.slaveStatus == 3) {
					var qd = new QiangDao();
					qd.setDate(this.data);
					Director.getInstance().pushScene(qd);

				} else {
					var item = new ChanChu()
					item.setDate(this.data);
					Director.getInstance().pushScene(item)
				}

				break;
		}

	}
	private rec: eui.Rect;

	private data;
	//有跟班在工作
	public setDate(data, rec) {
		this.type = 1;
		this.rec = rec;
		this.data = data;
		this.group_ren.visible = true;
		this.lab.text = "";
		this.img.visible = false;
		if (data.slave.avatar != null && data.slave.avatar != "") {
			this.img_icon.source = data.slave.avatar;
		} else {
			this.img_icon.source = "icon1_png";
		}

		this.lab_name.text = data.slave.nickname;
		switch (data.work_id) {

			//养蜂场
			case 1000:
				this.lab_note.text = "正在帮您养蜂";
				break;

			//捕鱼
			case 1001:
				this.lab_note.text = "正在帮您捕鱼";
				break;

			//深海打捞
			case 1002:
				this.lab_note.text = "正在给您深海打捞";
				break;

			//深山挖矿
			case 1003:
				this.lab_note.text = "正在给您挖矿";
				break;

			//丛林探险
			case 1004:
				this.lab_note.text = "正在给您丛林探险";
				break;


		}
		if (data.slaveStatus == 2) {
			this.lab_note.text = "您的跟班已经累瘫了~";
		} else if (data.slaveStatus == 3) {

			this.lab_note.text = "您的跟班被" + this.data.other.nickname + "抢走了";

		}

	}

	private type;
	//没有跟班
	public setDate2(data, rec) {
		this.data = data;
		this.type = 0;
		this.rec = rec;
		this.group_ren.visible = false;
		this.img.visible = true;
		this.lab.text = "";


		switch (data.work_id) {

			//养蜂场
			case 1000:
				this.lab.text = "抓个跟班帮您养蜂";
				break;

			//捕鱼
			case 1001:
				this.lab.text = "抓个跟班帮您捕鱼";
				break;

			//深海打捞
			case 1002:
				this.lab.text = "抓个跟班给您深海打捞";
				break;

			//深山挖矿
			case 1003:
				this.lab.text = "抓个跟班给您挖矿";
				break;

			//丛林探险
			case 1004:
				this.lab.text = "抓个跟班给您丛林探险";
				break;


		}

	}
}