class TWUtils {
	private btn: eui.Button;
	public constructor(btn: eui.Button) {
		this.btn = btn;
	}

	public static TwCanTouch(btn: egret.DisplayObject) {
		btn.touchEnabled = false;
		SoundsMgr.playBtn();

		var onComplete1: Function = function () {

			egret.Tween.get(btn).to({
				scaleX: 1, scaleY: 1,
				x: btn.x - btn.width * 0.1,
				y: btn.y - btn.height * 0.1
			}, 100, egret.Ease.elasticOut).call(function () {
				btn.touchEnabled = true;
			}, this);


		}
		egret.Tween.get(btn).to({
			scaleX: 0.9, scaleY: 0.9,
			x: btn.x + btn.width * 0.1,
			y: btn.y + btn.height * 0.1
		}, 200, egret.Ease.sineIn).call(onComplete1, this);


	}

	public static Tw(btn: egret.DisplayObject) {

		SoundsMgr.playBtn();

		var onComplete1: Function = function () {

			egret.Tween.get(btn).to({
				scaleX: 1, scaleY: 1,
				x: btn.x - btn.width * 0.1,
				y: btn.y - btn.height * 0.1
			}, 100, egret.Ease.elasticOut).call(function () {

			}, this);


		}
		egret.Tween.get(btn).to({
			scaleX: 0.9, scaleY: 0.9,
			x: btn.x + btn.width * 0.1,
			y: btn.y + btn.height * 0.1
		}, 200, egret.Ease.sineIn).call(onComplete1, this);


	}

	public static TwNoTouch(btn: egret.DisplayObject) {

		var onComplete1: Function = function () {

			egret.Tween.get(btn).to({
				scaleX: 1, scaleY: 1, x: btn.x - btn.width / 4,
				y: btn.y - btn.height / 4
			}, 100, egret.Ease.elasticOut).call(function () {

			}, this);


		}
		egret.Tween.get(btn).to({
			scaleX: 0.5, scaleY: 0.5,
			x: btn.x + btn.width / 4,
			y: btn.y + btn.height / 4
		}, 200, egret.Ease.sineIn).call(onComplete1, this);


	}



	public static playAnimation2(btn: egret.DisplayObject) {
		var tw = egret.Tween.get(btn);
		tw.to({ x: btn.x += 20, y: btn.y += 20 }, 100, egret.Ease.bounceOut);
		tw.to({ x: btn.x -= 20, y: btn.y -= 20 }, 100, egret.Ease.bounceIn);
		tw.to({ x: btn.x += 20, y: btn.y += 20 }, 100, egret.Ease.bounceOut);
		tw.to({ x: btn.x -= 20, y: btn.y -= 20 }, 100, egret.Ease.bounceIn);
		tw.to({ x: btn.x += 20, y: btn.y += 20 }, 100, egret.Ease.bounceOut);
		tw.to({ x: btn.x -= 20, y: btn.y -= 20 }, 100, egret.Ease.bounceIn);
	}

}