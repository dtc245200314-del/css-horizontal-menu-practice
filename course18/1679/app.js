const films = [
  { id: 'bunny', title: 'Chú Thỏ và Vườn Rau', date: '2026-10-19', views: 3120, type: 'video', symbol: '🐰', theme: '', source: 'garden-story.mp4', description: 'Phim hoạt hình ngắn tự xây dựng, thuyết minh tiếng Việt. Câu chuyện về chăm sóc vườn rau và chia sẻ với bạn bè. Video HD 1280×720, không quảng cáo.' },
  { id: 'spring', title: 'Spring', date: '2026-10-18', views: 4210, type: 'iframe', symbol: '🌱', theme: 'spring', source: 'https://www.youtube-nocookie.com/embed/WhWc3b3KhnY', description: 'Cô bé chăn cừu cùng chú chó đối diện các linh hồn cổ xưa để tiếp nối vòng tuần hoàn của sự sống. Phim không thoại của Blender Studio; phần giới thiệu bằng tiếng Việt.' },
  { id: 'bunny-youtube', title: 'Big Buck Bunny — YouTube', date: '2026-10-17', views: 5810, type: 'iframe', symbol: '▶', theme: 'youtube', source: 'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ', description: 'Phiên bản YouTube của Big Buck Bunny. Bài thực hành nhúng iframe và chuyển video khi chọn trong danh sách.' }
];
let selected = films[0].id;
let view = 'all';
let favorites = new Set();
try { const saved = JSON.parse(localStorage.getItem('cartoon-favorites') || '[]'); if (Array.isArray(saved)) favorites = new Set(saved.filter(id => films.some(f => f.id === id))); } catch { /* Storage may be unavailable. */ }
const list = document.getElementById('video-list');
const favoriteButton = document.getElementById('favorite');
function renderList() {
  const keyword = document.getElementById('search').value.trim().toLocaleLowerCase('vi');
  const sort = document.getElementById('sort').value;
  const visible = films.filter(film => film.title.toLocaleLowerCase('vi').includes(keyword) && (view !== 'favorites' || favorites.has(film.id))).sort((a,b) => sort === 'popular' ? b.views-a.views : b.date.localeCompare(a.date));
  list.replaceChildren();
  visible.forEach(film => {
    const card = document.createElement('button'); card.type = 'button'; card.className = 'film-card'; card.setAttribute('aria-pressed', String(film.id === selected));
    const thumbnail = document.createElement('img'); thumbnail.className = 'thumbnail '+film.theme; thumbnail.alt = 'Ảnh đại diện '+film.title; thumbnail.loading = 'lazy'; thumbnail.src = film.id === 'spring' ? 'spring.svg' : 'bunny.svg';
    const title = document.createElement('strong'); title.textContent = film.title;
    const meta = document.createElement('small'); meta.textContent = film.views.toLocaleString('vi')+' lượt xem · Blender';
    card.append(thumbnail,title,meta); card.addEventListener('click',()=>selectFilm(film.id)); list.append(card);
  });
  document.getElementById('empty').hidden = visible.length > 0;
}
function renderFavorite() { const liked = favorites.has(selected); favoriteButton.setAttribute('aria-pressed',String(liked)); favoriteButton.textContent = liked ? '♥ Đã yêu thích' : '♡ Yêu thích'; }
function selectFilm(id) {
  const film = films.find(item=>item.id === id); if (!film) return;
  selected = id;
  const player = film.type === 'iframe' ? document.getElementById('youtube-player').content.firstElementChild.cloneNode(true) : document.createElement('video');
  player.src = film.source;
  if (film.type === 'video') { player.controls = true; player.preload = 'metadata'; player.poster = 'garden-background.png'; player.playsInline = true; player.setAttribute('aria-label',film.title); const track=document.createElement('track');track.kind='captions';track.srclang='vi';track.label='Tiếng Việt';track.src='garden-vi.vtt';track.default=true;player.append(track); player.append(document.createTextNode('Trình duyệt không hỗ trợ video HTML5.')); }
  else { player.title = 'Xem phim '+film.title; player.allow = 'encrypted-media; picture-in-picture; fullscreen'; player.allowFullscreen = true; player.referrerPolicy = 'strict-origin-when-cross-origin'; }
  document.getElementById('player').replaceChildren(player);
  document.getElementById('film-title').textContent = film.title;
  document.getElementById('film-meta').textContent = film.views.toLocaleString('vi')+' lượt xem · Blender Foundation / Blender Studio';
  document.getElementById('film-description').textContent = film.description;
  document.getElementById('playback-note').textContent = '';
  player.addEventListener('error',()=>{ document.getElementById('playback-note').textContent = 'Không tải được video. Hãy kiểm tra kết nối mạng hoặc chọn video khác.'; });
  renderFavorite(); renderList();
}
favoriteButton.addEventListener('click',()=>{ if (favorites.has(selected)) favorites.delete(selected); else favorites.add(selected); try {localStorage.setItem('cartoon-favorites',JSON.stringify([...favorites]));} catch { /* Favorites remain available in this session. */ } renderFavorite(); renderList(); });
document.getElementById('search').addEventListener('input',renderList);
document.getElementById('sort').addEventListener('change',renderList);
document.querySelectorAll('[data-view]').forEach(link=>link.addEventListener('click',()=>{view=link.dataset.view; document.querySelectorAll('[data-view]').forEach(item=>item.removeAttribute('aria-current'));link.setAttribute('aria-current','page');renderList();}));
document.getElementById('feedback-form').addEventListener('submit',event=>{event.preventDefault();const text=document.getElementById('feedback-text').value.trim();if(!text)return;try{localStorage.setItem('cartoon-feedback',text);document.getElementById('feedback-status').textContent='Đã lưu góp ý trên thiết bị này. Cảm ơn bạn!';}catch{document.getElementById('feedback-status').textContent='Đã ghi nhận góp ý trong phiên này. Cảm ơn bạn!';}});
selectFilm(selected);
