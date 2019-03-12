module pindou {
	export class PinDouModel {
		config;
		data = { };
		pindou = 0;
		isSign = false;

		public constructor() {
			this.loadConfig();
			// this.initData();
		}

		loadConfig(){
			let urlLoader = new egret.URLLoader();
			let urlReq = new egret.URLRequest("resource/config/GetPinDouConfig.json");
			urlLoader.load(urlReq);
			urlLoader.addEventListener(egret.Event.COMPLETE, this.onConfigComplete, this);
		}

		onConfigComplete(event: egret.Event){
			let jsonStr = event.target.data;
			this.config = JSON.parse(jsonStr);
			this.initData();
		}

		initData(){
			for(let id in this.config){
				let cfg = this.config[id];
				let obj = {
					useTimes: 0,
					canGetAward: false,
				}
				this.data[id] = obj;
			}

			this.pindou = Math.floor(Math.random() * 1000);
		}

		getPinDouList(){
			let listData = [ ];

			for(let id in this.config){
				let cfg = this.config[id];
				let obj = this.data[id];
				let itemData = {
					id: Number(id),
					icon: cfg.icon,
					name: cfg.name,
					pinDouNum: cfg.getPinDouNum,
					des: cfg.des,
					btnName: cfg.btnName,
					canGetAward: obj.canGetAward,
					isFinish: false,
					order: 1 // 去做
				};

				if(obj.canGetAward){
					itemData.btnName = "领取拼豆";
					itemData.order = 0; // 可领取
				}

				if(cfg.dayTimes){
					if(obj.useTimes >= cfg.dayTimes){
						itemData.isFinish = true;
						itemData.btnName = "已完成";
						itemData.order = 2; // 已完成
					}
				}

				listData.push(itemData);
			}

			listData.sort(function(a, b): number{
				if(a.order != b.order){
					return a.order - b.order;
				}else{
					return a.id - b.id;
				}
			})
			
			return listData;
		}

		
	}

	export var pinDouModel = new pindou.PinDouModel();
}
