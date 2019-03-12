class AnimalDragon extends eui.Group {

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

	private animation;
	private _time: number;
	private start() {



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

		this.container.addChild(this.armatureDisplay);
		this.armatureDisplay.y = 0 - this.armatureDisplay.height / 2;
		this.PlayAni2();

		if (!this.armature.hasEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE)) {
			this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
		}

	}
	//走路
	public PlayAni1() {

		this.armature.animation.gotoAndPlay("走路");

	}
	//喂食
	public PlayAni2() {
		this.armature.animation.gotoAndPlay("吃食");

	}
	//打鸣
	public PlayAni3() {
		this.armature.animation.gotoAndPlay("待机");

	}

	

	public PlayAni4() {
		this.armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
		this.armature.animation.gotoAndPlay("newAnimation");

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