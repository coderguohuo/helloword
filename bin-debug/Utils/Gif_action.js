var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Gif_action = (function () {
    function Gif_action() {
        //	super();
        this.loop = 1;
        this.gifStr = "";
        //	this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.onAddToStage();
    }
    Gif_action.prototype.onAddToStage = function () {
        this.mcDataFactory = new egret.MovieClipDataFactory();
        this.role = new egret.MovieClip();
        this.role.name = "gif";
        this.role.touchEnabled = false;
        //	this.role.addEventListener(egret.Event.ADDED, this.Add, this);
        this.role.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.Rremove, this);
    };
    Gif_action.prototype.setDate = function (gifStr) {
        if (this.gifStr != gifStr) {
            this.mcDataFactory.clearCache();
        }
        this._mcTexture = RES.getRes(gifStr + "_png");
        this._mcData = RES.getRes(gifStr + "_json");
        this.mcDataFactory.mcDataSet = this._mcData;
        this.mcDataFactory.texture = this._mcTexture;
    };
    Gif_action.prototype.Add = function () {
        // this.role.x = this.role.parent.width / 2 - 150 / 2
        // this.role.y = this.role.parent.height - this.role.height;
    };
    //成长
    Gif_action.prototype.chengZhang = function () {
        this.role.movieClipData = this.mcDataFactory.generateMovieClipData("1");
        this.role.play(-1);
        this.Add();
        this.role.x = this.role.parent.width / 2 - 150 / 2;
        this.role.y = this.role.parent.height - this.role.height;
    };
    Gif_action.prototype.Rremove = function () {
        this.role.stop();
    };
    //成熟
    Gif_action.prototype.chengShu = function () {
        this.role.movieClipData = this.mcDataFactory.generateMovieClipData("2");
        this.role.play(-1);
        this.Add();
        this.role.x = this.role.parent.width / 2 - 150 / 2;
        this.role.y = this.role.parent.height - this.role.height + 20;
    };
    return Gif_action;
}());
__reflect(Gif_action.prototype, "Gif_action");
//# sourceMappingURL=Gif_action.js.map