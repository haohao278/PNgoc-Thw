/**
 * ====================================================================
 * CẤU HÌNH CÁ NHÂN HÓA DỄ DÀNG (BẠN CÓ THỂ CHỈNH SỬA THÔNG TIN Ở ĐÂY)
 * ====================================================================
 */
const CONFIG = {
  // Tên người yêu của bạn
  girlfriendName: "Đka của em",

  // Ngày bắt đầu yêu nhau (Định dạng: Năm-Tháng-Ngày: YYYY-MM-DD)
  startDate: "2022-03-08",

  // Danh sách các câu thoại dễ thương khi chạm vào nhân vật Chibi
  chibiQuotes: [
    "Gánh ff Đka với 🌸",
    "Mi thấy tau seo✨",
    "Ngủ sớm đi nha coi chừng chết sớm nha m 🥰",
    "nhấn vèo tau hoài chi dị má 🙈❤️",
    "Chúc Đka 20/10 vui vẻ 👑",
    "Yêu anh nhất trên đời luôn ó! 💖",
    "Ngủ Ngon 🍧",
    "bai bai mài"
  ],

  // Bức thư tình chúc 20/10 (Sẽ được gõ tự động)
  letterContent: `Gửi đến Đka lục bạc của em 💐

Chúc mừng ngày Phụ nữ Việt Nam 20/10 đến Đka của em nhá!

Cảm ơn Đka đã chơi dới em mặc dù em báo vãi loằn nhưng mà chơi với Đka vui lém chúc. Em chả có xiền nên
làm tạm cái nì tặng Đka trong dịp nì nèo e có xiền thì mỗi dịp tặng Đka bó lớn luôn hehe mong Đka
thông cảm và nhận tấm lòng này của đứa em báo làng *** ***❤️`
};

