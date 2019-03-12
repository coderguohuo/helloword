class DaDou_Result extends eui.Component {
	public group_yes: eui.Group;
	public lab_name: eui.Label;
	public rec_yes: eui.Rect;
	public group_no: eui.Group;
	public rec_no: eui.Rect;

	private data
	public constructor(data) {
		super();
		this.data = data;
		this.skinName = "dadou_result"
	}

	public createChildren() {
		this.rec_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.No, this);
		this.rec_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Yes, this);
		if (this.data.resource.attacker == this.data.resource.winner) {
			this.group_no.visible = false;
			this.group_yes.visible = true;
		} else {
			this.group_no.visible = true;
			this.group_yes.visible = false;
		}
		Director.getInstance().getUser();
	}

	private cb: CallBackFunc;
	public CallBack(cb) {
		this.cb = cb;
	}
	private No() {
		this.cb.args[0] = 4;
		this.cb.back();
		this.parent.removeChild(this);
	}

	private Yes() {

		this.cb.args[0] = 4;
		this.cb.back();
		this.parent.removeChild(this);

	}



}