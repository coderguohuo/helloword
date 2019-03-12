module pindou{
	export class GetPinDouItem extends eui.ItemRenderer {
		public img: eui.Image;
		public lab_num: eui.Label;
		public lab_name: eui.Label;
		private group: eui.Group;
		private img_bg: eui.Image;
		public constructor() {
			super();
			this.skinName = "GetPinDouItemSkin"
		}

		public createChildren() {
			this["grpDo"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoClick, this);
		}


		public dataChanged() {
	
			if (this.data == null) {

				return;
			}		 

			this["imgIcon"].source = this.data.icon;
			this["labName"].text = this.data.name;
			this["labDouNum"].text = this.data.pinDouNum;
			this["labDes"].text = this.data.des;

			if(this.data.isFinish){
				(<eui.Rect>this["rectBg"]).fillColor = 0xF5F5F5;
			}else{
				(<eui.Rect>this["rectBg"]).fillColor = 0x83CD33;
			}
			this["btnName"].text = this.data.btnName;
		}

		onDoClick(){
			let id = this.data.id;

			if(this.data.isFinish){
				new Tips().show("已经完成");
				return;
			}

			let addNum = null;
			if(this.data.canGetAward){
				let getNum = this.data.pinDouNum;
				pinDouModel.pindou += getNum;
				pinDouModel.data[id].canGetAward = false;
				addNum = getNum;
			}else{
				pinDouModel.data[id].useTimes++;
				pinDouModel.data[id].canGetAward = true;
				new Tips().show("可以领奖咯");
			}

			let pinDouLayer = <GetPinDouLayer>Director.getInstance().getLayerByName("GetPinDouLayer");
			pinDouLayer.updateView(addNum);
		}

	}
}