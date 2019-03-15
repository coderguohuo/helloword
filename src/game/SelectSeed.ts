class SelectSeed extends eui.Component {
	public group: eui.Group;
	public list: eui.List;

	public rad_tutong: eui.RadioButton;
	public rad_gaoji: eui.RadioButton;
	public rad_xiyou: eui.RadioButton;
	public rad_chaofan: eui.RadioButton;
	public rad_shishi: eui.RadioButton;
	public rad_chuanqi: eui.RadioButton;
	public rad_qiji: eui.RadioButton;


	public img_close: eui.Image;

	private group_biaoqian: eui.Group;

	private scrSeed: eui.Scroller;

	public constructor() {
		super();
		this.skinName = "selectSeed"
		this.name = "selectseed";
	}

	public readonly DragedSize = 60;
	public dragedSeedData = null;
	public setSeedBeClicked(data){
		this.dragedSeedData = data;
		this.list.scrollEnabled = false;
		this.scrSeed.scrollPolicyH = eui.ScrollPolicy.OFF;

		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}

	public imgDragSeed: eui.Image;
	public onTouchMove(e: egret.TouchEvent){
		if(!this.dragedSeedData) return;

		console.log("stage-> moving now ! Mouse: [X:"+e.stageX+",Y:"+e.stageY+"]");
		
		if(this.imgDragSeed == null){
			let imgDragSeed = new eui.Image(Fach.host + this.dragedSeedData.img);
			imgDragSeed.width = imgDragSeed.height = this.DragedSize;
			this.addChild(imgDragSeed);
			this.imgDragSeed = imgDragSeed;
		}

		let p = this.globalToLocal(e.stageX, e.stageY);
		this.imgDragSeed.x = p.x - this.DragedSize/2; this.imgDragSeed.y = p.y - this.DragedSize/2;

		let game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		game.tryToPlant(e.stageX, e.stageY, this.dragedSeedData);
	}

	public onTouchEnd(e:egret.TouchEvent){
		console.log("stage-> moving over ! Mouse: [X:"+e.stageX+",Y:"+e.stageY+"]");

		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

		if(this.imgDragSeed){
			this.removeChild(this.imgDragSeed);
			this.imgDragSeed = null;
		}
		this.dragedSeedData = null;
		this.scrSeed.scrollPolicyH = eui.ScrollPolicy.AUTO;
	}


	public createChildren() {
		var context = this;
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.addEventListener("touchTap", this.Touch, this);

		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);


		if (ListBeans.getInstance().seedMianBan != null) {
			var res = ListBeans.getInstance().seedMianBan;
			var data = res.resource.plants;
			context.list.dataProvider = new eui.ArrayCollection(data);
			context.list.itemRenderer = SelectSeed_Item;
			context.BiaoQian(res.resource.tags);

		} else {
			FachUtils.Get2('/plant/tags', function (res) {
				if (res.status) {
					ListBeans.getInstance().seedMianBan = res;
					ListBeans.getInstance().seedMianBan.biaoqianName = [];
					var data = res.resource.plants;
					context.list.dataProvider = new eui.ArrayCollection(data);
					context.list.itemRenderer = SelectSeed_Item;
					context.BiaoQian(res.resource.tags);
				}
			}, function (res) {

			})
		}
	}

	private Touch(e: egret.TouchEvent) {
		switch (e.target) {
			case this.rad_shishi:
			case this.rad_chaofan:
			case this.rad_gaoji:
			case this.rad_tutong:
			case this.rad_xiyou:
			case this.rad_chuanqi:
			case this.rad_qiji:

				this.biaoqianName = e.target.name;
				this.TouchBiaoQian();

				break;
		}
	}

	private biaoqianName = null;
	public TouchBiaoQian() {
		var context = this;
		context.group.scrollH = 0;


		if (ListBeans.getInstance().seedMianBan.biaoqianName[Number(this.biaoqianName)] != null) {

			var res = ListBeans.getInstance().seedMianBan.biaoqianName[Number(this.biaoqianName)];
			var data = res.resource.plants;
			context.list.dataProvider = new eui.ArrayCollection(data);
			context.list.itemRenderer = SelectSeed_Item;
			context.list.dataProviderRefreshed();

		} else {

			FachUtils.Get2("/plant/seed/" + this.biaoqianName, function (res) {
				if (res.status) {
					ListBeans.getInstance().seedMianBan.biaoqianName[Number(context.biaoqianName)] = res;
					var data = res.resource.plants;
					context.list.dataProvider = new eui.ArrayCollection(data);
					context.list.itemRenderer = SelectSeed_Item;
					context.list.dataProviderRefreshed();
				}
			}, function (res) {

			});

		}


	}

	public HeChengCallBack() {

		var context = this;
		context.group.scrollH = 0;
		
		if (this.biaoqianName == null) {
			this.biaoqianName = this.group_biaoqian.getChildAt(0).name;
		}


		FachUtils.Get2("/plant/seed/" + this.biaoqianName, function (res) {
			if (res.status) {
				ListBeans.getInstance().seedMianBan.biaoqianName[Number(context.biaoqianName)] = res;
				var data = res.resource.plants;
				context.list.dataProvider = new eui.ArrayCollection(data);
				context.list.itemRenderer = SelectSeed_Item;
				context.list.dataProviderRefreshed();
			}
		}, function (res) {

		});

	}




	private BiaoQian(data) {
		for (var i = 0; i < data.length; i++) {
			var item = this.group_biaoqian.getChildByName(data[i].id);
			item.visible = true;
			this.group_biaoqian.addChildAt(item, i);
		}
		(<eui.RadioButton>this.group_biaoqian.getChildAt(0)).selected = true;
	}

	private Close() {
		var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		game.remoSelectSeed();
	}
}