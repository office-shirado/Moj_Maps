//myButton（ボタンカスタム）

//位置取得（現在地）
var button_Locate = L.myButton(
	'fa-map-marker',					//アイコン
       	//ファンクション
	function (){
		map.locate({
			watch: false,
			timeout: 10000,
			maximumAge: 0,
			enableHighAccuracy: true,
			setView: true,
			zoom: 16
		});
	},
	'現在地'					//ホバーテキスト
);
