var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AnimalDragon = (function (_super) {
    __extends(AnimalDragon, _super);
    function AnimalDragon(nam, bili) {
        var _this = _super.call(this) || this;
        _this.isWeiShi = false;
        _this.bili = bili;
        _this.nam = nam;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onTimer, _this);
        _this.start();
        _this.container = new eui.Group();
        _this.addChild(_this.container);
        return _this;
    }
    AnimalDragon.prototype.start = function () {
        // this.container.horizontalCenter = 0;
        // this.container.verticalCenter = 0;
        // this.container.scaleX = 0.8;
        // this.container.scaleY = 0.8;
        //	this.touchEnabled = true;
        // 	var skeletonData = RES.getRes(this.nam + "_ske_json");
        // 	var textureData = RES.getRes(this.nam + "_tex_json");
        // 	var texture = RES.getRes(this.nam + "_tex_png");
        // //	var factory = dragonBones.EgretFactory.factory;
        // 	 var factory = new dragonBones.EgretFactory();
        // 	factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        // 	factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        // 	this.armature = factory.buildArmature("armatureName");
        // 	//	this.armature = factory.buildArmature("Robot2");
        // 	this.animation = this.armature.animation;
        // 	this.armatureDisplay = this.armature.getDisplay();
        // 	this.armatureDisplay.scaleX = 1;
        // 	this.armatureDisplay.scaleY = 1;
        // 	dragonBones.WorldClock.clock.add(this.armature);
        // 	this.container.addChild(this.armatureDisplay);
        // 	this.armatureDisplay.x = 0;
        // 	this.armatureDisplay.y = 0;
        // 	//启动骨骼动画播放
        //  	  this.PlayAni2();
        // this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.frame_event, this);
    };
    AnimalDragon.prototype.setDate = function (name) {
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
        this.container.addChild(this.armatureDisplay);
        this.armatureDisplay.y = 0 - this.armatureDisplay.height / 2;
        this.PlayAni2();
        if (!this.armature.hasEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE)) {
            this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
        }
    };
    //走路
    AnimalDragon.prototype.PlayAni1 = function () {
        this.armature.animation.gotoAndPlay("走路");
    };
    //喂食
    AnimalDragon.prototype.PlayAni2 = function () {
        this.armature.animation.gotoAndPlay("吃食");
    };
    //打鸣
    AnimalDragon.prototype.PlayAni3 = function () {
        this.armature.animation.gotoAndPlay("待机");
    };
    AnimalDragon.prototype.PlayAni4 = function () {
        this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
        this.armature.animation.gotoAndPlay("newAnimation");
    };
    AnimalDragon.prototype.onTimer = function () {
        dragonBones.WorldClock.clock.remove(this.armature);
        this.armature.dispose();
        egret.stopTick(this.onTicker, this);
    };
    AnimalDragon.prototype.frame_event = function (evt) {
        console.log("armature 播放到了一个关键帧！ 帧标签为：", evt.frameLabel);
    };
    //动画播放完一轮完成！
    AnimalDragon.prototype.loop_com = function (evt) {
        //  egret.stopTick(this.onTicker, this);
        // this.animation.stop("newAnimation");
        var suiji = Math.floor(Math.random() * 2);
        switch (suiji) {
            case 0:
                this.PlayAni2();
                break;
            case 1:
                this.PlayAni3();
                break;
        }
    };
    AnimalDragon.prototype.onTicker = function (timeStamp) {
        if (!this._time) {
            this._time = timeStamp;
        }
        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;
        dragonBones.WorldClock.clock.advanceTime(pass / 1000);
        return false;
    };
    return AnimalDragon;
}(eui.Group));
__reflect(AnimalDragon.prototype, "AnimalDragon");
//# sourceMappingURL=AnimalDragon.js.map