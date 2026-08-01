# Хэндоф: kalasy.ai — рэдызайн галоўнай (v2)

Пакет для Claude Code. Мэта — перанесці змены з HTML-прататыпа ў рэальны рэпазіторый `kalasy-ai`.

## Што ў пакеце

| Файл | Што гэта |
|---|---|
| `SiteV2.dc.html` | **Hi-fi прататып** усёй галоўнай старонкі з усімі зменамі. Адкрываецца ў браўзеры. |
| `ds-base.js`, `support.js` | Рантайм прататыпа. У прадакшн **не пераносіцца**. |
| `shots/` | Скрыншоты блокаў: `hero`, `featured`, `episodes`, `player`. |

> `SiteV2.dc.html` адкрываецца толькі ў Omelette-праекце (яму патрэбная бібліятэка побач). Для працы ў рэпазіторыі глядзіце `shots/` і гэты дакумент — ён самадастатковы.

**Гэта дызайн-рэферэнс, а не прадакшн-код.** Прататып намаляваны інлайнавымі стылямі паверх той самай бібліятэкі `kalasy-ai`, каб хутка паказаць вынік. У рэпазіторыі трэба зрабіць тое самае **у існуючым стылі праекта**: React-кампаненты ў `src/components/`, звычайны глабальны CSS у суседніх `.css`-файлах, тэксты — праз i18n.

**Фідэліці: high.** Колеры, тыпаграфіка, водступы і паводзіны ў прататыпе фінальныя — паўтарайце іх дакладна.

---

## Карта рэпазіторыя (як зараз)

```
src/
  main.jsx
  i18n.jsx                 ← парсіць content/*.md у слоўнік, LangProvider + useLang()
  links.js                 ← LINKS: spotify/apple/youtube/telegram/instagram/podbean/rss
  richtext.jsx             ← renderRich()
  content/be.md, en.md     ← УСЕ тэксты, фармат «## ключ» + абзац пад ім
  hooks/useEpisodes.js     ← RSS Podbean + FALLBACK_EPISODES
  styles/global.css        ← :root токены, body, .btn, section, .wrap, .sec-title, .sec-lead
  components/
    Header.jsx/.css  Hero.jsx/.css  Ornament.jsx/.css  About.jsx/.css
    Featured.jsx/.css  Platforms.jsx/.css  Episodes.jsx/.css
    Hosts.jsx/.css  Faq.jsx/.css  Footer.jsx/.css  Icons.jsx
```

Токены (`:root` у `global.css`) — не мяняюцца:

```
--night #14100b   --dusk #241a10   --field #2e2013
--gold #f2b93f    --gold-bright #ffd98a   --gold-soft #ffedc2
--cream #f7ecd8   --cream-dim #cdbb9e
--red #d8431f     --red-deep #a92f14      --green #2e7d43
--maxw 1120px
```
Шрыфты: `Unbounded` (h1–h3, лічбы, кікеры), `Golos Text` (цела), `Marck Script` (`.sec-title`, hero h1), `Bad Script` (цытаты).

---

## 1. Герой: адзін галоўны заклік

**Файл:** `src/components/Hero.jsx`, `src/components/Hero.css`, `src/content/*.md`

**Было:** `.hero-cta` з трыма роўнымі кнопкамі (Spotify / Apple Podcasts / YouTube). «Apple Podcasts» ламаецца на два радкі, рад крывы, прыярытэту няма.

**Стала:** адна залатая кнопка з нумарам і назвай апошняга выпуску + радок тэкставых спасылак на пляцоўкі пад ёй. Доўгая народная цытата (`hero.quote`) з героя **прыбіраецца** — яна пераязджае ў асобную паласу (гл. §3.3).

Разметка (замяніць увесь блок `.hero-cta` і выдаліць `<p className="hero-quote">`):

