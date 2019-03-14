class ResLoading extends eui.Component {

	private circle: eui.Image;
	private textLabel: eui.Label;

	private loadGroups = [];//要加载的组
	private index;//当前加载的组序列

	public  static loading: ResLoading;

	public constructor() {
		super();
		this.skinName = "resource/skin/aResLoadingSkin.exml";
		this.addEventListener(eui.UIEvent.COMPLETE, this.Complete, this);

	}

	public Complete(){
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}


	public  static getInstance() {
		if (this.loading == null) {
			this.loading = new ResLoading();
		}
		return this.loading;
	}

	private removeStage(){
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
	}

	private update() {
		this.circle.rotation += 3;
	}


	private setProgress(current, total): void {
		this.textLabel.text = current + "/" + total;
	}

}