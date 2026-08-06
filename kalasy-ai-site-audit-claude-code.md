# ТЗ для Claude Code: паляпшэнне kalasy.ai

Дата аўдыту: 6 жніўня 2026 году  
Рэпазіторый: <https://github.com/itbeard/kalasy.ai>  
Прадакшн: <https://kalasy.ai/>

## 1. Мэта

Дапрацаваць сайт падкаста «Каласы пад сярпом ШІ», не ламаючы яго пазнавальную айдэнтыку:

- ясней патлумачыць, чым падкаст адрозніваецца ад іншых;
- палепшыць беларускія і ангельскія тэксты;
- зрабіць ангельскую версію асобнай індэксаванай старонкай, а не толькі кліенцкім пераключальнікам;
- прыбраць састарэлыя і дубляваныя факты;
- сінхранізаваць сайт з RSS, YouTube і аўдыёпляцоўкамі;
- палепшыць мабільны UX, даступнасць, хуткасць і надзейнасць;
- пакінуць React + Vite + GitHub Pages і цяперашнюю візуальную мову.

Гэта не заданне на поўны рэдызайн. Захаваць:

- палі, каласы, цёплую цёмна-залатую палітру і чырвона-зялёныя акцэнты;
- цяперашнія асноўныя шрыфты і характар загалоўкаў;
- лёгкую беларускую самаіронію;
- аўдыяплэер, RSS-стужку і галоўны CTA на апошні выпуск;
- назву «Каласы пад сярпом ШІ» ў арыгінальным беларускім напісанні.

## 2. Tone of voice і моўныя абмежаванні

Беларуская:

- жывая, натуральная, без канцылярыту і рэкламнай пены;
- мяккая тарашкевіца без празмерна архаічных формаў;
- выкарыстоўваць «ШІ», «падкаст», «вядоўцы», «апрыканцы», «цікаўнасьць»;
- не выкарыстоўваць «подкаст», «вядучыя», «падкаст-апп»;
- не абяцаць «самыя свежыя» або «раз на два тыдні» як абсалют, калі графік можа зрушыцца; пісаць «звычайна раз на два тыдні»;
- не рабіць з тэкстаў агрэсіўны маркетынг або клікбэйт.

Ангельская:

- натуральная міжнародная ангельская без даслоўных калькаў;
- узровень B2: ясна, коратка, без карпаратыўнага жаргону;
- заўсёды відавочна казаць, што сам падкаст цалкам беларускамоўны;
- выкарыстоўваць `Kalasy pad siarpom ŠI`, а не нязграбнае `ShI`;
- імёны: `Emilia Haurus`, `Yauhen Yafimau`, `Aliaksei Kartynnik`.

Не выдумляць адукацыю, пасады або прафесійныя дасягненні Эміліі і Яўгена. Для сайта выкарыстоўваць толькі правераныя функцыі ў самім падкасце.

## 3. Што выявіў аўдыт

### P0 — выправіць у першую чаргу

1. **Памылковая дата пачатку.** Сайт, FAQ, JSON-LD і `llms.txt` кажуць «з жніўня 2025 года». Першы выпуск на YouTube выйшаў 24 чэрвеня 2025 году. Аўдыё-RSS сапраўды пачынаецца пазней, але падкаст як праект — з чэрвеня.

2. **Ангельская версія не мае ўласных SEO-метададзеных.** Пасля пераключэння на ENG мяняецца `html lang` і тэкст у React, але `<title>`, meta description, canonical, Open Graph, PodcastSeries і FAQ JSON-LD застаюцца беларускімі. Ангельскі стан таксама не мае асобнага URL, таму ім нельга нармальна падзяліцца і яго цяжэй індэксаваць.

3. **SEO-тэксты дублююцца і разыходзяцца.** Адзін і той жа факт уручную паўтараецца ў `content/*.md`, `index.html`, `noscript`, JSON-LD і `public/llms.txt`. Гэта ўжо прывяло да памылковай даты, старога ліку выпускаў і няправільнага YouTube URL без `@`.

4. **Апісанне ў RSS/Podbean састарэла.** У ім двойчы паказваецца доўгая мастацкая цытата, а пасля ідзе толькі агульнае «Раз на два тыдні распавядаем пра Штучны Інтэлект». Пошук бачыць спачатку цытату, а не сутнасць праекта. Назва тэрміна таксама памылкова напісаная з вялікіх літар.

