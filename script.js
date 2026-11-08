/* ================== DADOS ================== */
// mensagens (uma por foto, na ordem)
const FOTOS = [
  ['foto_01.jpg', 'A primeira foto já dizia tudo: meu dia ia ficar bonito pra sempre.'],
  ['foto_02.jpg', 'Você transforma até os dias comuns em sonhos bonitos.'],
  ['foto_03.jpg', 'Só de aparecer na minha tela, meu dia já fica melhor.'],
  ['foto_04.jpg', 'Esse sorriso é meu lugar favorito no mundo.'],
  ['foto_05.jpg', 'Se eu pudesse guardar uma foto por dia, escolheria essa de novo.'],
  ['foto_06.jpg', 'Você é o presente mais incrível que a vida já me deu.'],
  ['foto_07.jpg', 'Distância é só uma palavra; meu coração está sempre com você.'],
  ['foto_08.jpg', 'Eu amo você ❤️ hoje, amanhã e em todas as manhãs seguintes.'],
  ['foto_09.jpg', 'Se eu organizasse meus sonhos, todos teriam a sua cara.'],
  ['foto_10.jpg', 'Sua voz é meu refúgio favorito: me traz de volta pra calma.'],
  ['foto_11.jpg', 'Quero todos os próximos momentos com esse sorriso do lado.'],
  ['foto_12.jpg', 'Quando nada der certo, eu lembro de você e tudo melhora.'],
  ['foto_13.jpg', 'A última foto daqui… mas você? Você é o meu “para sempre”.'],
];

/* ================== GALERIA ================== */
const grade = document.getElementById('grade');
FOTOS.forEach(([arq, msg], i) => {
  const d = document.createElement('div');
  d.className = 'pol';
  d.style.animationDelay = (i * 0.07) + 's';
  d.innerHTML = `<img src="assets/fotos/${arq}" alt="foto ${i + 1}" loading="lazy">
    <div class="legenda">${['Sorriso lindo', 'Sua cara', 'Minha vista favorita', 'Favoritinho', 'Pingo doce', 'Luz do dia', 'Coração', 'EU AMO TI', 'Sonhos', 'Acalma', 'Companheira', 'Melhora o dia', 'Meu sempre'][i] || '❤️'}</div>
    <span class="corao-cantinho">💗</span>
    <span class="fita"></span><span class="fita f2"></span>`;
  d.onclick = () => abrirModal(i);
  grade.appendChild(d);
});

/* ================== MODAL ================== */
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalMsg = document.getElementById('modalMsg');
const contador = document.getElementById('contador');
let fotoAtual = 0;
function abrirModal(i) {
  fotoAtual = i;
  modalImg.src = 'assets/fotos/' + FOTOS[i][0];
  modalMsg.textContent = FOTOS[i][1];
  contador.textContent = (i + 1) + ' / ' + FOTOS.length;
  modal.classList.add('on');
  choverCoracoes(10, 7);
}
function trocarFoto(d) {
  fotoAtual = (fotoAtual + d + FOTOS.length) % FOTOS.length;
  abrirModal(fotoAtual);
}
document.getElementById('fechar').onclick = () => modal.classList.remove('on');
modal.onclick = e => { if (e.target === modal) modal.classList.remove('on'); };
document.getElementById('ant').onclick = () => trocarFoto(-1);
document.getElementById('prox').onclick = () => trocarFoto(1);
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('on')) return;
  if (e.key === 'Escape') modal.classList.remove('on');
  if (e.key === 'ArrowLeft') trocarFoto(-1);
  if (e.key === 'ArrowRight') trocarFoto(1);
});

/* ================== CHUVA DE CORAÇÕES ================== */
const EMO = ['❤️', '💖', '💗', '💕', '💘', '🌹', '💞'];
function coracao(dur) {
  const s = document.createElement('span');
  s.textContent = EMO[Math.floor(Math.random() * EMO.length)];
  s.style.left = Math.random() * 100 + 'vw';
  s.style.fontSize = (16 + Math.random() * 26) + 'px';
  s.style.animationDuration = dur + 's';
  return s;
}
function choverCoracoes(qtd = 26, dur = 9) {
  const c = document.createElement('div');
  c.className = 'chuva';
  for (let i = 0; i < qtd; i++) setTimeout(() => c.appendChild(coracao(dur)), i * 110);
  document.body.appendChild(c);
  setTimeout(() => c.remove(), (dur + Math.random() * 4) * 1000);
}
document.getElementById('btnChuva').onclick = () => choverCoracoes(46, 11);

