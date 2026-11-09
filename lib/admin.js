import { createClient } from "@supabase/supabase-js";
import { esc, wa, TH, ART, ET, TPL, FX, MU, clearT, tplOf, invHTML, initInv, musStop, $ } from "./core";

let app, CFG = { phone: "" }, INVS = [], sb;

function client() {
  return sb || (sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));
}

async function api(url, opt) {
  const r = await fetch(url, Object.assign({ credentials: "same-origin", headers: { "content-type": "application/json" } }, opt));
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(j.error || "HTTP " + r.status); e.status = r.status; throw e; }
  return j;
}

function toast(t) {
  const m = document.createElement("div");
  m.className = "msg"; m.textContent = t;
  document.body.appendChild(m);
  setTimeout(() => m.remove(), 3200);
}

export function mountAdmin(el, cfg) {
  app = el; CFG = cfg;
  document.documentElement.lang = "ru";
  start();
  return () => { clearT(); musStop(); app.onclick = app.oninput = app.onchange = app.onkeydown = null; app.innerHTML = ""; };
}

function start() {
  app.innerHTML = '<div class="ad"><h1 class="serif">Загрузка…</h1></div>';
  api("/api/invitations").then(
    (j) => { INVS = j.items || []; ui(); },
    (e) => { if (e.status === 401) login(); else app.innerHTML = '<div class="ad"><h1 class="serif">Ошибка</h1><p>' + esc(e.message) + "</p></div>"; }
  );
}

function login() {
  app.innerHTML = '<div class="lg"><h1 class="serif" style="margin-bottom:14px">Вход в админку</h1><label class="fl">Логин<input id="lgn" autocomplete="username"></label><label class="fl">Пароль<input id="lpw" type="password" autocomplete="current-password"></label><button class="btn" id="lgo" style="width:100%">Войти</button><p id="lerr" style="color:#b3261e;margin:10px 0;font-size:14px"></p><a href="/" style="font-size:13px;color:var(--mut)">← На сайт</a></div>';
  const go = () =>
    api("/api/login", { method: "POST", body: JSON.stringify({ login: $("#lgn").value.trim(), password: $("#lpw").value }) })
      .then(start, () => { $("#lerr").textContent = "Неверный логин или пароль"; });
  $("#lgo").onclick = go;
  $("#lpw").onkeydown = (e) => { if (e.key === "Enter") go(); };
}

function newInv() {
  return { id: "inv-" + Math.random().toString(36).slice(2, 8), client: "", type: "wedding", art: "scene", theme: "white", lang: "kg", n1: "", n2: "", age: "", date: "", time: "17:00", place: "", addr: "", map: "", phone: CFG.phone || "", cphone: "", text: "", prog: "", music: "tender", fx: ["petals"], cover: "", vphoto: "", photos: [], audio: "" };
}

function shrink(f) {
  return new Promise((res, rej) => {
    const im = new Image(), u = URL.createObjectURL(f);
    im.onload = () => {
      const s = Math.min(1, 1400 / Math.max(im.width, im.height)), c = document.createElement("canvas");
      c.width = im.width * s; c.height = im.height * s;
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      c.toBlob((b) => { URL.revokeObjectURL(u); b ? res(b) : rej(new Error("image")); }, "image/jpeg", 0.82);
    };
    im.onerror = () => rej(new Error("Не удалось прочитать фото"));
    im.src = u;
  });
}

