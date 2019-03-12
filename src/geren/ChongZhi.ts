class ChongZhi extends eui.Component {
	public lab_close: eui.Label;
	public rec_alipay: eui.Rect;
	public rec_wechat: eui.Rect;
	public rec_bank: eui.Rect;
	public img_type: eui.Image;
	public btn1: eui.Image;
	public btn2: eui.Image;
	public btn3: eui.Image;
	public btn4: eui.Image;
	public btn5: eui.Image;
	public btn6: eui.Image;
	public btn7: eui.Image;
	public btn8: eui.Image;
	public btn9: eui.Image;

	public constructor() {
		super();
		this.skinName = "chongzhi"
	}

	public createChildren() {
		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this)
		this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this)
		this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this)
		this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this)
		this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this)
		this.btn6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this)
		this.btn7.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this)
		this.btn8.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this)
		this.btn9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchBtn, this)

		this.rec_alipay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchRec, this)
		this.rec_wechat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchRec, this)
		this.rec_bank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchRec, this)
		this.rec_alipay.name = "1";
		this.rec_alipay.name = "2";
		this.rec_alipay.name = "3";
	}


	private price = 0;
	private TouchBtn(e: egret.TouchEvent) {

		this.price = Number(e.target.name);
	}

	private type = 1;
	private TouchRec(e: egret.TouchEvent) {
		this.type = Number(e.target.name);
		this.img_type.x = e.target.x;

	}




	private Close() {
		Director.getInstance().removeSceneNoTw(this)
	}
}