/* corações na área superior do hero */
const topHearts = document.getElementById('coracoesTop');
setInterval(() => {
  const s = coracao(7);
  s.style.position = 'absolute';
  s.style.right = Math.random() * 90 + '%';
  s.style.top = '0';
  s.style.fontSize = (15 + Math.random() * 20) + 'px';
  topHearts.appendChild(s);
  setTimeout(() => s.remove(), 7500);
}, 900);

/* minicorações onde a gente clicar no site inteiro */
document.addEventListener('click', e => {
  if (modal.classList.contains('on')) return;
  const s = document.createElement('span');
  s.className = 'ploc';
  s.textContent = EMO[Math.floor(Math.random() * EMO.length)];
  s.style.left = e.clientX + 'px';
  s.style.top = e.clientY + 'px';
  s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
  s.style.setProperty('--dy', -(60 + Math.random() * 140) + 'px');
  s.style.setProperty('--rot', (Math.random() * 160 - 80) + 'deg');
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 1000);
});

/* ================== FUNDOS VIVOS ================== */
const sparks = document.getElementById('bgSparkles');
for (let i = 0; i < 40; i++) {
  const s = document.createElement('span');
  s.style.left = Math.random() * 100 + 'vw';
  s.style.top = Math.random() * 100 + 'vh';
  s.style.animationDelay = (Math.random() * 4) + 's';
  s.style.animationDuration = (3 + Math.random() * 3) + 's';
  sparks.appendChild(s);
}
const bgHearts = document.getElementById('bgHearts');
setInterval(() => {
  if (document.hidden) return;
  const s = coracao(10);
  s.style.position = 'fixed';
  s.style.opacity = '.33';
  s.style.zIndex = '0';
  bgHearts.appendChild(s);
  setTimeout(() => s.remove(), 10000);
}, 1300);

/* ================== URSINHO: EXPLODE DE AMOR ================== */
const urso = document.getElementById('ursoEl');
const sombra = document.querySelector('.sombra-urso');
const emoBox = document.getElementById('emoUso');
let ursoGrande = false, emoTimer = null;

function explosaoDeCoracoes(x, y, n = 14) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.className = 'ploc';
    s.textContent = '❤️';
    s.style.left = (x + (Math.random() * 340 - 170)) + 'px';
    s.style.top = (y + (Math.random() * 80 - 40)) + 'px';
    s.style.color = Math.random() < .3 ? '#ff2f86' : '#e8114b';
    s.style.fontSize = (18 + Math.random() * 22) + 'px';
    s.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    s.style.setProperty('--dy', -(90 + Math.random() * 220) + 'px');
    s.style.setProperty('--rot', (Math.random() * 180 - 90) + 'deg');
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
}

function soltarEmocoes() {
  for (let i = 0; i < 3; i++) {
    const s = document.createElement('span');
    s.textContent = ['❤️', '💖', '💘', '😍', '🥰', '💞'][Math.floor(Math.random() * 6)];
    s.style.left = (18 + Math.random() * 64) + '%';
    s.style.bottom = '40%';
    s.style.animationDelay = (i * 0.35) + 's';
    emoBox.appendChild(s);
    setTimeout(() => s.remove(), 2600);
  }
}

function atenderUrso() {
  if (!ursoGrande) {
    ursoGrande = true;
    urso.classList.add('grande');
    sombra.classList.add('grande');
    document.getElementById('palco').style.height = (window.innerWidth <= 640 ? '540px' : '640px');
    const r = urso.getBoundingClientRect();
    explosaoDeCoracoes(r.left + r.width / 2, r.top + 60, 20);
    emoTimer = setInterval(soltarEmocoes, 1400);
    setTimeout(() => document.getElementById('urso').scrollIntoView({ behavior: 'smooth', block: 'center' }), 400);
  } else {
    const r = urso.getBoundingClientRect();
    explosaoDeCoracoes(r.left + r.width / 2, r.top + 60, Math.floor(10 + Math.random() * 10));
  }
  // o urso agradece com corações do próprio corpo já quicando
  setTimeout(() => {
    const rr = urso.getBoundingClientRect();
    explosaoDeCoracoes(rr.left + rr.width / 2, rr.top + 120, 8);
  }, 250);
}
urso.onclick = atenderUrso;

/* primeira mensagem de boas-vindas do urso */
setTimeout(() => {
  const r = urso.getBoundingClientRect();
  explosaoDeCoracoes(r.left + r.width / 2, r.top + 30, 10);
}, 1600);
