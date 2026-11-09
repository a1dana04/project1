import {esc,digits,wa,TH,ART,ET,TPL,FX,MU,S,clearT,tplOf,art,fxHTML,musStop,musPlay,invHTML,initInv,$,mono,names,fmtDate} from "./core";
var app=null,CFG={phone:""};
var LL={kg:{h1:"Той чакыруусу —",h2:"телефондо",p:"Музыка, жарык, санаак жана карта менен онлайн чакыруу. Шаблонду тандап, демону өзүңүз ойнотуп көрүңүз.",b1:"Шаблондорду көрүү",b2:"WhatsApp жазуу",how:"Кантип заказ кылуу?",s:["Шаблонду тандап, демону көрүңүз","Бизге WhatsApp'ка жазыңыз","Даяр шилтемени алыңыз, конокторго жөнөтүңүз"],tpl:"Шаблондор",demo:"Демо",ord:"Заказдоо",all:"Баары",ct:"Тойуңуз эстен кеткис болсун!",cp:"Шаблонду тандап, бизге жазыңыз.",wa:"Саламатсызбы! Мен «{n}» шаблонун заказ кылгым келет."},
ru:{h1:"Приглашение на той —",h2:"прямо в телефоне",p:"С музыкой, огоньками, отсчётом дней и картой. Выберите шаблон и поиграйте с демо: поменяйте цвет, музыку и дату.",b1:"Смотреть шаблоны",b2:"Написать в WhatsApp",how:"Как заказать?",s:["Выберите шаблон и посмотрите демо","Напишите нам в WhatsApp","Получите готовую ссылку и отправьте гостям"],tpl:"Шаблоны",demo:"Демо",ord:"Заказать",all:"Все",ct:"Пусть ваш той запомнится надолго!",cp:"Выберите шаблон и напишите нам.",wa:"Здравствуйте! Хочу заказать шаблон «{n}»."}};
var lang="kg",lf="all";
try{var sl=localStorage.getItem("lang");lang=sl||((navigator.language||"").indexOf("ru")===0?"ru":"kg")}catch(e){}
function landing(){var d=LL[lang],L=lang==="ru"?1:0,ph=CFG.phone;
document.documentElement.lang=lang==="kg"?"ky":"ru";
app.innerHTML='<div class="top"><div class="wrap"><a class="logo" href="/">Той &amp; Иш-чара</a><div class="lang"><button data-l="kg" aria-pressed="'+(lang==="kg")+'">KG</button><button data-l="ru" aria-pressed="'+(lang==="ru")+'">RU</button></div></div></div>'
+fxHTML(["petals"])
+'<div class="hero">'+art("scene",TH.white)+'<div class="wrap"><span class="pill">✦ '+(L?"Онлайн-приглашения":"Онлайн чакыруулар")+'</span><h1>'+d.h1+'<span class="gold">'+d.h2+'</span></h1><p>'+d.p+'</p><div class="btns"><a class="btn" href="#tpl">'+d.b1+'</a><a class="btn o" target="_blank" rel="noopener" href="'+wa(ph)+'">'+d.b2+"</a></div></div></div>"
+'<section><div class="wrap"><h2 class="t serif">'+d.how+'</h2><div class="steps">'+d.s.map(function(x,i){return'<div class="step"><b>'+(i+1)+"</b>"+esc(x)+"</div>"}).join("")+"</div></div></section>"
+'<section id="tpl"><div class="wrap"><h2 class="t serif">'+d.tpl+'</h2><div class="chips" id="ch"></div><div class="grid" id="gr"></div></div></section>'
+'<section><div class="wrap"><div class="cta"><h2 class="serif">'+d.ct+"</h2><p>"+d.cp+'</p><a class="btn" target="_blank" rel="noopener" href="'+wa(ph)+'">'+d.b2+"</a></div></div></section>"
+'<footer>© Той &amp; Иш-чара · <a href="/admin">Вход</a></footer>';
function grid(){$("#ch").innerHTML='<button class="chip" data-f="all" aria-pressed="'+(lf==="all")+'">'+d.all+"</button>"+Object.keys(ET).map(function(k){return'<button class="chip" data-f="'+k+'" aria-pressed="'+(lf===k)+'">'+ET[k].n[L]+"</button>"}).join("");
$("#gr").innerHTML=TPL.filter(function(t){return lf==="all"||t.type===lf}).map(function(t){var c=TH[t.theme],o={type:t.type,n1:"Айгүл",n2:"Эрлан",age:"60"};
return'<article class="tc"><div class="th" style="color:'+c.ink+";background:linear-gradient("+c.bg1+","+c.bg2+')">'+art(t.art,c)+'<div><span class="m">'+esc(mono(o))+"</span><small>"+esc(ET[t.type].n[L])+'</small></div></div><div class="in"><h3 class="serif">'+esc(t.n[L])+'</h3><div class="row"><a class="btn o" href="/demo/'+t.id+'">'+d.demo+'</a><a class="btn" target="_blank" rel="noopener" href="'+wa(ph,d.wa.replace("{n}",t.n[L]+" ("+ET[t.type].n[L]+")"))+'">'+d.ord+"</a></div></div></article>"}).join("")}
grid();
app.onclick=function(e){var b=e.target.closest("[data-l],[data-f]");if(!b)return;if(b.dataset.l){lang=b.dataset.l;try{localStorage.setItem("lang",lang)}catch(x){}landing()}else{lf=b.dataset.f;grid()}}}
/* ---------- демо ---------- */
var D;
function demo(id){var tp=tplOf(id);if(!tp)return landing();var type=tp.type,L0=lang==="ru"?1:0,d=LL[lang],iso=new Date(Date.now()+60*864e5).toISOString().slice(0,10);
var nm={wedding:["Айгүл","Эрлан"],kyz:["Айгүл",""],jubilee:["Асан ата",""],sunnet:["Эмир",""]}[type];
D={type:type,art:tp.art,theme:tp.theme,lang:lang,n1:nm[0],n2:nm[1],age:type==="jubilee"?"60":"",date:iso,time:"17:00",place:L0?"Ресторан «Ала-Тоо»":"«Ала-Тоо» ресторан",addr:L0?"Бишкек, пр. Чуй 100":"Бишкек, Чүй пр. 100",map:"",phone:CFG.phone,text:"",prog:"16:30 "+(L0?"Сбор гостей":"Коноктор чогулат")+"\n17:00 "+(L0?"Начало торжества":"Той башталат")+"\n19:00 "+(L0?"Торт и танцы":"Торт жана бий"),music:tp.m,fx:tp.fx.slice(),opened:false};
app.innerHTML='<a class="back" href="/#tpl">← '+d.tpl+'</a><div id="ib"></div><div class="dm" id="dm"><div class="sheet" id="sh"></div><div class="bar"><button class="btn o s" id="tg"></button><a class="btn s" id="ordr" target="_blank" rel="noopener"></a></div></div><div style="height:70px"></div>';
var T=L0?{set:"⚙ Настроить демо",ord:"Заказать этот дизайн",col:"Цвет",st:"Стиль",mus:"Музыка",fx:"Эффекты",dt:"Дата и время",nm:"Имена",nm2:"Имя (невеста)"}:{set:"⚙ Демону ыңгайлаштыруу",ord:"Бул дизайнды заказдоо",col:"Түс",st:"Стиль",mus:"Музыка",fx:"Эффекттер",dt:"Датасы жана убактысы",nm:"Аты",nm2:"Аты (кыз)"};
$("#tg").textContent=T.set;$("#ordr").textContent=T.ord;
function chips(h,key,o,cur,i){return'<h4>'+h+'</h4><div class="chips">'+Object.keys(o).map(function(k){return'<button class="chip" data-'+key+'="'+k+'" aria-pressed="'+cur(k)+'">'+o[k][i]+"</button>"}).join("")+"</div>"}
function sheet(){$("#sh").innerHTML='<h4>'+T.col+'</h4><div class="chips">'+Object.keys(TH).map(function(k){return'<button class="sw" data-t="'+k+'" aria-label="'+TH[k].n[L0]+'" aria-pressed="'+(D.theme===k)+'" style="background:linear-gradient(135deg,'+TH[k].bg1+" 50%,"+TH[k].acc+' 50%)"></button>'}).join("")+"</div>"
+chips(T.st,"a",ART,function(k){return D.art===k},L0)+chips(T.mus,"m",{tender:MU.tender,festive:MU.festive,komuz:MU.komuz,none:MU.none},function(k){return D.music===k},L0)+chips(T.fx,"f",FX,function(k){return D.fx.indexOf(k)>-1},L0)
+'<h4>'+T.dt+'</h4><input type="date" id="dd" value="'+D.date+'"><input type="time" id="dtm" value="'+D.time+'"><h4>'+T.nm+'</h4><input id="n1" value="'+esc(D.n1)+'">'+(type==="wedding"?'<input id="n2" placeholder="'+T.nm2+'" value="'+esc(D.n2)+'">':"")}
function draw(){clearT();var bx=$("#ib");bx.innerHTML=invHTML(D,{intro:!D.opened});initInv(bx,D,{onOpen:function(){D.opened=true}});
var q=(L0?"Здравствуйте! Хочу заказать шаблон «":"Саламатсызбы! Мен «")+tp.n[L0]+"» · "+TH[D.theme].n[L0]+" · "+ART[D.art][L0]+(L0?". Музыка: ":". Музыка: ")+MU[D.music][L0]+(L0?". Эффекты: ":". Эффекттер: ")+(D.fx.map(function(k){return FX[k][L0]}).join(", ")||"—")+(L0?". Дата: ":". Датасы: ")+D.date;$("#ordr").href=wa(CFG.phone,q)}
function redraw(){var y=window.scrollY;draw();window.scrollTo(0,y);var m=$(".mb");if(m&&MT)m.classList.add("on")}
sheet();draw();
$("#tg").onclick=function(){$("#dm").classList.toggle("open")};
$("#sh").onclick=function(e){var b=e.target.closest("[data-t],[data-a],[data-m],[data-f]");if(!b)return;
if(b.dataset.t)D.theme=b.dataset.t;if(b.dataset.a)D.art=b.dataset.a;
if(b.dataset.m){D.music=b.dataset.m;if(D.music==="none")musStop();else musPlay(D.music)}
if(b.dataset.f){var i=D.fx.indexOf(b.dataset.f);i>-1?D.fx.splice(i,1):D.fx.push(b.dataset.f)}
sheet();redraw()};
$("#sh").onchange=function(e){var i=e.target.id;if(i==="dd"&&e.target.value)D.date=e.target.value;if(i==="dtm")D.time=e.target.value;if(i==="n1")D.n1=e.target.value||D.n1;if(i==="n2")D.n2=e.target.value;redraw()}}

function pickLang(){try{lang=localStorage.getItem("lang")||((navigator.language||"").indexOf("ru")===0?"ru":"kg")}catch(e){}}
function cleanup(){clearT();musStop();if(app){app.onclick=null;app.oninput=null;app.onchange=null;app.innerHTML=""}}
export function mountLanding(el,cfg){app=el;CFG=cfg;pickLang();landing();return cleanup}
export function mountDemo(el,cfg,id){app=el;CFG=cfg;pickLang();demo(id);return cleanup}
