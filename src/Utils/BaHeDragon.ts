class BaHeDragon extends eui.Group {

	private nam;
	public bili;
	public constructor(nam?, bili?) {
		super();
		this.bili = bili;
		this.nam = nam;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onTimer, this);
		this.start();
	}
	/**骨骼角色拥有的动作列表**/
	private actionArray;
	/**骨骼角色执行的当前动作索引**/
	private actionFlag;
	/**存放骨骼动画的容器**/
	private container: egret.DisplayObjectContainer;
	/**骨骼的实体数据**/
	private armature: dragonBones.Armature;
	/**骨骼的可视对象**/
	public armatureDisplay;

	public isWeiShi = false;
	public num;//已生长时长

	public sum;//总生长时长

	private animation;
	private _time: number;
	private start() {

		this.container = new eui.Group();
		this.addChild(this.container);
		// this.scaleX = 0.15;
		// this.scaleY = 0.15;

		//	this.touchEnabled = true;




		//启动骨骼动画播放
		// this.PlayAni1();

		// this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.frame_event, this);

	}

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
		console.log(this.container);

		this.container.addChild(this.armatureDisplay);

		this.armatureDisplay.y = 0 - this.armatureDisplay.height / 2;
		this.PlayAni1();

		if (!this.armature.hasEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE)) {

		}

	}

	public PlayAni1() {


		this.armature.animation.gotoAndPlay("红包拔河-待机");

	}

	private type;
	public PlayAni2() {
		this.type = 1;
		this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
		this.armature.animation.gotoAndPlay("红包拔河-甲方胜利起身");

	}

	public PlayAni3() {
		this.armature.animation.gotoAndPlay("红包拔河-甲方胜利持续欢呼");

	}


	public PlayAni4() {
		this.type = 2;
		this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
		this.armature.animation.gotoAndPlay("红包拔河-乙方胜利起身");

	}


	public PlayAni5() {
		this.armature.animation.gotoAndPlay("拔河比赛-乙方胜利欢呼");

	}





	private onTimer() {
		dragonBones.WorldClock.clock.remove(this.armature);
		this.armature.dispose();
		egret.stopTick(this.onTicker, this);
	}
	private frame_event(evt: dragonBones.FrameEvent) {
		console.log("armature 播放到了一个关键帧！ 帧标签为：", evt.frameLabel);
	}
	//动画播放完一轮完成！
	private loop_com(evt: dragonBones.ArmatureEvent) {
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