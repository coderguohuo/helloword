class ChangAn extends eui.Component {
	public lab_shouhuo: eui.Label;
	public lab_shengyu: eui.Label;
	 
	// public lab_tiem: eui.Label;
	// public group: eui.Group;
	public constructor(data ) {
		super();
		this.skinName = "resource/skin/changan.exml";
		 

		//	this.lab_tiem.text = DataUtils.DaoJiShi(data.senile);
			this.lab_shouhuo.text = DataUtils.div(Math.floor(DataUtils.mul(data.number, 100)), 100) + "只";
			if (data.pond >= 12) {
				this.lab_shengyu.text = DataUtils.div(Math.floor(DataUtils.mul(Fach.max3 - data.number, 100)), 100) + "只";
			} else if (data.pond >= 6) {
				this.lab_shengyu.text = DataUtils.div(Math.floor(DataUtils.mul(Fach.max2 - data.number, 100)), 100) + "只";
			} else if (data.pond >= 0) {
				this.lab_shengyu.text = DataUtils.div(Math.floor(DataUtils.mul(Fach.max1 - data.number, 100)), 100) + "只";
			}
	}
}