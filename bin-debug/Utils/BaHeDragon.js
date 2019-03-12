var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaHeDragon = (function (_super) {
    __extends(BaHeDragon, _super);
    function BaHeDragon(nam, bili) {
        var _this = _super.call(this) || this;
        _this.isWeiShi = false;
        _this.bili = bili;
        _this.nam = nam;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onTimer, _this);
        _this.start();
        return _this;
    }
    BaHeDragon.prototype.start = function () {
        this.container = new eui.Group();
        this.addChild(this.container);
        // this.scaleX = 0.15;
        // this.scaleY = 0.15;
        //	this.touchEnabled = true;
        //启动骨骼动画播放
        // this.PlayAni1();
        // this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.frame_event, this);
    };
    BaHeDragon.prototype.setDate = function (name) {
        if (name == "") {
            this.container.removeChildren();
            return;
        }
        this.nam = name;
        if (this.armature != null) {
            this.armature.dispose();
        }
        this.container.removeChildren();
        var skeletonData = RES.getRes(this.nam + "_ske_json");
        var textureData = RES.getRes(this.nam + "_tex_json");
        var texture = RES.getRes(this.nam + "_tex_png");
        var factory = dragonBones.EgretFactory.factory;
        factory.clear(false);
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        this.armature = factory.buildArmature("armatureName");
        this.animation = this.armature.animation;
        this.armatureDisplay = this.armature.getDisplay();
        dragonBones.WorldClock.clock.add(this.armature);
        console.log(this.container);
        this.container.addChild(this.armatureDisplay);
        this.armatureDisplay.y = 0 - this.armatureDisplay.height / 2;
        this.PlayAni1();
        if (!this.armature.hasEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE)) {
        }
    };
    BaHeDragon.prototype.PlayAni1 = function () {
        this.armature.animation.gotoAndPlay("红包拔河-待机");
    };
    BaHeDragon.prototype.PlayAni2 = function () {
        this.type = 1;
        this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
        this.armature.animation.gotoAndPlay("红包拔河-甲方胜利起身");
    };
    BaHeDragon.prototype.PlayAni3 = function () {
        this.armature.animation.gotoAndPlay("红包拔河-甲方胜利持续欢呼");
    };
    BaHeDragon.prototype.PlayAni4 = function () {
        this.type = 2;
        this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
        this.armature.animation.gotoAndPlay("红包拔河-乙方胜利起身");
    };
    BaHeDragon.prototype.PlayAni5 = function () {
        this.armature.animation.gotoAndPlay("拔河比赛-乙方胜利欢呼");
    };
    BaHeDragon.prototype.onTimer = function () {
        dragonBones.WorldClock.clock.remove(this.armature);
        this.armature.dispose();
        egret.stopTick(this.onTicker, this);
    };
    BaHeDragon.prototype.frame_event = function (evt) {
        console.log("armature 播放到了一个关键帧！ 帧标签为：", evt.frameLabel);
    };
    //动画播放完一轮完成！
    BaHeDragon.prototype.loop_com = function (evt) {
        switch (this.type) {
            case 1:
                this.PlayAni3();
                break;
            case 2:
                this.PlayAni5();
                break;
        }
        //  egret.stopTick(this.onTicker, this);
        // this.animation.stop("newAnimation");
    };
    BaHeDragon.prototype.onTicker = function (timeStamp) {
        if (!this._time) {
            this._time = timeStamp;
        }
        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;
        dragonBones.WorldClock.clock.advanceTime(pass / 1000);
        return false;
    };
    return BaHeDragon;
}(eui.Group));
__reflect(BaHeDragon.prototype, "BaHeDragon");
//# sourceMappingURL=BaHeDragon.js.map