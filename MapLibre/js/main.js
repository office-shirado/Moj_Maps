var map = new maplibregl.Map({
    container: 'map',
    style: {
        center: [140.8835,37.0509], // 中心座標
        zoom: 16, // ズームレベル
        minZoom: 4,
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

            // 法務省地図
            MOJ_Map: {
                type: 'vector',
                tiles: ['https://x.optgeo.org/a/{z}/{x}/{y}.mvt'],
                minzoom: 14,
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

                // レイヤ設定（淡色地図01）
                {
                  id: 'GSI_pale01',
                  type: 'raster',
                  source: 'GSI_pale',
                  minzoom: 0,
                  maxzoom: 15,
                },

                // レイヤ設定（淡色地図02）
                {
                  id: 'GSI_pale02',
                  type: 'raster',
                  source: 'GSI_pale',
                  minzoom: 15,
                  maxzoom: 18,
                  'paint': {
                    "raster-opacity": 0.4,
                  },
                },

                // レイヤ設定（法務省地図）【ポリゴン】
                {
                  id: 'fude-fill',
                  type: 'fill',
                  source: 'MOJ_Map',
                  'source-layer': 'fude',
                  'paint': {
                    "fill-color": "#ffff00",
                    "fill-opacity": 0.2
                  },
                },

                // レイヤ設定（法務省地図）【ライン】
                {
                  id: 'fude-line',
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

//ダブルクリックズーム制御（しない）
map.doubleClickZoom.disable();

//ドラッグ回転制御（しない）
map.dragRotate.disable();

//タッチズーム回転制御（しない）
map.touchZoomRotate.disableRotation();


// マップコントロール（拡大・縮小・方位）
//map.addControl(new maplibregl.NavigationControl(), 'top-left');



// 現在位置表示
map.addControl(new maplibregl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    fitBoundsOptions: { maxZoom: 9 },
    trackUserLocation: false,
    showUserLocation: false
    }), 
    'top-left'
);




map.on('click', 'fude-fill', (e) => {
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




    new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
			'<b>' + '<big>' +city + oaza+ tyome+ koaza + " " + chiban + '</big>' + '</b>' + '<br>' +
			"地番区域：" +  city + oaza+ tyome+ koaza + '<br>' +
			"地　番：" + chiban + '<br>' +
			"地 図 名：" +  '<small>' + chizumei +  '</small>' + '<br>' +
			"座標系：" + zahyokei + "<small>（" + zahyochisyubetu + "）" + "【" + sokuchikeihanbetu + "】</small>" + '<br>' +
			"縮尺（精度）：1/" + shukusyakubunbo + "（" + seidokubun + "）"

)
        .addTo(map);
    });





