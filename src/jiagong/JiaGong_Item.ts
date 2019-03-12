class JiaGong_Item extends eui.ItemRenderer {
	public img: eui.Image;
	public lab_name: eui.Label;
	private colorFlilter;
	private rec_select: eui.Rect;
	public unClock = false;
	private user;
	public constructor() {
		super();
		this.skinName = "jiagong_item";
	}

	public createChildren() {
		var colorMatrix = [
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0.3, 0.6, 0, 0, 0,
			0, 0, 0, 1, 0
		];
		this.colorFlilter = new egret.ColorMatrixFilter(colorMatrix);

		//	this.img.filters = [this.colorFlilter];
		this.user = JSON.parse(egret.localStorage.getItem("user"));

	}

	public dataChanged() {
		this.img.source = Fach.host + this.data.img;
		this.lab_name.text = this.data.name;
		if (this.user.class >= this.data.u_class) {
			this.img.filters = null;
			this.unClock = true;
		} else {
			this.img.filters = [this.colorFlilter];
			this.unClock = false;
		}
	}
	public Onselect() {

		this.rec_select.visible = true;
		//	this.img.filters = null;
	}

	public OnCancelSelect() {

		//	this.img.filters = [this.colorFlilter];
		this.rec_select.visible = false;
	}

	public getCurrentState() {


		if (this.selected) {
			this.Onselect();
		} else {
			this.OnCancelSelect();
		}
		return this.selected + "";
	}


}