/**
 * ====================================================================
 * LOGIC TƯƠNG TÁC & HIỆU ỨNG (CORE LOGIC)
 * ====================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const introScreen = document.getElementById('intro-screen');
  const btnEnter = document.getElementById('btn-enter');
  const bgMusic = document.getElementById('bg-music');
  const vinylRecord = document.getElementById('vinyl-record');
  const soundWave = document.getElementById('sound-wave');
  const btnToggleMusic = document.getElementById('btn-toggle-music');
  const btnFireworks = document.getElementById('btn-fireworks');
  
  // Chibi elements
  const itemChibi = document.getElementById('item-chibi');
  const speechBubble = document.getElementById('chibi-speech');
  const speechContent = document.getElementById('speech-content');
  const gfNameEl = document.getElementById('girlfriend-name');

  // Modals
  const modalPhotos = document.getElementById('modal-photos');
  const modalLetter = document.getElementById('modal-letter');
  const itemPhotos = document.getElementById('item-photos');
  const itemLetter = document.getElementById('item-letter');
  const itemMusic = document.getElementById('item-music');
  const itemPet = document.getElementById('item-pet');
  const letterBody = document.getElementById('letter-text');
  const btnReplayLetter = document.getElementById('btn-replay-letter');
  const btnHug = document.getElementById('btn-hug');

  // Setup config data
  if (gfNameEl) gfNameEl.textContent = CONFIG.girlfriendName;
  setupLoveCounter();
  initParticles();

  // 1. NÚT VÀO PHÒNG (BẬT ĐÈN & NHẠC)
  btnEnter.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    playMusic();
    burstHearts(window.innerWidth / 2, window.innerHeight / 2);
  });

  // 2. TRÌNH PHÁT NHẠC TRÊN SMART TV
  const tvEqualizer = document.getElementById('tv-equalizer');
  const tvPlayBtn = document.getElementById('tv-play-btn');
  let isPlaying = false;

  function playMusic() {
    try {
      bgMusic.volume = 0.85;
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isPlaying = true;
          if (tvEqualizer) tvEqualizer.classList.add('active');
          if (tvPlayBtn) tvPlayBtn.textContent = "⏸️";
          btnToggleMusic.textContent = "🔊";
        }).catch(err => {
          console.warn("Trình duyệt chặn autoplay hoặc đang tải file:", err);
          bgMusic.load();
          bgMusic.play().then(() => {
            isPlaying = true;
            if (tvEqualizer) tvEqualizer.classList.add('active');
            if (tvPlayBtn) tvPlayBtn.textContent = "⏸️";
            btnToggleMusic.textContent = "🔊";
          }).catch(e => console.error("Không thể phát nhạc:", e));
        });
      }
    } catch (e) {
      console.error("Audio error:", e);
    }
  }

  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    if (tvEqualizer) tvEqualizer.classList.remove('active');
    if (tvPlayBtn) tvPlayBtn.textContent = "▶️";
    btnToggleMusic.textContent = "🔇";
  }

  itemMusic.addEventListener('click', () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  btnToggleMusic.addEventListener('click', () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  // 3. TƯƠNG TÁC NHÂN VẬT CHIBI
  let quoteIndex = 0;
  itemChibi.addEventListener('click', (e) => {
    // Chuyển đổi câu thoại ngẫu nhiên hoặc tuần tự
    quoteIndex = (quoteIndex + 1) % CONFIG.chibiQuotes.length;
    speechContent.textContent = CONFIG.chibiQuotes[quoteIndex];
    
    // Hiệu ứng nảy lên
    speechBubble.style.animation = 'none';
    speechBubble.offsetHeight; /* trigger reflow */
    speechBubble.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    // Bắn tim ngay tại vị trí Chibi
    const rect = itemChibi.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top + 30);
  });

  // 4. TƯƠNG TÁC CHÚ MÈO CON
  // 4. TƯƠNG TÁC CHÚ MÈO TOM
  const catQuotes = [
    "Meo meo~ Em Hảo Hảo chúc chị đẹp 20/10 vui vẻ! 🐾",
    "Meo~ Chị nhớ mua pate cho Hảo nha! 🐟",
    "Purrr... Hảo đang ngủ mà cũng bị nựng nữa á! 😸",
    "Meo~ Hảo biết em ấy thương chị nhiều nhất trên đời luôn á! ❤️"
  ];
  let catIndex = 0;
  itemPet.addEventListener('click', (e) => {
    catIndex = (catIndex + 1) % catQuotes.length;
    speechContent.textContent = catQuotes[catIndex];
    speechBubble.style.animation = 'none';
    speechBubble.offsetHeight;
    speechBubble.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    const rect = itemPet.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top);
  });

  // 5. MỞ BỘ SƯU TẬP ẢNH KỶ NIỆM
  itemPhotos.addEventListener('click', () => {
    modalPhotos.classList.add('active');
    burstConfetti();
  });

  // 6. BẬT / TẮT ĐÈN PHÒNG (LÀM TỐI CĂN PHÒNG - NIGHT MODE)
  const itemLamp = document.getElementById('item-lamp');
  const roomEl = document.getElementById('room');
  if (itemLamp) {
    itemLamp.addEventListener('click', () => {
      itemLamp.classList.toggle('lamp-off');
      const isOff = itemLamp.classList.contains('lamp-off');
      
      // Làm tối hoặc bật sáng cả căn phòng
      if (roomEl) {
        roomEl.classList.toggle('lights-off', isOff);
      }

      speechContent.textContent = isOff 
        ? "Phòng tối rồi, chúc Đka lục bạc ngủ thật ngoan nha! 🌙💤" 
        : "Đèn bật sáng lung linh rồi nè! Chúc Đka ngày 20/10 ngập tràn niềm vui! 💡✨";
        
      speechBubble.style.animation = 'none';
      speechBubble.offsetHeight;
      speechBubble.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  }

  // 6. MỞ THƯ TÌNH 20/10 (HIỆU ỨNG GÕ CHỮ)
  let typingTimeout = null;

  itemLetter.addEventListener('click', () => {
    modalLetter.classList.add('active');
    startTypewriter(CONFIG.letterContent);
    burstConfetti();
  });

  btnReplayLetter.addEventListener('click', () => {
    startTypewriter(CONFIG.letterContent);
  });

  btnHug.addEventListener('click', () => {
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 40);
    alert("Đã gửi một cái ôm siêu ấm áp đến Đka! 🤗❤️");
  });

  function startTypewriter(text) {
    clearTimeout(typingTimeout);
    letterBody.textContent = "";
    let i = 0;

    function type() {
      if (i < text.length) {
        letterBody.textContent += text.charAt(i);
        i++;
        typingTimeout = setTimeout(type, 35);
      }
    }
    type();
  }

  // ĐÓNG MODAL KHI ẤN NÚT HOẶC RA NGOÀI
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modalId = e.target.getAttribute('data-close');
      document.getElementById(modalId).classList.remove('active');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // 7. NÚT PHÁO HOA & TRÁI TIM
  btnFireworks.addEventListener('click', () => {
    burstConfetti();
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 50);
  });

  // 8. TÍNH SỐ NGÀY YÊU NHAU
  function setupLoveCounter() {
    const counterEl = document.getElementById('counter-text');
    if (!counterEl) return;

    try {
      const start = new Date(CONFIG.startDate);
      const now = new Date();
      const diffTime = Math.abs(now - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      counterEl.textContent = `Bên nhau ${diffDays} ngày biết nhau 💕`;
    } catch (e) {
      counterEl.textContent = `Làm trục chận ff nữa nhá 💕`;
    }
  }

  // 9. HIỆU ỨNG CONFETTI & HEARTS
  function burstConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff758f', '#ff4d6d', '#ffccd5', '#ffd166', '#a2d2ff']
      });
    }
  }

  function burstHearts(x, y, count = 20) {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: count,
        spread: 60,
        origin: { 
          x: x / window.innerWidth, 
          y: y / window.innerHeight 
        },
        shapes: ['heart'],
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1']
      });
    }
  }

  // 10. BACKGROUND FLOATING PARTICLES CANVAS
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = 22;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1.5,
        speedY: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.5 ? '#ff758f' : '#ffd166'
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
});
