'use srict';

let lang = 'de';
let variant = 'short';
let wordlist = [];

function loadJSON( file, callback ) {   
 	let xobj = new XMLHttpRequest();
   xobj.overrideMimeType("application/json");
 	xobj.open('GET', file, true);
 	xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
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
   let pw = [];
   // 
   let words = 4;
   for ( var i = 0; i < words; i++ ) {
   	// pick random word:
      let w = wordlist[lang][variant][getRandomInt(0, wordlist[lang][variant].length-1)];
      pw.push(w);
   }
   document.getElementById( 'result' ).value = pw.join( ' ' ).toLowerCase();
};