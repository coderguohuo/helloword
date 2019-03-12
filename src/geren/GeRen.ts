class GeRen extends eui.Component {
	public rec_close: eui.Rect;
	public img_icon: eui.Image;
	public lab_name: eui.Label;
	public lab_lv: eui.Label;
	public lab_id: eui.Label;
	public rec_jingyan: eui.Rect;
	public rec_sehngji: eui.Rect;
	public img_add_tili: eui.Image;
	public img_add_zuanshi: eui.Image;
	public lab_tili: eui.Label;
	public lab_zuanshi: eui.Label;
	public group_zhuren: eui.Group;
	public rec_jiejiu: eui.Rect;
	public lab_zhuren: eui.Label;
	public img_zhuren: eui.Image;
	public group_guanjia: eui.Group;
	public group_yaoqing: eui.Group;
	public group_gonggao: eui.Group;
	public img_needUp: eui.Image;

	public constructor() {
		super();
		this.skinName = "geren";
	}

	public createChildren() {
		 

		this.addListener();

		this.init();
	}

	private addListener() {
		this.rec_close.addEventListener("touchTap", this.Close, this);
		this.group_guanjia.addEventListener("touchTap", this.GuanJia, this);
		this.group_gonggao.addEventListener("touchTap", this.GongGao, this);
		this.group_yaoqing.addEventListener("touchTap", this.YaoQing, this);
		this.rec_sehngji.addEventListener("touchTap", this.ShengJi, this);
		this.img_add_zuanshi.addEventListener("touchTap", this.ZuanShi, this);
	}

	private GuanJia() {
		//	PopoP.getTips("您的管家正在从火星赶来");
		if (this.user.guanjiaTime && this.user.guanjiaTime >= (new Date().getTime() - Director.getInstance().ShiJianCha)) {
			Director.getInstance().pushScene(new GuanJia2());
		} else {

			Director.getInstance().pushScene(new GuanJia_XiangQing());
		}

	}

	private ZuanShi() {
	Director.getInstance().pushScene(new ChongZhi());
	}

	private GongGao() {
		//PopoP.getTips("暂未开放");
		Director.getInstance().pushSceneNoTw(new GongGao());
	}

	private YaoQing() {
		PopoP.getTips("暂未开放");
	}

	private ShengJi() {
		Director.getInstance().pushSceneNoTw(new GeRen_ShengJi());
		this.Close();
	}

	private user;
	private init() {
		var user = JSON.parse(egret.localStorage.getItem("user"));
		this.user = user;
		this.lab_name.text = user.nickname;
		this.lab_id.text = user.userid;
		this.lab_zuanshi.text = DataUtils.floot(user.dimond);
		this.lab_lv.text = this.user.class;
		if (this.user.avatar != null && this.user.avatar != "") {
			this.img_icon.source = this.user.avatar;
		} else {
			this.img_icon.source = "icon1_png";
		}
		//经验条
		var str = DataUtils.sub(this.user.nextExe, this.user.needExe);
		var scale = DataUtils.div((this.user.experience - str), this.user.needExe);

		if (this.user.experience >= this.user.nextExe) {
			this.img_needUp.visible = true;
		} else {
			this.img_needUp.visible = false;
		}
		if (this.user.needExe == -1) {
			this.img_needUp.visible = false;
		}
		if (scale <= 0) {
			scale = 0
		} else if (scale >= 1) {
			scale = 1;
		}
		if (this.user.needExe <= 0) {
			scale = 1;
		}
		this.rec_jingyan.width = scale * 300;

		this.group_zhuren.height = 0;
		this.group_zhuren.visible = false;
	}

	private Close() {
		Director.getInstance().removeSceneHeng(this);
	}
}