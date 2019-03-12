class SoundMenager {
	private static shared: SoundMenager;
	public static Shared(): SoundMenager {
		if (SoundMenager.shared == null)
			SoundMenager.shared = new SoundMenager();
		return SoundMenager.shared;
	}

	private _right: egret.Sound;//如果胜利

	public _bgm: egret.Sound;//背景音乐
	public _bgm_channel: egret.SoundChannel;//保存用来静音用
	public constructor() {

		this._bgm = new egret.Sound();
		//this._bgm.addEventListener(egret.Event.COMPLETE, this.PlayBGM, this);
		this._bgm.load("resource/assets/sound/bg.mp3");

	}
	

	public PlayBGM() {
		if (this.IsMusic) {
			if (this._bgm_channel == null) {
				this._bgm_channel = this._bgm.play(0, 0);
			}

		}



	}
	public StopBGM() {
		if (this._bgm_channel != null) {
			this._bgm_channel.stop();
			this._bgm_channel = null;
		}
	}
	public PlayClick() {
		if (this.IsSound) {
			//this._click.play(0, 1);
		}
	}
	public PlayRight() {
		if (this.IsSound) {
			//this._right.play(0, 1);
		}
	}
	public PlayWrong() {
		if (this.IsSound) {
			//this._wrong.play(0, 1);
		}
	}
	public PlayWord() {
		if (this.IsSound) {
			//	this._word.play(0, 1);
		}
	}
	//音乐是否播放，保存设置
	public set IsMusic(value) {
		if (!value) {
			egret.localStorage.setItem("ismusic", "0");
			this.StopBGM();
		} else {
			egret.localStorage.setItem("ismusic", "1");
			this.PlayBGM();
		}
	}
	public get IsMusic(): boolean {
		var b = egret.localStorage.getItem("ismusic");
		if (b == null || b == "") {
			return true;
		}
		else {
			return b == "1";
		}
	}
	//声效是否播放，保存设置
	public set IsSound(value) {
		if (value) {
			egret.localStorage.setItem("isSound", "1");
		} else {
			egret.localStorage.setItem("isSound", "0");
		}
	}
	public get IsSound(): boolean {
		var b = egret.localStorage.getItem("isSound");
		if (b == null || b == "") {
			return true;
		}
		else {
			return b == "1";
		}
	}
}