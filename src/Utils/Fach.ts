
declare var CryptoJS: any;
/**
 * 请求工具类
 */
class Fach {
//   public static host = "http://192.168.1.146:6100";
 	//  public static host = "http://47.92.88.214:6100"; // 测试
	 public static host = "http://api.hbnc.jimiws.com"; // 正式
	 

 
		// public static host = "http://t.api.hbnc.jimiws.com"
	public static path = "http://qr.liantu.com/api.php?text=http:///?user=";
 
	public static min1 = 300;
	public static max1 = 800;

	public static min2 = 1000;
	public static max2 = 3000;

	public static min3 = 2000;
	public static max3 = 5000;


	/**
	 * 获取加密否的TOKEN
	 */
	public static getToken(url, username, password) {
		if (!password && !egret.localStorage.getItem("user")) { return null }
		var pass = "";
		if (password) {
			pass = CryptoJS.AES.encrypt(url + ":" + Fach.uuid().toString(), CryptoJS.HmacMD5(password, password).toString()).toString();
			return "bearer " + username + ":" + pass;
		} else {
			if (egret.localStorage.getItem("user") == null) {
				return "";
			}

			var user = JSON.parse(egret.localStorage.getItem("user"));

			if (user.password == null) {
				return "";
			}
			pass = CryptoJS.AES.encrypt(url + ":" + Fach.uuid().toString(), user.password).toString();
			return "bearer " + user.username + ":" + pass;
		}
	}
	/**
	 * 获取数据
	 */
	public static readToken(url, token, success, error) {
		var request = new egret.HttpRequest();

		//设置返回信息为字符串
		request.responseType = egret.HttpResponseType.TEXT;
		//设置请求头
		request.setRequestHeader("Authorization", token);
		request.open(this.host + url, egret.HttpMethod.GET);
		request.send();
		//加载失败
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
		//加载进度
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
		//加载完成
		request.addEventListener(egret.Event.COMPLETE, success, this);
	}
	/**
	 * 增加数据
	 */
	public static createToken(url, data, token, success, error) {




		var request = new egret.HttpRequest();

		request.responseType = egret.HttpResponseType.TEXT;
		request.setRequestHeader("Authorization", token);
		request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		request.open(this.host + url, egret.HttpMethod.POST);
		request.send(JSON.stringify(data));
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
		request.addEventListener(egret.Event.COMPLETE, success, this);
	}
	private static onGetComplete(event: egret.Event): void {
		var request = <egret.HttpRequest>event.currentTarget;
		egret.log("get data : ", JSON.parse(request.response).message);
		return JSON.parse(request.response).message;
	}
	private static onGetIOError(event: egret.IOErrorEvent): void {
		var request = <egret.HttpRequest>event.currentTarget;
		//	console.log(request);
		egret.log("get error : " + event);
	}
	private static onGetProgress(event: egret.ProgressEvent): void {
		egret.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
	}


	public static createNoToken(url, data, success, error) {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;

		request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		request.open(this.host + url, egret.HttpMethod.POST);
		request.send(JSON.stringify(data));

		request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
		request.addEventListener(egret.Event.COMPLETE, success, this);
	}


	public static createNoToken2(url, data, success, error) {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;

		request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
		request.open(url, egret.HttpMethod.POST);
		request.send(JSON.stringify(data));

		request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
		request.addEventListener(egret.Event.COMPLETE, success, this);
	}


	public static readNoToken(url, success, error) {
		var request = new egret.HttpRequest();

		//设置返回信息为字符串
		request.responseType = egret.HttpResponseType.TEXT;

		request.setRequestHeader("Authorization", "token");
		request.open(url, egret.HttpMethod.GET);
		request.send();
		//加载失败
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
		//加载进度
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
		//加载完成
		request.addEventListener(egret.Event.COMPLETE, success, this);
	}

	public static uuid() {

		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());

	}
}