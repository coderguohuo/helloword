class SelectAnimal extends eui.Component {
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
	public constructor() {
		super();
		this.skinName = "selectSeed"
		this.name = "selectanimal";
	}


	public createChildren() {
		var context = this;
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.addEventListener("touchTap", this.Touch, this);

		if (ListBeans.getInstance().animalMianBan != null) {
			var res = ListBeans.getInstance().animalMianBan;
			let data = res.resource.plants;
			context.list.dataProvider = new eui.ArrayCollection(data);
			context.list.itemRenderer = SelectAnimal_Item;
			context.BiaoQian(res.resource.tags);

		} else {
			FachUtils.Get2('/animal/tags', function (res) {
				if (res.status) {
					ListBeans.getInstance().animalMianBan = res;
					ListBeans.getInstance().animalMianBan.BiaoQIan = [];
					var data = res.resource.plants;
					context.list.dataProvider = new eui.ArrayCollection(data);
					context.list.itemRenderer = SelectAnimal_Item;
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
				console.log(e.target.name);
				this.biaoqianName = e.target.name;
				this.TouchBiaoQian();

				break;
		}
	}

	private biaoqianName = null;
	public TouchBiaoQian() {
		var context = this;
		context.group.scrollH = 0;
		if (ListBeans.getInstance().animalMianBan.BiaoQIan[Number(this.biaoqianName)] != null) {
			var res = ListBeans.getInstance().animalMianBan.BiaoQIan[Number(this.biaoqianName)];
			var data = res.resource.plants;
			context.list.dataProvider = new eui.ArrayCollection(data);
			context.list.itemRenderer = SelectSeed_Item;
			context.list.dataProviderRefreshed();
		} else {
			FachUtils.Get2("/animal/seed/" + this.biaoqianName, function (res) {
				if (res.status) {
					ListBeans.getInstance().animalMianBan.BiaoQIan[Number(context.biaoqianName)] = res;
					var data = res.resource.plants;
					context.list.dataProvider = new eui.ArrayCollection(data);
					context.list.itemRenderer = SelectSeed_Item;
					context.list.dataProviderRefreshed();
				}
			}, function (res) {

			});
		}

	}

	public HeChengCallback() {


		if (this.biaoqianName == null) {
			this.biaoqianName = this.group_biaoqian.getChildAt(0).name;
		}
		var context = this;
		context.group.scrollH = 0;
		FachUtils.Get2("/animal/seed/" + this.biaoqianName, function (res) {
			if (res.status) {
				ListBeans.getInstance().animalMianBan.BiaoQIan[Number(context.biaoqianName)] = res;
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
		game.remoSelecAnimal();
	}
}