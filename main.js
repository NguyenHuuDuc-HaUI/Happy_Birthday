const messages = [
  { 
    text: "Happy birthday chị gái 🎂\n Thêm một tuổi mới, em chúc chị luôn khỏe mạnh, tươi tắn và giữ được nụ cười rạng rỡ như chính phong cách của chị.", 
    bg: "Picture/pic1.png" 
  },
  { 
    text: "Hy vọng trong năm nay, chị sẽ gặp nhiều may mắn, thành công trong công việc và mỗi ngày đều có một điều nhỏ xinh khiến chị mỉm cười. 😄", 
    bg: "Picture/pic2.png"
  },
  { 
    text: "Em luôn trân trọng những cuộc trò chuyện của hai chị em. Nhờ có chị mà em thấy lòng nhẹ hơn, và cũng học được cách nhìn mọi chuyện bình thản hơn. ❤️", 
    bg: "Picture/pic3.png"
  },
  { 
    text: "Mong rằng những ước muốn của chị sẽ dần thành hiện thực. Chúc chị mỗi ngày trôi qua đều là một trang sách đẹp: an nhiên, vui vẻ và đầy năng lượng tích cực.\n Sinh nhật thật trọn vẹn và ấm áp nha chị 🥳", 
    bg: "Picture/pic4.png"
  }
];



let currentIndex = 0;
let typingTimeout;

// const correctUser = "1"; 
const correctPass = "02092002"; // mật mã đăng nhập
let enteredPass = "";

// Hàm bấm số
function pressNum(num) {
    enteredPass += num;
    document.getElementById("pinBox").value = enteredPass;
}

// Hàm xóa 1 số
function deleteNum() {
    enteredPass = enteredPass.slice(0, -1);
    document.getElementById("pinBox").value = enteredPass;
}

// Hàm login
function checkLogin() {
    if (enteredPass === correctPass) {
        document.getElementById("login").classList.add("hidden");
        document.body.style.backgroundImage = `url('${messages[0].bg}')`;
        document.getElementById("messages").classList.remove("hidden");
        typeMessage(messages[0].text);
        // 🔊 Phát nhạc khi login thành công
        const audio = document.getElementById("bgm");
        audio.play().catch(err => {
            console.log("Autoplay bị chặn:", err);
        });
    } else {
        document.getElementById("loginError").innerText = "Aww, mật khẩu bị sai rùii. Zui lòng nhập lại nghennn!";
        // 🔥 Reset mật khẩu nhập sai
        enteredPass = "";
        document.getElementById("pinBox").value = "";
    }
}

function typeMessage(text) {
    const msgEl = document.getElementById("messageText");
    msgEl.innerHTML = "";

    const lines = text.split("\n"); // tách theo xuống dòng
    lines.forEach((line, i) => {
        const p = document.createElement("p");
        p.textContent = line;
        p.style.opacity = 0;
        p.style.transform = "translateY(15px)";
        p.style.transition = "opacity 1.2s ease, transform 1.2s ease";
        msgEl.appendChild(p);

        setTimeout(() => {
            p.style.opacity = 1;
            p.style.transform = "translateY(0)";
        }, i * 500); // mỗi dòng xuất hiện sau 0.5s
    });
}


function showSticker(url) {
    const stickerEl = document.getElementById("sticker");
    if(url){
        stickerEl.src = url;
        stickerEl.classList.remove("hidden");
    } else {
        stickerEl.classList.add("hidden");
    }
}

function nextMessage() {
    if(currentIndex < messages.length - 1){
        currentIndex++;
        document.body.style.backgroundImage = `url('${messages[currentIndex].bg}')`;
        typeMessage(messages[currentIndex].text);
        showSticker(messages[currentIndex].sticker);
    } else {
        startCelebration();
    }
}

function prevMessage() {
    if(currentIndex > 0){
        currentIndex--;
        document.body.style.backgroundImage = `url('${messages[currentIndex].bg}')`;
        typeMessage(messages[currentIndex].text);
        showSticker(messages[currentIndex].sticker);
    }
}

function startCelebration() {
    document.getElementById("messages").classList.add("hidden");
    document.getElementById("fireworksCanvas").classList.remove("hidden");
    document.getElementById("balloonsCanvas").classList.remove("hidden");
    document.getElementById("finalText").classList.remove("hidden");
    document.getElementById("cake").classList.remove("hidden");

    const duration = 4000;
    const end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 7, spread: 70, origin: { y: 0.6 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();

    // Bóng bay
    const ctx = document.getElementById("balloonsCanvas").getContext("2d");
    let balloons = Array.from({ length: 20 }, () => ({
        x: Math.random()*window.innerWidth,
        y: window.innerHeight + Math.random()*500,
        color: `hsl(${Math.random()*360}, 100%, 50%)`,
        size: 30 + Math.random()*20,
        speed: 3 + Math.random()*2
    }));
    function drawBalloons() {
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        balloons.forEach(b => {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size, 0, Math.PI*2);
            ctx.fillStyle = b.color;
            ctx.fill();
            b.y -= b.speed;
            if(b.y < -50) b.y = window.innerHeight + 50;
        });
        requestAnimationFrame(drawBalloons);
    }
    drawBalloons();
}

function drawFirework(ctx, x, y, colors) {
    const particles = 30;
    for (let i = 0; i < particles; i++) {
        const angle = (2 * Math.PI * i) / particles;
        const length = 80 + Math.random() * 40;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 3 + Math.random() * 2;
        ctx.stroke();
    }
}

function fireworksAroundCake() {
    const canvas = document.getElementById("fireworksCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    // Vị trí quanh bánh (giả sử bánh ở giữa màn hình)
    const cake = document.getElementById('cakeWrapper');
    const rect = cake.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Các vị trí pháo hoa quanh bánh
    const positions = [
        [cx - 120, cy - 80],
        [cx + 120, cy - 80],
        [cx - 120, cy + 80],
        [cx + 120, cy + 80]
    ];
    const colors = ['#ffb3d9', '#ffd700', '#8e24aa', '#2196f3', '#fff200', '#ff1744'];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    positions.forEach(([x, y]) => {
        drawFirework(ctx, x, y, colors);
    });

    // Hiệu ứng mờ dần
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 1800);
}

// Gọi hàm này khi hiện bánh sinh nhật
function showCake() {
    document.getElementById('cakeWrapper').classList.remove('hidden');
    document.getElementById('flame2').classList.remove('flame-off');
    document.getElementById('flame3').classList.remove('flame-off');
    document.getElementById("fireworksCanvas").classList.remove("hidden");
    fireworksAroundCake(); // Bắn pháo hoa quanh bánh
    setTimeout(() => {
        document.getElementById('flame2').classList.add('flame-off');
        document.getElementById('flame3').classList.add('flame-off');
        document.getElementById("fireworksCanvas").classList.add("hidden");
    }, 5000);
}

window.addEventListener("load", function () {
    const music = document.getElementById("music");
    music.play().catch(err => {
        console.log("⚠️ Trình duyệt chặn autoplay:", err);
    });
});
