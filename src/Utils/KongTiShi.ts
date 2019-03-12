class KongTiShi {
	public constructor() {
	}
	public static KO(str: string, group: eui.Group) {
		var effectTips = new egret.TextField();
		effectTips.text = str;
		effectTips.size = 26;
		effectTips.textColor = 0x333333;

		effectTips.x = group.width / 2 - effectTips.width / 2;
		effectTips.y = group.height / 2 - effectTips.height / 2;
		group.addChild(effectTips);
	}
}