```jsx
const latest = episodes[0];                      // з useEpisodes()
const { play } = usePlayer();                    // гл. §4

<button className="hero-play" onClick={() => play(latest)}>
  <span className="hero-play-ico" aria-hidden="true"><PlayIcon /></span>
  <span>
    <small>{t('hero.latest')} · #{latest.num}</small>
    <b>{latest.title}</b>
  </span>
</button>

<p className="hero-also">
  <span>{t('hero.also')}</span>
  <a href={LINKS.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
  <a href={LINKS.apple}   target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
  <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
  <a href={LINKS.rss}     target="_blank" rel="noopener noreferrer">RSS</a>
</p>
```

CSS (`Hero.css`):

```css
.hero-play{display:inline-flex;align-items:center;gap:14px;margin-top:42px;padding:14px 30px 14px 18px;
  border:none;border-radius:99px;background:var(--gold);color:#1c1408;font:700 1rem/1.3 "Golos Text",sans-serif;
  text-align:left;cursor:pointer;box-shadow:0 0 34px rgba(242,185,63,.5);transition:transform .22s,box-shadow .22s}
.hero-play:hover{transform:translateY(-2px);box-shadow:0 0 52px rgba(242,185,63,.78)}
.hero-play-ico{width:38px;height:38px;flex:none;border-radius:50%;background:#1c1408;color:var(--gold);
  display:flex;align-items:center;justify-content:center}
.hero-play-ico svg{width:15px;height:15px}
.hero-play small{display:block;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.hero-play b{display:block;max-width:22ch;font-size:1rem;font-weight:700}
.hero-also{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center;margin-top:22px;
  font-size:.86rem;color:#e3d3b7;text-shadow:0 2px 12px rgba(0,0,0,.9)}
.hero-also span{opacity:.8}
.hero-also a{color:var(--gold-bright);text-decoration:none;padding-bottom:1px;border-bottom:1px solid rgba(255,217,138,.35)}
.hero-also a:hover{color:var(--gold)}
```

Новыя ключы ў `content/be.md` / `content/en.md`:

```
## hero.latest
Апошні выпуск            |  Latest episode

## hero.also
Таксама ў:               |  Also on:
```

---

## 2. Стужка лічбаў пад героем

**Новы файл:** `src/components/Stats.jsx` + `Stats.css`. Ставіцца адразу пасля `<Hero />`.

Лічбы лічацца з таго ж спісу, што ўжо цягне `useEpisodes()` — не хардкодзьце:

```jsx
const eps = useEpisodes();
const hours = Math.round(eps.reduce((s, e) => s + (e.durationSec || 0), 0) / 3600);
const items = [
  [eps.length, t('stats.episodes')],
  [hours,      t('stats.hours')],
  ['2',        t('stats.cadence')],
  ['3',        t('stats.hosts')],
];
```

```css
.stats{background:var(--dusk);border-top:1px solid rgba(242,185,63,.14);border-bottom:1px solid rgba(242,185,63,.14)}
.stats-row{max-width:var(--maxw);margin:0 auto;display:flex;flex-wrap:wrap}
.stat{flex:1 1 150px;padding:26px 12px;text-align:center;border-right:1px solid rgba(242,185,63,.12)}
.stat:last-child{border-right:none}
.stat b{display:block;font-family:"Unbounded",sans-serif;font-weight:700;font-size:1.9rem;line-height:1;color:var(--gold)}
.stat span{display:block;margin-top:7px;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--cream-dim)}
```

Ключы: `stats.episodes` = «выпускаў» / «episodes», `stats.hours` = «гадзін размоў» / «hours of talk», `stats.cadence` = «тыдні паміж» / «weeks apart», `stats.hosts` = «вядучыя» / «hosts».

---

## 3. Рытм старонкі

### 3.1 Новы парадак і фоны

`main.jsx` / `App.jsx`:

| # | Блок | Фон |
|---|---|---|
| 1 | `Header` (fixed) | — |
| 2 | `Hero` | фота поля |
| 3 | `Stats` | `--dusk` |
| 4 | `Featured` **(новы спліт)** | `linear-gradient(180deg,--dusk,--night)` |
| 5 | `Ornament` (чырв.) | — |
| 6 | `Episodes` | `--night` |
| 7 | `Telegram` **(новы)** | `linear-gradient(115deg,#3a2a16,--dusk 52%,#1b1409)` |
| 8 | `About` | `--dusk` |
| 9 | `Quote` **(новы)** | `--night` + залатое ззянне |
| 10 | `Ornament green` | — |
| 11 | `Hosts` | `--dusk → --night` |
| 12 | `Platforms` | `--dusk` |
| 13 | `Faq` | `--night` |
| 14 | `Footer` | — |

