class GameTitle extends eui.Component {

	public img_icon: eui.Image;
	public img_beibao: eui.Image;
	public top_zuanshi: eui.Image;
	public img_addZuanShi: eui.Image;
	public img_addGold: eui.Image;
	public top_hongbao: eui.Image;
	public img_tixian: eui.Image;
	public img_paihang: eui.Image;
	public lab_beibao: eui.Label;
	public lab_zuanshi: eui.Label;
	public lab_gold: eui.Label;
	public lab_nengLiang: eui.Label;
	public lab_hongbao: eui.Label;
	public top_gold: eui.Image;
	public img_lv: eui.Image;
	public rec_jingyan: eui.Rect;
	public rec_tili: eui.Rect;
	public lab_lv: eui.Label;
	public top_nengliang: eui.Image;


	private hbdata;
	private touchx;
	private touchy;
	private type;//1 红包 2 佣金
	private haoyoudata;
	private img;
	public constructor(type, e: egret.TouchEvent, img, hbdata, haoyoudata) {
		super();
		this.haoyoudata = haoyoudata;
		this.type = type;
		this.touchx = e.stageX;
		this.touchy = e.stageY;
		this.img = img;


		this.hbdata = hbdata;
		this.skinName = "game_title";
	}

	public createChildren() {
		this.y = -200;
		egret.Tween.get(this).to({
			y: 0
		}, 500).call(function () {
			this.Fly()
		}, this);
		this.initUser();


	}

	private Remove() {
		var context = this;
		egret.Tween.get(this).to({
			y: -200
		}, 500).call(function () {
			context.parent.removeChild(this);
		}, this);
	}

	private Fly() {


		var timer = new egret.Timer(100, 6);
		timer.addEventListener(egret.TimerEvent.TIMER, this.JingHuaFly.bind(this, this.hbdata), this);
		timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.Complete, this);
		timer.start();
		this.HongBaoFly(this.hbdata);
	}

	private Complete() {
		this.img.visible = false;
		Director.getInstance().gameLayer.addChild(new HaoYou_TiShi(this.type, this.haoyoudata, this.hbdata));
	}
	private user;
	private initUser() {
		this.user = JSON.parse(egret.localStorage.getItem("user"));
		this.lab_gold.text = DataUtils.floot(this.user.gold);
		this.lab_hongbao.text = DataUtils.floot(this.user.hb);
		this.lab_nengLiang.text = DataUtils.floot(this.user.plt_sessence);

		if (this.user.avatar != null && this.user.avatar != "") {
			this.img_icon.source = this.user.avatar;
		} else {
			this.img_icon.source = "icon1_png";
		}


		this.rec_tili.width = this.user.power / 100 * 90;//体力
		this.lab_lv.text = this.user.class;//等级

		if (this.user.appLevel.levelName == "会员") {
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
	}


	private JingHuaFly(data, event: egret.TimerEvent) {
		var context = this;

		var sum = event.currentTarget.repeatCount;
		var currentCount = event.currentTarget.currentCount;

		if (currentCount <= 3) {
			this.GoldFly(data, currentCount);
		}

		var goldImg: egret.Bitmap = new egret.Bitmap(RES.getRes("nengliang_png"));
		goldImg.width = 60;
		goldImg.height = 60;
		goldImg.anchorOffsetX = goldImg.width / 2;
		goldImg.anchorOffsetY = goldImg.height / 2;
		var randomNum = Math.round((Math.random() * 20 + 1));//随机增减xy值（使得金币看起来是散乱的）
		var randomFlag = Math.round((Math.random() * 4 + 1));//四个标记
		var randomR = Math.round((Math.random() * 180));
		goldImg.rotation = randomR;

		this.addChildAt(goldImg, this.getChildIndex(this.top_nengliang) - 1);//游戏层添加金币（自己决定）




		goldImg.x = this.touchx - goldImg.width / 2;
		goldImg.y = this.touchy - goldImg.height / 2;

		var onComplete2: Function = function () {

			if (this.contains(goldImg)) {
				this.removeChild(goldImg);//清空金币
				goldImg = null;
			}

		};


		var onComplete1: Function = function () {
			this.lab_nengLiang.text = DataUtils.floot(Number(this.lab_nengLiang.text) + data.ess / sum) + "";

			egret.Tween.get(this.top_nengliang).to({
				scaleX: 1.1,
				scaleY: 1.1
			}, 200).call(function () {
				this.top_nengliang.scaleX = 1;
				this.top_nengliang.scaleY = 1;
			}, this);

			egret.Tween.get(goldImg).to({ alpha: 0 }, 200).call(onComplete2, this);//隐藏金币
			if (sum == currentCount) {

				Director.getInstance().getUser(true);
				context.Remove();
			}

		};

		goldImg.visible = true;


		var goldX = this.top_nengliang.x + this.top_nengliang.width / 2;
		var goldY = this.top_nengliang.y + this.top_nengliang.height / 2;

		SoundsMgr.removeCell(currentCount)
		egret.Tween.get(goldImg).to({ x: goldX, y: goldY, alpha: 1 }, 800, egret.Ease.sineOut).call(onComplete1, this);
	}

	public GoldFly(data, num) {
		var goldImg: egret.Bitmap = new egret.Bitmap(RES.getRes("gold2_png"));
		goldImg.anchorOffsetX = goldImg.width / 2;
		goldImg.anchorOffsetY = goldImg.height / 2;
		var randomNum = Math.round((Math.random() * 20 + 1));//随机增减xy值（使得金币看起来是散乱的）
		var randomFlag = Math.round((Math.random() * 4 + 1));//四个标记
		var randomR = Math.round((Math.random() * 180));
		goldImg.rotation = randomR;

		this.addChildAt(goldImg, this.getChildIndex(this.top_gold) - 1);//游戏层添加金币（自己决定）

		goldImg.x = this.touchx - goldImg.width / 2;
		goldImg.y = this.touchy - goldImg.height / 2;
		var onComplete2: Function = function () {
			if (this.contains(goldImg)) {
				this.removeChild(goldImg);//清空金币
				goldImg = null;
			}
		};
		var onComplete1: Function = function () {
			this.lab_gold.text = DataUtils.floot(Number(this.lab_gold.text) + data.gold / 3) + "";

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

	public HongBaoFly(data) {
		var goldImg: egret.Bitmap = new egret.Bitmap(RES.getRes("hongbao2_png"));
		goldImg.width = 60;
		goldImg.height = 65;
		goldImg.anchorOffsetX = goldImg.width / 2;
		goldImg.anchorOffsetY = goldImg.height / 2;

		var randomNum = Math.round((Math.random() * 20 + 1));//随机增减xy值（使得金币看起来是散乱的）
		var randomFlag = Math.round((Math.random() * 4 + 1));//四个标记
		var randomR = Math.round((Math.random() * 180));
		goldImg.rotation = randomR;

		this.addChildAt(goldImg, this.getChildIndex(this.top_hongbao) - 1);//游戏层添加金币（自己决定）

		goldImg.x = this.touchx - goldImg.width / 2;
		goldImg.y = this.touchy - goldImg.height / 2;

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


}