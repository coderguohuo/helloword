class ShengJi_CG extends eui.Component {
	public lab_lvlast: eui.Label;
	public lab_lv: eui.Label;
	public lab_hpLast: eui.Label;
	public lab_qizhiLast: eui.Label;
	public lab_baojiLast: eui.Label;
	public lab_hp: eui.Label;
	public lab_qizhi: eui.Label;
	public lab_baoji: eui.Label;
	private data;
	public constructor(data) {
		super();
		this.data = data;
		this.skinName = "shengji_chenggong"
	}

	public createChildren() {
		this.addEventListener("touchTap", this.Close, this);
		this.lab_lvlast.text = this.data[0].class;
		this.lab_hpLast.text = this.data[0].setting.hp;
		this.lab_qizhiLast.text = this.data[0].setting.vitality;
		this.lab_baojiLast.text = DataUtils.floot(DataUtils.mul(100, this.data[0].setting.crit_rate)) + "%";

		this.lab_lv.text = this.data[1].class;
		this.lab_hp.text = this.data[1].setting.hp;
		this.lab_qizhi.text = this.data[1].setting.vitality;
		this.lab_baoji.text = DataUtils.floot(DataUtils.mul(100, this.data[1].setting.crit_rate)) + "%";

		
	}

	private Close() {
		this.parent.removeChild(this);
	}
}