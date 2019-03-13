class SelectSeed_Item extends eui.ItemRenderer {
	public img: eui.Image;
	public lab_zhongzhi: eui.Label;
	public lab_shouyi: eui.Label;
	public img_suo: eui.Image;
	private lab_name: eui.Label;
	public img_seed: eui.Image;
	private colorFlilter;
	private rec_down: eui.Rect;
	private rec_up: eui.Rect;
	public constructor() {
		super();
		this.skinName = "selectSeed_Item"
		this.rec_up.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
		this.rec_down.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Down, this);

	}

	public createChildren() {
		console.log(1);

	}
	private isClock = false;
	public dataChanged() {

		this.lab_name.text = this.data.name;
		this.lab_shouyi.text = DataUtils.floot(this.data.firHb) + "元";

		this.img.source = Fach.host + this.data.img;
		if (this.data.prop.needProp == -1) {
			this.lab_zhongzhi.text = this.data.plantPrice == 0 ? "免费" : DataUtils.floot(this.data.plantPrice);
		} else {
			this.lab_zhongzhi.text = this.data.prop.needCount
			this.img_seed.source = this.data.prop.img;
		}

		if (this.data.unclockStatus <= 1) {
			this.img_suo.visible = true;
			this.touchEnabled = false;
			var colorMatrix = [
				0.3, 0.6, 0, 0, 0,
				0.3, 0.6, 0, 0, 0,
				0.3, 0.6, 0, 0, 0,
				0, 0, 0, 1, 0
			];
			this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			this.img.filters = [this.colorFlilter];
			this.isClock = true;
		} else {
			this.isClock = false;
			this.img_suo.visible = false;
			this.img.filters = null;
		}

	}

	private Down() {
		if (this.isClock) {
			// 锁着状态,弹出种子 解锁页面
			Director.getInstance().pushScene(new Seed_XiangQIng(this.data, 1));
		} else {
			Director.getInstance().pushScene(new Seed_XiangQIng(this.data, 2));
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

		let self = this;
		if(willBean){
			this.updateLandToGrow(seedData, willBean, 200);
			self.rec_up.touchEnabled = false;
			egret.setTimeout(function(){
				self.rec_up.touchEnabled = true;
			}, self, 100);
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


	private Touch(e: egret.TouchEvent) {
		e.stopPropagation();

		var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		var context = this;
		var data = {
			id: this.data._id
		}

		if (this.isClock) {

			// 锁着状态,弹出种子 解锁页面
			Director.getInstance().pushScene(new Seed_XiangQIng(this.data, 1));
			return;
		}

		let self = this;
		let curSeedData = self.data;
		self.findEmptyLandAndPlant(curSeedData);
		// 注释 之前逻辑
		// FachUtils.Post("/plant/" + game.tudi_selected_pond, data, function (res) {
		// 	if (res.status) {
		// 		game.tudi_selected_pond = 0;

		// 		// game.remoSelectSeed();
		// 		Director.getInstance().getUser(true);
		// 	} else if (res.statusCode == 1081) {
		// 		// 无闲置土地 ,弹出种子收益详情
		// 		Director.getInstance().pushScene(new Seed_XiangQIng(context.data, 2));
		// 			PopoP.getTips(res.message);
		// 		//		game.remoSelectSeed();

		// 	} else {
		// 		PopoP.getTips(res.message);
		// 	}

		// }, function (res) {

		// });

	}
}