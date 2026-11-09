var $=function(s,r){return(r||document).querySelector(s)};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function digits(s){return String(s||"").replace(/\D/g,"")}
function wa(ph,t){return"https://wa.me/"+digits(ph)+(t?"?text="+encodeURIComponent(t):"")}
var TH={
white:{n:["Ак","Белый"],bg1:"#fff8ef",bg2:"#f3dcc4",ink:"#4a2f1b",acc:"#a8743f",fl:"#e9a3ab",paper:"#fffaf4"},
rose:{n:["Кызгылт","Розовый"],bg1:"#fff0f2",bg2:"#f4c3cc",ink:"#5a2a38",acc:"#b5566b",fl:"#f08aa0",paper:"#fff7f8"},
gold:{n:["Алтын","Золотой"],bg1:"#fff6dc",bg2:"#e8c981",ink:"#4d3510",acc:"#9a6a12",fl:"#f0b94a",paper:"#fffbee"},
green:{n:["Жашыл","Зелёный"],bg1:"#f0f6ea",bg2:"#bcd5b4",ink:"#254533",acc:"#3f7d57",fl:"#f2b8c0",paper:"#f8fbf4"},
wine:{n:["Бордо","Бордо"],bg1:"#7b2a38",bg2:"#4a1621",ink:"#fbe9d8",acc:"#e8c27a",fl:"#f4a9b2",paper:"#5e202c"},
night:{n:["Түнкү","Ночной"],bg1:"#1d2742",bg2:"#0f1528",ink:"#f6e8d0",acc:"#e8c27a",fl:"#f1d58a",paper:"#263256"}};
var ART={scene:["Тоо","Горы и юрта"],arch:["Арка","Цветочная арка"],ornament:["Оюу","Узор"],frame:["Рамка","Рамка"]};
var ET={
wedding:{n:["Үйлөнүү тою","Свадьба"],t:["Үйлөнүү тоюна чакыруу","Приглашение на свадьбу"],x:["Урматтуу тууган-уруктар жана достор! Сизди өмүрүбүздөгү эң кубанычтуу күндө — үйлөнүү тоюбузга чакырабыз.","Дорогие родные и друзья! Приглашаем вас разделить с нами самый счастливый день — нашу свадьбу."]},
kyz:{n:["Кыз узатуу","Кыз узатуу"],t:["Кыз узатуу тоюна чакыруу","Приглашение на кыз узатуу"],x:["Кызыбызды ак жолго узатабыз. Тойубузга келип, бата берүүңүздөрдү сурайбыз.","Мы провожаем нашу дочь в новую жизнь. Будем рады видеть вас и получить ваше благословение."]},
jubilee:{n:["Юбилей","Юбилей"],t:["Юбилейге чакыруу","Приглашение на юбилей"],x:["Жашыбыздын жаңы белесин бирге белгилейли! Сизди юбилейибизге чакырабыз.","Отметим вместе новую важную дату! Приглашаем вас на наш юбилей."]},
sunnet:{n:["Сүннөт той","Сүннөт той"],t:["Сүннөт тойго чакыруу","Приглашение на сүннөт той"],x:["Уулубуздун сүннөт тоюна келип, кубанычыбызга ортоктош болууңузду сурайбыз.","Приглашаем вас на сүннөт той нашего сына. Будем рады разделить радость с вами."]}};
var TPL=[
{id:"w1",type:"wedding",art:"scene",theme:"white",n:["Ала-Тоо","Ала-Тоо"],m:"tender",fx:["petals","sparkles"]},
{id:"w2",type:"wedding",art:"arch",theme:"rose",n:["Роза","Роза"],m:"tender",fx:["petals","lights"]},
{id:"w3",type:"wedding",art:"ornament",theme:"gold",n:["Алтын той","Золотой той"],m:"festive",fx:["sparkles"]},
{id:"w4",type:"wedding",art:"frame",theme:"night",n:["Түнкү жылдыз","Звёздная ночь"],m:"tender",fx:["sparkles","lights"]},
{id:"w5",type:"wedding",art:"frame",theme:"wine",n:["Бордо","Бордо"],m:"festive",fx:["petals"]},
{id:"w6",type:"wedding",art:"scene",theme:"green",n:["Изумруд","Изумруд"],m:"komuz",fx:["petals"]},
{id:"w7",type:"wedding",art:"arch",theme:"white",n:["Ак гүл","Белый цветок"],m:"tender",fx:["petals","sparkles"]},
{id:"k1",type:"kyz",art:"arch",theme:"white",n:["Назиктик","Нежность"],m:"tender",fx:["petals"]},
{id:"k2",type:"kyz",art:"ornament",theme:"rose",n:["Кызгалдак","Кызгалдак"],m:"komuz",fx:["petals","sparkles"]},
{id:"k3",type:"kyz",art:"scene",theme:"gold",n:["Ак жол","Ак жол"],m:"festive",fx:["sparkles"]},
{id:"j1",type:"jubilee",art:"frame",theme:"gold",n:["Алтын юбилей","Золотой юбилей"],m:"festive",fx:["sparkles","lights"]},
{id:"j2",type:"jubilee",art:"frame",theme:"night",n:["Түнкү юбилей","Ночной юбилей"],m:"festive",fx:["lights"]},
{id:"s1",type:"sunnet",art:"ornament",theme:"green",n:["Сүннөт Ай","Сүннөт Ай"],m:"komuz",fx:["sparkles"]},
{id:"s2",type:"sunnet",art:"scene",theme:"white",n:["Сүннөт Тоо","Сүннөт Тоо"],m:"festive",fx:["petals"]}];
var FX={petals:["Гүл жалбырактары","Лепестки"],lights:["Гирлянда","Гирлянда"],sparkles:["Жылдызчалар","Искры"]};
var MU={tender:["Назик","Нежная"],festive:["Салтанаттуу","Торжественная"],komuz:["Комуз","Комуз"],custom:["Өз музыкабыз","Своя музыка"],none:["Музыкасыз","Без музыки"]};
var MON=[["январь","января"],["февраль","февраля"],["март","марта"],["апрель","апреля"],["май","мая"],["июнь","июня"],["июль","июля"],["август","августа"],["сентябрь","сентября"],["октябрь","октября"],["ноябрь","ноября"],["декабрь","декабря"]];
var S={cd:["Тойго чейин","До праздника осталось"],u:[["күн","саат","мүн","сек"],["дней","часов","мин","сек"]],over:["Той болуп өттү 🎉","Праздник состоялся 🎉"],pl:["Өтө турган жер","Место проведения"],map:["Картадан ачуу","Открыть на карте"],pr:["Программа","Программа"],rs:["Келесизби?","Вы придёте?"],yes:["Келебиз","Придём"],no:["Келе албайбыз","Не сможем"],inv:["Сизге чакыруу","Вам приглашение"],tap:["Ачуу үчүн басыңыз","Нажмите, чтобы открыть"],ys:["Саламатсызбы! Тойго келебиз 🙌","Здравствуйте! Мы придём 🙌"],ns:["Саламатсызбы! Тилекке каршы, келе албайбыз.","Здравствуйте! К сожалению, не сможем прийти."]};
var timers=[],AC=null,MT=null;
function clearT(){timers.forEach(clearInterval);timers=[]}
function tplOf(id){return TPL.filter(function(t){return t.id===id})[0]}
/* ---------- art ---------- */
var gid=0;
function flw(x,y,s,c){return'<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') scale('+s+')"><circle cx="-4" r="5" fill="'+c.fl+'"/><circle cx="4" r="5" fill="'+c.fl+'"/><circle cy="-4" r="5" fill="'+c.fl+'"/><circle cy="4" r="5" fill="'+c.fl+'"/><circle r="2.6" fill="'+c.acc+'"/></g>'}
function art(v,c){var i="g"+(++gid),k,d="",
bg='<defs><linearGradient id="'+i+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c.bg1+'"/><stop offset="1" stop-color="'+c.bg2+'"/></linearGradient></defs><rect width="400" height="760" fill="url(#'+i+')"/>',
op=function(inner){return'<svg class="sc full" viewBox="0 0 400 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+bg+inner+"</svg>"};
if(v==="arch"){for(k=0;k<=14;k++){var a=Math.PI*k/14;d+=flw(200-150*Math.cos(a),300-150*Math.sin(a),k%2?.7:1,c)}
return op('<path d="M50 760V300A150 150 0 0 1 350 300V760" fill="none" stroke="'+c.acc+'" stroke-width="2" opacity=".6"/><path d="M68 760V300A132 132 0 0 1 332 300V760" fill="none" stroke="'+c.acc+'" stroke-width="1" opacity=".4"/>'+d+flw(62,725,2,c)+flw(112,745,1.5,c)+flw(338,725,2,c)+flw(288,745,1.5,c))}
if(v==="frame"){return op('<rect x="18" y="18" width="364" height="724" rx="4" fill="none" stroke="'+c.acc+'" stroke-width="1.5"/><rect x="30" y="30" width="340" height="700" rx="2" fill="none" stroke="'+c.acc+'" opacity=".5"/><path d="M200 8l9 9-9 9-9-9zM200 734l9 9-9 9-9-9z" fill="'+c.acc+'"/>'+flw(44,44,1.1,c)+flw(356,44,1.1,c)+flw(44,716,1.1,c)+flw(356,716,1.1,c))}
if(v==="ornament"){for(k=0;k<400;k+=40)d+='<path d="M'+(k+20)+' 14L'+(k+34)+' 34 '+(k+20)+' 54 '+(k+6)+' 34Z" fill="'+c.acc+'" fill-opacity=".18" stroke="'+c.acc+'" stroke-width="1"/><circle cx="'+(k+20)+'" cy="34" r="3" fill="'+c.acc+'"/>';
return op('<circle cx="200" cy="380" r="180" fill="'+c.acc+'" opacity=".08"/><g>'+d+'</g><g transform="translate(0 696)">'+d+'</g><path d="M16 380c0-44 54-44 54 0s-38 30-38 0" fill="none" stroke="'+c.acc+'" stroke-width="2" opacity=".5"/><path d="M384 380c0-44-54-44-54 0s38 30 38 0" fill="none" stroke="'+c.acc+'" stroke-width="2" opacity=".5"/>')}
var f=[20,62,108,158,214,266,322,368].map(function(x,j){return flw(x,284+j%3*4,1,c)}).join("");
return'<svg class="sc" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><circle cx="310" cy="86" r="34" fill="'+c.acc+'" opacity=".25"/><path d="M0 225L70 125 112 175 172 92 242 192 292 132 400 225V300H0Z" fill="'+c.ink+'" opacity=".12"/><path d="M172 92L154 120 164 114 172 126 182 113 192 121ZM70 125L58 143 66 138 72 147 80 138 84 144Z" fill="#fff" opacity=".75"/><path d="M0 255L88 165 150 218 232 148 322 232 400 195V300H0Z" fill="'+c.ink+'" opacity=".2"/><path d="M0 268Q100 248 200 262T400 255V300H0Z" fill="'+c.acc+'" opacity=".3"/><g transform="translate(262 236)"><path d="M-5 13Q29-14 63 13Z" fill="#fff6e6"/><rect y="12" width="58" height="24" rx="2" fill="#fff0d8"/><rect y="19" width="58" height="4" fill="'+c.acc+'"/><rect x="24" y="23" width="10" height="13" fill="'+c.acc+'"/></g>'+f+"</svg>"}
function fxHTML(fx){var h="",k;fx=fx||[];
if(fx.indexOf("petals")>-1)for(k=0;k<14;k++)h+='<i class="p" style="left:'+(Math.random()*100|0)+'%;--s:'+(10+Math.random()*12|0)+'px;--d:'+(9+Math.random()*9|0)+'s;--w:-'+(Math.random()*14|0)+'s;--x:'+(Math.random()*160-80|0)+'px"></i>';
if(fx.indexOf("sparkles")>-1)for(k=0;k<20;k++)h+='<i class="sp" style="left:'+(Math.random()*100|0)+'%;--s:'+(3+Math.random()*4|0)+'px;--d:'+(6+Math.random()*7|0)+'s;--w:-'+(Math.random()*10|0)+'s"></i>';
if(fx.indexOf("lights")>-1){var cs=["#ffd36b","#ff9db0","#9fe0ff","#b6f2a8"];h+='<div class="gl">';for(k=0;k<11;k++)h+='<i style="--c:'+cs[k%4]+';--w:-'+(k*.37).toFixed(1)+'s;--m:'+(8+Math.round(Math.sin(k/10*Math.PI)*22))+'px"></i>';h+="</div>"}
return h?'<div class="fxl" aria-hidden="true">'+h+"</div>":""}
/* ---------- music (синтез, без файлов) ---------- */
var TR={tender:{b:261.63,sc:[0,4,7,12,7,4,9,5,0,4,7,11,7,4,2,5],tp:.42,w:"sine"},festive:{b:293.66,sc:[0,4,7,9,12,9,7,4,2,5,9,12,14,12,9,5],tp:.27,w:"triangle"},komuz:{b:220,sc:[0,0,3,5,7,5,3,0,-2,0,3,5,3,0,-2,-5],tp:.3,w:"sawtooth"}};
var AU=null;
function musStop(){if(MT){clearInterval(MT);MT=null}if(AU){AU.pause();AU=null}}
function musPlay(id,o){musStop();if(id==="custom"){if(o&&o.audio){AU=new Audio(o.audio);AU.loop=true;AU.play().catch(function(){})}return}var t=TR[id];if(!t)return;
try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume()}catch(e){return}
var i=0;function note(){var f=t.b*Math.pow(2,t.sc[i%16]/12),n=AC.currentTime+.05;
function tone(fr,ty,v,d,lp){var o=AC.createOscillator(),g=AC.createGain(),fl=AC.createBiquadFilter();fl.type="lowpass";fl.frequency.value=lp;o.type=ty;o.frequency.value=fr;g.gain.setValueAtTime(0,n);g.gain.linearRampToValueAtTime(v,n+.015);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(fl);fl.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d+.1)}
tone(f,t.w,.15,1.4,id==="komuz"?1500:2800);if(i%8===0)tone(f/2,"sine",.14,3,600);i++}
note();MT=setInterval(note,t.tp*1000)}
/* ---------- приглашение ---------- */
function fmtDate(o,L){var p=(o.date||"").split("-");if(p.length<3)return"";var m=MON[+p[1]-1];return+p[2]+" "+(m?m[L]:"")+" "+p[0]+(o.time?(L?", ":" • ")+o.time:"")}
function names(o){return o.type==="wedding"&&o.n2?o.n1+" & "+o.n2:o.n1}
function mono(o){var a=(o.n1||"?").trim()[0]||"?";if(o.type==="wedding"&&o.n2)return a+"&"+o.n2.trim()[0];if(o.type==="jubilee"&&o.age)return o.age;return a}
function invHTML(o,opt){opt=opt||{};var c=TH[o.theme]||TH.white,L=o.lang==="ru"?1:0,E=ET[o.type]||ET.wedding;
var st="--bg1:"+c.bg1+";--bg2:"+c.bg2+";--ink:"+c.ink+";--acc:"+c.acc+";--fl:"+c.fl+";--paper:"+c.paper;
var prog=String(o.prog||"").split("\n").map(function(l){var m=l.trim().match(/^(\d{1,2}[:.]\d{2})\s*(.*)$/);return m?'<li><b>'+esc(m[1])+"</b><span>"+esc(m[2])+"</span></li>":""}).join("");
var map=o.map||"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(o.addr||o.place||"");
var h='<div class="inv" style="'+st+'">';
if(opt.intro)h+='<div class="intro"><div class="seal">'+esc(mono(o))+'</div><div class="serif" style="font-size:30px">'+S.inv[L]+"</div><p>"+S.tap[L]+"</p></div>";
h+=fxHTML(o.fx);
h+='<div class="cv">'+art(o.art||"scene",c)+'<div class="lbl">'+esc(E.t[L].toUpperCase())+'</div>'+(o.cover?'<div class="ph" style="background-image:url('+esc(o.cover)+')"></div>':'<div class="ring"><svg viewBox="0 0 170 170"><circle cx="85" cy="85" r="76"/></svg><span>'+esc(mono(o))+'</span></div>')+'<div class="nm">'+esc(names(o))+'</div><div class="dt">'+esc(fmtDate(o,L))+"</div></div>";
h+='<div class="sec"><div class="div">✦</div><p class="serif" style="font-size:23px;line-height:1.35">'+esc(o.text||E.x[L])+"</p></div>";
if(o.photos&&o.photos.length)h+='<div class="sec"><div class="gal">'+o.photos.map(function(id){return'<a href="'+esc(id)+'" target="_blank" rel="noopener" style="background-image:url('+esc(id)+')"></a>'}).join("")+"</div></div>";
h+='<div class="sec"><h3 class="serif">'+S.cd[L]+'</h3><div class="cd" data-cd="'+esc(o.date+"T"+(o.time||"00:00"))+'" data-o="'+S.over[L]+'">'+S.u[L].map(function(u){return"<div><b>0</b><small>"+u+"</small></div>"}).join("")+"</div></div>";
if(o.place||o.addr)h+='<div class="sec"><div class="pp">'+(o.vphoto?'<div class="vp" style="background-image:url('+esc(o.vphoto)+')"></div>':"")+'<h3 class="serif">'+S.pl[L]+"</h3><p><b>"+esc(o.place)+"</b></p><p>"+esc(o.addr)+'</p><a class="ib" target="_blank" rel="noopener" href="'+esc(map)+'">'+S.map[L]+"</a></div></div>";
if(prog)h+='<div class="sec"><h3 class="serif">'+S.pr[L]+'</h3><ul class="tl">'+prog+"</ul></div>";
if(o.phone)h+='<div class="sec" style="padding-bottom:90px"><h3 class="serif">'+S.rs[L]+'</h3><div class="rs"><a class="ib" target="_blank" rel="noopener" href="'+wa(o.phone,S.ys[L])+'">'+S.yes[L]+'</a><a class="ib o" target="_blank" rel="noopener" href="'+wa(o.phone,S.ns[L])+'">'+S.no[L]+"</a></div></div>";
else h+='<div style="height:90px"></div>';
if(o.music&&o.music!=="none")h+='<button class="mb" aria-label="Музыка">♪</button>';
return h+"</div>"}
function initInv(root,o,opt){opt=opt||{};
var cd=$("[data-cd]",root);if(cd){var tg=new Date(cd.dataset.cd),b=cd.querySelectorAll("b");
var tick=function(){var d=tg-new Date();if(isNaN(d))return;if(d<=0){cd.textContent=cd.dataset.o;cd.style.cssText="font:600 26px 'Cormorant Garamond',serif";return}
var v=[d/864e5,d/36e5%24,d/6e4%60,d/1e3%60];b.forEach(function(e,i){e.textContent=Math.floor(v[i])})};tick();timers.push(setInterval(tick,1000))}
var mb=$(".mb",root),on=false;
function play(){if(!mb)return;musPlay(o.music,o);on=true;mb.classList.add("on")}
if(mb)mb.onclick=function(){if(on){musStop();on=false;mb.classList.remove("on")}else play()};
var it=$(".intro",root);if(it)it.onclick=function(){it.classList.add("gone");if(opt.onOpen)opt.onOpen();play()}}

export {esc,digits,wa,TH,ART,ET,TPL,FX,MU,MON,S,TR,clearT,tplOf,art,flw,fxHTML,musStop,musPlay,invHTML,initInv,$,fmtDate,names,mono};
