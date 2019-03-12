class Animal_XiangQing extends eui.Component {

	public img_bg: eui.Image;
	public img_close: eui.Image;
	public lab_seedName: eui.Label;
	public group_hb: eui.Group;
	public lab_hongbao: eui.Label;
	public group_glod: eui.Group;
	public lab_gold: eui.Label;
	public group_nl: eui.Group;
	public lab_nengliang: eui.Label;
	public group: eui.Group;
	public list: eui.List;
	public img: eui.Image;
	public img_suo: eui.Image;
	public img_jiesuo: eui.Image;
	public group_btn: eui.Group;
	public lab_clock: eui.Label;
	public lab_needGold: eui.Label;
	private lab_pinzhi: eui.Label;

	private img_hecheng: eui.Image;
	private img_wu: eui.Image;
	private data;
	private type;//2已解锁   1为解锁
	public constructor(data, type) {
		super();
		this.data = data;
		this.type = type;
		this.skinName = "seed_xiangQing"
	}

	public createChildren() {
		this.img_close.addEventListener("touchTap", this.Close, this);
		this.img_jiesuo.addEventListener("touchTap", this.JieSuo, this);
		this.img_hecheng.addEventListener("touchTap", this.HeCheng, this);
		this.setType();
		this.init();
	}

	private setType() {
		switch (this.type) {
			case 1:
				//黄色
				this.lab_seedName.strokeColor = 0xD88A3D;
				this.img_bg.source = "seed_xiangqing_un_png";
				this.img_suo.visible = true;
				this.img_jiesuo.visible = true;
				this.group_btn.visible = true;
				break;

			case 2:


				//蓝色
				this.img_bg.source = "seed_xiangqing_png";
				this.img_suo.visible = false;
				this.img_jiesuo.visible = false;
				this.group_btn.visible = false;
				this.img_hecheng.visible = false;
				break;
		}
	}


	private init() {
		var context = this;
		FachUtils.Get("/animal/userDetail/" + this.data._id, function (res) {
			if (res.status) {

				context.initDate(res.resource.plant);
			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {
			PopoP.getTips(res.message);
		});
	}

	private initDate(data) {
		this.img.source = Fach.host + data.img1;
		this.lab_seedName.text = data.name;
		this.lab_gold.text = DataUtils.floot(data.maxGold);
		this.lab_hongbao.text = DataUtils.floot(data.firHb);
		this.lab_nengliang.text = DataUtils.floot(data.maxEssence);

		this.lab_clock.text = "(" + data.hasUnlockTime + "/" + data.unlockTime + ")";
		this.lab_needGold.text = DataUtils.floot(data.everyPrice);

		if (data.props != null) {
			if (data.props == 0) {
				this.img_wu.visible = true;
			} else {
				this.img_wu.visible = false;
				var context = this;
				context.list.dataProvider = new eui.ArrayCollection(data.props);
				context.list.itemRenderer = Seed_ChanChu_Item;
			}
		} else {
			this.img_wu.visible = true;
		}


		if (data.hasUnlockTime == data.unlockTime) {
			//解锁完成  未合成
			this.group_btn.visible = false;
			this.img_jiesuo.visible = false;
			this.img_hecheng.visible = true;
		}

		switch (data.qualityId) {
			case 0:
				this.lab_pinzhi.text = "奇迹品质";
				break;

			case 1:
				this.lab_pinzhi.text = "普通品质";
				break;


			case 2:
				this.lab_pinzhi.text = "高级品质";
				break;


			case 3:
				this.lab_pinzhi.text = "稀有品质";
				break;

			case 4:
				this.lab_pinzhi.text = "超凡品质";
				break;

			case 5:
				this.lab_pinzhi.text = "史诗品质";
				break;

			case 6:
				this.lab_pinzhi.text = "传奇品质";
				break;

		}

	}

	//解锁
	private JieSuo() {
		var context = this;
		FachUtils.Get("/animal/unlock/" + this.data._id, function (res) {
			if (res.status) {
				Director.getInstance().getUser();
				context.JieSuoChengGong(res.resource.plant);
			} else {
				PopoP.getTips(res.message)
			}
		}, function (res) {
			PopoP.getTips(res.message)
		});
	}

	private JieSuoChengGong(data) {
		this.img.source = Fach.host + data.img;
		this.lab_seedName.text = data.name;
		this.lab_gold.text = DataUtils.floot(data.maxGold);
		this.lab_hongbao.text = DataUtils.floot(data.firHb);
		this.lab_nengliang.text = DataUtils.floot(data.maxEssence);
		this.lab_clock.text = "(" + data.hasUnlockTime + "/" + data.unlockTime + ")";
		this.lab_needGold.text = DataUtils.floot(data.everyPrice);

		if (data.hasUnlockTime == data.unlockTime) {
			//解锁完成  未合成

			// this.type = 2;
			// this.setType();

			this.group_btn.visible = false;
			this.img_jiesuo.visible = false;
			this.img_hecheng.visible = true;
		}

	}


	private HeCheng() {
		var context = this;
		FachUtils.Get("/animal/cb/" + this.data._id, function (res) {
			if (res.status) {
				context.type = 2;
				context.setType();
				PopoP.getTips(res.message)

				var selectSeed = <SelectAnimal>Director.getInstance().gameLayer.getChildByName("selectanimal");
				selectSeed.HeChengCallback();
			} else {
				PopoP.getTips(res.message)
			}
		}, function (res) {
			PopoP.getTips(res.message)
		});
	}

	private Close() {
		Director.getInstance().removeScene(this);
	}



}