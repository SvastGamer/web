const btn = document.getElementById('openBtn');
const card = document.getElementById('card');
const sound = document.getElementById('fireworks-sound');

btn.addEventListener('click', () => {
  card.classList.remove('hidden');
  btn.classList.add('hidden');
  sound.play();
  startFireworks();
  startHearts();
});

function startFireworks() {
  const canvas = document.createElement("canvas");
  document.getElementById("fireworks").appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  let fireworks = [];

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ["#ff3c6e", "#ffe600", "#4fc3f7", "#00e676"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 100; i++) {
      fireworks.push({
        x,
        y,
        radius: 2 + Math.random() * 2,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 5 + 2,
        alpha: 1,
        decay: 0.01 + Math.random() * 0.02,
        color
      });
    }
  }

  function drawFireworks() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((f, index) => {
      const vx = Math.cos(f.angle) * f.speed;
      const vy = Math.sin(f.angle) * f.speed;
      f.x += vx;
      f.y += vy;
      f.alpha -= f.decay;

      if (f.alpha <= 0) {
        fireworks.splice(index, 1);
      } else {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = f.color;
        ctx.globalAlpha = f.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });

    requestAnimationFrame(drawFireworks);
  }

  setInterval(createFirework, 700);
  drawFireworks();
}

function startHearts() {
  const container = document.getElementById('hearts-container');

  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';

    // Posición aleatoria en pantalla
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = Math.random() * window.innerHeight + 'px';

    // Tamaño aleatorio
    heart.style.fontSize = (Math.random() * 20 + 16) + 'px';

    // Dirección aleatoria de animación
    heart.style.setProperty('--x', (Math.random() * 100 - 50) + 'px');
    heart.style.setProperty('--y', -(Math.random() * 400 + 200) + 'px');

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }, 300);
}
