'use srict';

document.addEventListener('DOMContentLoaded', function() {
	var lang = 'de';
	var variant = 'short';
	var wordlist = [];
	var pw_strength = document.getElementById('opt_length').value;

	function trace(o) {
		console.log(o);
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */ 
	function hasClass(el, className) {
	    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
	}
	
	function addClass(el, className) {
	    if (el.classList) el.classList.add(className);
	    else if (!hasClass(el, className)) el.className += ' ' + className;
	}
	
	function removeClass(el, className) {
	    if (el.classList) el.classList.remove(className);
	    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
	}

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min +1)) + min; 
	};

	// helper for enabling IE 8 event bindings
	function addEvent(el, type, handler) {
	    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
	}
	// live binding helper with CSS selector
	function live(selector, event, callback, context) {
	    addEvent(context || document, event, function(e) {
	        var qs = (context || document).querySelectorAll(selector);
	        if (qs) {
	            var el = e.target || e.srcElement, index = -1;
	            while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) el = el.parentElement;
	            if (index > -1) callback.call(el, e);
	        }
	    });
	}

	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */ 

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

		// async, so wordlist won't be defined until fully loaded, keep in mind!
		loadJSON('data/wordlist.json', function(response) {
			wordlist = JSON.parse(response);
		});


		document.querySelectorAll( 'form' )[0].reset();

		document.getElementById('Generate').onclick = function(e){
	  		pwgen();
		};

		/*document.getElementsByClassName('video_box')[0].addEventListener('click', function(e){
			var el = e.target; // placeholder
			addClass(el.parentNode, 'active');
			var src = el.getAttribute('data-src') + '/?&autoplay=1';
			el.style.display = 'none';
			var iframe = el.parentNode.getElementsByTagName('iframe')[0];
			iframe.onload = function(ev) {
				// iframe.click()
			};
			iframe.setAttribute('src', src);
		});*/
		live('.video_box .placeholder', 'click', function(ev){
			addClass(this.parentNode, 'active');
			var src = this.getAttribute('data-src') + '/?&autoplay=1';
			addClass(this, 'hidden');
			var iframe = this.parentNode.getElementsByTagName('iframe')[0];
			iframe.onload = function(ev) {
				// iframe.click()
			};
			iframe.setAttribute('src', src);
		});

		live('.video_box .close', 'click', function(ev){
			ev.preventDefault();
	    	// prevent the event fro bubbling up
	    	ev.stopPropagation();
	    	removeClass(this.parentNode, 'active');
	    	removeClass(document.querySelectorAll('.video_box .placeholder')[0], 'hidden');
	    	var iframe = this.parentNode.getElementsByTagName('iframe')[0];
			iframe.setAttribute('src', '');
		});

		var tooltip = new Drooltip({
			'element' : '.tooltip',
			'trigger' : 'hover',
			// 'position' : 'top',
			'background' : 'purple',
			'color' : '#fff',
			'animation': 'material',
			// 'content' : null,
			'callback' : null
  		});

		if( location.host === 'localhost' ) {
			var livereload = document.createElement('script');
			livereload.setAttribute('src','http://localhost:35729/livereload.js?snipver=1');
			document.head.appendChild(livereload);
		}
	}

	init();
});