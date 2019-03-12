class FachUtils {
	public constructor() {
	}



	public static Get(url: string, chenggong, shibai) {

		var loading = ResLoading.getInstance();
		egret.MainContext.instance.stage.addChild(loading);

		Fach.readToken(url, Fach.getToken(url, null, null),
			function (event: egret.Event) {

				if (loading.parent != null) {
					loading.parent.removeChild(loading);
				}
				var request = <egret.HttpRequest>event.currentTarget;
		     console.log(request.response);
				let response = JSON.parse(request.response);
				//联网成功
				chenggong(response);
			}, function (event: egret.Event) {
				if (loading.parent != null) {
					loading.parent.removeChild(loading);
				}
				// var request = <egret.HttpRequest>event.currentTarget;
				// let response = JSON.parse(request.response);
				//联网失败
				var response = {
					"message": "联网失败"
				}
				shibai(response);
			});
	}

		public static Get2(url: string, chenggong, shibai) {

		 
		Fach.readToken(url, Fach.getToken(url, null, null),
			function (event: egret.Event) {

				 
				var request = <egret.HttpRequest>event.currentTarget;
	    console.log(request.response);
				let response = JSON.parse(request.response);
				//联网成功
				chenggong(response);
			}, function (event: egret.Event) {
				 
				// var request = <egret.HttpRequest>event.currentTarget;
				// let response = JSON.parse(request.response);
				//联网失败
				var response = {
					"message": "联网失败"
				}
				shibai(response);
			});
	}
	public static Post(url: string, data: any, chenggong, shibai, isTurning?) {
		
		var loading = ResLoading.getInstance();
		if(isTurning){
			egret.MainContext.instance.stage.addChild(loading);
		}

		Fach.createToken(url, data, Fach.getToken(url, null, null),
			function (event: egret.Event) {
				if (loading.parent != null) {
					loading.parent.removeChild(loading);
				}
				var request = <egret.HttpRequest>event.currentTarget;
	    console.log(request.response);
				let response = JSON.parse(request.response);
				//联网成功
				chenggong(response);
			}, function (event: egret.Event) {
				if (loading.parent != null) {
					loading.parent.removeChild(loading);
				}
				var response = {
					"message": "联网失败"
				}
				shibai(response);
			});
	}


		public static Post2(url: string, data: any, chenggong, shibai) {
	 
		Fach.createToken(url, data, Fach.getToken(url, null, null),
			function (event: egret.Event) {
			 
				var request = <egret.HttpRequest>event.currentTarget;
 
				let response = JSON.parse(request.response);
				//联网成功
				chenggong(response);
			}, function (event: egret.Event) {
				 
				var response = {
					"message": "联网失败"
				}
				shibai(response);
			});
	}

	public static PostNoToken(url: string, data: any, chenggong, shibai) {
		var loading = ResLoading.getInstance();
		egret.MainContext.instance.stage.addChild(loading);
		Fach.createNoToken(url, data,
			function (event: egret.Event) {
				if (loading.parent != null) {
					loading.parent.removeChild(loading);
				}
				var request = <egret.HttpRequest>event.currentTarget;
		    console.log(request.response);
				let response = JSON.parse(request.response);
				//联网成功
				chenggong(response);
			}, function (event: egret.Event) {
				if (loading.parent != null) {
					loading.parent.removeChild(loading);
				}
				var response = {
					"message": "联网失败"
				}
				shibai(response);
			});
	}
}