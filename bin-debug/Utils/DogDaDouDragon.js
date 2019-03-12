var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DogDaDouDragon = (function (_super) {
    __extends(DogDaDouDragon, _super);
    function DogDaDouDragon(nam, bili) {
        var _this = _super.call(this) || this;
        _this.isWeiShi = false;
        _this.over = false;
        _this.fangxiang = 1;
        _this.startx = 0;
        _this.gongjifinish = false;
        _this.loopfinish = false;
        _this.bili = bili;
        _this.nam = nam;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onTimer, _this);
        _this.start();
        _this.container = new eui.Group();
        _this.addChild(_this.container);
        return _this;
    }
    DogDaDouDragon.prototype.start = function () {
    };
    DogDaDouDragon.prototype.setCallBack = function (cb) {
        this.cb = cb;
    };
    ;
    DogDaDouDragon.prototype.setDate = function (name) {
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
        this.armatureDisplay.y = 0 + this.armatureDisplay.height / 2;
        this.armatureDisplay.x = 0 + this.armatureDisplay.width / 2;
        this.animation.timeScale = 0.8; //动画播放速度
        //	if (!this.armature.hasEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE)) {
        this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
        //	}
        this.armatureDisplay.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.frame_event, this);
        this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.frame_event, this);
    };
    DogDaDouDragon.prototype.Lab = function (str) {
    };
    //耕地  灌溉  撒肥
    DogDaDouDragon.prototype.PlayAni1 = function () {
        this.actiontyoe = 0;
        this.x = this.startx;
        this.animation.timeScale = 0.8;
        this.armature.animation.gotoAndPlay("哈士奇-待机");
    };
    //首页树叶
    DogDaDouDragon.prototype.PlayAni2 = function () {
        this.actiontyoe = 3;
        this.animation.timeScale = 0.8; //动画播放速度
        this.armature.animation.gotoAndPlay("哈士奇-死亡");
    };
    //打鸣
    DogDaDouDragon.prototype.PlayAni3 = function () {
        this.actiontyoe = 1;
        this.gongjifinish = false;
        this.loopfinish = false;
        this.animation.timeScale = 1;
        var state = this.armature.animation.play("哈士奇-攻击", 1);
        this.parent.addChildAt(this, 100);
        egret.Tween.get(this).to({}, 400).to({
            x: this.x + this.scaleX * 300
        }, 300).to({}, 300).call(function () {
            this.gongjifinish = true;
            if (this.loopfinish) {
                this.x = this.startx;
            }
        }, this);
        egret.setTimeout(function () {
            this.cb.args[0] = 1;
            this.cb.back();
        }, this, 800);
    };
    DogDaDouDragon.prototype.onTimer = function () {
        dragonBones.WorldClock.clock.remove(this.armature);
        this.armature.dispose();
        egret.stopTick(this.onTicker, this);
    };
    DogDaDouDragon.prototype.frame_event = function (evt) {
        console.log(123);
        console.log("armature 播放到了一个关键帧！ 帧标签为：", evt.frameLabel);
    };
    //动画播放完一轮完成！
    DogDaDouDragon.prototype.loop_com = function (evt) {
        //	this.armature.animation.stop();
        this.x = this.startx;
        if (this.actiontyoe == 1) {
            this.loopfinish = true;
            if (this.gongjifinish) {
                this.x = this.startx;
            }
            this.PlayAni1();
            egret.setTimeout(function () {
                if (this.cb != null) {
                    this.cb.args[0] = 3;
                    this.cb.back();
                }
            }, this, 1500);
        }
        else if (this.actiontyoe == 3) {
            if (this.over) {
                //死亡
                this.cb.args[0] = 2;
                this.cb.back();
                this.armature.animation.gotoAndStopByProgress("哈士奇-死亡", 0.9);
            }
            else {
                this.PlayAni1();
            }
            this.x = this.startx;
        }
        else if (this.actiontyoe == 0) {
            this.x = this.startx;
        }
    };
    DogDaDouDragon.prototype.onTicker = function (timeStamp) {
        if (!this._time) {
            this._time = timeStamp;
        }
        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;
        dragonBones.WorldClock.clock.advanceTime(pass / 1000);
        return false;
    };
    return DogDaDouDragon;
}(eui.Group));
__reflect(DogDaDouDragon.prototype, "DogDaDouDragon");
//# sourceMappingURL=DogDaDouDragon.js.map