class GetMoney extends eui.Component {
	public lab_close: eui.Label;
	public btn_nc: eui.Image;
	public btn_mc: eui.Image;
	public btn_haoyou: eui.Image;

	public constructor() {
		super();
		this.skinName = "getmoney"
	}
	private game: Game;
	public createChildren() {
		this.lab_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		this.btn_nc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Nc, this);
		this.btn_mc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Mc, this);
		this.btn_haoyou.addEventListener(egret.TouchEvent.TOUCH_TAP, this.HaoYou, this);
		this.game = <Game>Director.getInstance().gameLayer.getChildByName("game");
	}



	private Nc() {
		this.game.group_game.scrollH = 187;
		this.game.group_game.scrollV = 183;
		Director.getInstance().removeSceneNoTw(this);
	}


	private Mc() {
		this.game.group_game.scrollH = 750;
		this.game.group_game.scrollV = 380;
		Director.getInstance().removeSceneNoTw(this);
	}


	private HaoYou() {
Director.getInstance().pushScene(new HaoYou());
Director.getInstance().removeSceneNoTw(this);
	}
	private Close() {
Director.getInstance().removeSceneNoTw(this);
	}
}