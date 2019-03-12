class Gif_action {

	private _mcTexture;
	private _mcData;
	private loop = 1;
	private type;
	public role: egret.MovieClip;
	private mcDataFactory: egret.MovieClipDataFactory;
	constructor() {
		//	super();


		//	this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.onAddToStage();
	}

	private onAddToStage() {

		this.mcDataFactory = new egret.MovieClipDataFactory();
		this.role = new egret.MovieClip();
		this.role.name = "gif";
		this.role.touchEnabled = false;


		//	this.role.addEventListener(egret.Event.ADDED, this.Add, this);
		this.role.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Rremove, this);
	}
	private gifStr = "";
	public setDate(gifStr) {
		if (this.gifStr != gifStr) {
			this.mcDataFactory.clearCache();
		}

		this._mcTexture = RES.getRes(gifStr + "_png");
		this._mcData = RES.getRes(gifStr + "_json");
		this.mcDataFactory.mcDataSet = this._mcData;
		this.mcDataFactory.texture = this._mcTexture;

	}

	private Add() {
		// this.role.x = this.role.parent.width / 2 - 150 / 2
		// this.role.y = this.role.parent.height - this.role.height;



	}


	//成长
	public chengZhang() {

		this.role.movieClipData = this.mcDataFactory.generateMovieClipData("1");
		this.role.play(-1);
		this.Add();
		this.role.x = this.role.parent.width / 2 - 150 / 2
		this.role.y = this.role.parent.height - this.role.height;
	}

	public Rremove() {

		this.role.stop();
	}

	//成熟
	public chengShu() {
		this.role.movieClipData = this.mcDataFactory.generateMovieClipData("2");
		this.role.play(-1);
		this.Add();
		this.role.x = this.role.parent.width / 2 - 150 / 2
		this.role.y = this.role.parent.height - this.role.height+20;

	}

}
