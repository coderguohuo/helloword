class PopoP {
	public constructor() {
	}


	public static getTips(str: string) {

		new Tips().show(str);


	}
	public static playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
		if (isLoop) {

			for (var key in target.items) {
				target.items[key].props = { loop: true };
			}
			target.play();
		} else {

			target.stop();

		}
	}

}