Правіла: суседнія раздзелы ніколі не маюць аднолькавы фон.

### 3.2 Featured — спліт замест слупка

`Featured.jsx`: замест `sec-title` + `sec-lead` па цэнтры — два слупкі: відэа злева (16:9), тэкст справа, выраўнаваныя па цэнтры.

```css
.featured-split{max-width:var(--maxw);margin:0 auto;display:flex;flex-wrap:wrap;gap:44px;align-items:center}
.featured-video{flex:1.5 1 440px;min-width:300px;position:relative;padding-top:31%;border-radius:18px;overflow:hidden;
  border:1px solid rgba(242,185,63,.28);box-shadow:0 24px 70px rgba(0,0,0,.6)}
.featured-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.featured-text{flex:1 1 280px;min-width:260px}
.featured-kicker{font-family:"Unbounded",sans-serif;font-weight:700;font-size:.68rem;letter-spacing:.24em;
  text-transform:uppercase;color:var(--red)}
.featured-text h2{font-family:"Marck Script",cursive;font-weight:400;font-size:clamp(2rem,4vw,2.9rem);
  line-height:1.1;color:var(--gold-soft);margin:10px 0 0}
.featured-text p{margin-top:16px;font-size:1.02rem;color:var(--cream-dim);text-wrap:pretty}
```

Кікер — новы ключ `featured.kicker` = «Пачніце адсюль» / «Start here». Загаловак і лід застаюцца тыя ж (`featured.title`, `featured.lead`).

### 3.3 Паласа-цытата

Новы `src/components/Quote.jsx`. Змест — тая самая `hero.quote`, якую забралі з героя.

```css
.quote-band{position:relative;overflow:hidden;background:var(--night);padding:96px 20px;text-align:center}
.quote-band::before{content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 60% 70% at 50% 50%,rgba(242,185,63,.09),transparent 70%)}
.quote-mark{position:relative;font-family:"Marck Script",cursive;font-size:2.4rem;line-height:1;color:var(--red)}
.quote-band blockquote{position:relative;max-width:24ch;margin:18px auto 0;font-family:"Bad Script",cursive;
  font-size:clamp(1.35rem,3.2vw,2.15rem);line-height:1.55;color:var(--gold-bright);text-wrap:pretty}
```
Знак `❦` — `aria-hidden="true"`.

---

## 4. Прыліплы плэер

**Новыя файлы:** `src/player/PlayerProvider.jsx` (кантэкст + `<audio>`), `src/components/Player.jsx` + `Player.css`.

Адзін `<audio>` на ўвесь сайт. `Episodes.jsx` пазбаўляецца ўласнага `useRef(new Audio())` і пачынае клікаць у кантэкст.

```jsx
// PlayerProvider.jsx
const PlayerCtx = createContext(null);
export const usePlayer = () => useContext(PlayerCtx);

export function PlayerProvider({ children }) {
  const audio = useRef(null);
  const [cur, setCur] = useState(null);      // эпізод
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const a = audio.current = new Audio();
    a.preload = 'metadata';
    const on = (ev, fn) => a.addEventListener(ev, fn);
    on('timeupdate',     () => setTime(a.currentTime));
    on('durationchange', () => setDur(a.duration || 0));
    on('play',  () => setPlaying(true));
    on('pause', () => setPlaying(false));
    on('ended', () => { setPlaying(false); setTime(0); });
    return () => { a.pause(); a.src = ''; };
  }, []);

  const play = ep => {
    const a = audio.current;
    if (!a || !ep?.mp3) return;
    if (cur?.mp3 === ep.mp3) { a.paused ? a.play().catch(()=>{}) : a.pause(); return; }
    a.src = ep.mp3; a.playbackRate = rate;
    setCur(ep); setTime(0); setDur(0);
    a.play().catch(()=>{});
  };
  // + toggle, seek(sec), skip(±sec), cycleRate, close
}
```

