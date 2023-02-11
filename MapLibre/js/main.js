var map = new maplibregl.Map({
    container: 'map',
    style: {
        center: [140.8835,37.0509], // 中心座標
        zoom: 16, // ズームレベル
        minZoom: 4,
        maxZoom: 23,
        version: 8,

	sources: {
            rtile: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
                ],
                tileSize: 256,
                attribution:"<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
            },
            plateau: {
                type: 'vector',
                tiles: ['https://x.optgeo.org/a/{z}/{x}/{y}.mvt'],
                minzoom: 14,
                maxzoom: 16,
                attribution:"<a href='https://www.moj.go.jp/MINJI/minji05_00494.html' target='_blank'>法務省地図</a>",
			},
		},


            layers: [
                {
                  id: 'seamlessphoto',
                  type: 'raster',
                  source: 'rtile',
                  minzoom: 0,
                  maxzoom: 23,
                },

                {
                  id: 'fude-fill',
                  type: 'fill',
                  source: 'plateau',
                  'source-layer': 'fude',
                  minzoom: 14,
                  maxzoom: 23,
                  'paint': {
                    "fill-color": "#ffff00",
                    "fill-opacity": 0.2
                  },
                },


                {
                  id: 'fude-line',
                  type: 'line',
                  source: 'plateau',
                  'source-layer': 'fude',
                  minzoom: 14,
                  maxzoom: 23,
                  'paint': {
                    "line-color": "#ff0000",
                  },
                },
            ]
    },
});





// マップコントロール（拡大・縮小・方位）
	map.addControl(new maplibregl.NavigationControl(), 'top-left');



// 現在位置表示
	map.addControl(new maplibregl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true
		},
			fitBoundsOptions: { maxZoom: 9 },
			trackUserLocation: true,
			showUserLocation: true
		}), 'top-left');