5. **Архіў аўдыё няпоўны.** У Podbean/RSS няма выпускаў №1–4, таму кнопка «Усе выпускі» вядзе на старонку, дзе насамрэч не ўсе выпускі. Код кампенсуе гэта ручнымі канстантамі для статыстыкі.

6. **Fallback выпускаў хутка састарвае.** У рэпазіторыі fallback пачынаецца са спэшала №1, хоць на прадакшне RSS ужо вяртае №27. Калі Podbean або CORS не спрацуюць, герой пакажа не апошні выпуск, а стары спэшал, а статыстыка на імгненне пакажа няправільны лік.

### P1 — істотныя паляпшэнні

1. `Stats.jsx` змяшчае ручное `30K+` праглядаў YouTube. Гэта хутка старэе і супярэчыць першапачатковаму дызайн-хэндофу, дзе чацвёртай стабільнай лічбай былі тры вядоўцы.

2. Біяграфіі вядоўцаў занадта агульныя. «Адзін мікрафон» выглядае як клішэ і фактычна не апісвае фармат; фраза пра «бабулю ў вёсцы» можа гучаць паблажліва.

3. На доўгай старонцы няма навігацыі па раздзелах. У шапцы ёсць толькі лагатып і мова.

4. У радку эпізоду кнопка `<button>` укладзеная ў спасылку `<a>`. Гэта неваліднае ўкладанне інтэрактыўных элементаў і дрэнная аснова для клавіятурнай навігацыі.

5. Паласа прагрэсу плэера — клікабельны `<div>` вышынёй 6 px без клавіятурнага кіравання, ролі і `aria-valuenow`.

6. `aria-label="Language"` і `aria-label="scroll down"` не лакалізаваныя. Назвы беларускіх выпускаў на ангельскай старонцы не пазначаныя праз `lang="be"`.

7. YouTube iframe загружаецца адразу. Фота вядоўцаў не мае `loading="lazy"`, `decoding="async"`, `width` і `height`.

8. Square-лагатып выкарыстоўваецца як `summary_large_image`, але для сацыяльных прэв'ю патрэбная асобная гарызантальная выява 1200×630.

9. GA4 загружаецца адразу, але на сайце няма зразумелай палітыкі прыватнасці і механізму згоды. Гэта трэба асобна праверыць для аўдыторыі ў ЕЭЗ; не рабіць дэкаратыўны банэр, які нічога не змяняе.

### P2 — пасля асноўнага PR

1. Зрабіць унутраны поўны архіў замест перасылання на няпоўны Podbean.

2. Аб'яднаць Podbean RSS і YouTube RSS у адзін build-time manifest, каб кожны выпуск меў кнопкі «слухаць» і «глядзець».

3. Самастойна хостыць патрэбныя WOFF2-шрыфты і падрыхтаваць WebP/AVIF-варыянты героя.

4. Дадаць асобныя старонкі выпускаў з апісаннем, таймкодамі, спасылкамі і `PodcastEpisode`/`VideoObject` JSON-LD. Гэта дасць больш пошукавых пасадачных старонак, але не павінна блакаваць першы PR.

## 4. Дакладны план рэалізацыі

### Крок 1. Зрабіць дзве сапраўдныя моўныя старонкі

Мэтавыя URL:

- беларуская: `https://kalasy.ai/`;
- ангельская: `https://kalasy.ai/en/`.

Рэалізацыя для Vite/GitHub Pages:

1. Пакінуць `index.html` беларускай кропкай уваходу.
2. Стварыць `en/index.html` як другую Vite entry point.
3. У `vite.config.js` задаць абодва inputs праз `build.rollupOptions.input`.
4. Абедзве старонкі могуць загружаць адзін `src/main.jsx`; пачатковую мову вызначаць па pathname.
5. Не перанакіроўваць карыстальніка аўтаматычна паводле мовы браўзера або `localStorage`.
6. Пераключальнік мовы зрабіць звычайнымі спасылкамі:

```jsx
<nav className="lang-toggle" aria-label={t('lang.label')}>
  <a href="/" lang="be" hreflang="be" aria-current={lang === 'be' ? 'page' : undefined}>БЕЛ</a>
  <a href="/en/" lang="en" hreflang="en" aria-current={lang === 'en' ? 'page' : undefined}>ENG</a>
</nav>
```

7. На абедзвюх старонках у `<head>` дадаць узаемныя спасылкі:

```html
<link rel="alternate" hreflang="be" href="https://kalasy.ai/">
<link rel="alternate" hreflang="en" href="https://kalasy.ai/en/">
<link rel="alternate" hreflang="x-default" href="https://kalasy.ai/">
```

