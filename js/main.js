(function () {
  var apps = window.LONG_APPS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var state = { q: '', platform: 'Tất cả' };

  var ICON = {
    down: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14"/></svg>',
    os: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    box: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z"/><path d="m3 8 9 5 9-5M12 13v8"/></svg>',
    tag: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1.3"/></svg>',
    x: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    copy: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
    share: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14 21 3M21 3h-6M21 3v6M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></svg>'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fold(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  }
  function date(iso) {
    var p = String(iso || '').split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso;
  }
  function fileName(a) { return a.file.split('/').pop(); }
  function isExternal(a) { return /^https?:/i.test(a.file); }
  function dlAttr(a) { return isExternal(a) ? ' rel="noopener"' : ' download="' + esc(fileName(a)) + '"'; }

  var toastT;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  /* ---------- hero ---------- */
  function hero() {
    var platforms = uniq(apps.map(function (a) { return a.platform; }));
    var last = apps.map(function (a) { return a.updated; }).sort().pop();
    $('#hero-stats').innerHTML =
      '<li><b>' + apps.length + '</b><span>ứng dụng</span></li>' +
      '<li><b>' + esc(platforms.join(' · ') || '—') + '</b><span>nền tảng</span></li>' +
      (last ? '<li><b>' + date(last) + '</b><span>cập nhật mới nhất</span></li>' : '');

    var a = apps.slice().sort(function (x, y) { return x.updated < y.updated ? 1 : -1; })[0];
    if (!a) return;
    $('#hero-card').innerHTML =
      '<div class="fc-top"><img src="' + esc(a.icon) + '" alt="" width="64" height="64">' +
      '<div><h3>' + esc(a.name) + '</h3><div class="fc-meta">' + esc(a.platform) + ' · ' + esc(a.size) + '</div></div></div>' +
      '<div class="bar"><i></i></div>' +
      '<div class="fc-foot"><span>Đang tải về…</span><span>v' + esc(a.version) + '</span></div>';
  }

  function uniq(list) {
    return list.filter(function (v, i) { return v && list.indexOf(v) === i; });
  }

  /* ---------- list ---------- */
  function chips() {
    var opts = ['Tất cả'].concat(uniq(apps.map(function (a) { return a.platform; })));
    var box = $('#chips');
    if (opts.length < 3) { box.hidden = true; return; } // chỉ một hệ điều hành thì không cần lọc
    box.innerHTML = opts.map(function (o) {
      return '<button class="chip" type="button" data-p="' + esc(o) + '" aria-pressed="' + (o === state.platform) + '">' + esc(o) + '</button>';
    }).join('');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.chip');
      if (!b) return;
      state.platform = b.dataset.p;
      box.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === b); });
      list();
    });
  }

  function card(a) {
    return '<article class="card">' +
      '<div class="card-top"><img src="' + esc(a.icon) + '" alt="" width="64" height="64" loading="lazy">' +
      '<div><h3>' + esc(a.name) + '</h3><div class="sub">Cập nhật ' + date(a.updated) + '</div></div></div>' +
      '<p class="tagline">' + esc(a.tagline) + '</p>' +
      (a.tags && a.tags.length ? '<div class="tags">' + a.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
      '<div class="meta">' +
        '<span>' + ICON.os + esc(a.platform) + '</span>' +
        '<span>' + ICON.tag + 'v' + esc(a.version) + '</span>' +
        '<span>' + ICON.box + esc(a.size) + '</span>' +
      '</div>' +
      '<div class="card-acts">' +
        '<a class="btn btn-primary" href="' + esc(a.file) + '"' + dlAttr(a) + ' data-dl="' + esc(a.id) + '">' + ICON.down + 'Tải về</a>' +
        '<button class="btn btn-ghost" type="button" data-open="' + esc(a.id) + '">Chi tiết</button>' +
      '</div>' +
    '</article>';
  }

  function list() {
    var q = fold(state.q.trim());
    var rows = apps.filter(function (a) {
      if (state.platform !== 'Tất cả' && a.platform !== state.platform) return false;
      if (!q) return true;
      return fold([a.name, a.tagline, a.description, (a.tags || []).join(' '), a.platform].join(' ')).indexOf(q) >= 0;
    });
    $('#grid').innerHTML = rows.map(card).join('');
    $('#empty').hidden = rows.length > 0;
    $('#apps-count').textContent = rows.length === apps.length
      ? apps.length + ' ứng dụng, tải trực tiếp'
      : 'Đang hiện ' + rows.length + ' / ' + apps.length + ' ứng dụng';
  }

  /* ---------- detail dialog ---------- */
  var dlg = $('#dlg');

  function detail(a) {
    var facts = [
      ['Hệ điều hành', a.platform], ['Phiên bản', 'v' + a.version],
      ['Dung lượng', a.size], ['Cập nhật', date(a.updated)]
    ];
    dlg.innerHTML =
      '<div class="dlg-head"><img src="' + esc(a.icon) + '" alt="" width="64" height="64">' +
        '<div class="t"><h3 id="dlg-name">' + esc(a.name) + '</h3><div class="muted">' + esc(a.tagline) + '</div></div>' +
        '<button class="x" type="button" data-close aria-label="Đóng">' + ICON.x + '</button></div>' +
      '<div class="dlg-body">' +
        '<p>' + esc(a.description) + '</p>' +
        (a.video ? '<div><h4>Video hướng dẫn cài</h4>' + videoHtml(a) + '</div>' : '') +
        '<div class="facts">' + facts.map(function (f) { return '<div><small>' + f[0] + '</small><b>' + esc(f[1]) + '</b></div>'; }).join('') + '</div>' +
        section('Làm được gì', a.features, 'ticks') +
        section('Cách dùng', a.steps, 'nums') +
        section('Cần có', a.requires, 'ticks') +
        (a.sha256 ? '<div><h4>Mã kiểm tra SHA-256</h4><div class="hash"><code>' + esc(a.sha256) + '</code>' +
          '<button class="x" type="button" data-copy="' + esc(a.sha256) + '" aria-label="Chép mã">' + ICON.copy + '</button></div></div>' : '') +
        (a.changelog && a.changelog.length ? '<div><h4>Các phiên bản</h4><ul class="log">' + a.changelog.map(function (c) {
          return '<li><span class="v">v' + esc(c.v) + '</span><span class="d">' + date(c.date) + '</span><span>' + esc(c.text) + '</span></li>';
        }).join('') + '</ul></div>' : '') +
      '</div>' +
      '<div class="dlg-foot">' +
        '<button class="btn btn-ghost" type="button" data-share="' + esc(a.id) + '">' + ICON.share + 'Chia sẻ</button>' +
        '<a class="btn btn-primary" href="' + esc(a.file) + '"' + dlAttr(a) + ' data-dl="' + esc(a.id) + '">' + ICON.down + 'Tải về · ' + esc(a.size) + '</a>' +
      '</div>';
  }

  function videoHtml(a) {
    return '<video class="vid" controls preload="none" playsinline src="' + esc(a.video) + '"' +
      (a.poster ? ' poster="' + esc(a.poster) + '"' : '') + '></video>';
  }

  function section(title, items, cls) {
    if (!items || !items.length) return '';
    return '<div><h4>' + title + '</h4><ul class="' + cls + '">' +
      items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>';
  }

  function open(id, push) {
    var a = apps.filter(function (x) { return x.id === id; })[0];
    if (!a) return;
    detail(a);
    if (!dlg.open) dlg.showModal();
    if (push && location.hash !== '#app/' + id) history.pushState(null, '', '#app/' + id);
  }
  function close() {
    if (dlg.open) dlg.close();
  }

  dlg.addEventListener('close', function () {
    if (/^#app\//.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
  });
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) return close(); // bấm ra ngoài khung
    if (e.target.closest('[data-close]')) return close();
    var c = e.target.closest('[data-copy]');
    if (c) {
      copy(c.dataset.copy).then(function () { toast('Đã chép mã SHA-256'); });
      return;
    }
    var s = e.target.closest('[data-share]');
    if (s) share(s.dataset.share);
  });

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    var t = document.createElement('textarea');
    t.value = text; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (e) {}
    t.remove();
    return Promise.resolve();
  }
  function share(id) {
    var a = apps.filter(function (x) { return x.id === id; })[0];
    var url = location.origin + location.pathname + '#app/' + id;
    if (navigator.share) {
      navigator.share({ title: a.name, text: a.tagline, url: url }).catch(function () {});
    } else {
      copy(url).then(function () { toast('Đã chép đường dẫn'); });
    }
  }

  function fromHash() {
    var m = location.hash.match(/^#app\/(.+)$/);
    if (m) open(decodeURIComponent(m[1]), false);
    else close();
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) open(o.dataset.open, true);
    var d = e.target.closest('[data-dl]');
    if (d) toast('Đang tải ' + d.getAttribute('href').split('/').pop() + '…');
  });
  document.querySelectorAll('[data-guide]').forEach(function (b, _, all) {
    b.addEventListener('click', function () { guide(b.dataset.guide); });
  });
  function guide(kind) {
    document.querySelectorAll('[data-guide]').forEach(function (x) {
      var on = x.dataset.guide === kind;
      x.setAttribute('aria-selected', on);
      x.setAttribute('aria-pressed', on);
    });
    document.querySelectorAll('[data-panel]').forEach(function (p) { p.hidden = p.dataset.panel !== kind; });
  }
  $('#q').addEventListener('input', function (e) { state.q = e.target.value; list(); });
  window.addEventListener('popstate', fromHash);
  window.addEventListener('scroll', function () {
    $('.top').classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // Video cài tiện ích Chrome trong mục "Cài trong 3 bước" (lấy từ app Chrome đầu tiên có video)
  var extVid = apps.filter(function (a) { return a.platform === 'Chrome' && a.video; })[0];
  if (extVid) {
    var box = $('#ext-video');
    box.innerHTML = '<h3>Xem video hướng dẫn</h3>' + videoHtml(extVid);
  }

  /* ---------- website đã làm ---------- */
  var sites = window.LONG_SITES || [];
  if (sites.length) {
    $('#web-more').href = window.LONG_PORTFOLIO || '#';
    $('#webs').innerHTML = sites.map(function (w) {
      var host = w.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      return '<a class="web" href="' + esc(w.url) + '" target="_blank" rel="noopener">' +
        '<div class="web-bar"><i></i><i></i><i></i><span>' + esc(host) + '</span></div>' +
        '<div class="web-shot"><img src="' + esc(w.img) + '" alt="Trang chủ ' + esc(w.name) + '" loading="lazy" width="800" height="1500"></div>' +
        '<div class="web-body">' +
          '<h3>' + esc(w.name) + ICON.share + '</h3>' +
          '<div class="cat">' + esc(w.category) + '</div>' +
          '<p>' + esc(w.summary) + '</p>' +
          '<div class="tags">' + w.stack.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '</div></a>';
    }).join('');
  } else {
    $('#web').hidden = true;
  }

  /* ---------- liên hệ ---------- */
  var ct = window.LONG_CONTACT;
  if (ct) {
    var CH = {
      phone: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .95.68l1.5 4.5a1 1 0 0 1-.5 1.2l-2.26 1.13a11 11 0 0 0 5.52 5.52l1.13-2.26a1 1 0 0 1 1.2-.5l4.5 1.5a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5Z"/></svg>',
      mail: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 8 7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/></svg>',
      chat: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.42-4.03 8-9 8a9.86 9.86 0 0 1-4.26-.95L3 20l1.4-3.72C3.51 15.04 3 13.57 3 12c0-4.42 4.03-8 9-8s9 3.58 9 8Z"/></svg>'
    };
    var rows = [
      { label: 'Gọi điện trực tiếp', value: ct.phoneDisplay, href: 'tel:' + ct.phone, icon: CH.phone },
      { label: 'Email', value: ct.email, href: 'mailto:' + ct.email, icon: CH.mail },
      { label: 'Chat Zalo', value: ct.phoneDisplay, href: ct.zalo, icon: CH.chat, ext: true }
    ];
    $('#channels').innerHTML = rows.map(function (r) {
      return '<li><a href="' + esc(r.href) + '"' + (r.ext ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<span class="ch-ic">' + r.icon + '</span>' +
        '<span class="ch-t"><small>' + esc(r.label) + '</small><b>' + esc(r.value) + '</b></span>' +
        '<span class="ch-go" aria-hidden="true">→</span></a></li>';
    }).join('');
  } else {
    $('#contact').hidden = true;
  }

  $('#year').textContent = new Date().getFullYear();
  hero();
  chips();
  list();
  fromHash();
})();
