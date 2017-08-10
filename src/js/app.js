'use srict';
document.addEventListener('DOMContentLoaded', function() {
	var lang = 'de';
	var variant = 'short';
	var wordlist = [];

	function loadJSON( file, callback ) {   
	 	var xobj = new XMLHttpRequest();
	   xobj.overrideMimeType('application/json');
	 	xobj.open('GET', file, true);
	 	xobj.onreadystatechange = function () {
	      if (xobj.readyState == 4 && xobj.status == '200') {
	         callback(xobj.responseText);
	      }
	 	};
	 	xobj.send(null);
	};

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min +1)) + min; 
	};

	// async, so wordlist won't be defined until fully loaded, keep in mind!
	loadJSON('data/wordlist.json', function(response) {
		wordlist = JSON.parse(response);
	});

	function pwgen() {
	   var pw = [];
	   // 
	   var words = 4;
	   for ( var i = 0; i < words; i++ ) {
	   	// pick random word:
	      var w = wordlist[lang][variant][getRandomInt(0, wordlist[lang][variant].length-1)];
	      pw.push(w);
	   }
	   var field = document.getElementById( 'result' );
	   field.value = pw.join( ' ' ).toLowerCase();
	   field.focus();
	   field.setSelectionRange(0, field.value.length);
	   // field.scrollIntoView();
	   try {
			document.execCommand('copy');
		} catch (err) {
			console.log('Oops, unable to copy');
		}
	};

	function init() {
		document.getElementById( 'result' ).value = '';

		document.getElementById('Generate').onclick = function(e){
	  		pwgen();
		};

	}

	if( location.host === 'localhost' ) {
		var livereload = document.createElement('script');
		livereload.setAttribute('src','http://localhost:35729/livereload.js?snipver=1');
		document.head.appendChild(livereload);
	}

	init();
});