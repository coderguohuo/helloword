class Game extends eui.Component {
	public tudi1: eui.Image;
	public tudi2: eui.Image;
	public tudi3: eui.Image;
	public tudi4: eui.Image;
	public tudi5: eui.Image;
	public tudi6: eui.Image;
	public tudi7: eui.Image;
	public tudi8: eui.Image;
	public tudi9: eui.Image;
	public tudi10: eui.Image;
	public tudi11: eui.Image;
	public tudi12: eui.Image;
	public img_tixian: eui.Image;
	public scroll: eui.Scroller;



	public lab_gold: eui.Label;
	public img_hongbao: eui.Image;
	public lab_hongbao: eui.Label;
	public tudi_selected: eui.Image;
	public tudi_selected_pond = 0;
	public animal_selected_pond = 0;

	//	private img_shuaxin: eui.Image;
	private img_icon: eui.Image;
	private music: eui.Image;
	private img_zhuanpan: eui.Image;
	private img_seed: eui.Image;
	private img_haoyou: eui.Image;
	public img_yaoqianshu: eui.Image;

	public rec_jiaGongChang: eui.Rect;
	public rec_buYuMaTou: eui.Rect;
	public rec_shenHaiDaLao: eui.Rect;
	public rec_waKuang: eui.Rect;
	public rec_congLinTanXian: eui.Rect;
	public rec_yangFengChang: eui.Rect;

	public img_beibao: eui.Image;
	public top_zuanshi: eui.Image;
	public img_addZuanShi: eui.Image;
	public img_addGold: eui.Image;
	public top_hongbao: eui.Image;

	public img_paihang: eui.Image;
	public lab_paihang: eui.Label;
	public lab_zuanshi: eui.Label;

	public lab_nengLiang: eui.Label;
	public top_nengliang: eui.Image;
	public top_gold: eui.Image;
	public rec_jingyan: eui.Rect;
	public rec_tili: eui.Rect;
	public lab_lv: eui.Label;
	public group_gonggao: eui.Group;
	public lab_gonggao: eui.Label;
	public group_game: eui.Group;
	public lab_beibao: eui.Label;
	public group_menu: eui.Group;
	public rec_beibao: eui.Rect;
	public img_lv: eui.Image;

	public img_guajia: eui.Image;
	private img_animal: eui.Image;
	private lab_muchangNum: eui.Label;
	private img_needUp: eui.Image;

	public rec_haoyou: eui.Rect;
	public animal1: eui.Image;
	public animal2: eui.Image;
	public animal3: eui.Image;
	public animal4: eui.Image;
	public animal5: eui.Image;
	public animal6: eui.Image;
	public animal7: eui.Image;
	public animal8: eui.Image;
	public animal9: eui.Image;
	public animal10: eui.Image;
	public animal11: eui.Image;
	public animal12: eui.Image;

	private img_dog: eui.Image;
	public canShouHUoSeed = [];//可收获的种子地块集合
	public canShouHUoAnimal = [];//可收获的种子地块集合
	public vip_animal: eui.Image;
	public vip_tudi: eui.Image;

	public suo_yaoqianshu: eui.Image;
	public suo_buyumatou: eui.Image;
	public suo_shenhaidalao: eui.Image;
	public suo_conglintanxian: eui.Image;
	public suo_fengchang: eui.Image;
	public suo_hongbaozhengduo: eui.Image;
	public suo_shenshanwakuang: eui.Image;

	public img_conglin: eui.Image;
	public img_wakuang: eui.Image;
	public img_yangfeng: eui.Image;
	public img_buyu: eui.Image;
	public img_dalao: eui.Image;
	public img_yqs_menu: eui.Image;

	public constructor() {
		super();
		this.skinName = "game";
		RES.loadGroup("sound", -99);
		this.name = "game";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
		this.addEventListener(GameEvent.getUserInfo, this.initUser, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.CloseAll, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Remove, this);
		this.vip_tudi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.VipTuDi, this);
		this.vip_animal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.VipAnimal, this);

		// this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}

	private seedBeClicked = false;
	private beClickedSeedData = null;
	public setSeedBeClicked(data){
		this.seedBeClicked = true;
		this.beClickedSeedData = data;
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
	}

	public tryToPlant(stageX, stageY, seedData){
		for(let i = 0; i < this.TuDiBeans.length; ++i){
			let tudiBean = <TuDiBean>this.TuDiBeans[i];
			if(tudiBean.data.status == 1){
				let imgTudi = tudiBean.tudi;
				imgTudi.pixelHitTest = true;
				let isHit = imgTudi.hitTestPoint(stageX, stageY);
				if(isHit){
					this.tudi_selected.x = imgTudi.x;
					this.tudi_selected.y = imgTudi.y;
					this.tudi_selected.visible = true;
					this.group_game.setChildIndex(this.tudi_selected, this.group_game.getChildIndex(imgTudi) + 1);
					this.tudi_selected_pond = i + 1;
					this.findEmptyLandAndPlant(seedData);
					break;
				}
			}

		}
	}

	updateLandToGrow(seedData, tuDiBean, delay = 0){
		let needTime = seedData.growTime * 1000;
		let curTime = new Date().getTime() - Director.getInstance().ShiJianCha;

		let curData = tuDiBean.data;
		curData.status = 2; // 生长中 
		curData.plantTime = curTime + delay;
		curData.harvestTime = curData.plantTime + needTime;
		curData.animationId = seedData.animationId;

		tuDiBean.init();
		
		let game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		game.updateMoney({type: "gold", addNum: -seedData.plantPrice});
	}

	// 点击种子判断是否可以种植 不经后端直接反馈玩家
	findEmptyLandAndPlant(seedData){
		let game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		let curSelectedLand = game.tudi_selected_pond;
		let willBean = null;

		let needGold = seedData.plantPrice;
		let curGold = game.getGold();
		if(curGold < needGold){
			PopoP.getTips("金币不足哦");
			return ;
		}
		

		if(curSelectedLand == 0){
			for(let i = 0; i < game.TuDiBeans.length; ++i){
				let bean = game.TuDiBeans[i];
				let data = bean.data;
				if(data.status == 1){
					willBean = bean;
					break;
				}
			}
		}else{
			willBean = game.TuDiBeans[curSelectedLand - 1];
		}

		// let self = this;
		if(willBean){
			this.updateLandToGrow(seedData, willBean, 200);
			// self.rec_up.touchEnabled = false;
			// egret.setTimeout(function(){
			// 	self.rec_up.touchEnabled = true;
			// }, self, 100);
			FachUtils.Post("/plant/" + curSelectedLand, {id: seedData._id}, function(res){
				if(res.status){
					game.tudi_selected_pond = 0;
				}else if(res.status == 1081){
					Director.getInstance().pushScene(new Seed_XiangQIng(seedData, 2));
					PopoP.getTips(res.message);
				}else{
					PopoP.getTips(res.message);
				}
			}, function(res){ }, false);
		}else{
			Director.getInstance().pushScene(new Seed_XiangQIng(seedData, 2));
			PopoP.getTips("无闲置土地了哦");
		}
	}

	public onTouchMove(e: egret.TouchEvent){
		if(this.seedBeClicked){
			console.log("stage-> moving now ! Mouse: [X:"+e.stageX+",Y:"+e.stageY+"]");
		}
	}

	public onTouchEnd(e: egret.TouchEvent){
		// this.seedBe
	}

	public createChildren() {

		this.initView();
		Director.getInstance().getUser(true);
		var context = this;
		egret.setTimeout(this.GunPing, this, 5000);
		egret.setTimeout(this.isZaiXian, this, 30000);
		this.initDog();
	}

	private initDog() {
		var item = new DogDragon("");
		item.x = this.img_dog.x + 30;
		item.y = this.img_dog.y + 38;
		item.scaleX = 0.2;
		item.scaleY = 0.2;
		this.img_dog.alpha = 0;
		item.PlayAni1();
		this.group_game.addChild(item);
		item.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
			Director.getInstance().pushSceneNoTw(new ChongWu);
		}, this);

	}

	private tudis: eui.Image[] = [];
	public TuDiBeans: TuDiBean[] = [];

	private animaltudis: eui.Image[] = [];
	public animalBeans: AnimalBean[] = [];
	private initView() {
		for (var i = 0; i < 12; i++) {
			let imgTudi = <eui.Image>this["tudi" + (i+1)];
			this.tudis.push(imgTudi);
			var bean = new TuDiBean(imgTudi);
			this.TuDiBeans.push(bean);

			this.group_game.addChildAt(bean, (this.group_game.getChildIndex(imgTudi) + 12))
		}
		var index2 = this.group_game.getChildIndex(this.animal1);
		for (var i = 0; i < 12; i++) {
			let imgAnimal = <eui.Image>this["animal"+ (i+1)];
			this.animaltudis.push(imgAnimal);
			var animalbean = new AnimalBean(imgAnimal);
			this.animalBeans.push(animalbean);
			this.group_game.addChildAt(animalbean, (this.group_game.getChildIndex(imgAnimal) + 12));
		}

		SoundsMgr.playBg();
		if (SoundsMgr.IsSound()) {
			this.music.source = "music1_png";
		} else {
			this.music.source = "music2_png";
		}



	}

	private Touch(event: egret.TouchEvent) {
		this.tudi_selected.visible = false;
		this.remoSelectSeed();
		this.remoSelecAnimal();

		console.log(this.group_game.scrollH + "~~~~~~" + this.group_game.scrollV);

		switch (event.target) {
			// case this.img_shuaxin:
			// 	TWUtils.TwCanTouch(this.img_shuaxin)
			// 	Director.getInstance().getUser(true);
			// 	break;
			case this.img_beibao:
			case this.lab_beibao:
				this.rec_beibao.visible = false;
				TWUtils.TwCanTouch(this.img_beibao)
				Director.getInstance().gameLayer.addChild(new CangKu());
				break;
			case this.rec_jiaGongChang:
				TWUtils.TwCanTouch(this.rec_jiaGongChang)
				Director.getInstance().pushScene(new JiaGong());
				break;

			case this.img_seed:
				TWUtils.TwCanTouch(this.img_seed)
				this.addSelectSeed();
				break;

			case this.img_animal:
				TWUtils.TwCanTouch(this.img_animal)
				this.addSelectAnimal();
				break;
			case this.img_zhuanpan:
				//	TWUtils.TwCanTouch(this.img_zhuanpan)



				Director.getInstance().pushSceneNoTw(new ZhuanPan());

				break;
			case this.img_haoyou:
				//	TWUtils.TwCanTouch(this.img_zhuanpan)

				//	PopoP.getTips("暂未开放,敬请期待");
				Director.getInstance().pushScene(new HaoYou());
				break;

			case this.img_addZuanShi:
				Director.getInstance().pushScene(new pindou.GetPinDouLayer());
				break;


			case this.rec_jiaGongChang:
				TWUtils.TwCanTouch(this.rec_jiaGongChang)
				Director.getInstance().pushScene(new JiaGong());
				break;
			case this.music:

				SoundsMgr.setIsSound(!SoundsMgr.IsSound());
				if (SoundsMgr.IsSound()) {
					SoundsMgr.PlayBGM();
					this.music.source = "music1_png";
				} else {
					this.music.source = "music2_png";
					SoundsMgr.StopBGM();
				}
				//	TWUtils.TwCanTouch(this.music)
				break;




			case this.img_tixian:
				Director.getInstance().pushSceneNoTw(new TiXian());

				break;

			case this.rec_yangFengChang://养蜂场
				if (this.suo_fengchang.visible) {
					PopoP.getTips("等级不足,暂未开放");
				} else {
					this.FengChang(this.yangfengdata);
				}


				break;
			case this.rec_shenHaiDaLao://深海打捞
				if (this.suo_shenhaidalao.visible) {
					PopoP.getTips("等级不足,暂未开放");
				} else {
					this.FengChang(this.dalaodata);
				}
				break;


			case this.img_hongbao:


				this.openHongBao();


				break;
			case this.img_yaoqianshu://摇钱树
				//	PopoP.getTips("等级不足,暂未开放");
				var yqs = new YaoQianShu();

				Director.getInstance().pushSceneNoTw(yqs);
				yqs.setType(1)
				break;

			case this.img_yqs_menu://摇钱树
				//	PopoP.getTips("等级不足,暂未开放");
				var yqs2 = new YaoQianShu();

				Director.getInstance().pushSceneNoTw(yqs2);
				yqs2.setType(2)
				break;

			case this.rec_congLinTanXian://丛林探险
				if (this.suo_conglintanxian.visible) {
					PopoP.getTips("等级不足,暂未开放");
				} else {
					this.FengChang(this.conglindata);
				}
				break;
			case this.rec_waKuang://挖矿
				if (this.suo_shenshanwakuang.visible) {
					PopoP.getTips("等级不足,暂未开放");
				} else {
					this.FengChang(this.wakuangdata);
				}
				break;
			case this.rec_buYuMaTou://捕鱼码头

				if (this.suo_buyumatou.visible) {
					PopoP.getTips("等级不足,暂未开放");
				} else {
					this.FengChang(this.buyudata);
				}
				break;

			case this.img_icon:
				Director.getInstance().pushSceneHeng(new GeRen());
				break;
			case this.img_dog:
				Director.getInstance().pushSceneHeng(new ChongWu());
				break;

			case this.lab_paihang:
			case this.img_paihang:
				Director.getInstance().pushSceneNoTw(new PaiHang());
				break;

			case this.img_addGold:
				Director.getInstance().pushSceneNoTw(new GetMoney());
				break

			case this.img_guajia:

				if (this.user.guanjiaTime && this.user.guanjiaTime >= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
					Director.getInstance().pushScene(new GuanJia2());
				} else {
					Director.getInstance().pushScene(new GuanJia_XiangQing());
				}
				break;

		}
	}

	private user;
	private initUser() {
		this.user = JSON.parse(egret.localStorage.getItem("user"));
		this.lab_gold.text = DataUtils.floot(this.user.gold);
		this.lab_hongbao.text = DataUtils.floot(this.user.hb);
		this.lab_nengLiang.text = DataUtils.floot(this.user.plt_sessence);

		if (this.user.avatar != null && this.user.avatar != "") {
			this.img_icon.source = this.user.avatar;
		}

		this.lab_zuanshi.text = DataUtils.floot(this.user.dimond);
		this.rec_tili.width = this.user.power / 100 * 90;//体力
		this.lab_lv.text = this.user.class;//等级

		if (this.user.appLevel.levelName == "普通会员") {
			this.img_lv.source = "chenghao0_png"
		} else if (this.user.appLevel.levelName == "白银店主") {
			this.img_lv.source = "chenghao1_png"
		} else if (this.user.appLevel.levelName == "黄金店主") {
			this.img_lv.source = "chenghao2_png"
		} else if (this.user.appLevel.levelName == "销售经理") {
			this.img_lv.source = "chenghao4_png"
		} else {
			this.img_lv.source = ""
		}

		//经验条
		var str = DataUtils.sub(this.user.nextExe, this.user.needExe);
		var scale = DataUtils.div((this.user.experience - str), this.user.needExe);

		if (this.user.experience >= this.user.nextExe) {
			this.img_needUp.visible = true;
		} else {
			this.img_needUp.visible = false;
		}

		if (this.user.needExe == -1) {
			this.img_needUp.visible = false;
		}

		if (scale <= 0) {
			scale = 0;
		} else if (scale >= 1) {
			scale = 1;
		}
		if (this.user.needExe <= 0) {
			scale = 1;
		}
		this.rec_jingyan.width = scale * 90;



		//判断是否有管家
		if (this.user.guanjiaTime && this.user.guanjiaTime >= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
			//有管家

		} else {
			//PopoP.getTips("没有管家")
		}

		this.BaHeKaiQi();

		this.getTouQUinFo();
		//this.tellBackStage();
		this.checkJianZhu();
		this.GetHaoYou();
		this.LiXianJiang();


	}

	private isZaiXian() {
		var context = this;
		FachUtils.Get2("/user/online", function (res) {
			if (res.status) {
				if (!context.willFinish) {
					egret.setTimeout(context.isZaiXian, context, 300000);
				}

			}
		}, function (res) {

		})
	}

	private LiXianJiang() {
		var context = this;
		FachUtils.Get2("/hb/offLineRewards", function (res) {
			if (res.status) {
				var num = res.resource.dimond + res.resource.experience + res.resource.gold + res.resource.hb + res.resource.plt_sessence + res.resource.tl;
				if (res.resource.props.length == 0 && num == 0) {
					context.img_yqs_menu.visible = false;
				} else {
					context.img_yqs_menu.visible = true;
				}
			}
		}, function (res) {

		});
	}

	/**
	 * 各建筑的工作情况查询接口  包括 有没有解锁 有没有跟班 和当前收益
	 */
	private checkJianZhu() {
		var context = this;
		FachUtils.Get2("/cathSlave/workStatus", function (res) {
			if (res.status) {
				context.setGenBan(res.resource);
			}
		}, function (res) {

		});
	}

	private yangfengdata;
	private buyudata;
	private wakuangdata;
	private dalaodata;
	private conglindata;
	private setGenBan(data) {
		var context = this;

		var img;
		var imgShouyi;

		for (var i = 0; i < data.length; i++) {
			switch (data[i].work_id) {
				//养蜂场
				case 1000:
					if (this.user.class >= data[i].unlockClass) {
						this.suo_fengchang.visible = false;
						img = this.img_yangfeng;
						imgShouyi = this.rec_yangFengChang;
						this.yangfengdata = data[i];

					} else {
						this.suo_fengchang.visible = true;
					}
					break;

				//捕鱼
				case 1001:


					if (this.user.class >= data[i].unlockClass) {
						this.suo_buyumatou.visible = false;
						img = this.img_buyu;
						imgShouyi = this.rec_buYuMaTou;

						this.buyudata = data[i];
					} else {
						this.suo_buyumatou.visible = true;
					}
					break;

				//深海打捞
				case 1002:
					if (this.user.class >= data[i].unlockClass) {
						this.suo_shenhaidalao.visible = false;
						img = this.img_dalao;
						imgShouyi = this.rec_shenHaiDaLao;

						this.dalaodata = data[i];
					} else {
						this.suo_shenhaidalao.visible = true;
					}
					break;

				//深山挖矿
				case 1003:
					if (this.user.class >= data[i].unlockClass) {
						this.suo_shenshanwakuang.visible = false;
						img = this.img_wakuang;
						imgShouyi = this.rec_waKuang;

						this.wakuangdata = data[i];
					} else {
						this.suo_shenshanwakuang.visible = true;
					}
					break;

				//丛林探险
				case 1004:
					if (this.user.class >= data[i].unlockClass) {
						this.suo_conglintanxian.visible = false;
						img = this.img_conglin;
						imgShouyi = this.rec_congLinTanXian;

						this.conglindata = data[i];
					} else {
						this.suo_conglintanxian.visible = true;
					}

					break;


			}


			if (this.user.class < data[i].unlockClass) {
				//未解锁 跳过本次循环
				continue;
			}

			var itemgb = <Game_GenBan>this.group_game.getChildByName(data[i].work_id + "genban");
			if (itemgb == null) {
				itemgb = new Game_GenBan();
				itemgb.name = data[i].work_id + "genban";
				this.group_game.addChildAt(itemgb, this.group_game.getChildIndex(img));
			}


			if (data[i].slaveStatus != 0) {
				//有跟班

				itemgb.x = img.x + img.width / 2 - itemgb.width / 2;
				itemgb.y = img.y + img.height - 80;
				itemgb.setDate(data[i], imgShouyi);

			} else {
				//没有跟班

				itemgb.y = imgShouyi.y + imgShouyi.height - itemgb.height;
				itemgb.x = imgShouyi.x + imgShouyi.width / 2 - itemgb.width / 2;
				itemgb.setDate2(data[i], imgShouyi);
			}

			if (data[i].experience != 0) {
				var dataExp = {
					img: "jingyan_png",
					count: data[i].experience,
					name: "经验",
					bendi: 1
				}
				data[i].props.push(dataExp);
			}

			if (data[i].gold != 0) {
				var dataGold = {
					img: "gold2_png",
					count: data[i].gold,
					name: "金币",
					bendi: 1
				}
				data[i].props.push(dataGold);
			}

			if (data[i].props.length != 0) {
				let item = <Game_GenBan_ShouYi>this.group_game.getChildByName(data[i].work_id + "yulan");
				if (item == null) {
					item = new Game_GenBan_ShouYi();
					item.name = data[i].work_id + "yulan";
					item.x = imgShouyi.x - imgShouyi.width / 2 + imgShouyi.width / 2;
					item.y = imgShouyi.y - item.height;
					this.group_game.addChild(item);
				}
				item.setDate(data[i]);
			}
		}
	}

	/**
	 * 告诉后台 查询是否有分享成功的
	 */
	private tellBackStage() {

		var context = this;
		FachUtils.Get2("/plant/land/share/put", function (res) {

		}, function (res) {

		});

	}



	private getTouQUinFo() {


		FachUtils.Get2("/plant/stealNews", function (res) {

			if (res.status) {
				if (res.news.hb != 0) {
					Director.getInstance().pushSceneNoTw(new BeiTou(res));
				}
			}
		}, function (res) {

		});



	}

	/**
	 * 查看是否有新的好友信息 
	 */
	private GetHaoYou() {
		var context = this;
		FachUtils.Get2("/user/apllys", function (res) {
			if (res.status) {
				if (res.resource.length != 0) {
					context.rec_haoyou.visible = true;
				} else {
					context.rec_haoyou.visible = false;
				}
			} else {
				PopoP.getTips(res.message);
			}

		}, function (res) {

		});
	}

	/**
	 * 查看拔河是否开启,
	 */
	private bahedate;
	private BaHeKaiQi() {
		var context = this;
		console.log("~~~~~~~~拔河~~~~~~~~~~~~~");

		FachUtils.Get2("/tug/eventStatus", function (res) {
			if (res.status) {
				context.bahedate = res.resource;
				var item = <AnimalDragon>context.group_game.getChildByName("jiangbei")
				if (res.resource.status) {//活动是否开启
					if (item == null) {
						item = new AnimalDragon()
						item.name = "jiangbei";
						item.x = context.img_hongbao.x;
						item.y = context.img_hongbao.y + 60;
						item.setDate("奖杯_2");
						context.group_game.addChildAt(item, context.group_game.getChildIndex(context.img_hongbao) - 1);
						item.PlayAni4();
						context.img_hongbao.alpha = 0;
						context.suo_hongbaozhengduo.visible = false;
					}

				} else {
					if (item != null) {
						context.group_game.removeChild(item);
					}
					context.img_hongbao.alpha = 1;
					context.suo_hongbaozhengduo.visible = true;
				}

				if (context.bahedate.joinStatus == 2) {
					//上次参加活动未领取奖品

					// var itembage = new BaHe_Result()

					// itembage.setDate(context.bahedate);
					// Director.getInstance().pushSceneScal(itembage);

				}


				if (context.bahedate.joinStatus == 1) {
					// 参加活动 



				}


			}
		}, function (res) {

		});

	}
	private CloseAll() {
		//this.tudi_selected.visible = false;
	}


	public remoSelectSeed() {
		var item = Director.getInstance().gameLayer.getChildByName("selectseed");
		this.tudi_selected_pond = 0;

		if (item != null) {
			egret.Tween.get(item).to({
				y: 392
			}, 200).call(function () {
				item.parent.removeChild(item);
				this.group_menu.visible = true;
			}, this);
		} else {
			this.group_menu.visible = true;
		}
	}

	public remoSelecAnimal() {
		var item = Director.getInstance().gameLayer.getChildByName("selectanimal");

		this.animal_selected_pond = 0;
		if (item != null) {
			egret.Tween.get(item).to({
				y: Director.getInstance().gameLayer.stageHeight
			}, 200).call(function () {
				item.parent.removeChild(item);
				this.group_menu.visible = true;
			}, this);
		} else {
			this.group_menu.visible = true;
		}
	}


	public addSelectSeed() {
		this.remoSelecAnimal();
		if (Director.getInstance().gameLayer.getChildByName("selectseed") != null) {
			return;
		}
		this.group_menu.visible = false;
		var item = new SelectSeed();
		// item.x = this.tudi.x + this.tudi.width / 2 - item.width / 2 ;
		item.y = 392;
		Director.getInstance().gameLayer.addChild(item);
		egret.Tween.get(item).to({
			y: 0
		}, 200);
	}


	public addSelectAnimal() {
		this.remoSelectSeed();
		if (Director.getInstance().gameLayer.getChildByName("selectanimal") != null) {
			return;
		}
		this.group_menu.visible = false;
		var item = new SelectAnimal();
		// item.x = this.tudi.x + this.tudi.width / 2 - item.width / 2 ;
		item.y = Director.getInstance().gameLayer.stageHeight;
		Director.getInstance().gameLayer.addChild(item);
		egret.Tween.get(item).to({
			y: Director.getInstance().gameLayer.stageHeight - item.height
		}, 200);
	}


	public FillData(data, lockDate) {
		this.vip_tudi.visible = false;


		for (var i = 0; i < data.length; i++) {
			if (JSON.stringify(data[i]) != JSON.stringify(this.TuDiBeans[data[i].code - 1].data)) {
				this.TuDiBeans[data[i].code - 1].setDate(data[i]);
			}
			this.TuDiBeans[lockDate[i].landCode - 1].setLockDate(lockDate[i]);

			if (data[i].status == 0 && lockDate[i].cdtTpye == 3) {
				this.vip_tudi.visible = true;
				this.group_game.addChildAt(this.vip_tudi, this.group_game.getChildIndex(this.tudis[lockDate[i].landCode - 1]) + 1)
				this.vip_tudi.x = this.tudis[lockDate[i].landCode - 1].x + this.tudis[lockDate[i].landCode - 1].width / 2 - this.vip_tudi.width / 2;
				this.vip_tudi.y = this.tudis[lockDate[i].landCode - 1].y + this.tudis[lockDate[i].landCode - 1].height / 2 - this.vip_tudi.height;
				this.vip_tudi.name = (lockDate[i].landCode - 1) + "";
			}

		}


		this.TuDiYJSH();
	}

	//判断是否显示一键收获得图标
	public TuDiYJSH() {
		var shouhuoisVisible = false;
		var keshouhuo = 0;//植物成熟的数量
		for (var i = 0; i < this.TuDiBeans.length; i++) {
			if (this.TuDiBeans[i].img_yijian.visible) {
				if (this.TuDiBeans[i].data.status == 3) {
					return;
				}
			}
			this.TuDiBeans[i].img_yijian.visible = false;

			if (this.TuDiBeans[i].data.status == 3) {
				keshouhuo += 1;
				this.TuDiBeans[i].img_shouhuo.visible = true;
			}
		}

		for (var i = 0; i < this.TuDiBeans.length; i++) {
			if (this.TuDiBeans[i].data.status == 3 && !shouhuoisVisible && keshouhuo > 1) {
				this.TuDiBeans[i].img_yijian.visible = true;
				this.TuDiBeans[i].img_shouhuo.visible = false;
				shouhuoisVisible = true;
			}
		}

	}

	//判断是否显示一键收获得图标
	public AnimalYJSH() {
		var shouhuoisVisible = false;
		var keshouhuo = 0;//植物成熟的数量

	 

		for (var i = 0; i < this.animalBeans.length; i++) {
			if (this.animalBeans[i].img_yijian.visible) {
				if (this.animalBeans[i].data.status == 3) {
				 

					return;
				}
			}
		 

			this.animalBeans[i].img_yijian.visible = false;
			if (this.animalBeans[i].data.status == 3) {
				keshouhuo += 1;
				this.animalBeans[i].img_shouhuo.visible = true;
			}
		}

		for (var i = 0; i < this.animalBeans.length; i++) {
		 
			if (this.animalBeans[i].data.status == 3 && !shouhuoisVisible && keshouhuo > 1) {
			 
				this.animalBeans[i].img_yijian.visible = true;
				this.animalBeans[i].img_shouhuo.visible = false;
				shouhuoisVisible = true;
			}
		}

	}

	private VipTuDi() {

		this.TuDiBeans[Number(this.vip_tudi.name)].tudi.dispatchEvent(<egret.Event>new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));

	}

	public FillAnimal(data, lockDate) {
		var num = 0;
		var sum = 0;
		this.vip_animal.visible = false;
		for (var i = 0; i < data.length; i++) {
			if (JSON.stringify(data[i]) != JSON.stringify(this.animalBeans[data[i].code - 1].data)) {

				this.animalBeans[data[i].code - 1].setDate(data[i]);

			}

			if (data[i].status >= 1) {
				sum++;
			}
			if (data[i].status >= 2) {
				num++;
			}
			this.animalBeans[lockDate[i].landCode - 1].setLockDate(lockDate[i]);
			if (data[i].status == 0 && lockDate[i].cdtTpye == 3) {
				this.vip_animal.visible = true;
				this.group_game.addChildAt(this.vip_animal, this.group_game.getChildIndex(this.animaltudis[lockDate[i].landCode - 1]) + 1)
				this.vip_animal.x = this.animaltudis[lockDate[i].landCode - 1].x + this.animaltudis[lockDate[i].landCode - 1].width / 2 - this.vip_animal.width / 2;
				this.vip_animal.y = this.animaltudis[lockDate[i].landCode - 1].y + this.animaltudis[lockDate[i].landCode - 1].height / 2 - this.vip_animal.height;
				this.vip_animal.name = (lockDate[i].landCode - 1) + "";
			}
		}
		this.lab_muchangNum.text = num + "/" + sum;

		// var shouhuoisVisible = false;
		// for (var i = 0; i < this.animalBeans.length; i++) {
		// 	if (this.animalBeans[i].data.status == 3 && !shouhuoisVisible) {
		// 		this.animalBeans[i].img_shouhuo.visible = true;
		// 		shouhuoisVisible = true;
		// 	}
		// }
		this.AnimalYJSH();
	}

	private VipAnimal() {
		this.animalBeans[Number(this.vip_animal.name)].tudi.dispatchEvent(<egret.Event>new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
	}

	//type 1植物  2动物
	public ShouHUo(pond, data, type) {
		pond = pond - 1;
		this.touchEnabled = false;
		this.scroll.scrollPolicyH = "off";
		this.scroll.scrollPolicyV = "off";

		var img;
		switch (type) {
			case 1:
				img = this.tudis[pond];
				break;
			case 2:
				img = this.animaltudis[pond];
				break;
		}

		var timer = new egret.Timer(100, 3);
		timer.addEventListener(egret.TimerEvent.TIMER, this.JingHuaFly.bind(this, img, data, pond, type), this);
		timer.start();

		if (data.hb != 0) {
			this.HongBaoFly(img, data);
		}

	}

	public yiJianShouHUo(canShouHUoSeed, type, harvestData) {

		this.touchEnabled = false;
		this.scroll.scrollPolicyH = "off";
		this.scroll.scrollPolicyV = "off";

		var img;
		for (var i = 0; i < canShouHUoSeed.length; i++) {
			var pond = canShouHUoSeed[i].code - 1;
			if (type == 1) {
				img = this.tudis[pond];
			} else {
				img = this.animaltudis[pond];
			}
			var goldImg = this.createBitmap("nengliang_png", this.top_nengliang, img);
			goldImg.width = 60;
			goldImg.height = 60;

			var goldImg2 = this.createBitmap("gold2_png", this.top_gold, img);
			var goldImg3 = this.createBitmap("hongbao2_png", this.top_hongbao, img);
			goldImg3.width = 60;
			goldImg3.height = 65;

			this.YiJianFly(goldImg, this.top_nengliang, false, pond, null, type);
			this.YiJianFly(goldImg2, this.top_gold, false, pond, null, type);
			
			// i = 0 是计算收获
			this.YiJianFly(goldImg3, this.top_hongbao, i == 0, pond, harvestData, type);
		}

	}

	private JingHuaFly(tuDiimg: eui.Image, data, index, type, event: egret.TimerEvent) {

		var context = this;
		var sum = event.currentTarget.repeatCount;
		var currentCount = event.currentTarget.currentCount;

		if (currentCount <= 3) {
			this.GoldFly(tuDiimg, data, currentCount);
		}

		var goldImg: egret.Bitmap = this.createBitmap("nengliang_png", this.top_nengliang, tuDiimg);
		goldImg.width = 60;
		goldImg.height = 60;
		var onComplete2: Function = function () {

			if (this.contains(goldImg)) {
				this.removeChild(goldImg);//清空金币
				goldImg = null;
			}
			if (sum == currentCount) {
				context.updateMoneyByHarvestData(data);
			}
		};


		var onComplete1: Function = function () {
			this.lab_nengLiang.text = Math.floor(Number(this.lab_nengLiang.text) + data.plt_sessence / sum) + "";

			egret.Tween.get(this.top_nengliang).to({
				scaleX: 1.1,
				scaleY: 1.1
			}, 200).call(function () {
				this.top_nengliang.scaleX = 1;
				this.top_nengliang.scaleY = 1;
			}, this);

			egret.Tween.get(goldImg).to({ alpha: 0 }, 200).call(onComplete2, this);//隐藏金币
			if (sum == currentCount) {
				this.scroll.scrollPolicyH = "on";
				this.scroll.scrollPolicyV = "on";
				// Director.getInstance().getUser(true);

				//手动设置状态 单个更新
				// context.TuDiBeans[pond].data.status = 1;
				// context.TuDiBeans[pond].setDate(context.TuDiBeans[pond].data);

			}

		};
		context.clearPlantRoAnimalAni(index, type, 200);


		var goldX = this.top_nengliang.x + this.top_nengliang.width / 2;
		var goldY = this.top_nengliang.y + this.top_nengliang.height / 2;

		SoundsMgr.removeCell(currentCount)
		egret.Tween.get(goldImg).to({ x: goldX, y: goldY, alpha: 1 }, 800, egret.Ease.sineOut).call(onComplete1, this);
	}

	public clearPlantRoAnimalAni(index, type?, delay?){
		let bean = null;
		if(type == 1){
			bean = this.TuDiBeans[index];
		}else{
			bean = this.animalBeans[index];
		}

		egret.setTimeout(function(){
			bean.data.status = 1;
			bean.init();
		}, this, delay || 0);
	}
	public updateMoneyByHarvestData(harvestData){
		let arr = [
			{type: "gold", addNum: harvestData.gold},
			{type: "nengliang", addNum: harvestData.plt_sessence},
			{type: "hongbao", addNum: harvestData.hb}
		]
		this.updateMoney(arr);
	}


	private YiJianFly(goldImg, title, getuser?, index?, harvestData?, type?) {
		let self = this;
		var onComplete2: Function = function () {
			if (goldImg.parent != null) {
				goldImg.parent.removeChild(goldImg);//清空金币
				goldImg = null;
			}
		};
		var onComplete1: Function = function () {
			egret.Tween.get(title).to({
				scaleX: 1.1,
				scaleY: 1.1
			}, 200).call(function () {
				title.scaleX = 1;
				title.scaleY = 1;
			}, this);
			if (getuser) {
				this.scroll.scrollPolicyH = "on";
				this.scroll.scrollPolicyV = "on";
				this.canShouHUoSeed = [];
				// Director.getInstance().getUser(true);

				self.updateMoneyByHarvestData(harvestData);
			}


			egret.Tween.get(goldImg).to({ alpha: 0 }, 200).call(onComplete2, this);//隐藏金币
		};
		var goldX = title.x + title.width / 2;
		var goldY = title.y + title.height / 2;
		egret.Tween.get(goldImg).to({ x: goldX, y: goldY, alpha: 1 }, 800, egret.Ease.sineOut).call(onComplete1, this);
		self.clearPlantRoAnimalAni(index, type, 200);
	}

	private createBitmap(str, titleImg, tudiImg) {

		var goldImg: egret.Bitmap = new egret.Bitmap(RES.getRes(str));
		goldImg.anchorOffsetX = goldImg.width / 2;
		goldImg.anchorOffsetY = goldImg.height / 2;
		var randomNum = Math.round((Math.random() * 20 + 1));//随机增减xy值（使得金币看起来是散乱的）
		var randomFlag = Math.round((Math.random() * 4 + 1));//四个标记
		var randomR = Math.round((Math.random() * 180));
		goldImg.rotation = randomR;
		this.addChildAt(goldImg, this.getChildIndex(titleImg) - 1);//游戏层添加金币（自己决定）
		goldImg.x = tudiImg.x - this.group_game.scrollH + tudiImg.width / 2 + randomNum;
		goldImg.y = tudiImg.y - this.group_game.scrollV + randomNum;
		return goldImg;
	}

	public GoldFly(tudiImg, data, num) {


		var goldImg: egret.Bitmap = this.createBitmap("gold2_png", this.top_gold, tudiImg);
		goldImg.width = 60;
		goldImg.height = 60;
		var onComplete2: Function = function () {
			if (this.contains(goldImg)) {
				this.removeChild(goldImg);//清空金币
				goldImg = null;
			}
		};
		var onComplete1: Function = function () {
			this.lab_gold.text = Math.floor(Number(this.lab_gold.text) + data.gold / 3) + "";

			egret.Tween.get(this.top_gold).to({
				scaleX: 1.1,
				scaleY: 1.1
			}, 200).call(function () {
				this.top_gold.scaleX = 1;
				this.top_gold.scaleY = 1;
			}, this);

			egret.Tween.get(goldImg).to({ alpha: 0 }, 200).call(onComplete2, this);//隐藏金币
		};

		goldImg.visible = true;

		var goldX = this.top_gold.x + this.top_gold.width / 2;
		var goldY = this.top_gold.y + this.top_gold.height / 2;

		egret.Tween.get(goldImg).to({ x: goldX, y: goldY, alpha: 1 }, 800, egret.Ease.sineOut).call(onComplete1, this);
	}
	public HongBaoFly(tudiImg, data) {


		var goldImg: egret.Bitmap = this.createBitmap("hongbao2_png", this.top_hongbao, tudiImg);
		goldImg.width = 60;
		goldImg.height = 65;
		var onComplete2: Function = function () {
			if (this.contains(goldImg)) {
				this.removeChild(goldImg);//清空金币
				goldImg = null;
			}
		};
		var onComplete1: Function = function () {
			this.lab_hongbao.text = DataUtils.floot(Number(this.lab_hongbao.text) + data.hb) + "";

			egret.Tween.get(this.top_hongbao).to({
				scaleX: 1.1,
				scaleY: 1.1
			}, 200).call(function () {
				this.top_hongbao.scaleX = 1;
				this.top_hongbao.scaleY = 1;
			}, this);

			egret.Tween.get(goldImg).to({ alpha: 0 }, 200).call(onComplete2, this);//隐藏金币
		};

		goldImg.visible = true;
		var goldX = this.top_hongbao.x + this.top_hongbao.width / 2;
		var goldY = this.top_hongbao.y + this.top_hongbao.height / 2;
		egret.Tween.get(goldImg).to({ x: goldX, y: goldY, alpha: 1 }, 800, egret.Ease.sineOut).call(onComplete1, this);
	}


	private ball: egret.Bitmap;
	private guang: egret.Bitmap;
	public houseCom(str) {


		//	this.addChild(ResLoading.getInstance());
		// this.guang = new egret.Bitmap(RES.getRes("guang0_png"));
		// this.guang.x = Director.getInstance().gameLayer.width / 2 - this.guang.width / 2;
		// this.guang.y = Director.getInstance().gameLayer.height / 2 - this.guang.height / 2;

		//this.guang.addEventListener(egret.Event.ENTER_FRAME, this.Far, this);
		//this.addChild(this.guang);

		this.ball = new egret.Bitmap(RES.getRes(str));
		this.ball.width = 280;
		this.ball.height = 280;
		this.addChild(this.ball);


		this.ball.x = Director.getInstance().gameLayer.stageWidth / 2 - this.ball.width / 2;
		this.ball.y = Director.getInstance().gameLayer.stageHeight / 2 - this.ball.height / 2;


		var context = this;
		setTimeout(function () {
			//	context.guang.removeEventListener(egret.Event.ENTER_FRAME, context.Far, context);
			egret.Tween.get(context).to({ bse: 1 }, 1000).call(context.moveOver, context);
			egret.Tween.get(context.ball).to({ alpha: 0.8, scaleX: 0.2, scaleY: 0.2 }, 2000);
			//	context.guang.parent.removeChild(context.guang);
		}, 100);
	}
	private tudinum = 0;
	private Far() {

		this.tudinum = this.tudinum % 9;
		this.guang.texture = RES.getRes("guang" + this.tudinum + "_png")
		this.tudinum++;
	}
	public get bse(): number {
		return 0;
	}

	public set bse(value: number) {

		this.ball.x = (1 - value) * (1 - value) * 750 / 2 - this.ball.width / 2 + 2 * value * (1 - value) * (750 / 2 - 200) + value * value * (this.img_beibao.x + this.img_beibao.width / 2 + 50);
		this.ball.y = (1 - value) * (1 - value) * 1334 / 2 - this.ball.height / 2 + 2 * value * (1 - value) * (1334 / 2 - 100) + value * value * (this.img_beibao.y + 50);
	}

	private moveOver() {
		//	this.removeChild(ResLoading.getInstance());
		this.ball.parent.removeChild(this.ball);
		this.rec_beibao.visible = true;

	}
	private src_gonggao: eui.Scroller;
	private GunPing() {



		var context = this;
		var num = 0;
		var str = egret.localStorage.getItem("scrollText");
		this.lab_gonggao.text = str;


		var time = (1334 + this.lab_gonggao.width) / 0.1;

		context.lab_gonggao.x = this.src_gonggao.width;

		egret.Tween.get(context.lab_gonggao).to({
			x: 0 - context.lab_gonggao.width
		}, time).wait(3000).call(this.GunPing, context)
	}

	private willFinish = false;
	private Remove() {
		this.willFinish = true;

		egret.Tween.pauseTweens(this.lab_gonggao);


	}


	private FengChang(data) {
		console.log(data.props.length);

		if (data.slaveStatus != 0) {
			//有跟班
			var item = new ChanChu();
			item.setDate(data);
			Director.getInstance().pushSceneNoTw(item);
		} else {
			//没有跟班
			if (data.props.length == 0) {
				var genban = new GenBan();
				genban.setDate(data);
				Director.getInstance().pushSceneNoTw(genban);
			} else {
				var item2 = new ChanChu();
				item2.setDate(data);
				Director.getInstance().pushSceneNoTw(item2);
			}


		}

	}

	public RemoveGenBan_ShouYI(work_id) {
		var item = <Game_GenBan_ShouYi>this.group_game.getChildByName(work_id + "yulan");
		if (item != null) {
			this.group_game.removeChild(item);
		}
	}



	//拔河
	private openHongBao() {


		var context = this;
		FachUtils.Get("/tug/eventStatus", function (res) {
			if (res.status) {
				context.bahedate = res.resource;
				var item = <AnimalDragon>context.group_game.getChildByName("jiangbei")
				if (res.resource.status) {//活动是否开启
					if (item == null) {
						item = new AnimalDragon()
						item.name = "jiangbei";
						item.x = context.img_hongbao.x;
						item.y = context.img_hongbao.y + 60;
						item.setDate("奖杯_2");
						context.group_game.addChildAt(item, context.group_game.getChildIndex(context.img_hongbao) - 1);
						item.PlayAni4();
						context.img_hongbao.alpha = 0;
						context.suo_hongbaozhengduo.visible = false;
					}



					switch (context.bahedate.joinStatus) {//0 当前未参与拔河活动 1 参与正在进行中 2 参与已经结束（未收取）
						case 0:
							var item2 = new HongBaoZhengDuo()
							var cb = new CallBackFunc().handler(context.openHongBao, context, [])
							item2.setBack(context.bahedate, cb);
							Director.getInstance().pushScene(item2);
							break;


						case 1:
							var item3 = new BaHe(context.bahedate);

							Director.getInstance().pushScene(item3);
							break;


						case 2:
							var itembage = new BaHe_Result()

							itembage.setDate(context.bahedate);
							Director.getInstance().pushSceneScal(itembage);

							break;
					}


				} else {
					if (item != null) {
						context.group_game.removeChild(item);
					}
					context.img_hongbao.alpha = 1;
					context.suo_hongbaozhengduo.visible = true;
					PopoP.getTips("活动暂未开放");
				}


			}
		}, function (res) {

		});


	}


/////////////////////////////////////////NEW ADD///////////////////////

	// 更新货币
	updateMoney(obj){
		let datas = [];
		if(obj instanceof Array){
			datas = obj;
		}else{
			datas.push(obj);
		}

		let user = JSON.parse(egret.localStorage.getItem("user"));
		for(let i = 0; i < datas.length; ++i){
			let data = datas[i];
			if(data.type == "gold"){
				user.gold += data.addNum;
				this.lab_gold.text = DataUtils.floot(user.gold);
			}else if(data.type == "nengliang"){
				user.plt_sessence += data.addNum;
				this.lab_nengLiang.text = DataUtils.floot(user.plt_sessence);
			}else if(data.type == "hongbao"){
				user.hb += data.addNum;
				this.lab_hongbao.text = DataUtils.floot(user.hb);
			}
		}

		egret.localStorage.setItem("user", JSON.stringify(user));
	}

	// 获取金币数量
	getGold(){
		let user = JSON.parse(egret.localStorage.getItem("user"));
		return user.gold;
	}
}