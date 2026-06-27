import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'public', 'data');
const IMAGES_DIR = join(ROOT, 'public', 'images');

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true });

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/<[^>]+>/g, '');
}

function assignEmoji(title) {
  const t = title.toLowerCase();
  if (t.match(/nba|basquete/)) return '\u{1F3C0}';
  if (t.match(/nfl|american|super bowl/)) return '\u{1F3C8}';
  if (t.match(/copa do mundo|world cup|fifa|copa 2026/)) return '\u{1F3C6}';
  if (t.match(/f[oó]rmula|corrida|automobilismo|f1/)) return '\u{1F3CE}\u{FE0F}';
  if (t.match(/t[eê]nis|roland|wimbledon/)) return '\u{1F3BE}';
  if (t.match(/mma|ufc|luta|boxe/)) return '\u{1F94A}';
  if (t.match(/olimp/)) return '\u{1F3C5}';
  if (t.match(/vôlei|volei/)) return '\u{1F3D0}';
  return '⚽';
}

function extractItemsFromRSS(xml) {
  const results = [];
  const items = [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)];
  for (const item of items) {
    const cdataTitle = item[0].match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i);
    const plainTitle = item[0].match(/<title>([\s\S]*?)<\/title>/i);
    const raw = cdataTitle ? cdataTitle[1] : plainTitle ? plainTitle[1] : null;

    const cdataLink = item[0].match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/i);
    const plainLink = item[0].match(/<link>([\s\S]*?)<\/link>/i);
    const url = (cdataLink ? cdataLink[1] : plainLink ? plainLink[1] : '').trim();

    if (raw) {
      const text = decodeEntities(raw).trim();
      if (text && text.length > 10) results.push({ text, url });
    }
  }
  return results;
}

async function fetchNews() {
  console.log('--- Fetching news ---');
  const sources = [
    {
      name: 'Google News BR Esportes',
      url: 'https://news.google.com/rss/search?q=futebol+OR+Copa+OR+NBA+OR+NFL+OR+sele%C3%A7%C3%A3o+brasileira&hl=pt-BR&gl=BR&ceid=BR:pt-419',
    },
    {
      name: 'ge.globo',
      url: 'https://ge.globo.com/feed.html',
    },
  ];

  const allHeadlines = [];
  const seen = new Set();

  for (const source of sources) {
    try {
      console.log(`Fetching ${source.name}...`);
      const res = await fetch(source.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CaioSorriso-Bot/1.0)' },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) {
        console.warn(`${source.name}: HTTP ${res.status}`);
        continue;
      }
      const xml = await res.text();
      const items = extractItemsFromRSS(xml);
      console.log(`${source.name}: ${items.length} items found`);

      for (const item of items) {
        const key = item.text.toLowerCase().slice(0, 40);
        if (!seen.has(key)) {
          seen.add(key);
          allHeadlines.push({ emoji: assignEmoji(item.text), text: item.text, url: item.url });
        }
      }
    } catch (e) {
      console.warn(`${source.name} failed: ${e.message}`);
    }
  }

  if (allHeadlines.length === 0) {
    console.warn('No headlines fetched from any source — keeping existing news.json');
    return;
  }

  const headlines = allHeadlines.slice(0, 15);
  const newsData = { updated: new Date().toISOString(), headlines };
  writeFileSync(join(DATA_DIR, 'news.json'), JSON.stringify(newsData, null, 2));
  console.log(`Saved ${headlines.length} headlines to news.json`);
}

