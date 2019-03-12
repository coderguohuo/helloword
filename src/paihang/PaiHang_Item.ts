class PaiHang_Item extends eui.ItemRenderer {

	public img_icon: eui.Image;
	public lab_name: eui.Label;
	public lab_hongbao: eui.Label;
	public img_pai: eui.Image;
	public lab_paiming: eui.Label;


	public constructor() {
		super();
		this.skinName = "paihang_item"
	}

	public dataChanged() {

		if (this.itemIndex < 3) {
			this.img_pai.source = "paihang_" + (this.itemIndex + 1) + "_png"
			this.lab_paiming.text = "";
		} else {
			this.img_pai.source = "paihang_4_png"
			this.lab_paiming.text = (this.itemIndex + 1) + "";
		}

		this.lab_name.text=this.data.name,
		this.lab_hongbao.text=DataUtils.floot(this.data.hb)+"";
		 

		if (this.data.avatar != null && this.data.avatar != "") {
			this.img_icon.source = this.data.avatar;
		} else {
			this.img_icon.source = "icon1_png";
		}
	}
}