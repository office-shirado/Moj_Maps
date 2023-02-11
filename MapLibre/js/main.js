var map = new maplibregl.Map({
    container: 'map',
    style: {
		version: 8,
		sources: {
            rtile: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
                ],
                tileSize: 256,
                attribution:
                    "<a href='https://www.gsi.go.jp/' target='_blank'>地理院タイル</a>",
            },
			plateau: {
			type: 'vector',
			tiles: ['https://x.optgeo.org/a/{z}/{x}/{y}.mvt'],
			minzoom: 10,
			maxzoom: 23,
			attribution:
				"データの出典：<a href='https://github.com/indigo-lab/plateau-tokyo23ku-building-mvt-2020'>plateau-tokyo23ku-building-mvt-2020 by indigo-lab</a> (<a href='https://www.mlit.go.jp/plateau/'>国土交通省 Project PLATEAU</a> のデータを加工して作成)",
			},
		},



		layers: [
            {
                id: 'raster-tiles',
                type: 'raster',
                source: 'rtile',
                minzoom: 0,
                maxzoom: 23,
            },

        {
            id: 'fude',
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
            id: 'fude2',
            type: 'line',
            source: 'plateau',
            'source-layer': 'fude',
            minzoom: 14,
            maxzoom: 23,
	      'paint': {
    	      "line-color": "#ff0000",
           "line-width": 1,
			},
		}


		]




    },
    center: [140.8835,37.0509], // 中心座標
    zoom: 16, // ズームレベル
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






