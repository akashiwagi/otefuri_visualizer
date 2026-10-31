/* ページ一覧メニュー。各ページの </body> の前に <script src="menu.js"></script> を1行入れると、
   ページの先頭に折りたたみメニューが出ます。ページが増えたら、下の PAGES の3つ目を true にします。 */
(function () {
  // [表示名, ファイル名, 公開済みか]
  var PAGES = [
    ['よろづよ八首', 'index.html', true],
    ['一下り目', 'hitokudari.html', true],
    ['二下り目', 'futakudari.html', true],
    ['三下り目', 'mikudari.html', true],
    ['四下り目', 'yokudari.html', true],
    ['五下り目', 'itsukudari.html', true],
    ['六下り目', 'mukudari.html', false],
    ['七下り目', 'nanakudari.html', false],
    ['八下り目', 'yakudari.html', false],
    ['九下り目', 'kokonokudari.html', false],
    ['十下り目', 'tokudari.html', false],
    ['十一下り目', 'juichikudari.html', false],
    ['十二下り目', 'junikudari.html', false]
  ];

  var here = decodeURIComponent(location.pathname.split('/').pop() || '') || 'index.html';
  var cur = PAGES[0];
  for (var i = 0; i < PAGES.length; i++) if (PAGES[i][1] === here) cur = PAGES[i];

  var css = [
    '.pagemenu{margin:0 0 14px;border:1px solid var(--line);border-radius:12px;background:var(--surface);font-family:var(--font-body)}',
    '.pagemenu summary{list-style:none;cursor:pointer;min-height:44px;padding:8px 14px;display:flex;align-items:center;gap:10px;font-size:14px}',
    '.pagemenu summary::-webkit-details-marker{display:none}',
    '.pagemenu summary b{font-family:var(--font-display);font-size:17px;font-weight:700}',
    '.pagemenu .pm-label{color:var(--muted);font-size:12px;letter-spacing:.06em}',
    '.pagemenu summary::after{content:"";margin-left:auto;width:8px;height:8px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg);transition:transform .15s}',
    '.pagemenu[open] summary::after{transform:rotate(-135deg)}',
    '.pm-list{list-style:none;margin:0;padding:6px 10px 12px;display:grid;grid-template-columns:repeat(auto-fill,minmax(8.5rem,1fr));gap:6px}',
    '.pm-list a,.pm-list span.pm-soon{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:40px;padding:6px 12px;border:1px solid var(--line);border-radius:10px;font-family:var(--font-display);font-size:16px;color:var(--ink);text-decoration:none;background:var(--bg)}',
    '.pm-list a:hover{border-color:var(--muted)}',
    '.pm-list a[aria-current="page"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}',
    '.pm-list span.pm-soon{color:var(--muted);border-style:dashed;background:none}',
    '.pm-list small{font-family:var(--font-body);font-size:11px}',
    '.pagemenu summary:focus-visible,.pm-list a:focus-visible{outline:2px solid var(--left);outline-offset:2px}',
    '@media (prefers-reduced-motion:reduce){.pagemenu summary::after{transition:none}}'
  ].join('\n');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var menu = document.createElement('details');
  menu.className = 'pagemenu';

  var sum = document.createElement('summary');
  var label = document.createElement('span');
  label.className = 'pm-label';
  label.textContent = 'ページ';
  var name = document.createElement('b');
  name.textContent = cur[0];
  sum.appendChild(label);
  sum.appendChild(name);
  menu.appendChild(sum);

  var list = document.createElement('ul');
  list.className = 'pm-list';
  PAGES.forEach(function (p) {
    var li = document.createElement('li');
    var el;
    if (p[2]) {
      el = document.createElement('a');
      el.href = p[1];
      el.textContent = p[0];
      if (p === cur) el.setAttribute('aria-current', 'page');
    } else {
      el = document.createElement('span');
      el.className = 'pm-soon';
      el.textContent = p[0];
      var small = document.createElement('small');
      small.textContent = '準備中';
      el.appendChild(small);
    }
    li.appendChild(el);
    list.appendChild(li);
  });
  menu.appendChild(list);

  var wrap = document.querySelector('.wrap') || document.body;
  wrap.insertBefore(menu, wrap.firstChild);
})();
