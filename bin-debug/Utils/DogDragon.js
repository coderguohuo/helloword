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
var DogDragon = (function (_super) {
    __extends(DogDragon, _super);
    function DogDragon(nam) {
        var _this = _super.call(this) || this;
        _this.isWeiShi = false;
        _this.type = 0;
        _this.num = 0;
        _this.nam = nam;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onTimer, _this);
        _this.start();
        return _this;
    }
    DogDragon.prototype.start = function () {
        this.container = new egret.DisplayObjectContainer();
        this.addChild(this.container);
        this.container.x = 0;
        this.container.y = 0;
        this.touchEnabled = false;
        this.nam = "哈士奇";
        var skeletonData = RES.getRes(this.nam + "_ske_json");
        var textureData = RES.getRes(this.nam + "_tex_json");
        var texture = RES.getRes(this.nam + "_tex_png");
        var factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        this.armature = factory.buildArmature("armatureName");
        //	this.armature = factory.buildArmature("Robot2");
        this.animation = this.armature.animation;
        this.armatureDisplay = this.armature.getDisplay();
        this.armatureDisplay.scaleX = 1;
        this.armatureDisplay.scaleY = 1;
        dragonBones.WorldClock.clock.add(this.armature);
        this.container.addChild(this.armatureDisplay);
        this.armatureDisplay.x = 0;
        this.armatureDisplay.y = 0;
        dragonBones.WorldClock.clock.add(this.armature);
        //启动骨骼动画播放
        this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
        // this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.frame_event, this);
    };
    DogDragon.prototype.PlayAni1 = function () {
        this.type = 1;
        this.armature.animation.gotoAndPlay("狗狗-待机");
    };
    DogDragon.prototype.PlayAni2 = function () {
        this.type = 2;
        this.armature.animation.gotoAndPlay("狗狗-饥饿");
    };
    DogDragon.prototype.PlayAni3 = function () {
        this.type = 3;
        this.armature.animation.gotoAndPlay("狗狗-开心升级");
    };
    DogDragon.prototype.PlayAni4 = function () {
        this.type = 4;
        this.armature.animation.gotoAndPlay("我来抓坏蛋");
    };
    DogDragon.prototype.PlayAni5 = function () {
        this.type = 5;
        this.armature.animation.gotoAndPlay("狗狗-喂养");
    };
    DogDragon.prototype.onTimer = function () {
        egret.stopTick(this.onTicker, this);
    };
    DogDragon.prototype.frame_event = function (evt) {
        console.log("armature 播放到了一个关键帧！ 帧标签为：", evt.frameLabel);
    };
    //动画播放完一轮完成！
    DogDragon.prototype.loop_com = function (evt) {
        //  console.log("armature 动画播放完一轮完成！");
        //  egret.stopTick(this.onTicker, this);
        // this.animation.stop("newAnimation");
        if (this.type == 3) {
            this.num++;
        }
        if (this.num == 2) {
            this.num = 0;
            this.PlayAni1();
        }
    };
    DogDragon.prototype.onTicker = function (timeStamp) {
        if (!this._time) {
            this._time = timeStamp;
        }
        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;
        dragonBones.WorldClock.clock.advanceTime(pass / 1000);
        return false;
    };
    return DogDragon;
}(eui.Component));
__reflect(DogDragon.prototype, "DogDragon");
//# sourceMappingURL=DogDragon.js.map