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
        },
        layers: [
            {
                id: 'raster-tiles',
                type: 'raster',
                source: 'rtile',
                minzoom: 0,
                maxzoom: 23,
            },
        ],



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




    map.addSource('t_pale', {
        type: 'raster',
        tiles: ['https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'],
        tileSize: 256,
    });
    map.addLayer({
        id: 't_pale',
        type: 'raster',
        source: 't_pale',
        minzoom: 0,
        maxzoom: 18,
    });


