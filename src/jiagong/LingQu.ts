class LingQu extends eui.Component {
	public img_yes: eui.Image;
	public img: eui.Image;
	public lab_name: eui.Label;
	private data;
	public constructor(data) {
		super();
		this.data = data;
		this.skinName = "lingqu";
	}

	public createChildren() {
		SoundsMgr.win();
		this.img_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
		this.lab_name.text = this.data.name;
		this.img.source = Fach.host + this.data.img;
	}

	private Yes() {
		var game = <Game>Director.getInstance().gameLayer.getChildByName("game");
		game.houseCom(Fach.host + this.data.img);
		this.parent.removeChild(this);
	}


}