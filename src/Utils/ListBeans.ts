class ListBeans {
	public static instance: ListBeans = null;

	private rect: eui.Rect;
	public static getInstance() {
		if (ListBeans.instance == null) {
			ListBeans.instance = new ListBeans();

		}
		return ListBeans.instance;
	}


	public seedMianBan = null;
	public animalMianBan = null;
	public zhuanpan = null;
}