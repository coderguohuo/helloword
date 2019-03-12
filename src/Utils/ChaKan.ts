class ChaKan extends eui.Component {
	private lab_content: eui.Label;
	private lab_time: eui.Label;
	private img_close: eui.Image;
	private data: any;
	private scro: eui.Scroller;
	private num;
	public constructor(data: any,num:number) {
		super();
		this.data = data;
		this.num = num;
		this.skinName = "resource/skin/main/chakan.exml";
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.Close, this);
		
		this.initDate();
	}
	private initDate() {
	 
		this.lab_time.text = DataUtils.datePase(this.data.createTime);

		if (this.num == 1) {
			this.lab_content.text = this.data.note;
		} else {
			this.lab_content.text = this.data.content;
		}
		
	}
	private Close() {
		SoundsMgr.clickCell();
		this.parent.removeChild(this);
	}
}