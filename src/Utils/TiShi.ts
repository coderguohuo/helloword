class TiShi extends eui.Component {
	public lab_content: eui.Label;
	private btn_yes: eui.Image;
	private btn_no: eui.Image;
	private callback: CallBackFunc;

	public constructor(str, callback: CallBackFunc) {
		super();
		this.callback = callback;
		this.skinName = "resource/skin/tishi.exml";
		this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.QueRen, this);
		this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.No, this);
		this.lab_content.text = str;
	}


	public initDate() {


	}

	public initListener() {

	}

	private No() {
		this.parent.removeChild(this);
	}
	private QueRen() {
		
		this.callback.exec();
		this.parent.removeChild(this);


	}
}