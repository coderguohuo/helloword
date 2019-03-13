class Tw_YiJianShouHuo extends eui.Component {

	public img_close: eui.Image;
	public group_glod: eui.Group;
	public lab_gold: eui.Label;
	public group_hb: eui.Group;
	public lab_hongbao: eui.Label;
	public group_nl: eui.Group;
	public lab_nengliang: eui.Label;
	public btn_shouqu: eui.Image;
	public group: eui.Group;
	public list: eui.List;
	public img_wu: eui.Image;

	private data;
	private img: eui.Image;
	private type;//1 植物, 2动物
	private arrdata;
	public constructor(arrdata, img, type) {
		super();
		this.type = type;
		this.arrdata = arrdata;
		this.img = img;
		this.skinName = "tw_shouhuo";
		this.btn_shouqu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ShouHuoType, this);
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
	}
	private user;
	public createChildren() {
		this.btn_shouqu.visible = false;
		this.user = JSON.parse(egret.localStorage.getItem("user"));
		 

		switch (this.type) {
			case 1:

				this.shouyiSeed();
				break;

			case 2:
				this.shouyiAnimal();
				break;
		}


	}


	//预览收益
	private shouyiSeed() {
		var context = this;

		var data = {
			lands: this.arrdata
		}
		FachUtils.Post("/plant/totalHarvest", data, function (res) {
			if (res.status) {
				context.data = res.resource.harvest;
				context.initDate();
				context.btn_shouqu.visible = true;
			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {

		});
	}

	private cb: CallBackFunc;
	public setCb(cb) {
		this.cb = cb;
	}


	private shouyiAnimal() {
		var context = this;

		// FachUtils.Get("/animal/harvestPreview/" + this.tudidata._id, function (res) {
		// 	if (res.status) {
		// 		context.data = res.resource.harvest;
		// 		context.initDate();
		// 		context.btn_shouqu.visible = true;
		// 	} else {
		// 		context.btn_shouqu.visible = false;
		// 		PopoP.getTips(res.message);
		// 	}
		// }, function (res) {
		// })

		var data = {
			lands: this.arrdata
		}
		FachUtils.Post("/animal/totalHarvest", data, function (res) {
			if (res.status) {
				context.data = res.resource.harvest;
				context.initDate();
				context.btn_shouqu.visible = true;
			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {

		});
	}

	private initDate() {
		if (this.data.props.length == 0) {
			//	KongTiShi.KO("好运气都用光了 (╥﹏╥) ", this.group);
			// if (this.user.guanjiaTime && this.user.guanjiaTime >= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
			// 	//有管家
			// 	KongTiShi.KO("管家已经帮您收获了", this.group);
			// } else {
			// 	//PopoP.getTips("没有管家")	
			// }
			this.img_wu.visible = true;
		} else {
			this.img_wu.visible = false;
			var data = this.data.props;
			var context = this;
			context.list.dataProvider = new eui.ArrayCollection(data);
			context.list.itemRenderer = Seed_ChanChu_Item;

			if (data.length == 4) {
				context.list.scaleX = 0.8;
				context.list.scaleY = 0.8;
			} else if (data.length == 5) {
				context.list.scaleX = 0.8;
				context.list.scaleY = 0.8;
			}


		}
		this.lab_gold.text = DataUtils.floot(this.data.gold);
		this.lab_hongbao.text = DataUtils.floot(this.data.hb);
		this.lab_nengliang.text = DataUtils.floot(this.data.plt_sessence);
		if (this.data.hb == 0) {
			this.group_hb.height = 0;
			this.group_hb.visible = false;
			this.group_hb.parent.addChildAt(this.group_hb, 100);
		} else {
			this.group_hb.height = 70;
			this.group_hb.visible = true;
		}


		if (this.user.guanjiaTime && this.user.guanjiaTime >= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
			//有管家
			PopoP.getTips("管家已经帮您收获了");
			var sum = this.data.gold + this.data.hb + this.data.plt_sessence + this.data.props.length;
			console.log(sum+1);

			if (sum <= 0) {
				console.log("~~~~~~~~~~~~~~~~~~");
				
				this.btn_shouqu.visible = false;
				this.cb.back();
			}
		} else {
			//PopoP.getTips("没有管家")

		}
	}

	private Close() {
		Director.getInstance().removeScene(this);
	}


	private ShouHuoType() {

		if (this.type == 1) {
			this.ShouHuoSeed();
		} else {
			this.ShouHuoAnimal();
		}
	}

	private ShouHuoSeed() {
		var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		var context = this;
		//删除可收获集合里的索引
		var data = {
			lands: this.arrdata
		}


		context.img.visible = false;
		for (var i = 0; i < context.arrdata.length; i++) {
			var index = game.canShouHUoSeed.indexOf(context.arrdata[i]);
			if (index != -1) {
				game.canShouHUoSeed.splice(index, 1);
			}
		}
		context.Close();
		game.yiJianShouHUo(context.arrdata, 1, context.data);
		
		FachUtils.Post("/plant/oneKeyHarvest", data, function (res) {
			if (res.status) {
			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {

		});
	}

	private ShouHuoAnimal() {
		var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		var context = this;
		//删除可收获集合里的索引
		var data = {
			lands: this.arrdata
		}



		context.img.visible = false;
		for (var i = 0; i < context.arrdata.length; i++) {
			var index = game.canShouHUoAnimal.indexOf(context.arrdata[i]);
			console.log(index);

			if (index != -1) {
				game.canShouHUoAnimal.splice(index, 1);
			}

		}
		context.Close();
		game.yiJianShouHUo(context.arrdata, 2, context.data);

		FachUtils.Post("/animal/oneKeyHarvest", data, function (res) {
			if (res.status) {
			} else {
				PopoP.getTips(res.message);
			}
		}, function (res) {

		});
	}
}