Паводзіны:

- Бар з'яўляецца толькі калі `cur !== null`; пры закрыцці — пауза + `cur = null`.
- Пад ім рэзерв 98px (пусты `div`), каб не накрываў падвал.
- Кнопкі: play/pause, −15 c, +30 c, хуткасць (1,0× → 1,25× → 1,5× → 1,75× → 2,0× → 1,0×), закрыць.
- Паласа прагрэсу клікабельная: `currentTime = ((e.clientX − rect.left) / rect.width) * dur`.
- Час у фармаце `г:мм:сс` / `м:сс`, `font-variant-numeric: tabular-nums`.
- Кнопка ў героі і кнопкі ў спісе выпускаў выклікаюць той самы `play(ep)`; актыўны радок паказвае іконку паўзы.
- `aria-label` на кожнай кнопцы; на бары `role="region" aria-label="Плэер падкаста"`.
- Пажадана: захоўваць `{mp3, time}` у `localStorage` і аднаўляць пры вяртанні.

```css
.player{position:fixed;left:0;right:0;bottom:0;z-index:60;background:rgba(36,26,16,.95);
  backdrop-filter:blur(12px);border-top:1px solid rgba(242,185,63,.32);box-shadow:0 -10px 44px rgba(0,0,0,.65)}
.player-row{max-width:var(--maxw);margin:0 auto;display:flex;align-items:center;gap:16px;padding:13px 20px}
.player-play{width:48px;height:48px;flex:none;border:none;border-radius:50%;background:var(--gold);color:#1c1408;
  display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 0 22px rgba(242,185,63,.45);
  transition:transform .2s}
.player-play:hover{transform:scale(1.06)}
.player-title{font-weight:600;font-size:.92rem;color:var(--cream);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.player-bar{display:flex;align-items:center;gap:11px;margin-top:8px}
.player-bar time{flex:none;font-size:.74rem;color:#e3d3b7;font-variant-numeric:tabular-nums}
.player-track{position:relative;flex:1;height:6px;border-radius:99px;background:rgba(247,236,216,.16);cursor:pointer}
.player-fill{position:absolute;left:0;top:0;bottom:0;border-radius:99px;pointer-events:none;
  background:linear-gradient(90deg,var(--red),var(--gold))}
.player-btn{background:none;border:1px solid rgba(247,236,216,.24);border-radius:9px;color:#e3d3b7;
  font:600 .74rem/1 "Golos Text",sans-serif;padding:7px 9px;cursor:pointer}
.player-btn:hover{border-color:var(--gold);color:var(--gold-bright)}
```

На вузкім экране (`max-width: 700px`) хавайце `−15/+30/хуткасць`, пакідайце play + назву + паласу.

---

## 5. Рух

**Новы хук** `src/hooks/useReveal.js` — адзін `IntersectionObserver` на старонку, вешаецца на `[data-reveal]`.

- Стан «да»: `opacity:0`, `translateY(20px)`; для арнаментаў `data-reveal="x"` — `scaleX(.2)`, `transform-origin:left center`.
- Пераход: `opacity .65s cubic-bezier(.2,.7,.3,1), transform .65s cubic-bezier(.2,.7,.3,1)`.
- Наладка: `rootMargin: '0px 0px -6% 0px'`, `threshold: 0.05`, пасля спрацоўвання — `unobserve`.
- `@media (prefers-reduced-motion: reduce){[data-reveal]{opacity:1!important;transform:none!important}}` — і сам хук не вешае назіральнік.

Ховер на картках (`.card`, `.plat`):

```css
.card,.plat{transition:transform .25s,box-shadow .25s,border-color .25s}
.card:hover,.plat:hover{transform:translateY(-6px);border-color:var(--gold);
  box-shadow:0 14px 40px rgba(0,0,0,.55),0 0 30px rgba(242,185,63,.18)}
```

`data-reveal` вешаецца на: стужку лічбаў, `.featured-split`, абодва арнаменты (`="x"`), `.ep-list`, Telegram-паласу, `.cards`, цытату, `.hosts-flex`.

