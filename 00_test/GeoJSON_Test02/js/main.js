//ジャンプ（現在地）
function getLocation(getLatLng) {

    map.flyTo({
	center: [getLatLng.coords.longitude, getLatLng.coords.latitude], 
	zoom: 17,
	speed: 1.8,
	curve: 1
    });
};

//法務省地図レイヤ設定
function set_MOJ_Map() {

	var zoomlv = map.getZoom();

	//法務省地図【ポリゴン】
        map.addLayer({
                  'id': 'MOJ_fude-fill',
                  'type': 'fill',
                  'source': 'MOJ_Map',
                  'source-layer': 'fude',
                  'paint': {
                    "fill-color": "#ffff00",
                    "fill-opacity": 0.2
                  }
	});
	if( zoomlv > 17) {
			map.setPaintProperty('MOJ_fude-fill', 'fill-opacity', 0);
			}
			else
			{
			map.setPaintProperty('MOJ_fude-fill', 'fill-opacity', 0.2);
			};

	//法務省地図【ライン】
        map.addLayer({
                  'id': 'MOJ_fude-line',
                  'type': 'line',
                  'source': 'MOJ_Map',
                  'source-layer': 'fude',
                  'paint': {
                    "line-color": "#ff0000",
                  },
	});
	if( zoomlv > 16) {
			map.setPaintProperty('MOJ_fude-line', 'line-opacity', 1.0);
			}
			else
			{
			map.setPaintProperty('MOJ_fude-line', 'line-opacity', 0.1);
			};

	//法務省地図【代表点】
	var Moj_daihyoten = document.getElementById('daihyoten').value;
	if( Moj_daihyoten =="visible")
			 {
		        map.addLayer({
                		  'id': 'MOJ_daihyo',
		                  'type': 'circle',
		                  'source': 'MOJ_Map',
		                  'source-layer': 'daihyo',
		                  'paint': {
		                    'circle-radius': 20,  //半径
		                    'circle-color': 'rgba(128,255,128,0.1)',
		                    'circle-opacity': 0.1
		                  },
		                  'minzoom': 0,
		                  'maxzoom': 15,
				});
			}
			else
			{
				if (map.getLayer('MOJ_daihyo')) map.removeLayer('MOJ_daihyo');
			};
};


//ベース地図選択
function SelectMap(){

	var BaseMapName = document.getElementById('basemaps').value;
	var zoomlv = map.getZoom()

	if (map.getLayer('GSI_pale')) map.removeLayer('GSI_pale');
	if (map.getLayer('GSI_seamlessphoto')) map.removeLayer('GSI_seamlessphoto');
	if (map.getLayer('GSI_ort_USA10')) map.removeLayer('GSI_ort_USA10');
	if (map.getLayer('GSI_ort_old10')) map.removeLayer('GSI_ort_old10');
	if (map.getLayer('GSI_gazo1')) map.removeLayer('GSI_gazo1');
	if (map.getLayer('GSI_gazo2')) map.removeLayer('GSI_gazo2');
	if (map.getLayer('GSI_gazo3')) map.removeLayer('GSI_gazo3');
	if (map.getLayer('GSI_gazo4')) map.removeLayer('GSI_gazo4');

	map.removeLayer('MOJ_fude-fill');
	map.removeLayer('MOJ_fude-line');

	if (map.getLayer('MOJ_daihyo')) map.removeLayer('MOJ_daihyo');



 	// 空中写真切替え 
	if( BaseMapName =="GSI_pale-seamlessphoto") 
	{
		map.addLayer({
	          'id': 'GSI_seamlessphoto',
	          'type': 'raster',
	          'source': 'GSI_seamlessphoto',
	          'minzoom': 15,
	          'maxzoom': 23,
        	    }),
		map.addLayer({
	          'id': 'GSI_pale',
	          'type': 'raster',
	          'source': 'GSI_pale',
	          'minzoom': 0,
	          'maxzoom': 18,
        	    });
		if( zoomlv > 16) {
				map.setPaintProperty('GSI_pale', 'raster-opacity', 0.4);
				}
			else
				{
				map.setPaintProperty('GSI_pale', 'raster-opacity' , 1.0);
				};
	}
	else
	{
		map.addLayer({
	          'id': BaseMapName,
	          'type': 'raster',
	          'source': BaseMapName,
	          'minzoom': 14,
	          'maxzoom': 23,
        	    });
	};

	//法務省地図レイヤセット
	set_MOJ_Map();
};


