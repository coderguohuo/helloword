class ChanChu extends eui.Component {
	public img_close: eui.Image;
	public group_beibao: eui.Group;
	public list_beibao: eui.List;
	public img_lingqu: eui.Image;
	public group_genban: eui.Group;
	public img_icon: eui.Image;
	public lab_name: eui.Label;
	public lab_note: eui.Label;
	public rec_jiegu: eui.Rect;

	public img_title: eui.Image;
	public group_nogenban: eui.Group;
	public rec_zhuagenban: eui.Rect;
	public lab_work: eui.Label;
	public lab2: eui.Label;
	public img_yiman: eui.Image;
	public lab_jiegu: eui.Label;
	public constructor() {
		super();
		this.skinName = "chanchu"
	}

	public createChildren() {
		this.img_lingqu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.LingQU, this);
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this)
		this.rec_jiegu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchJieGu, this)
		this.rec_zhuagenban.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ZhuaGEnBan, this);
	}


	public Close() {
		Director.getInstance().removeScene(this);
	}


	public data;
	public setDate(data) {
		var context = this;
		this.data = data;
		console.log(data.props.length);

		if (data.props.length == 0) {
			PopoP.getTips("暂无任何产出");

		} else {

		}

		if (this.data.fullFlag) {//产出是否已满
			this.img_yiman.visible = true;
		} else {
			this.img_yiman.visible = false;
		}
		var arr = [];
		for (var i = 0; i < data.props.length; i++) {
			arr[i] = data.props[i];
		}

		arr.length = 10;
		context.list_beibao.dataProvider = new eui.ArrayCollection(arr);
		context.list_beibao.itemRenderer = ChanChu_Item;
		context.group_beibao.validateNow();

		var str;
		switch (data.work_id) {

			//养蜂场
			case 1000:

				this.img_title.source = "text_yangfeng_png";
				str = "没有人帮您养蜂,产出停滞了";
				break;

			//捕鱼
			case 1001:

				this.img_title.source = "text_buyu_png";
				str = "没有人帮您捕鱼,产出停滞了";
				break;

			//深海打捞
			case 1002:
				str = "没有人帮您打捞,产出停滞了";
				this.img_title.source = "text_dalao_png";
				break;

			//深山挖矿
			case 1003:
				str = "没有人帮您挖矿,产出停滞了";
				this.img_title.source = "text_wakuang_png";
				break;

			//丛林探险
			case 1004:
				str = "没有人帮您丛林探险,产出停滞了";
				this.img_title.source = "text_conglin_png";
				break;
		}


		if (data.slaveStatus == 0) {// 0 没有跟班  1跟班正常 2跟班累瘫 3跟班被抢走
			this.group_genban.visible = false;
			this.group_nogenban.visible = true;
			this.lab2.visible = false;
			this.lab_work.text = str;
		} else {
			console.log(JSON.stringify(data));

			this.lab_jiegu.text = "解雇跟班";
			this.lab2.visible = true;
			this.group_genban.visible = true;
			this.group_nogenban.visible = false;
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
					this.img_title.source = "text_yangfeng_png";
					break;

				//捕鱼
				case 1001:
					this.lab_note.text = "正在帮您捕鱼";
					this.img_title.source = "text_buyu_png";
					break;

				//深海打捞
				case 1002:
					this.lab_note.text = "正在给您深海打捞";
					this.img_title.source = "text_dalao_png";
					break;

				//深山挖矿
				case 1003:
					this.lab_note.text = "正在给您挖矿";
					this.img_title.source = "text_wakuang_png";
					break;

				//丛林探险
				case 1004:
					this.lab_note.text = "正在给您丛林探险";
					this.img_title.source = "text_conglin_png";
					break;
			}

			if (data.slaveStatus == 2) {
				this.lab_note.text = "您的跟班已经累瘫了~";
			} else if (data.slaveStatus == 3) {

				this.lab_note.text = "您的跟班被" + this.data.other.nickname + "抢走了";
				this.lab_jiegu.text = "查 看";
			}
		}



	}

	private ZhuaGEnBan() {
		var genban = new GenBan();
		genban.setDate(this.data);
		Director.getInstance().pushSceneNoTw(genban);
		Director.getInstance().removeScene(this);
	}

	private TouchJieGu() {
		if (this.data.slaveStatus == 3) {
			//查看对手信息
			var item = new QiangDao();
			item.setDate(this.data);
			var cb = new CallBackFunc().handler(this.Close, this, []);
			item.setCb(cb);
			Director.getInstance().pushScene(item);
		} else {

			this.JieGu1();
		}
	}

	private JieGu1() {
		var cb = new CallBackFunc().handler(this.JieGu, this, [])
		this.addChild(new TiShi("是否确认解除跟班", cb));
	}

	public LingQU() {

		var context = this;
		var data = {
			work_id: this.data.work_id
		}
		FachUtils.Post("/cathSlave/harvest", data, function (res) {
			if (res.status) {

				var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
				game.RemoveGenBan_ShouYI(context.data.work_id);
				Director.getInstance().getUser();


				var item = new BaHe_LingQu();


				item.setDate(context.data.props);
				Director.getInstance().pushSceneScal(item);
				context.data.props = [];
				//	Director.getInstance().removeScene(context);
				var data = [];
				data.length = 10
				context.list_beibao.dataProvider = new eui.ArrayCollection(data);
				context.list_beibao.itemRenderer = ChanChu_Item;
				context.group_beibao.validateNow();
			}

			PopoP.getTips(res.message)
		}, function (res) {

		});

	}

	public JieGu() {
		var context = this;
		var data = {
			work_id: this.data.work_id
		}
		FachUtils.Post("/cathSlave/freeSlave", data, function (res) {
			if (res.status) {
				context.group_genban.visible = false;
				Director.getInstance().getUser();
				context.group_nogenban.visible = true;
			}
			PopoP.getTips(res.message);
		}, function (res) {

		});
	}
}