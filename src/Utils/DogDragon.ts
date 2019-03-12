class DogDragon extends eui.Component {

	private nam;

	public constructor(nam: string) {
		super();

		this.nam = nam;
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onTimer, this);
		this.start();
	}
	/**骨骼角色拥有的动作列表**/
	private actionArray;
	/**骨骼角色执行的当前动作索引**/
	private actionFlag;
	/**存放骨骼动画的容器**/
	private container;
	/**骨骼的实体数据**/
	private armature;
	/**骨骼的可视对象**/
	public armatureDisplay;

	public isWeiShi = false;

	private animation;
	private _time: number;
	private start() {

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
		this.armatureDisplay.scaleY = 1


		dragonBones.WorldClock.clock.add(this.armature);
		this.container.addChild(this.armatureDisplay);
		this.armatureDisplay.x = 0;
		this.armatureDisplay.y = 0;

		dragonBones.WorldClock.clock.add(this.armature);
		//启动骨骼动画播放

		this.armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.loop_com, this);
		// this.armature.addEventListener(dragonBones.FrameEvent.ANIMATION_FRAME_EVENT, this.frame_event, this);

	}

	public PlayAni1() {

		this.type = 1;
		this.armature.animation.gotoAndPlay("狗狗-待机");

	}

	public PlayAni2() {
		this.type = 2;
		this.armature.animation.gotoAndPlay("狗狗-饥饿");

	}

	private type = 0;
	public PlayAni3() {
		this.type = 3;
		this.armature.animation.gotoAndPlay("狗狗-开心升级");

	}



	public PlayAni4() {
		this.type = 4;
		this.armature.animation.gotoAndPlay("我来抓坏蛋");

	}



	public PlayAni5() {
		this.type = 5;
		this.armature.animation.gotoAndPlay("狗狗-喂养");

	}







	private onTimer() {
		egret.stopTick(this.onTicker, this);
	}
	private frame_event(evt: dragonBones.FrameEvent) {
		console.log("armature 播放到了一个关键帧！ 帧标签为：", evt.frameLabel);
	}
	private num = 0;
	//动画播放完一轮完成！
	private loop_com(evt: dragonBones.ArmatureEvent) {
		//  console.log("armature 动画播放完一轮完成！");
		//  egret.stopTick(this.onTicker, this);
		// this.animation.stop("newAnimation");

		if (this.type == 3) {
			this.num++

		}

		if (this.num == 2) {
			this.num = 0;
			this.PlayAni1();
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