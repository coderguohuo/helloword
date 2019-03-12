class BaHe_LingQu extends eui.Component {

	public img_bg: eui.Image;
	public img_beibao: eui.Image;
	public group: eui.Group;
	public lab_name: eui.Label;
	public lab_num: eui.Label;
	public img: eui.Image;

	public constructor() {
		super();
		this.skinName = "zhuanpan_result";
	}

	public createChildren() {
		//	this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
	}

	private Touch() {
		Director.getInstance().removeSceneNoTw(this);
	}


	private data;//[]
	private index = 0;
	public setDate(data) {
		this.data = data;
		console.log("~~~~~~~~~~~~~~~~~~");
		
		console.log(JSON.stringify(data));
		
		this.index = 0;
		this.BeginFily();
	}

	private BeginFily() {
		this.twFly(this.data[this.index])
	}

	public twFly(data) {

		if (data.bendi == 1) {
			this.img.source = data.img;
		} else {
			this.img.source = Fach.host + data.img;
		}
 

		this.lab_name.text = data.name;
		this.lab_num.text = "x"+data.count;
		this.group.scaleX = 0.3;
		this.group.scaleY = 0.3;
		this.group.x = 750 / 2;
		this.group.y = 1334 / 2;
		egret.Tween.get(this.group).to({
			scaleY: 1,
			scaleX: 1
		}, 200).to(
			{}
			, 1000).to({
				scaleY: 0.3,
				scaleX: 0.3,
				x: this.img_beibao.x,
				y: this.img_beibao.y
			}, 500).call(function () {
				if (this.index == (this.data.length - 1)) {
					//完成
					this.Touch();
				} else {
					this.index++
					this.twFly(this.data[this.index])
				}
			}, this)
	}
}