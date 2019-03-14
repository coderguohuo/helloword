class TuDiBean extends eui.Component {

	public data;
	public tudi: eui.Image;
	public img_yijian: eui.Image;
	public img_daojishi: eui.Image;
	public lab_daojishi: eui.Label;
	public img_shouhuo: eui.Image;
	public group: eui.Group;
	public timer: DateTimer;
	public gif: Gif_action;
	private group_1: eui.Group;
	public lockDate;
	public constructor(img: eui.Image) {
		super();
		this.skinName = "tudiBean";
		this.tudi = img;
		this.tudi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
		this.img_shouhuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ShouHuo, this);
		this.img_yijian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yiJianShouHuo, this);
		//this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.Com,this);
	}
	private game: Game;
	public createChildren() {
		this.game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		this.timer = new DateTimer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.Timer, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Removed, this);
		this.gif = new Gif_action();

		this.group_1.scaleX = 0.7;
		this.group_1.scaleY = 0.7;
		this.group.y = this.height;


		var spMask = new egret.Shape();
		spMask.graphics.beginFill(0x000000);
		spMask.graphics.drawRect(0, 0, this.group.width, this.group.height);
		spMask.graphics.endFill();
		spMask.x = this.group.x;
		spMask.y = this.group.y;
		this.addChild(spMask);
		this.group.mask = spMask;
		//	this.tudi.parent.addChildAt(this, (this.tudi.parent.getChildIndex(this.tudi) + 12))
	}
	private isChengShu = false;
	private Timer() {
		this.lab_daojishi.text = DataUtils.DaoJiShi(this.data.harvestTime);

		if (this.data.harvestTime < (new Date().getTime() - Director.getInstance().ShiJianCha)) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
			this.timer.stop();
			this.data.status = 3;
			if (!this.isChengShu) {

				this.init();
				this.game.TuDiYJSH();
			}



		}
	}

	private Touch(e: egret.TouchEvent) {

		e.stopPropagation();


		if (this.data.status == 0) {

			var str = ""
			switch (this.lockDate.cdtTpye) {
				case 1:
					str = "此土地将于" + this.lockDate.personClass + "级解锁";
					PopoP.getTips(str);
					break;

				case 2:
					Director.getInstance().pushScene(new FenXiang_TuDi(this.data._id, this.lockDate.inviteCount));
					str = "邀请" + this.lockDate.inviteCount + "个好友解锁土地";
					break;

				case 3:
					str = "花费" + this.lockDate.dimond + "颗钻石解锁土地";
					var item = new VipJieSuo();
					var vipdata = {
						_id: this.data._id,
						price: this.lockDate.dimond,
						type: 1
					}
					item.setDate(vipdata);
					Director.getInstance().pushScene(item);
					break;

			}


		} else if (this.data.status == 1) {
			var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
			game.tudi_selected.x = this.tudi.x;
			game.tudi_selected.y = this.tudi.y;
			game.tudi_selected.visible = true;

			game.group_game.addChildAt(game.tudi_selected, game.group_game.getChildIndex(this.tudi) + 1);
			game.tudi_selected_pond = this.data.code;
			game.addSelectSeed();

		}
	}
	public setDate(data) {


		this.data = data;
		this.init();
	}

	public setLockDate(data) {
		this.lockDate = data;

	}



	private harvestDate;//预览收益
	public init() {

		this.harvestDate = null;

		// 0 未解锁 1 解锁闲置 2 生长中 3 已成熟
		console.log("this.data.status::::" + this.data.status);


		this.img_yijian.visible = false;
		this.img_shouhuo.visible = false;
		if (this.data.status == 0) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
			this.removeImg();
			this.tudi.source = "tudi2_png";
			//	this.tudi.touchEnabled = false;
		} else if (this.data.status == 1) {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
			this.removeImg();
			this.tudi.source = "tudi1_png";
			if (!this.tudi.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.tudi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
			}
		} else if (this.data.status >= 2) {

			if (!this.tudi.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
				this.tudi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
			}
			this.group.visible = true;
			this.x = this.tudi.x + this.tudi.width / 2 - this.width / 2;
			this.y = this.tudi.y + this.tudi.height / 2 - this.height;

			//已植植物

			var sum = 0;//成熟的总总周期
			var startTime = this.data.plantTime;
			this.lab_daojishi.text = DataUtils.DaoJiShi(this.data.harvestTime)

			var gifstr = "";



			//	switch (this.data.animationId) {
			switch (this.data.animationId) {
				case 1000:
					gifstr = "luhui";
					break;
				case 1001:
					gifstr = "hongmei";
					break;
				case 1002:
					gifstr = "chengzi";
					break;
				case 1003:
					gifstr = "putao";
					break;
				case 1004:
					gifstr = "lanmei";
					break;
				case 1005:
					gifstr = "mangguo";
					break;

			}


			this.gif.setDate(gifstr);
			this.group_1.addChildAt(this.gif.role, 0);


			this.isChengShu = false;
			if (this.data.status == 3) {
				//该收获了
				this.isChengShu = true;
				this.gif.chengShu();
				this.img_shouhuo.visible = true;
				this.group.visible = false;
				this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
				this.timer.stop();


				//成熟的植物放进game 集合

				var index = this.game.canShouHUoSeed.indexOf(this.data)
				if (index == -1) {
					this.game.canShouHUoSeed.push(this.data);
				}

			} else {

				this.addEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
				this.timer.start();
				this.gif.chengZhang();


			}


		}


	}

	private Frame() {


		this.img_daojishi.width = ((new Date().getTime() - Director.getInstance().ShiJianCha) - this.data.plantTime) / (this.data.harvestTime - this.data.plantTime) * 200;


	}



	private ShouHuo() {




		// var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		// if (game.canShouHUoSeed.length > 1) {//多个植物成熟
		// 	this.yiJianShouHuo();
		// 	return;
		// }
		var cb = new CallBackFunc().handler(this.GuanJia, this, [])
		var item = new Tw_ShouHuo(this.data, this.img_shouhuo, 1)
		item.setCb(cb);
		Director.getInstance().pushSceneNoTw(item);

	}

	//如果管家已收获,刷新页面
	private GuanJia() {
		console.log(123);

		this.data.status = 1;
		this.init();
		this.game.TuDiYJSH();
	}

	private yiJianShouHuo() {
		var context = this;
		var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		var arr = [];
		for (var i = 0; i < game.canShouHUoSeed.length; i++) {
			arr.push(game.canShouHUoSeed[i]);
		}

		var cb = new CallBackFunc().handler(this.GuanJia, this, [])
		var item = new Tw_YiJianShouHuo(arr, this.img_yijian, 1)
		item.setCb(cb);
		Director.getInstance().pushSceneNoTw(item);

		// for (var i = 0; i < arr.length; i++) {
		// 	var index = game.canShouHUoSeed.indexOf(arr[i]);
		// 	if (index != -1) {
		// 		game.canShouHUoSeed.splice(index, 1);
		// 	}

		// }

	}



	public removeImg() {
		var item = this.group_1.getChildByName("gif");


		if (item != null) {


			this.group_1.removeChild(item);
		}

	}

	private Removed() {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.Frame, this);
	}
}