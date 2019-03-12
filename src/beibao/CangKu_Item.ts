class CangKu_Item extends eui.ItemRenderer {
	public img: eui.Image;
	public lab_num: eui.Label;
	public lab_name: eui.Label;
	private group: eui.Group;
	private img_bg: eui.Image;
	public constructor() {
		super();
		this.skinName = "beibao_item1"
	}

	public createChildren() {
		console.log(this.currentState);
 
	 
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Touch, this);
	}

	private Touch() {
		if (this.data == null) {

			return;
		}
		Director.getInstance().gameLayer.addChild(new CangKu_XiangQing(this.data));
	}
	public dataChanged() {
 
		if (this.data == null) {

			return;
		}		 
		this.lab_name.text = this.data.name;
		this.img.source = Fach.host + this.data.img;
		this.lab_num.text = "x " + DataUtils.floot(this.data.count);
		this.img.maxHeight = this.group.width;
		this.img.maxWidth = this.group.height;

		if (this.data.type == 1) {
			this.img_bg.visible = true;
		} else if (this.data.type == 2) {
			this.img_bg.visible = false;
		}
	
	}


}