//代表点表示設定
function SelectView(){
	var Moj_daihyoten = document.getElementById('daihyoten').value;
	if( Moj_daihyoten =="visible")
			 {
		        map.addLayer({
                		  'id': 'MOJ_daihyo',
		                  'type': 'circle',
		                  'source': 'MOJ_Map',
		                  'source-layer': 'daihyo',
		                  'paint': {
		                    'circle-radius': 20,  //半径
		                    'circle-color': 'rgba(128,255,128,0.1)',
		                    'circle-opacity': 0.1
		                  },
		                  'minzoom': 0,
		                  'maxzoom': 15,
				});
			}
			else
			{
				if (map.getLayer('MOJ_daihyo')) map.removeLayer('MOJ_daihyo');
			};

};



// マップ設定
var map = new maplibregl.Map({

    container: 'map',
    style: {
        center: [139.75417,36.50], // 日本全体
        zoom: 4, // ズームレベル
        minZoom: 5,
        maxZoom: 23,
        version: 8,
	hash: true,
	sources: {
            // シームレス空中写真
            GSI_seamlessphoto: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
                ],
                tileSize: 256,
                attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            },

            // 淡色地図
            GSI_pale: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
                ],
                tileSize: 256,
                attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            },

            // 空中写真（1945年～1950年）
            GSI_ort_USA10: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png',
                ],
                tileSize: 256,
                attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            },

            // 空中写真（1945年～1950年）
            GSI_ort_old10: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png',
                ],
                tileSize: 256,
                attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            },


            // 空中写真（1974年～1978年）  
            GSI_gazo1: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg',
                ],
                tileSize: 256,
                attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            },

            // 空中写真（1979年～1983年）  
            GSI_gazo2: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg',
                ],
                tileSize: 256,
                attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            },

            // 空中写真（1974年～1978年）  
            GSI_gazo3: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg',
                ],
                tileSize: 256,
                attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            },

            // 空中写真（1979年～1983年）  
            GSI_gazo4: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg',
                ],
                tileSize: 256,
                attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            },

            // 法務省地図
            MOJ_Map: {
                type: 'vector',
                tiles: ['https://x.optgeo.org/a/{z}/{x}/{y}.mvt'],
                minzoom: 5,
                maxzoom: 16,
                attribution:"<a href='https://www.moj.go.jp/MINJI/minji05_00494.html' target='_blank'>法務省地図</a>",
			},
		},

            layers: [
            ]
    },
});




    
//#################ロード時アクション#################

// ロードアクション
map.on('load', function () {

	//ベースマップ、法務省地図読込み（レイヤ設定）
	SelectMap();


	// 現在地取得
	navigator.geolocation.getCurrentPosition(getLocation);



	// 編集公図インポート（ソース）
	map.addSource('Edited_MojMap_01', {
		type : 'geojson',
		data : './GeoJSON/Edited_MojMap/07368038_01.geojson'
	});

	map.addSource('Edited_MojMap_02', {
		type : 'geojson',
		data : './GeoJSON/Edited_MojMap/07368038_02.geojson'
	});


	// 編集公図インポート（レイヤ）
	map.addLayer({
		id: 'Edited_MojMap_Fill_01',
		type: 'fill',
		source: 'Edited_MojMap_01',
		layout: {
		},
                  'paint': {
                    "fill-color": "#0000ff",
                    "fill-opacity": 0.2
                  },
                minzoom: 13,
                maxzoom: 23,
	});

	map.addLayer({
		id: 'Edited_MojMap_Line_01',
		type: 'line',
		source: 'Edited_MojMap_01',
		layout: {
		},
		paint: {
		'line-color': '#0000ff',
		'line-width': 1
		},
                minzoom: 13,
                maxzoom: 23,
	});


	map.addLayer({
		id: 'Edited_MojMap_Fill_02',
		type: 'fill',
		source: 'Edited_MojMap_02',
		layout: {
		},
                  'paint': {
                    "fill-color": "#00ff00",
                    "fill-opacity": 0.2
                  },
                minzoom: 13,
                maxzoom: 23,
	});

	map.addLayer({
		id: 'Edited_MojMap_Line_02',
		type: 'line',
		source: 'Edited_MojMap_02',
		layout: {
		},
		paint: {
		'line-color': '#00ff00',
		'line-width': 1
		},
                minzoom: 13,
                maxzoom: 23,
	});







});

//#################ロード時アクション#################



//#################マップコントロール（画面制御）#################

