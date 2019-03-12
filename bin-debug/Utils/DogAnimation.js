/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc 帧动画示例。
 *      触摸舞台会重新播放。
 *      播放过程中如果有帧事件，会触发egret.MovieClipEvent
 *      .FRAME_LABEL事件。
 *      在播放结束一次后会触发egret.Event.LOOP_COMPLETE
 *      事件。全部播放完全后，会触发egret.Event.COMPLETE事件
 *      。
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DogAnimation = (function (_super) {
    __extends(DogAnimation, _super);
    function DogAnimation() {
        var _this = _super.call(this) || this;
        _this._mcTexture = RES.getRes("run_png");
        _this._mcData = RES.getRes("run_json");
        _this.loop = 1;
        _this.name = "dog";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    DogAnimation.prototype.onAddToStage = function (event) {
        this.station();
    };
    //狗狗吃饱的动作
    DogAnimation.prototype.station = function () {
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        var role = new egret.MovieClip(mcDataFactory.generateMovieClipData("run"));
        role.play(-1);
        role.x = 50;
        role.y = -0;
        role.scaleX = 1;
        role.scaleY = 1;
        this.parent.addChild(role);
    };
    return DogAnimation;
}(egret.DisplayObjectContainer));
__reflect(DogAnimation.prototype, "DogAnimation");
//# sourceMappingURL=DogAnimation.js.map