8. Canonical павінен быць свой для кожнай старонкі.
9. `html lang`, `<title>`, description, OG, Twitter Card, JSON-LD і `noscript` павінны быць лакалізаваныя яшчэ ў гатовым HTML да запуску React.

### Крок 2. Прыбраць ручное дубліраванне SEO

Стварыць `scripts/generate-seo.mjs`, які:

- чытае `content/be.md` і `content/en.md` тым жа парсерам ключоў;
- падстаўляе title, description, FAQ і агульныя факты ў беларускі і ангельскі HTML-шаблоны;
- генеруе `PodcastSeries` JSON-LD;
- генеруе `public/sitemap.xml` з `/` і `/en/` і ўзаемнымі `xhtml:link`;
- генеруе `public/llms.txt` з актуальных канстант і тэкстаў;
- не хардкодзіць колькасць выпускаў у prose;
- мае адну канстанту `PODCAST_START_DATE = '2025-06-24'`.

Дадаць каманды:

```json
{
  "scripts": {
    "generate": "node scripts/generate-seo.mjs && node scripts/sync-episodes.mjs",
    "prebuild": "npm run generate",
    "build": "vite build",
    "check": "node scripts/check-content.mjs"
  }
}
```

Не рабіць runtime-SEO праз адзін толькі `document.title`: патрэбны правільны HTML для кожнага URL.

### Крок 3. Метададзеныя

Беларуская старонка:

```html
<title>Каласы пад сярпом ШІ — беларускамоўны падкаст пра штучны інтэлект</title>
<meta name="description" content="Беларускамоўны падкаст пра ШІ, тэхналогіі і культуру. Эмілія Гаўрус, Яўген Яфімаў і Аляксей Картыннік абмяркоўваюць галоўныя навіны без занудства.">
```

Ангельская старонка:

```html
<title>Kalasy pad siarpom ŠI — a Belarusian-language podcast about AI</title>
<meta name="description" content="A Belarusian-language podcast about AI, technology and culture, hosted by Emilia Haurus, Yauhen Yafimau and Aliaksei Kartynnik.">
```

Для кожнай старонкі:

- `og:title`, `og:description`, `og:url`, `og:locale` і canonical мусяць адпавядаць мове;
- дадаць `twitter:title`, `twitter:description`, `twitter:image`;
- дадаць `og:image:width`, `og:image:height`, `og:image:alt`;
- стварыць `/assets/og-cover.jpg` памерам 1200×630, без дробнага тэксту;
- дадаць `<meta name="theme-color" content="#14100b">`;
- выправіць усе `https://youtube.com/kalasyai` на `https://www.youtube.com/@kalasyai`.