//ダブルクリックズーム制御（しない）
map.doubleClickZoom.disable();

//ドラッグ回転制御（しない）
map.dragRotate.disable();

//ピッチ回転制御（しない）
//map.pitchWithRotate.disable();

//タッチズーム回転制御（しない）
map.touchZoomRotate.disableRotation();


// マップコントロール（拡大・縮小・方位）
//map.addControl(new maplibregl.NavigationControl(), 'top-left');


// 現在位置表示
map.addControl(new maplibregl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    fitBoundsOptions: { maxZoom: 20 },
    trackUserLocation: false,
    showUserLocation: false
    }), 
    'top-right'
);


//ジオコーダー（OpenStreetMap）
var geocoder_api = {
	forwardGeocode: async (config) => {
		const features = [];
		try {
		  let request ='https://nominatim.openstreetmap.org/search?q=' +config.query +'&format=geojson&polygon_geojson=1&addressdetails=1';
			const response = await fetch(request);
			const geojson = await response.json();
		for (let feature of geojson.features) {
			let center = [
				feature.bbox[0] +
				(feature.bbox[2] - feature.bbox[0]) / 2,
				feature.bbox[1] +
				(feature.bbox[3] - feature.bbox[1]) / 2
			];
		let point = {
		type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: center
			},
			place_name: feature.properties.display_name,
			properties: feature.properties,
			text: feature.properties.display_name,
		place_type: ['place'],
		center: center
		};
	features.push(point);
	}
	} catch (e) {
	console.error(`Failed to forwardGeocode with error: ${e}`);
	}

	return {
		features: features
	};
	}
};
map.addControl(new MaplibreGeocoder(geocoder_api, {maplibregl: maplibregl}));


//#################マップコントロール（画面制御）#################



//#################クリックイベント（法務省地図）#################

// 選択筆情報コピー
function CopyFudeInfo(){
  var fude_info01 = document.getElementById("select_fude_text01").value;
  var fude_info02 = document.getElementById("select_fude_text02").value;
  var fude_info03 = document.getElementById("select_fude_text03").value;
  var fude_info04 = document.getElementById("select_fude_text04").value;
  var fude_info05 = document.getElementById("select_fude_text05").value;
  var fude_info06 = document.getElementById("select_fude_text06").value;
  var fude_info07 = document.getElementById("select_fude_text07").value;

  var select_fude_info = fude_info01 + '\n' +
			 fude_info02 + '\n' +
			 fude_info03 + '\n' +
			 fude_info04 + '\n' +
			 fude_info05 + '\n' +
			 fude_info06 + '\n' +
			 fude_info07 + '\n';

  navigator.clipboard.writeText(select_fude_info);


};

//クリック属性表示（法務省地図）
map.on('click', 'MOJ_fude-fill', (e) => {
    var chizumei = e.features[0].properties['地図名'];
    var city = e.features[0].properties['市区町村名'];
    var oaza = e.features[0].properties['大字名'];
    var tyome = e.features[0].properties['丁目名'];
    var koaza = e.features[0].properties['小字名'];
    var chiban = e.features[0].properties['地番'];
    var zahyokei = e.features[0].properties['座標系'];
    var zahyochisyubetu = e.features[0].properties['座標値種別'];
    var sokuchikeihanbetu = e.features[0].properties['測地系判別'];
    var shukusyakubunbo = e.features[0].properties['縮尺分母'];
    var seidokubun = e.features[0].properties['精度区分'];


   if( oaza === undefined ) { oaza= "" };
   if( tyome === undefined ) { tyome = "" };
   if( koaza === undefined ) { koaza = "" };

   if( zahyochisyubetu === undefined ) { zahyochisyubetu = "-" };
   if( sokuchikeihanbetu === undefined ) { sokuchikeihanbetu = "-" };
   if( shukusyakubunbo === undefined ) { shukusyakubunbo = "-" };
   if( seidokubun === undefined ) { seidokubun = "-" };

   var Google_LngLat = e.lngLat;
       Google_LngLat.toArray;



    new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
			'<b>' + '<big>' +city + oaza+ tyome + koaza + " " + chiban + '</big>' + '</b>' + '<br>' +
			"地番区域：" +  city + oaza + tyome + koaza + '<br>' +
			"地　番：" + chiban + '<br>' +
			"地図名：" +  '<small>' + chizumei +  '</small>' + '<br>' +
			"座標系：" + zahyokei + "<small>（" + zahyochisyubetu + "）" + "【" + sokuchikeihanbetu + "】</small>" + '<br>' +
			"縮尺（精度）：1/" + shukusyakubunbo + "（" + seidokubun + "）" + '<br>' +
			"【<a href='https://www.google.co.jp/search?q=" + city + oaza+ tyome+ koaza +  chiban + "' target='_blank'>Google検索</a>】" +
			"【<a href='https://www.google.co.jp/maps?q=" + e.lngLat.lat + "," + e.lngLat.lng + "&hl=ja' target='_blank'>GoogleMap</a>】" + 
			"<button id='copyButton' class='copyButton' onclick='CopyFudeInfo()'>コピー</button>" 
	).addTo(map);

    //選択筆情報に更新
    document.getElementById("select_fude_text01").innerText = city + oaza + tyome + koaza  + " " + chiban;
    document.getElementById("select_fude_text02").innerText = '地番区域：' + city + oaza + tyome + koaza;
    document.getElementById("select_fude_text03").innerText = '地番：' + chiban;
    document.getElementById("select_fude_text04").innerText = '地図名：' + chizumei;
    document.getElementById("select_fude_text05").innerText = '座標系：' + zahyokei + '（' + zahyochisyubetu + '）' + '【' + sokuchikeihanbetu + '】';
    document.getElementById("select_fude_text06").innerText = '縮尺（精度）：' + '1/' + shukusyakubunbo + '（' + seidokubun + '）';
    document.getElementById("select_fude_text07").innerText = '緯度経度：' + e.lngLat.lat + ',' + e.lngLat.lng;

});

