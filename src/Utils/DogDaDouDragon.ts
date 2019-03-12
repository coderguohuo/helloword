class DogDaDouDragon extends eui.Group {

	private nam;
	public bili;
	public constructor(nam?, bili?) {
		super();
		this.bili = bili;
		this.nam = nam;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onTimer, this);
		this.start();

		this.container = new eui.Group();

		this.addChild(this.container);
	}
	/**骨骼角色拥有的动作列表**/
	private actionArray;
	/**骨骼角色执行的当前动作索引**/
	private actionFlag;
	/**存放骨骼动画的容器**/
	public container: eui.Group;
	/**骨骼的实体数据**/
	private armature: dragonBones.Armature;
	/**骨骼的可视对象**/
	public armatureDisplay;

	public isWeiShi = false;
	public num;//已生长时长

	public sum;//总生长时长
	public over = false;
	private animation;
	private _time: number;

	public fangxiang = 1;
	private start() {

	}
	private cb: CallBackFunc;
	public setCallBack(cb) {
		this.cb = cb;
	};

	private shanghai: eui.Label;

	public setDate(name) {
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


		this.animation.timeScale = 0.8;//动画播放速度
		//	if (!this.armature.hasEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE)) {
		this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
		//	}
		this.armatureDisplay.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.frame_event, this);
		this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.frame_event, this);


	}

	public startx = 0;

	public Lab(str) {

	}
	//耕地  灌溉  撒肥
	public PlayAni1() {
		this.actiontyoe = 0;
		this.x = this.startx;
			this.animation.timeScale = 0.8;
		this.armature.animation.gotoAndPlay("哈士奇-待机");

	}
	//首页树叶
	public PlayAni2() {
		this.actiontyoe = 3;
		this.animation.timeScale = 0.8;//动画播放速度
		this.armature.animation.gotoAndPlay("哈士奇-死亡");


	}

	private actiontyoe;
	private gongjifinish = false;
	private loopfinish = false;
	//打鸣
	public PlayAni3() {
		this.actiontyoe = 1;
		this.gongjifinish = false;
		this.loopfinish = false;
	this.animation.timeScale = 1;
		var state: dragonBones.AnimationState = this.armature.animation.play("哈士奇-攻击", 1);
		this.parent.addChildAt(this, 100);
		egret.Tween.get(this).to({

		}, 400).to({
			x: this.x + this.scaleX * 300
		}, 300).to({

		}, 300).call(function () {
			this.gongjifinish = true;
			if (this.loopfinish) {
				this.x = this.startx;
			}
		}, this)


		egret.setTimeout(function () {
			this.cb.args[0] = 1;
			this.cb.back();
		}, this, 800);
	}


	public onTimer() {
		dragonBones.WorldClock.clock.remove(this.armature);
		this.armature.dispose();
		egret.stopTick(this.onTicker, this);
	}
	private frame_event(evt: dragonBones.FrameEvent) {
		console.log(123);
		console.log("armature 播放到了一个关键帧！ 帧标签为：", evt.frameLabel);
	}

	//动画播放完一轮完成！
	private loop_com(evt: dragonBones.ArmatureEvent) {

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
		} else if (this.actiontyoe == 3) {
			if (this.over) {
				//死亡
				this.cb.args[0] = 2;
				this.cb.back();
				this.armature.animation.gotoAndStopByProgress("哈士奇-死亡", 0.9);
			} else {
				this.PlayAni1();
			}


			this.x = this.startx;

		} else if (this.actiontyoe == 0) {
			this.x = this.startx;
		}

	}
	private onTicker(timeStamp: number) {

		if (!this._time) {
			this._time = timeStamp;
		}

		var now = timeStamp;
		var pass = now - this._time;
		this._time = now;

		dragonBones.WorldClock.clock.advanceTime(pass / 1000);

		return false;
	}
}