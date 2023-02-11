var map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            rtile: {
                type: 'raster',
                tiles: [
                    'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
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
                maxzoom: 22,
            },
        ],
    },
    center: [139.68786, 35.68355], // 中心座標
    zoom: 13, // ズームレベル
});