`PodcastSeries` JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "Каласы пад сярпом ШІ",
  "alternateName": ["КПСШІ", "Kalasy pad siarpom ŠI"],
  "url": "https://kalasy.ai/",
  "image": "https://kalasy.ai/assets/logo-square.jpg",
  "inLanguage": "be",
  "startDate": "2025-06-24",
  "webFeed": "https://feed.podbean.com/kalasyai/feed.xml",
  "author": [
    { "@type": "Person", "name": "Эмілія Гаўрус", "url": "https://www.linkedin.com/in/emilia-gawrus-200a141a0/" },
    { "@type": "Person", "name": "Яўген Яфімаў", "url": "https://www.linkedin.com/in/eugene-efimov/" },
    { "@type": "Person", "name": "Аляксей Картыннік", "url": "https://itbeard.com/" }
  ],
  "sameAs": [
    "https://open.spotify.com/show/1hs0L5Rtpp1BQ8wzFTMkZr",
    "https://podcasts.apple.com/us/podcast/id1833654219",
    "https://www.youtube.com/@kalasyai",
    "https://t.me/kalasyai",
    "https://www.instagram.com/kalasyai/",
    "https://kalasyai.podbean.com/"
  ]
}
```

FAQ JSON-LD генерыраваць з тых жа `faq.q*` і `faq.a*`, што бачныя на адпаведнай старонцы. Не трымаць асобную ручную копію адказаў.

### Крок 4. Сінхранізаваць выпускі на этапе зборкі

Стварыць `scripts/sync-episodes.mjs` і committed fallback, напрыклад `src/data/episodes.json`.

Паводзіны:

1. Падчас build сцягнуць Podbean RSS.
2. Распарсіць усе items і захаваць нармалізаваныя палі `num`, `special`, `title`, `date`, `durationSec`, `link`, `mp3`.
3. Калі RSS недаступны, не падаць з пустым спісам: выкарыстоўваць апошні committed JSON.
4. У браўзеры можна ціха абнавіць feed, але старонка адразу павінна мець актуальны build-time snapshot.
5. Выдаліць `UNLISTED_EPISODES_COUNT` і `UNLISTED_EPISODES_SECONDS`, калі выпускі №1–4 будуць дададзеныя ў Podbean.
6. Пакуль №1–4 адсутнічаюць у RSS, захоўваць іх у асобным масіве `YOUTUBE_ONLY_EPISODES`, а не ў безыменных лікавых канстантах. Для кожнага захоўваць назву, арыгінальную дату, працягласць і YouTube URL.
7. Статыстыка павінна лічыць regular episodes + specials з аднаго manifest без мігцення 11 → 28.

Кнопку «Усе выпускі» пакуль замяніць двума яснымі спасылкамі:

- `Усе аўдыёвыпускі` / `All audio episodes` → Podbean;
- `Увесь відэаархіў` / `Full video archive` → YouTube.

Пасля з'яўлення ўнутранага архіва абедзве можна замяніць адной спасылкай на `/episodes/`.

### Крок 5. Паправіць `Stats`

Выдаліць ручны `YOUTUBE_VIEWS = '30K+'` і вярнуць стабільную чацвёртую лічбу:

```jsx
const items = [
  [episodeCount, t('stats.episodes')],
  [hours, t('stats.hours')],
  ['2', t('stats.cadence')],
  ['3', t('stats.hosts')],
]
```

Новыя ключы:

```md
## stats.hosts
вядоўцы
```

```md
## stats.hosts
hosts
```

### Крок 6. Навігацыя

На шырокіх экранах дадаць у шапку:

- Выпускі / Episodes → `#episodes`;
- Пра падкаст / About → `#about`;
- Вядоўцы / Hosts → `#hosts`;
- Слухаць / Listen → `#listen`.

На мабільным не рабіць складанае меню ў першым PR. Можна схаваць тэкставую навігацыю да 760 px, пакінуўшы лагатып, мову і невялікую CTA-спасылку «Слухаць».

Улічыць вышыню fixed-header праз `scroll-margin-top` для секцый.

### Крок 7. Даступнасць і семантыка

1. Перапісаць радок эпізоду так, каб `<button>` не быў унутры `<a>`:

```jsx
<article className="ep">
  <a className="ep-link" href={ep.link} target="_blank" rel="noopener noreferrer">
    {/* нумар, назва, дата */}
  </a>
  {ep.mp3 && <button className="ep-play">...</button>}
</article>
```

2. Замяніць `.player-track` на `<input type="range">` або рэалізаваць паўнавартасны slider. Перавага — натыўны `<input type="range">` з:

- `min="0"`;
- `max={dur}`;
- `value={time}`;
- лакалізаваным `aria-label`;
- вялікай нябачнай зонай націску не менш за 40–44 px;
- падтрымкай стрэлак, Home і End;
- зразумелым `aria-valuetext`, напрыклад «12 хв 08 с з 1 гадз 47 хв».

3. Дадаць лакалізаваныя ключы:

```md
## lang.label
Мова сайта

## nav.episodes
Выпускі

## nav.about
Пра падкаст

## nav.hosts
Вядоўцы

## nav.listen
Слухаць

## hero.scroll
Перайсці да рэкамендаванага выпуску

## player.seek
Пазіцыя прайгравання
```

Ангельскія адпаведнікі: `Site language`, `Episodes`, `About`, `Hosts`, `Listen`, `Go to the recommended episode`, `Playback position`.

4. На ангельскай старонцы пазначыць арыгінальныя назвы выпускаў і беларускі H1 як `lang="be"`.
5. Для актыўнай мовы выкарыстоўваць `aria-current="page"`, не толькі колер.
6. Дадаць `type="button"` усім кнопкам, якія не адпраўляюць форму.
7. SVG-іконкі ў кнопках, дзе ўжо ёсць `aria-label`, зрабіць `aria-hidden="true"`.
8. Захаваць моцны `:focus-visible` і праверыць яго на ўсіх новых спасылках.

### Крок 8. Прадукцыйнасць і мабільны UX

1. У `Featured.jsx` дадаць iframe:

```jsx
loading="lazy"
```

2. Для фота вядоўцаў:

```jsx
<img
  src="/assets/hosts.jpg"
  alt={t('hosts.photo.alt')}
  width="800"
  height="1000"
  loading="lazy"
  decoding="async"
/>
```

