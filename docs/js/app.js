'use srict';document.addEventListener('DOMContentLoaded',function(){function e(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function t(){for(var t=[],c=0;c<4;c++){var r=a[n][o][e(0,a[n][o].length-1)];t.push(r)}var l=document.getElementById('result');l.value=t.join(' ').toLowerCase(),l.focus(),l.setSelectionRange(0,l.value.length);try{document.execCommand('copy')}catch(e){console.log('Oops, unable to copy')}}var n='de',o='short',a=[];if(function(e,t){var n=new XMLHttpRequest;n.overrideMimeType('application/json'),n.open('GET',e,!0),n.onreadystatechange=function(){4==n.readyState&&'200'==n.status&&t(n.responseText)},n.send(null)}('data/wordlist.json',function(e){a=JSON.parse(e)}),'localhost'===location.host){var c=document.createElement('script');c.setAttribute('src','http://localhost:35729/livereload.js?snipver=1'),document.head.appendChild(c)}document.getElementById('result').value='',document.getElementById('Generate').onclick=function(e){t()}});