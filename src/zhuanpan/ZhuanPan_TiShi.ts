class ZhuanPan_TiShi extends eui.Component {
	public lab_title: eui.Label;
	public lab_note: eui.Label;
	public img_close: eui.Image;
	public img_yes: eui.Image;
	public img: eui.Image;

	public constructor() {
		super();
		this.skinName = "zhuanpan_tishi"
	}

	public createChildren() {
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.img_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);


	}
	private type;
	public setDate(type) {
		this.type = type;
		switch (this.type) {
			case 1://金币不足
				this.lab_title.text = "金币不足";
				this.img.source = "gold2_png"
				this.lab_note.text = "请先种植农场获得金币"
				break;

			case 2://券不足
				this.lab_title.text = "幸运券不足";
				this.img.source = "zhaohuanquan_png";
				this.lab_note.text = "是否花费钻石去购买"

				break;
		}
	}

	private Yes() {
		switch (this.type) {
			case 1://金币不足
				Director.getInstance().removeScene(this);
				break;

			case 2://券不足

				PopoP.getTips("暂不可购买");
				break;
		}
	}

	private Close() {
		Director.getInstance().removeScene(this);
	}
}