---

## 6. Даступнасць

1. **Фокус.** У `global.css`: `:focus-visible{outline:2px solid var(--gold-soft);outline-offset:3px;border-radius:6px}` і `:focus:not(:focus-visible){outline:none}`. Браўзерны сіні контур на цёмным фоне не чытаецца.
2. **Дробны тэкст.** `.ep-meta`, `.plat small`, `.host p`: `font-size` `.82rem → .84rem`, колер `var(--cream-dim) #cdbb9e → #e3d3b7`. Кантраст на `--night` падымаецца з ~4,1:1 да ~7:1.
3. **Арнаменты** ужо маюць `aria-hidden="true"` — пакіньце; тое самае для `❦` у цытаце і для іконкі ў кнопцы героя.
4. **Кнопкі плэера** — заўсёды `aria-label` па-беларуску/па-англійску праз `t()`, не «Play»/«Pause» хардкодам (зараз у `Episodes.jsx` яны хардкоджаныя англійскія — выправіць).
5. `<blockquote>` для цытаты, `<time dateTime=…>` для датаў выпускаў.

---

## 7. Telegram-паласа

Новы `src/components/Telegram.jsx`, ставіцца пасля `Episodes`.

```jsx
<section className="tg-band">
  <div className="wrap">
    <p className="tg-quote">{t('tg.quote')}</p>
    <a className="btn btn-gold" href={LINKS.telegram} target="_blank" rel="noopener noreferrer">{t('tg.cta')}</a>
    <p className="tg-note">{t('tg.note')}</p>
  </div>
</section>
```

```css
.tg-band{padding:72px 20px;text-align:center;border-top:1px solid rgba(242,185,63,.16);
  border-bottom:1px solid rgba(242,185,63,.16);
  background:linear-gradient(115deg,#3a2a16 0%,var(--dusk) 52%,#1b1409 100%)}
.tg-quote{max-width:36ch;margin:0 auto;font-family:"Bad Script",cursive;
  font-size:clamp(1.15rem,2.4vw,1.5rem);line-height:1.5;color:var(--gold-bright)}
.tg-band .btn{margin-top:24px}
.tg-note{margin-top:16px;font-size:.86rem;color:var(--cream-dim)}
```

Ключы:

```
## tg.quote
«Каб не прапусціць, як ШІ будзе жаць нашы палеткі далей»
"So you don't miss how AI keeps reaping our fields"

## tg.cta
Падпісацца ў Telegram  |  Subscribe on Telegram

## tg.note
анонсы выпускаў і навіны ШІ па-беларуску · без спаму
episode announcements and AI news in Belarusian · no spam
```

---

## Усе новыя i18n-ключы (у абодва `content/be.md` і `content/en.md`)

`hero.latest`, `hero.also`, `stats.episodes`, `stats.hours`, `stats.cadence`, `stats.hosts`, `featured.kicker`, `tg.quote`, `tg.cta`, `tg.note`, `player.play`, `player.pause`, `player.back`, `player.forward`, `player.speed`, `player.close`.

Ключ `hero.quote` **застаецца**, але выкарыстоўваецца ў новым `Quote.jsx`, а не ў героі.

---

## Чэк-ліст прыёмкі

- [ ] У героі адна залатая кнопка; яна запускае апошні выпуск у прыліплым плэеры.
- [ ] Стужка лічбаў лічыцца з RSS, а не хардкод.
- [ ] Суседнія раздзелы адрозніваюцца фонам; Featured — двухслуп, цытата — асобная паласа.
- [ ] Плэер адзін на сайт, не знікае пры пракрутцы, не накрывае падвал, seek і хуткасць працуюць.
- [ ] Кожны блок з'яўляецца пры пракрутцы; з `prefers-reduced-motion` — без анімацый.
- [ ] Tab па старонцы — залаты контур бачны на ўсіх трох фонах.
- [ ] Усе новыя тэксты ёсць і ў `be.md`, і ў `en.md`.
- [ ] Мабільны: кнопка героя не вылазіць, плэер згортваецца да play + назва + паласа.