3. Для лагатыпаў і іншых растраў таксама задаць фактычныя `width`/`height`.
4. Падрыхтаваць `bg-hero.webp` і па магчымасці `bg-hero.avif`; JPG пакінуць fallback.
5. Не загружаць усе вагі шрыфту, калі яны не выкарыстоўваюцца. Пасля асноўнага PR перанесці патрэбныя WOFF2 на свой дамен.
6. На 320–390 px праверыць доўгую назву апошняга выпуску. Дадаць:

```css
.hero-play { max-width: 100%; }
.hero-play > span:last-child { min-width: 0; }
```

7. Павялічыць touch-area паласы прагрэсу і ўсіх дробных інтэрактыўных элементаў.
8. Калі `IntersectionObserver` недаступны, паказаць `[data-reveal]` без анімацыі. Не пакідаць кантэнт з `opacity: 0` назаўсёды.

### Крок 9. GA4 і прыватнасць — асобнае рашэнне ўладальніка

Не рабіць выгляд, што пытанне вырашана адным банэрам.

Абраць адзін варыянт:

1. Пакінуць GA4 і рэалізаваць сапраўдны Consent Mode v2: да згоды `analytics_storage: 'denied'`, пасля выбару абнаўляць стан; дадаць палітыку прыватнасці і магчымасць змяніць выбар.
2. Часова прыбраць GA4 да асобнай рэалізацыі згоды.
3. Перайсці на ўзгоднены privacy-friendly інструмент пасля асобнай праверкі патрабаванняў.

Гэты пункт патрабуе рашэння ўладальніка і пры патрэбе юрыдычнай праверкі; ён не павінен блакаваць выпраўленні тэкстаў, SEO і даступнасці.

## 5. Гатовыя беларускія тэксты

Замяніць адпаведныя секцыі ў `content/be.md`. Ключы не пераймяноўваць, акрамя відавочна пазначаных новых.

```md
## hero.kicker
падкаст пра ШІ · звычайна раз на два тыдні · па-беларуску

## hero.sub
Галоўныя навіны ШІ, беларускі кантэкст, тэхналогіі і культура — без занудства, з гумарам і цалкам па-беларуску.

## hero.also
Слухаць і глядзець:

## about.lead
Звычайна раз на два тыдні Эмілія, Яўген і Аляксей абмяркоўваюць, як ШІ мяняе тэхналогіі, культуру, працу і штодзённае жыццё — у свеце і ў Беларусі. Гэта каля дзвюх гадзін жывой размовы па-беларуску: з гумарам, уласнымі поглядамі і без патрэбы разбірацца ў кодзе. Першы выпуск выйшаў у чэрвені 2025 году.

## about.card1.title
Галоўныя навіны ШІ

## about.card1.text
Новыя мадэлі, робаты, даследаванні і падзеі — з тлумачэннем, што адбылося і чаму гэта важна.

## about.card2.text
Беларускія праекты, навука, адукацыя, дзяржаўныя ініцыятывы і людзі, якія працуюць з ШІ.

## about.card3.title
Моўныя памылачкі

## about.card3.text
Апрыканцы выпуску выпраўляем памылкі адно аднаго і разам вучымся гаварыць па-беларуску лепей.

## about.card4.text
Фінальны верш у выкананні Эміліі — кароткая паўза пасля навінаў, мадэляў і робатаў.

## featured.lead
Калі вы тут упершыню, пачніце з нашага першага афлайн-запісу ў сапраўдным замку: пра эмоцыі ШІ, кланаванне калег, звальненні і крыху віна.

## featured.cta
Глядзець на YouTube →

## plat.mp3.name
MP3 на Podbean

## plat.rss
для падкаст-дадатку

## episodes.lead
Націсніце ▶, каб слухаць на сайце. Плэер застанецца ўнізе старонкі.

## episodes.allAudio
Усе аўдыёвыпускі →

## episodes.allVideo
Увесь відэаархіў →

## tg.note
анонсы новых выпускаў і беларускія навіны ШІ · без спаму

## hosts.lead
Трое сяброў, тры розныя погляды і агульная цікаўнасьць да ШІ.

## hosts.1.text
Адказвае за культурны і моўны ракурс — і завяршае выпускі вершамі.

## hosts.2.text
Знаходзіць самыя дзіўныя гісторыі пра робатаў, тэхналогіі і людзей.

## hosts.3.text
Праграміст і ШІ-адукатар. Тлумачыць складаныя тэхналогіі ясна і без лішняй пыхі.

## faq.a1
«Каласы пад сярпом ШІ» (КПСШІ) — беларускамоўны падкаст пра штучны інтэлект, тэхналогіі, культуру і грамадства. Першы выпуск выйшаў 24 чэрвеня 2025 году; новыя выпускі звычайна выходзяць раз на два тыдні і доўжацца каля дзвюх гадзін.

## faq.a2
На Spotify, у Apple Podcasts, на YouTube, на Podbean у фармаце MP3 і праз RSS у любым падкаст-дадатку. Анонсы і кароткія навіны выходзяць у Telegram-канале t.me/kalasyai.

## faq.a3
Абмяркоўваем галоўныя навіны ШІ ў свеце і Беларусі: мадэлі, робатаў, навуку, працу, адукацыю, культуру, права і этыку. Апрыканцы выпраўляем моўныя памылачкі і слухаем верш у выкананні Эміліі.
```