async function fetchInstagram() {
  console.log('\n--- Fetching Instagram ---');

  const strategies = [
    {
      name: 'Instagram Web API',
      run: async () => {
        const res = await fetch(
          'https://www.instagram.com/api/v1/users/web_profile_info/?username=caiosorrisooficial',
          {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'X-IG-App-ID': '936619743392459',
              'X-Requested-With': 'XMLHttpRequest',
            },
            signal: AbortSignal.timeout(15000),
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const edges = data?.data?.user?.edge_owner_to_timeline_media?.edges;
        if (!edges || edges.length === 0) throw new Error('No posts found in response');
        return edges.slice(0, 6).map((edge) => ({
          shortcode: edge.node.shortcode,
          image: edge.node.display_url || edge.node.thumbnail_src,
          caption:
            edge.node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 100) || '',
        }));
      },
    },
    {
      name: 'RSSHub',
      run: async () => {
        const instances = [
          'https://rsshub.app/instagram/user/caiosorrisooficial',
          'https://rsshub.rssforever.com/instagram/user/caiosorrisooficial',
        ];
        for (const url of instances) {
          try {
            const res = await fetch(url, {
              headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CaioSorriso-Bot/1.0)' },
              signal: AbortSignal.timeout(10000),
            });
            if (!res.ok) continue;
            const xml = await res.text();
            const items = [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi)];
            if (items.length === 0) continue;

            return items.slice(0, 6).map((item) => {
              const linkMatch = item[0].match(/<link>([\s\S]*?)<\/link>/i);
              const imgMatch = item[0].match(/<img[^>]+src="([^"]+)"/i) ||
                item[0].match(/<enclosure[^>]+url="([^"]+)"/i);
              const shortcodeMatch = linkMatch?.[1]?.match(/\/p\/([^/]+)/);
              return {
                shortcode: shortcodeMatch?.[1] || '',
                image: imgMatch?.[1] || '',
                caption: '',
              };
            }).filter((p) => p.image);
          } catch (_) {
            continue;
          }
        }
        throw new Error('All RSSHub instances failed');
      },
    },
  ];

  for (const strategy of strategies) {
    try {
      console.log(`Trying ${strategy.name}...`);
      const posts = await strategy.run();
      console.log(`${strategy.name}: got ${posts.length} posts`);

      let downloaded = 0;
      for (let i = 0; i < posts.length; i++) {
        try {
          const imgRes = await fetch(posts[i].image, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              Referer: 'https://www.instagram.com/',
            },
            signal: AbortSignal.timeout(15000),
          });
          if (!imgRes.ok) continue;
          const buffer = Buffer.from(await imgRes.arrayBuffer());
          if (buffer.length < 1000) continue;
          writeFileSync(join(IMAGES_DIR, `instagram-${i + 1}.jpg`), buffer);
          downloaded++;
        } catch (e) {
          console.warn(`Image ${i + 1} download failed: ${e.message}`);
        }
      }

      const metadata = {
        updated: new Date().toISOString(),
        posts: posts.map((p, i) => ({
          url: p.shortcode
            ? `https://www.instagram.com/p/${p.shortcode}/`
            : 'https://www.instagram.com/caiosorrisooficial/',
          image: `/images/instagram-${i + 1}.jpg`,
          caption: p.caption,
        })),
      };
      writeFileSync(join(DATA_DIR, 'instagram.json'), JSON.stringify(metadata, null, 2));
      console.log(`Downloaded ${downloaded}/${posts.length} images, saved instagram.json`);
      return;
    } catch (e) {
      console.warn(`${strategy.name} failed: ${e.message}`);
    }
  }

  console.warn('All Instagram strategies failed — keeping existing images');
}

async function fetchYouTube() {
  console.log('\n--- Fetching YouTube ---');
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCwKwG8HtVRoU_BoEATv6GRg';

  if (!API_KEY) {
    console.log('No YOUTUBE_API_KEY — trying RSS fallback');
    try {
      const res = await fetch(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
        { signal: AbortSignal.timeout(10000) }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();
      const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
      if (entries.length === 0) throw new Error('No entries in feed');

      const videos = entries.slice(0, 6).map((entry) => {
        const idMatch = entry[1].match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/);
        const titleMatch = entry[1].match(/<title>([\s\S]*?)<\/title>/);
        const pubMatch = entry[1].match(/<published>([\s\S]*?)<\/published>/);
        const videoId = idMatch?.[1]?.trim() || '';
        return {
          id: videoId,
          title: decodeEntities(titleMatch?.[1]?.trim() || ''),
          thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          publishedAt: pubMatch?.[1]?.trim() || '',
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };
      }).filter((v) => v.id);

      const ytData = { updated: new Date().toISOString(), videos };
      writeFileSync(join(DATA_DIR, 'youtube.json'), JSON.stringify(ytData, null, 2));
      console.log(`Saved ${videos.length} videos from RSS to youtube.json`);
      return;
    } catch (e) {
      console.warn(`YouTube RSS fallback failed: ${e.message}`);
      return;
    }
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=6&type=video`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.items?.length) throw new Error('No items in API response');

    const videos = data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    const ytData = { updated: new Date().toISOString(), videos };
    writeFileSync(join(DATA_DIR, 'youtube.json'), JSON.stringify(ytData, null, 2));
    console.log(`Saved ${videos.length} videos from API to youtube.json`);
  } catch (e) {
    console.warn(`YouTube API failed: ${e.message}`);
  }
}

console.log(`Content update started at ${new Date().toISOString()}\n`);
await fetchNews();
await fetchInstagram();
await fetchYouTube();
console.log('\nContent update complete.');
