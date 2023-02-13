function getLocation(getLatLng) {

    map.flyTo({
	center: [getLatLng.coords.longitude, getLatLng.coords.latitude], 
	zoom: 17,
	speed: 1.8,
	curve: 1
    });
};

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


var map = new maplibregl.Map({
    container: 'map',
    style: {
//        center: [140.8835,37.0509], // 中心座標（白土）
        center: [139.75417,36.50], // 日本全体
        zoom: 4, // ズームレベル
        minZoom: 5,
        maxZoom: 23,
        version: 8,

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
                // レイヤ設定（シームレス空中写真）
                {
                  id: 'GSI_seamlessphoto',
                  type: 'raster',
                  source: 'GSI_seamlessphoto',
                  minzoom: 15,
                  maxzoom: 23,
                },

                // レイヤ設定（淡色地図）
                {
                  id: 'GSI_pale',
                  type: 'raster',
                  source: 'GSI_pale',
                  minzoom: 0,
                  maxzoom: 18,
                },

                // レイヤ設定（法務省地図）【ポリゴン】
                {
                  id: 'MOJ_fude-fill',
                  type: 'fill',
                  source: 'MOJ_Map',
                  'source-layer': 'fude',
                  'paint': {
                    "fill-color": "#ffff00",
                    "fill-opacity": 0.2
                  }
                },

                // レイヤ設定（法務省地図）【ライン】
                {
                  id: 'MOJ_fude-line',
                  type: 'line',
                  source: 'MOJ_Map',
                  'source-layer': 'fude',
                  'paint': {
                    "line-color": "#ff0000",
                  },
                },



            ]
    },
});



// 複数年代の空中写真読込みしたい。【未実装】
map.on('load', function () {
    // ロード時のアクション（現在地取得）
    navigator.geolocation.getCurrentPosition(getLocation)
});




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



//クリック属性表示
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
			'<b>' + '<big>' +city + oaza+ tyome+ koaza + " " + chiban + '</big>' + '</b>' + '<br>' +
			"地番区域：" +  city + oaza+ tyome+ koaza + '<br>' +
			"地　番：" + chiban + '<br>' +
			"地図名：" +  '<small>' + chizumei +  '</small>' + '<br>' +
			"座標系：" + zahyokei + "<small>（" + zahyochisyubetu + "）" + "【" + sokuchikeihanbetu + "】</small>" + '<br>' +
			"縮尺（精度）：1/" + shukusyakubunbo + "（" + seidokubun + "）" + '<br>' +
			"【<a href='https://www.google.co.jp/search?q=" + city + oaza+ tyome+ koaza +  chiban + "' target='_blank'>Google検索</a>】" +
			"【<a href='https://www.google.co.jp/maps?q=" + e.lngLat.lat + "," + e.lngLat.lng + "&hl=ja' target='_blank'>GoogleMap</a>】"
	).addTo(map);
});






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
			}
			else
			{
			map.setPaintProperty('MOJ_fude-fill', 'fill-opacity', 0.2);
			};
});