Пакінуць без зменаў, калі няма асобнай рэдактарскай прычыны:

- `hero.quote`;
- `featured.title`;
- `listen.title`;
- `listen.lead`;
- `footer.quote`.

Год у footer не захоўваць у перакладным тэксце. Выводзіць `new Date().getFullYear()` і лакалізаваную назву праекта асобна.

## 6. Гатовыя ангельскія тэксты

Замяніць адпаведныя секцыі ў `content/en.md`.

```md
## hero.kicker
AI podcast · usually every two weeks · in Belarusian

## hero.sub
AI news, technology and culture through a Belarusian lens — clear, curious and never dull. The show is entirely in Belarusian.

## hero.also
Watch or listen:

## about.lead
Usually every two weeks, Emilia, Yauhen and Aliaksei discuss how AI is changing technology, culture, work and everyday life — globally and in Belarus. Expect roughly two hours of lively conversation in Belarusian, with humour, strong opinions and no programming background required. The first episode was published in June 2025.

## about.card1.title
The AI news that matters

## about.card1.text
New models, robots, research and major events — with a clear explanation of what happened and why it matters.

## about.card2.text
Belarusian projects, research, education, public initiatives and the people building with AI.

## about.card3.title
Language notes

## about.card3.text
At the end of each episode, we revisit our Belarusian slips and learn to speak the language better together.

## about.card4.title
Poetry with Emilia

## about.card4.text
Each regular episode ends with a poem read by Emilia — a quiet pause after the news, models and robots.

## featured.lead
New to the show? Start with our first in-person recording in a real castle: AI emotions, cloned colleagues, layoffs and a little wine.

## featured.cta
Watch on YouTube →

## plat.mp3.name
MP3 on Podbean

## plat.rss
for your podcast app

## episodes.lead
Press ▶ to listen here. The player will stay at the bottom of the page.

## episodes.allAudio
All audio episodes →

## episodes.allVideo
Full video archive →

## tg.note
new episodes and Belarusian AI news · no spam

## hosts.lead
Three friends, three different perspectives and one shared curiosity about AI.

## hosts.1.text
Brings the cultural and language perspective — and closes each regular episode with a poem.

## hosts.2.text
Finds the strangest stories about robots, technology and the people behind them.

## hosts.3.text
A software developer and AI educator who explains complex technology clearly and without the hype.

## faq.q1
What is “Каласы пад сярпом ШІ”?

## faq.a1
“Каласы пад сярпом ШІ” (Kalasy pad siarpom ŠI; roughly “Ears of Grain under the Sickle of AI”) is a Belarusian-language podcast about artificial intelligence, technology, culture and society. The first episode was published on June 24, 2025. New episodes usually arrive every two weeks and run for about two hours.

## faq.a2
Listen on Spotify, Apple Podcasts or Podbean, watch on YouTube, or subscribe through RSS in any podcast app. Announcements and short updates are posted at t.me/kalasyai.

## faq.a3
The hosts cover major AI news globally and in Belarus: models, robots, research, work, education, culture, law and ethics. Regular episodes end with Belarusian language notes and a poem read by Emilia.
```

На ангельскай старонцы не перакладаць назву брэнду ў H1. Тлумачэнне `Ears of Grain under the Sickle of AI` даваць адзін раз у FAQ і JSON-LD/description, а не паўтараць у кожным блоку.

## 7. Тэксты для вонкавых пляцовак

Гэтыя змены не робяцца ў GitHub. Пасля дэполю ўручную абнавіць Podbean, YouTube, Telegram і Instagram.

### 7.1 Podbean / RSS / Spotify / Apple Podcasts — асноўнае беларускае апісанне

