class YaoQianShu extends eui.Component {
	public lab_close: eui.Label;
	public group_facai: eui.Group;
	public btn_facai: eui.Image;
	public xz1: eui.Image;
	public xz3: eui.Image;
	public xz2: eui.Image;
	public xz4: eui.Image;
	public group_zhaohui: eui.Group;
	public img_zhaohui: eui.Image;
	public list: eui.List;
	public group: eui.Group;

	public constructor() {
		super();
		this.skinName = "yaoqianshu"
	}
	private game: Game
	public createChildren() {
		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);

		this.btn_facai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.FaCai, this);
		this.img_zhaohui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ZhaoHUi, this);
		this.game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		this.init();
	}
	private jingpin = [];

	public setType(type) {
		var context = this;
		switch (type) {
			case 1:
				FachUtils.Get("/message/hbRecord/1/200", function (res) {
					if (res.status) {

						context.list.dataProvider = new eui.ArrayCollection(res.resource);
						context.list.itemRenderer = YaoQIanShu_Item;
						context.group.validateNow();

						if (res.sum == 0) {
							PopoP.getTips("您还没有被好友偷取红包");
						}
					}
				}, function (res) {

				});
				this.group_zhaohui.visible = true;
				this.group_facai.visible = false;
				break;
			case 2:
				var data;
				FachUtils.Get("/hb/offLineRewards", function (res) {
					if (res.status) {

						var arr = res.resource.props;
						if (res.resource.dimond != 0) {
							data = {
								count: res.resource.dimond,
								name: "钻石",
								img: "zuanshi4_png",
								bendi: 1
							}
							arr.push(data)
						}


						if (res.resource.experience != 0) {
							data = {
								count: res.resource.experience,
								name: "经验",
								img: "jingyan_png",
								bendi: 1
							}
							arr.push(data)
						}

						if (res.resource.gold != 0) {
							data = {
								count: res.resource.gold,
								name: "金币",
								img: "gold2_png",
								bendi: 1
							}
							arr.push(data)
						}


						if (res.resource.hb != 0) {
							data = {
								count: res.resource.hb,
								name: "红包",
								img: "hongbao2_png",
								bendi: 1
							}
							arr.push(data)
						}


						if (res.resource.plt_sessence != 0) {
							data = {
								count: res.resource.plt_sessence,
								name: "健康能量",
								img: "nengliang_png",
								bendi: 1
							}
							arr.push(data)
						}

						if (res.resource.tl != 0) {
							data = {
								count: res.resource.tl,
								name: "体力",
								img: "tiliping_png",
								bendi: 1
							}
							arr.push(data)
						}
						context.jingpin = arr;
					}
				}, function (res) {

				});
				this.group_zhaohui.visible = false;
				this.group_facai.visible = true;
				break
		}

	}
	private init() {



		var context = this;

	}

	private Close() {
		Director.getInstance().removeSceneNoTw(this);

	}

	private FaCai() {

		var context = this;
		FachUtils.Get("/hb/offLineRewards/harvest", function (res) {
			if (res.status) {
				context.Xiangzi(context.xz1);
				context.Xiangzi(context.xz2);
				context.Xiangzi(context.xz3);
				context.Xiangzi(context.xz4);

				context.game.img_yqs_menu.visible = false;
				egret.setTimeout(function () {
					context.tw();
				}, context, 1500);

			} else {
				PopoP.getTips(res.message)
			}
		}, function (res) {

		});



	}

	private Xiangzi(img) {

		//	this.xz1.source = "xiangzi2_png";
		egret.Tween.get(img).to({
			rotation: -10,
		}, 100).to({
			rotation: 10,
		}, 100).to({
			rotation: -10,
		}, 100).to({
			rotation: 10,
		}, 100).to({
			rotation: -10,
		}, 100).to({
			rotation: 10,
		}, 100).to({
			rotation: -10,
		}, 100).to({
			rotation: 10,
		}, 100).to({
			rotation: -10,
		}, 100).to({
			rotation: 10,
		}, 100).to({
			rotation: -10,
		}, 100).to({
			rotation: 10,
		}, 100).to({
			rotation: 0
		}, 100).call(function () {
			img.source = "xiangzi2_png";

		}, this)
	}

	private tw() {

		var item = new BaHe_LingQu();
		item.setDate(this.jingpin);
		Director.getInstance().pushSceneScal(item);
		Director.getInstance().removeSceneNoTw(this);
	}

	private ZhaoHUi() {
		Director.getInstance().pushSceneNoTw(new FenXiang_YaoQIanShu());
	}
}