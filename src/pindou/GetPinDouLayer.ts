
module pindou {
	export class GetPinDouLayer extends eui.Component {
		labClose: eui.Label;
		labPinDouNum: eui.Label;
		labPinDou: eui.Label;
		imgSign: eui.Image;
		labSign: eui.Label;
		listGet: eui.List;
		selectTabIndex = 0;

		public constructor() {
			super();
			this.skinName = "GetPinDouLayerSkin"; // 83CD33 F5F5F5     333333
			this.name = "GetPinDouLayer";
		}

		public createChildren() {
			this.labClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
			this.imgSign.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignClick, this);
			// this.listGet.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemClick, this);

			let self = this;
			for(let i = 0; i < 3; ++i){
				let grpBtn = <eui.Group>this["grpTab"+i];
				grpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
					self.onTabClick(i);
				}, this);
			}
			
			this.updateView();
		}

		updateView(addNum?){
			this.labPinDouNum.text = "" + pinDouModel.pindou;
			let x = this.labPinDouNum.x + this.labPinDouNum.width;
			this.labPinDou.x = x + 10;

			if(pinDouModel.isSign){
				this.labSign.text = "已签到";
				this.imgSign.source = "img_map_gray_png";
			}else{
				this.labSign.text = "签到 >";
				this.imgSign.source = "img_map_show_png";
			}


			this.updateTabs();
			this.switchTab(this.selectTabIndex);

			if(addNum){
				this.playPinDouAddAction(addNum);
			}
		}


		updateTabs(){
			for(let i = 0; i < 3; ++i){
				let labTab = <eui.Label>this["labTab" + i];
				let imgTab = <eui.Image>this["imgTab" + i];

				if(i == this.selectTabIndex){
					labTab.textColor = 0x333333;
					imgTab.visible = true;
				}else{
					labTab.textColor = 0x666666;
					imgTab.visible = false;
				}
			}

			this.switchTab(this.selectTabIndex);
		}


		playPinDouAddAction(addNum?: number){
			if(addNum == null) addNum = 1;

			let flyLab = new eui.Label("+" + addNum);
			flyLab.textColor = 0x83CD33;
			flyLab.x = this.labPinDou.x + this.labPinDou.width + 5;
			let sy = this.labPinDou.y - 5;
			flyLab.y = sy;
			flyLab.size = 28;
			this.labPinDou.parent.addChild(flyLab);
			egret.Tween.get(flyLab).to({
				y: sy - 30,
				alpha: 0
			}, 1000).call(function(){
				flyLab.parent.removeChild(flyLab);
			});

			pinDouModel.pindou += addNum;
			this.labPinDouNum.text = "" + pinDouModel.pindou;
		}

		onSignClick(){
			if(pinDouModel.isSign){
				new Tips().show("已签到");
				return;
			}

			pinDouModel.isSign = true;
			this.labSign.text = "已签到";
			this.imgSign.source = "img_map_gray_png";
			new Tips().show("签到成功");

			this.playPinDouAddAction();
		}

		onTabClick(index, force?){
			if(!force && index == this.selectTabIndex) return;

			let preLab = <eui.Label>this['labTab' + this.selectTabIndex];
			let preImg = <eui.Image>this['imgTab' + this.selectTabIndex];
			preLab.textColor = 0x666666;
			preImg.visible = false;

			let labTab = <eui.Label>this['labTab' + index];
			let imgTab = <eui.Image>this["imgTab" + index];
			labTab.textColor = 0x333333;
			imgTab.visible = true;
			this.selectTabIndex = index;

			this.switchTab(index);
		}

		switchTab(index){
			if(index != 0) {
				new Tips().show("敬请期待");
				this.listGet.visible = false;
			}

			this.listGet.visible = true;
			this.listGet.dataProvider = new eui.ArrayCollection(pinDouModel.getPinDouList());
			this.listGet.itemRenderer = pindou.GetPinDouItem;
			this.listGet.validateNow();
		}

		close() {
			Director.getInstance().removeSceneNoTw(this);
		}

	}
}