```text
«Каласы пад сярпом ШІ» — беларускамоўны падкаст пра тое, як штучны інтэлект мяняе тэхналогіі, культуру, працу і штодзённае жыццё.

Звычайна раз на два тыдні Эмілія Гаўрус, Яўген Яфімаў і Аляксей Картыннік абмяркоўваюць галоўныя навіны ШІ ў свеце і Беларусі, спрачаюцца, выпраўляюць моўныя памылачкі і завяршаюць выпуск вершам. Не трэба быць праграмістам — дастаткова цікавіцца тым, куды коціцца гэты «ціхі розум».

Сайт і ўсе пляцоўкі: https://kalasy.ai
YouTube: https://www.youtube.com/@kalasyai
Telegram: https://t.me/kalasyai
Instagram: https://www.instagram.com/kalasyai/
```

### 7.2 Кароткае ангельскае апісанне для каталогаў

```text
Kalasy pad siarpom ŠI is a Belarusian-language podcast about artificial intelligence, technology, culture and society. Emilia Haurus, Yauhen Yafimau and Aliaksei Kartynnik discuss the AI news that matters globally and in Belarus — with humour, strong opinions, language notes and poetry. The show itself is entirely in Belarusian.

Website: https://kalasy.ai/en/
```

### 7.3 YouTube — апісанне канала

Першыя 150–200 сімвалаў мусяць адразу тлумачыць праект; мастацкую цытату можна пакінуць ніжэй.

```text
«Каласы пад сярпом ШІ» — беларускамоўны падкаст пра штучны інтэлект, тэхналогіі і культуру. Галоўныя навіны ў свеце і Беларусі — без занудства, з гумарам і ўласнымі поглядамі.

Звычайна новы выпуск выходзіць раз на два тыдні. Вядуць Эмілія Гаўрус, Яўген Яфімаў і Аляксей Картыннік.

🎧 Усе пляцоўкі: https://kalasy.ai
💬 Telegram: https://t.me/kalasyai
📷 Instagram: https://www.instagram.com/kalasyai/

Kalasy pad siarpom ŠI is a Belarusian-language podcast about AI, technology and culture. The show itself is entirely in Belarusian.
```

### 7.4 Telegram bio

```text
Беларускамоўны падкаст пра ШІ, тэхналогіі і культуру. Новыя выпускі, кароткія навіны і закуліссе. Слухаць: kalasy.ai
```

### 7.5 Instagram bio

```text
Падкаст пра ШІ па-беларуску 🌾
Новы выпуск звычайна раз на два тыдні
🎧 Усе пляцоўкі: kalasy.ai
```

### 7.6 Шаблон апісання выпуску

```text
[2–3 сказы: галоўны канфлікт або пытанне выпуска. Не паўтараць увесь загаловак і не пачынаць з «Сёння абмяркоўваем» у кожным выпуску.]

У ВЫПУСКУ
— [3–6 галоўных тэм чалавечай мовай]

ДЗЕ НАС СЛУХАЦЬ І ГЛЯДЗЕЦЬ
🌾 Сайт і ўсе пляцоўкі: https://kalasy.ai
▶️ YouTube: https://www.youtube.com/@kalasyai
💬 Telegram: https://t.me/kalasyai
📷 Instagram: https://www.instagram.com/kalasyai/

НАВІГАЦЫЯ
0:00 ...

СПАСЫЛКІ І КРЫНІЦЫ
🔹 ...

#каласыпадсярпомші #кпсші #штучныінтэлект
```

Правілы для назваў YouTube:

- 55–80 сімвалаў пажадана, да 100 — толькі калі сапраўды трэба;
- не больш за 2–3 сюжэты ў назве;
- у пачатку — самы моцны беларускі, чалавечы або канфліктны сюжэт;
- брэндавы суфікс пакідаць аднолькавым: `/ КПСШІ #27` або `/ КПСШІ Спэшал #1`;
- ангельскі title і summary дадаваць праз функцыю перакладаў YouTube, а не ўціскаць дзве мовы ў адну назву.

Прыклад для №27:

```text
GPT‑5.6 і ШІ-музыка для Купалаўскага: што змянілася? / КПСШІ #27
```

## 8. Вонкавыя праўкі кантэнту

Зрабіць уручную ў Podbean/YouTube пасля code-PR:

