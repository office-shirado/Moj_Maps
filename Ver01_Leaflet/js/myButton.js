L.Control.myButton = L.Control.extend({
    options: {
        position: 'topleft',
        title: ''
    },

    onAdd: function () {
	var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

        this.link = L.DomUtil.create('a', 'leaflet-bar-part', container);
        this.addImage();
        this.link.href = '#';

        L.DomEvent.on(this.link, 'click', this.dotime, this);	//click時の動作
        this.link.title = this.options.title;

        return container;
    },

	intendedFunction: function(){
		alert('No Function');
	},

	//クリック時の環境設定【this.dotime】
	dotime: function (e) {
		L.DomEvent.stopPropagation(e);
		L.DomEvent.preventDefault(e);
		L.DomEvent.stop(e);
        	this.intendedFunction();
	    },


	//11行に反映【this.addImage()】
	addImage: function () {
		var extraClasses = this.options.intentedIcon.lastIndexOf('fa', 0) === 0 ? ' fa fa-lg' : ' glyphicon';
		L.DomUtil.create('i', this.options.intentedIcon + extraClasses, this.link);
	}


});


//オプション設定
L.myButton = function( btnIcon , btnFunction , btnTitle) {
	var newControl = new L.Control.myButton;

	//アイコン
	if (btnIcon) newControl.options.intentedIcon = btnIcon;

	//ファンクション
	if (btnFunction) newControl.intendedFunction = btnFunction;

	//フロータイトル
	if (btnTitle) newControl.options.title = btnTitle;

	return newControl;
};
