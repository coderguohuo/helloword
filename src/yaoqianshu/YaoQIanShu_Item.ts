class YaoQIanShu_Item extends eui.ItemRenderer {
	public img_icon: eui.Image;
	public lab_name: eui.Label;
	public lab_hb: eui.Label;

	public constructor() {
		super();
		this.skinName = "yaoqianshu_item"
	}

	public dataChanged() {
		this.lab_hb.text = DataUtils.floot(this.data.hb);
		this.lab_name.text = this.data.stealFromNick;
		if (this.data.userAvatar != null && this.data.userAvatar != "") {
			this.img_icon.source = this.data.userAvatar;
		} else {
			this.img_icon.source = "icon1_png";
		}
	}
}