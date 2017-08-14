'use srict';
document.addEventListener('DOMContentLoaded', function() {
	var lang = 'de';
	var variant = 'short';
	var wordlist = [];
	var pw_strength = document.getElementById('opt_length').value;

	function trace(o) {
		console.log(o);
	}

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
	   var words = document.getElementById('opt_length').value;
	   // 
	   var chars = document.querySelectorAll('#special_chars')[0].checked;
	   var numbers = document.querySelectorAll('#special_numbers')[0].checked;
	   var camels = document.querySelectorAll('#special_camelcase')[0].checked;
	   // 
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
		document.querySelectorAll( 'form' )[0].reset()
		// document.getElementById( 'result' ).value = '';


		document.getElementById('Generate').onclick = function(e){
	  		pwgen();
		};
		document.getElementsByClassName('video_box')[0].addEventListener('click', function(e){
			var el = e.target; // placeholder
			var src = el.getAttribute('data-src') + '/?&autoplay=1';
			el.style.display = 'none';
			var iframe = el.parentNode.getElementsByTagName('iframe')[0];
			iframe.onload = function(ev) {
				// iframe.click()
			};
			iframe.setAttribute('src', src);
		});
	}

	init();
});