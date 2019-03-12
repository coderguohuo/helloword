class ResLoading extends eui.Component {

	private circle: eui.Image;
	private textLabel: eui.Label;

	private loadGroups = [];//要加载的组
	private index;//当前加载的组序列

	public  static loading: ResLoading;

	public constructor() {
		super();
		this.skinName = "src/loding/ResLoadingSkin.exml";

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
	}


	public  static getInstance() {
		if (this.loading == null) {
			this.loading = new ResLoading();
		}
		return this.loading;
	}
	private addStage() {
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}

	private update() {
		this.circle.rotation += 3;
	}





	private setProgress(current, total): void {
		this.textLabel.text = current + "/" + total;
	}

}