function ui() {
  let cur = JSON.parse(JSON.stringify(INVS[0] || newInv())), tm, armed = false;
  const link = () => location.origin + "/i/" + cur.id;
  const swHref = () => wa(cur.cphone, (cur.lang === "ru" ? "Здравствуйте! Ваше приглашение готово: " : "Саламатсызбы! Чакырууңуз даяр: ") + link());
  const f = (l, k, t, ex) => '<label class="fl">' + l + (t === "area" ? '<textarea data-k="' + k + '">' + esc(cur[k]) + "</textarea>" : t === "sel" ? '<select data-k="' + k + '">' + ex + "</select>" : '<input data-k="' + k + '" type="' + (t || "text") + '" value="' + esc(cur[k]) + '">') + "</label>";
  const opts = (o, v, i) => Object.keys(o).map((k) => '<option value="' + k + '"' + (k === v ? " selected" : "") + ">" + o[k][i] + "</option>").join("");
  const thumb = (u, key, i) => '<div class="t" style="background-image:url(' + esc(u) + ')"><button data-rm="' + key + '" data-i="' + i + '" aria-label="Удалить">×</button></div>';
  const say = (t) => { const s = $("#ust"); if (s) s.textContent = t; };
  const uploadHTML = () =>
    '<div class="fl">Фото и музыка</div><div class="fl" style="font-weight:600">Обложка (молодожёны)</div><div class="up">' + (cur.cover ? thumb(cur.cover, "cover", 0) : "") + '</div><input type="file" accept="image/*" data-up="cover">' +
    '<div class="fl" style="font-weight:600;margin-top:12px">Галерея (можно сразу несколько)</div><div class="up">' + (cur.photos || []).map((u, i) => thumb(u, "photos", i)).join("") + '</div><input type="file" accept="image/*" multiple data-up="photos">' +
    '<div class="fl" style="font-weight:600;margin-top:12px">Фото места проведения</div><div class="up">' + (cur.vphoto ? thumb(cur.vphoto, "vphoto", 0) : "") + '</div><input type="file" accept="image/*" data-up="vphoto">' +
    '<div class="fl" style="font-weight:600;margin-top:12px">Своя музыка (mp3, m4a, ogg)</div><div class="up">' + (cur.audio ? '<span style="font-size:13px">✓ файл загружен <button class="btn s o" data-rm="audio">убрать</button></span>' : "") + '</div><input type="file" accept="audio/*" data-up="audio"><div id="ust" style="font-size:13px;color:var(--mut);margin:8px 0 12px">Для своей музыки выше выберите «Своя музыка».</div>';

  function draw() {
    app.innerHTML = '<div class="ad"><div style="display:flex;justify-content:space-between;align-items:center"><a href="/" style="font-size:13px;color:var(--mut)">← На сайт</a><button class="btn s o" id="lo">Выйти</button></div><h1 class="serif">Админ-панель</h1><div class="ag"><div>' +
      '<div class="box"><h3 class="serif">Приглашения</h3>' + INVS.map((x) => '<button class="li" data-id="' + x.id + '" aria-pressed="' + (x.id === cur.id) + '"><b>' + esc(x.client || x.n1 || "Без имени") + "</b><span>" + esc(x.date) + "</span></button>").join("") + '<div class="acts"><button class="btn s" id="nw">＋ Новое приглашение</button></div></div>' +
      '<div class="box"><h3 class="serif">Редактор</h3>' + f("Имя заказчика (только для вас)", "client") +
      '<label class="fl">Шаблон (подставит стиль и цвет)<select id="tp"><option value="">— выберите —</option>' + TPL.map((t) => '<option value="' + t.id + '">' + ET[t.type].n[1] + " · " + t.n[1] + "</option>").join("") + "</select></label>" +
      '<div class="two">' + f("Тип", "type", "sel", opts(ET, cur.type, 1)) + f("Стиль", "art", "sel", opts(ART, cur.art || "scene", 1)) + "</div>" +
      '<div class="fl">Цвет</div><div class="chips" style="justify-content:flex-start">' + Object.keys(TH).map((k) => '<button class="sw" data-t="' + k + '" aria-label="' + TH[k].n[1] + '" aria-pressed="' + (cur.theme === k) + '" style="background:linear-gradient(135deg,' + TH[k].bg1 + " 50%," + TH[k].acc + ' 50%)"></button>').join("") + "</div>" +
      f("Язык приглашения", "lang", "sel", '<option value="kg"' + (cur.lang === "kg" ? " selected" : "") + '>Кыргызча</option><option value="ru"' + (cur.lang === "ru" ? " selected" : "") + ">Русский</option>") +
      '<div class="two">' + f("Имя (жених / герой дня)", "n1") + f("Имя невесты", "n2") + "</div>" + f("Возраст (для юбилея)", "age") +
      '<div class="two">' + f("Дата", "date", "date") + f("Время", "time", "time") + "</div>" +
      f("Название места", "place") + f("Адрес", "addr") + f("Ссылка на карту (необязательно)", "map") + f("WhatsApp хозяев для ответов гостей (996…)", "phone") +
      f("Текст приглашения (пусто = стандартный)", "text", "area") + f("Программа: каждая строка «17:00 Сбор гостей»", "prog", "area") +
      f("Музыка", "music", "sel", opts(MU, cur.music, 1)) + uploadHTML() +
      '<div class="fl">Эффекты</div><div class="ck">' + Object.keys(FX).map((k) => '<label><input type="checkbox" data-fx="' + k + '"' + (cur.fx.indexOf(k) > -1 ? " checked" : "") + "> " + FX[k][1] + "</label>").join("") + "</div>" +
      f("WhatsApp заказчика (чтобы отправить ему ссылку)", "cphone") +
      '<div class="acts"><button class="btn" id="sv">💾 Сохранить</button><button class="btn o" id="cp">🔗 Копировать ссылку</button><a class="btn o" id="sw" target="_blank" rel="noopener" href="' + esc(swHref()) + '">📲 Отправить заказчику</a><a class="btn o" id="op" target="_blank" rel="noopener" href="' + esc(link()) + '">👁 Открыть как гость</a><button class="btn o" id="dl">🗑 Удалить</button></div>' +
      '<input class="lk" id="lkb" readonly onfocus="this.select()" value="' + esc(link()) + '"><p style="font-size:12px;color:var(--mut);margin-top:10px">Ссылка заработает после нажатия «Сохранить».</p></div>' +
      '</div><div><div class="pv" id="pv"></div></div></div></div>';
    pv();
  }
  function pv() { clearT(); const b = $("#pv"); b.innerHTML = invHTML(cur, {}); initInv(b, cur); }
  const upd = () => { clearTimeout(tm); tm = setTimeout(pv, 500); };

  async function save() {
    try {
      toast("Сохраняю…");
      await api("/api/invitations", { method: "POST", body: JSON.stringify({ id: cur.id, data: cur }) });
      const c = JSON.parse(JSON.stringify(cur)), i = INVS.findIndex((x) => x.id === cur.id);
      if (i > -1) INVS[i] = c; else INVS.unshift(c);
      toast("Сохранено ✓"); draw();
    } catch (e) { toast("Не удалось: " + e.message); }
  }

  async function up(kind, files) {
    if (!files || !files.length) return;
    say("Загружаю…");
    try {
      for (const file of Array.from(files)) {
        const isA = kind === "audio";
        const blob = isA ? file : await shrink(file);
        const ext = isA ? (file.name.split(".").pop() || "mp3") : "jpg";
        const u = await api("/api/upload-url", { method: "POST", body: JSON.stringify({ ext }) });
        const { error } = await client().storage.from("media").uploadToSignedUrl(u.path, u.token, blob);
        if (error) throw error;
        if (kind === "photos") { cur.photos = cur.photos || []; cur.photos.push(u.url); }
        else { cur[kind] = u.url; if (isA) cur.music = "custom"; }
      }
      draw(); say("Готово ✓ Нажмите «Сохранить»");
    } catch (e) { say("Ошибка загрузки: " + (e.message || e)); }
  }

  draw();
  app.oninput = (e) => {
    const t = e.target;
    if (t.dataset.k) { cur[t.dataset.k] = t.value; const s = $("#sw"); if (s) s.href = swHref(); upd(); }
    else if (t.dataset.fx) { const i = cur.fx.indexOf(t.dataset.fx); if (t.checked && i < 0) cur.fx.push(t.dataset.fx); if (!t.checked && i > -1) cur.fx.splice(i, 1); upd(); }
  };
  app.onchange = (e) => {
    const t = e.target;
    if (t.dataset.up) { up(t.dataset.up, t.files); return; }
    if (t.id === "tp" && t.value) { const p = tplOf(t.value); cur.type = p.type; cur.art = p.art; cur.theme = p.theme; cur.music = p.m; cur.fx = p.fx.slice(); draw(); }
    else if (["type", "art", "music", "lang"].indexOf(t.dataset.k) > -1) pv();
  };
  app.onclick = (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.id) { cur = JSON.parse(JSON.stringify(INVS.filter((x) => x.id === b.dataset.id)[0])); draw(); }
    else if (b.dataset.t) { cur.theme = b.dataset.t; draw(); }
    else if (b.dataset.rm) { const k = b.dataset.rm; if (k === "photos") cur.photos.splice(+b.dataset.i, 1); else { cur[k] = ""; if (k === "audio" && cur.music === "custom") cur.music = "tender"; } draw(); }
    else if (b.id === "nw") { cur = newInv(); draw(); }
    else if (b.id === "sv") save();
    else if (b.id === "cp") { const kb = $("#lkb"); kb.select(); let ok = false; try { ok = document.execCommand("copy"); } catch (x) {} toast(ok ? "Ссылка скопирована" : "Ссылка выделена — скопируйте её"); }
    else if (b.id === "lo") { api("/api/logout", { method: "POST" }).then(() => login()); }
    else if (b.id === "dl") {
      if (!armed) { armed = true; b.textContent = "Нажмите ещё раз — удалить"; return; }
      api("/api/invitations?id=" + encodeURIComponent(cur.id), { method: "DELETE" }).then(() => {
        INVS = INVS.filter((x) => x.id !== cur.id);
        cur = JSON.parse(JSON.stringify(INVS[0] || newInv())); toast("Удалено"); draw();
      }, (er) => toast("Не удалось: " + er.message));
    }
  };
}