1. Дадаць у Podbean выпускі №1–4 з арыгінальнымі датамі, аўдыё, вокладкамі і апісаннямі, калі захаваліся зыходныя файлы.
2. Праверыць даты і парадак №5–6: у RSS абодва цяпер маюць 31 жніўня 2025 году, а №5 стаіць перад №6.
3. Выправіць у старых метададзеных:

   - `ШІ-светлафоры` → `ШІ-святлафоры`;
   - лацінскую `C` у `Cабакі` → кірылічную `С`;
   - `GPT 5.5.` → `GPT‑5.5`;
   - зламаныя URL з пачатковым `%20`, канцавым `%20` і `http`, калі даступны `https`;
   - таймкоды, якія ідуць не па парадку.

4. Пасля абнаўлення Podbean пачакаць сінхранізацыі і праверыць апісанне ў Spotify і Apple Podcasts.
5. Ва ўсіх bio галоўнай спасылкай зрабіць `https://kalasy.ai`, а не Podbean: сайт ужо накіроўвае на патрэбную пляцоўку.

## 9. Праверкі і acceptance criteria

### Аўтаматычныя

`npm run check` павінен правяраць:

- поўную адпаведнасць ключоў у `content/be.md` і `content/en.md`;
- адсутнасць пустых значэнняў;
- адсутнасць у production-файлах `подкаст`, `youtube.com/kalasyai`, `жніўня 2025`, `26+`, `больш за 26`;
- валідныя JSON-LD файлы;
- `startDate === '2025-06-24'`;
- два URL у sitemap і ўзаемныя `hreflang`;
- наяўнасць актуальнага committed episode manifest;
- унікальнасць episode links і нумароў у межах regular/special серый.

Пасля зменаў абавязкова:

```bash
npm ci
npm run check
npm run build
```

### Ручныя

1. Адкрыць `/` і `/en/` без JavaScript: бачны кароткі змест і правільныя спасылкі.
2. Праверыць source HTML абедзвюх старонак: title, description, canonical, hreflang, OG і JSON-LD ужо правільныя да React.
3. Праверыць 360, 390, 768, 1024 і 1366 px: няма гарызантальнага скролу, доўгая назва апошняга выпуску не вылазіць з CTA.
4. Прайсці ўсю старонку клавішай Tab: парадак лагічны, фокус бачны, эпізод і яго Play — два асобныя элементы.
5. Кіраваць пазіцыяй плэера стрэлкамі, Home і End.
6. Праверыць `prefers-reduced-motion: reduce`.
7. Імітаваць памылку RSS: герой і статыстыка застаюцца актуальнымі з build-time snapshot.
8. Праверыць, што iframe і фота ніжэй за першы экран загружаюцца lazy.
9. Праверыць усе platform links і featured YouTube video.
10. Праверыць Rich Results/Schema validator і rendered HTML у Search Console пасля дэполю.

### Гатова, калі

- на сайце нідзе не сцвярджаецца, што падкаст пачаўся ў жніўні 2025;
- беларуская і ангельская версіі маюць асобныя URL і метададзеныя;
- FAQ, JSON-LD, `noscript` і бачныя тэксты паходзяць з адной крыніцы;
- няма ручнога ліку праглядаў YouTube;
- fallback апошняга выпуску не адстае ад build-time RSS;
- кнопка Play не ўкладзеная ў спасылку;
- seek control працуе мышшу, пальцам і клавіятурай;
- у сацыяльных прэв'ю выкарыстоўваецца 1200×630 cover;
- сайт збіраецца без памылак і не губляе цяперашнюю айдэнтыку.

## 10. Крыніцы для праверкі рашэнняў

- Сайт: <https://kalasy.ai/>
- Рэпазіторый: <https://github.com/itbeard/kalasy.ai>
- YouTube-канал: <https://www.youtube.com/@kalasyai>
- Першы выпуск, 24 чэрвеня 2025: <https://www.youtube.com/watch?v=1hepJBvdwc8>
- Podbean: <https://kalasyai.podbean.com/>
- RSS: <https://feed.podbean.com/kalasyai/feed.xml>
- Google пра асобныя лакалізаваныя URL і `hreflang`: <https://developers.google.com/search/docs/specialty/international/localized-versions>
- Google пра JavaScript SEO: <https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics>
- Schema.org `PodcastSeries`: <https://schema.org/PodcastSeries>
- MDN пра `loading="lazy"` для iframe: <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#loading>
- WAI-ARIA media seek slider: <https://www.w3.org/WAI/ARIA/apg/patterns/slider/examples/slider-seek/>
- Google Consent Mode: <https://developers.google.com/tag-platform/security/guides/consent>