//#################クリックイベント（法務省地図）#################


//#################クリックイベント（法務省地図）【編集01】#################

// 選択筆情報コピー
function CopyFudeInfo(){
  var fude_info01 = document.getElementById("select_fude_text01").value;
  var fude_info02 = document.getElementById("select_fude_text02").value;
  var fude_info03 = document.getElementById("select_fude_text03").value;
  var fude_info04 = document.getElementById("select_fude_text04").value;
  var fude_info05 = document.getElementById("select_fude_text05").value;
  var fude_info06 = document.getElementById("select_fude_text06").value;
  var fude_info07 = document.getElementById("select_fude_text07").value;

  var select_fude_info = fude_info01 + '\n' +
			 fude_info02 + '\n' +
			 fude_info03 + '\n' +
			 fude_info04 + '\n' +
			 fude_info05 + '\n' +
			 fude_info06 + '\n' +
			 fude_info07 + '\n';

  navigator.clipboard.writeText(select_fude_info);


};

//クリック属性表示（法務省地図）【編集01】
map.on('click', 'Edited_MojMap_Fill_01', (e) => {
    var chibankuiki = e.features[0].properties['地番区域'];
    var chiban = e.features[0].properties['地番'];

   var Google_LngLat = e.lngLat;
       Google_LngLat.toArray;



    new maplibregl.Popup({closeOnClick: true})
        .setLngLat(e.lngLat)
        .setHTML(
			'<b>' + '<big>' + chibankuiki + " " + chiban + '</big>' + '</b>' + '<br>' +
			"地番区域：" +  chibankuiki + '<br>' +
			"地　番：" + chiban + '<br>' +
			"【<a href='https://www.google.co.jp/search?q=" + chibankuiki +  chiban + "' target='_blank'>Google検索</a>】" +
			"【<a href='https://www.google.co.jp/maps?q=" + e.lngLat.lat + "," + e.lngLat.lng + "&hl=ja' target='_blank'>GoogleMap</a>】" + 
			"<button id='copyButton' class='copyButton' onclick='CopyFudeInfo()'>コピー</button>" 
	).addTo(map);

    //選択筆情報に更新
    document.getElementById("select_fude_text01").innerText = chibankuiki  + " " + chiban;
    document.getElementById("select_fude_text02").innerText = '地番区域：' + chibankuiki + koaza;
    document.getElementById("select_fude_text03").innerText = '地番：' + chiban;
    document.getElementById("select_fude_text07").innerText = '緯度経度：' + e.lngLat.lat + ',' + e.lngLat.lng;

});

//#################クリックイベント（法務省地図）【編集01】#################


//#################クリックイベント（法務省地図）【編集02】#################

