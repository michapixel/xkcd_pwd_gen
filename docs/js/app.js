'use srict';document.addEventListener('DOMContentLoaded',function(){function e(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function t(){for(var t=[],c=document.getElementById('opt_length').value,l=(document.querySelectorAll('#special_chars')[0].checked,document.querySelectorAll('#special_numbers')[0].checked,document.querySelectorAll('#special_camelcase')[0].checked,0);l<c;l++){var r=a[n][o][e(0,a[n][o].length-1)];t.push(r)}var u=document.getElementById('result');u.value=t.join(' ').toLowerCase(),u.focus(),u.setSelectionRange(0,u.value.length);try{document.execCommand('copy')}catch(e){console.log('Oops, unable to copy')}}var n='de',o='short',a=[];document.getElementById('opt_length').value;!function(e,t){var n=new XMLHttpRequest;n.overrideMimeType('application/json'),n.open('GET',e,!0),n.onreadystatechange=function(){4==n.readyState&&'200'==n.status&&t(n.responseText)},n.send(null)}('data/wordlist.json',function(e){a=JSON.parse(e)}),document.querySelectorAll('form')[0].reset(),document.getElementById('Generate').onclick=function(e){t()},document.getElementsByClassName('video_box')[0].addEventListener('click',function(e){var t=e.target,n=t.getAttribute('data-src')+'/?&autoplay=1';t.style.display='none';var o=t.parentNode.getElementsByTagName('iframe')[0];o.onload=function(e){},o.setAttribute('src',n)})});