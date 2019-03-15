class ResLoading extends eui.Component {

	private circle: eui.Image;
	public static loading: ResLoading;

	public constructor() {
		super();
		this.skinName = "resource/skin/aResLoadingSkin.exml";

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
	}

	private onAdded(){
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}

	private onRemoved(){
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
	}

	private update() {
		if(this.circle)
		{
			this.circle.rotation += 3;
		}
	}

	public static getInstance() {
		if (this.loading == null) {
			this.loading = new ResLoading();
		}
		return this.loading;
	}

}