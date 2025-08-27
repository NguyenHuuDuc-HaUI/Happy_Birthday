const messages = [
    { text: "Gửi chị gái yêu quý của em, chúc mừng sinh nhật!", bg: "Picture/pic1.png" },
    { text: "Em muốn gửi tới chị tất cả những lời chúc tốt đẹp nhất. Mong rằng tuổi mới này sẽ mang đến cho chị thật nhiều niềm vui, sức khỏe và thành công. Chúc chị luôn xinh đẹp, hạnh phúc và rạng rỡ như những đóa hoa. Dù cuộc sống có bận rộn đến đâu, chị vẫn là người chị tuyệt vời nhất trong lòng em, là chỗ dựa tinh thần vững chắc mà em luôn tin tưởng. 🎉", bg: "Picture/pic2.png"},
    { text: "Em luôn trân trọng những khoảnh khắc được bên cạnh chị, từ những lúc vui cười đến những khi cùng nhau vượt qua khó khăn. Cảm ơn chị vì đã luôn lắng nghe, chia sẻ và đồng hành cùng em trên mọi nẻo đường. Chị là một phần không thể thiếu trong cuộc sống của em. Em luôn ngưỡng mộ sự mạnh mẽ, tài giỏi và cả trái tim nhân hậu của chị. ❤️", bg: "Picture/pic3.png"},
    { text: "Chúc chị tuổi mới sẽ đạt được mọi ước mơ, luôn an yên và ngập tràn hạnh phúc. Mong rằng những điều tốt đẹp nhất sẽ đến với chị trong năm nay và mãi mãi về sau.\n Sinh nhật vui vẻ, chị nhé! 🥳", bg: "Picture/pic4.png"}
];

let currentIndex = 0;
let typingTimeout;

const correctUser = "1"; // username giờ bỏ, chỉ dùng password
const correctPass = "02092002"; // mật mã mong muốn
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


// function typeMessage(text) {
//     clearTimeout(typingTimeout);
//     let i = 0;
//     document.getElementById("messageText").innerHTML = "";
//     function typing() {
//         if(i < text.length){
//             document.getElementById("messageText").innerHTML += text.charAt(i);
//             i++;
//             typingTimeout = setTimeout(typing, 10);
//         }
//     }
//     typing();
// }
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
        }, i * 1500); // mỗi dòng xuất hiện sau 1.5s
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
    // document.getElementById("music").play();


    // Confetti pháo hoa
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
window.addEventListener("load", function () {
    const music = document.getElementById("music");
    music.play().catch(err => {
        console.log("⚠️ Trình duyệt chặn autoplay:", err);
    });
});
