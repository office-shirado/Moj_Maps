//空中写真タイル設定

//国土画像情報（第一期：1974～1978年撮影）
var gazo1 = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：国土画像情報（1974年～1978年撮影）", maxZoom: 23, maxNativeZoom: 17, opacity: 1.0});


//国土画像情報（第二期：1979～1983年撮影）
var gazo2 = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：国土画像情報（1979年～1983年撮影）", maxZoom: 23, maxNativeZoom: 17, opacity: 1.0});


//国土画像情報（第三期：1984～1986年撮影）
var gazo3 = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：国土画像情報（1984年～1986年撮影）", maxZoom: 23, maxNativeZoom: 17, opacity: 1.0});


//国土画像情報（第四期：1988～1990年撮影）
var gazo4 = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：国土画像情報（1988年～1990年撮影）", maxZoom: 23, maxNativeZoom: 17, opacity: 1.0});


//簡易空中写真（2004年～）
var airphoto = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/airphoto/{z}/{x}/{y}.png',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：簡易空中写真（2004年～）", maxZoom: 23, maxNativeZoom: 18, opacity: 1.0});


//空中写真（2007年～）
var ort = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：空中写真（2007年～）", maxZoom: 23, maxNativeZoom: 18, opacity: 1.0});


//東日本大震災被災地震災直後オルソ画像（2011年3月～2011年4月撮影）
var toho1 = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/toho1/{z}/{x}/{y}.jpg',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：震災直後オルソ画像（2011年3月～2011年4月撮影）", maxZoom: 23, maxNativeZoom: 17, opacity: 1.0});


//東日本大震災被災地震災後オルソ画像（2011年5月～2012年4月撮影）
var toho2 = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/toho2/{z}/{x}/{y}.jpg',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：震災後オルソ画像（2011年5月～2012年4月撮影）", maxZoom: 23, maxNativeZoom: 18, opacity: 1.0});


//東日本大震災被災地震災後オルソ画像（2012年10月～2013年5月撮影）
var toho3 = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/toho3/{z}/{x}/{y}.jpg',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：震災後オルソ画像（2012年10月～2013年5月撮影）", maxZoom: 23, maxNativeZoom: 18, opacity: 1.0});


//東日本大震災被災地震災後オルソ画像（2013年9月～2013年12月撮影）
var toho4 = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/toho4/{z}/{x}/{y}.jpg',
	{attribution: "<br><a href='http://www.gsi.go.jp/' target='_blank'>国土地理院</a>：震災後オルソ画像（2013年9月～2013年12月撮影）", maxZoom: 23, maxNativeZoom: 18, opacity: 1.0});



//背景レイヤグループ設定
var overlayMapsArray = [
	[gazo1 , "国土画像情報（1974～1978年）" , "国土画像情報（1974～1978年）" ],
	[gazo2 , "国土画像情報（1979～1983年）" , "国土画像情報（1979～1983年）" ],
	[gazo3 , "国土画像情報（1984～1986年）" , "国土画像情報（1984～1986年）" ],
	[gazo4 , "国土画像情報（1988～1990年）" , "国土画像情報（1988～1990年）" ],
	[airphoto , "簡易空中写真（2004年～）" , "簡易空中写真（2004年～）" ],
	[ort , "空中写真（2007年～）" , "空中写真（2007年～）"],
	[toho1 , "震災直後オルソ（2011年3月～2011年4月）" , "震災直後オルソ（2011年）" ],
	[toho2 , "震災後オルソ（2011年5月～2012年4月）" , "震災後オルソ（2011～2012年）" ],
	[toho3 , "震災後オルソ（2012年10月～2013年5月）" , "震災後オルソ（2012～2013年）" ],
	[toho4 , "震災後オルソ（2013年9月～2013年12月）" , "震災後オルソ（2013年）" ]
	];


//背景レイヤグループ格納
var overlayMaps = {};
for (var i = 0; i < overlayMapsArray.length; i++){
	overlayMaps[overlayMapsArray[i][1]] = overlayMapsArray[i][0];
}