// 選択筆情報コピー
function CopyFudeInfo(){
  var fude_info01 = document.getElementById("select_fude_text01").value;
  var fude_info02 = document.getElementById("select_fude_text02").value;
  var fude_info03 = document.getElementById("select_fude_text03").value;
  var fude_info04 = document.getElementById("select_fude_text04").value;
  var fude_info05 = document.getElementById("select_fude_text05").value;
  var fude_info06 = document.getElementById("select_fude_text06").value;
  var fude_info07 = document.getElementById("select_fude_text07").value;

  var select_fude_info = fude_info01 + '\n' +
			 fude_info02 + '\n' +
			 fude_info03 + '\n' +
			 fude_info04 + '\n' +
			 fude_info05 + '\n' +
			 fude_info06 + '\n' +
			 fude_info07 + '\n';

  navigator.clipboard.writeText(select_fude_info);


};

//クリック属性表示（法務省地図）【編集01】
map.on('click', 'Edited_MojMap_Fill_02', (e) => {
    var chibankuiki = e.features[0].properties['地番区域'];
    var chiban = e.features[0].properties['地番'];

   var Google_LngLat = e.lngLat;
       Google_LngLat.toArray;



    new maplibregl.Popup({closeOnClick: true})
        .setLngLat(e.lngLat)
        .setHTML(
			'<b>' + '<big>' + chibankuiki + " " + chiban + '</big>' + '</b>' + '<br>' +
			"地番区域：" +  chibankuiki + '<br>' +
			"地　番：" + chiban + '<br>' +
			"【<a href='https://www.google.co.jp/search?q=" + chibankuiki +  chiban + "' target='_blank'>Google検索</a>】" +
			"【<a href='https://www.google.co.jp/maps?q=" + e.lngLat.lat + "," + e.lngLat.lng + "&hl=ja' target='_blank'>GoogleMap</a>】" + 
			"<button id='copyButton' class='copyButton' onclick='CopyFudeInfo()'>コピー</button>" 
	).addTo(map);

    //選択筆情報に更新
    document.getElementById("select_fude_text01").innerText = chibankuiki  + " " + chiban;
    document.getElementById("select_fude_text02").innerText = '地番区域：' + chibankuiki + koaza;
    document.getElementById("select_fude_text03").innerText = '地番：' + chiban;
    document.getElementById("select_fude_text07").innerText = '緯度経度：' + e.lngLat.lat + ',' + e.lngLat.lng;

});

//#################クリックイベント（法務省地図）【編集02】#################




//#################マウスイベント（カーソル制御）#################

//マウスイベント【fude-fill上で動いている場合】
map.on('mousemove', 'MOJ_fude-fill', (e) => {
	if (e.features.length > 0) {map.getCanvas().style.cursor = 'pointer'}	//ポインター
				   else
				   {map.getCanvas().style.cursor = ''};
});


//マウスイベント【ドラッグ】
map.on('drag', function () {
	//グラッビングに変更（つかむ）
	map.getCanvas().style.cursor = 'grabbing';
});


//マウスイベント【ムーブエンド】
map.on('moveend', function () {
	//元に戻す
	map.getCanvas().style.cursor = '';
});


//マウスオーバーイベント
map.on('mouseover','MOJ_fude-fill', function() {


});


//マウスアウトイベント
map.on('mouseleave','MOJ_fude-fill', function() {
	//元に戻す
	map.getCanvas().style.cursor = '';

});

//#################マウスイベント（カーソル制御）#################



//#################ズームイベント（透過度）#################

//ズームペイント透過度
map.on('zoom', function() {
	var zoomlv = map.getZoom();
	if( zoomlv > 16) {
			map.setPaintProperty('MOJ_fude-line', 'line-opacity', 1.0);
			map.setPaintProperty('GSI_pale', 'raster-opacity', 0.4);
			}
			else
			{
			map.setPaintProperty('MOJ_fude-line', 'line-opacity', 0.1);
			map.setPaintProperty('GSI_pale', 'raster-opacity' , 1.0);
			};

	if( zoomlv > 17) {
			map.setPaintProperty('MOJ_fude-fill', 'fill-opacity', 0);
			map.setPaintProperty('Edited_MojMap_Fill_01', 0);
			map.setPaintProperty('Edited_MojMap_Fill_02', 0);
			}
			else
			{
			map.setPaintProperty('MOJ_fude-fill', 'fill-opacity', 0.2);
			map.setPaintProperty('Edited_MojMap_Fill_01', 0.2);
			map.setPaintProperty('Edited_MojMap_Fill_02', 0.2);
			};
});

//#################ズームイベント（透過度）#################


