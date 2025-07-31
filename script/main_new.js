// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      const dataArr = Object.keys(data);
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData];
          }
        }

        // Check if the iteration is over
        // Run animation if so
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          animationTimeline();
        }
      });
    });
};

const createBalloons = (num) => {
    const balloonContainer = document.querySelector(".baloons");

    // 1. Tạo một mảng chứa tất cả các đường dẫn ảnh bóng bay của bạn
    const balloonImages = [
        'img/red_balon.png',
        'img/blue_balon.png',
        'img/green_balon.png',
        // Thêm đường dẫn đến các ảnh bóng bay mới của bạn vào đây
        'img/balon1.png', // Ví dụ: bạn có thể dùng cả file .svg và .png
        'img/balon2.png', // Ví dụ: bạn có thể dùng cả file .png
        'img/a.png'
    ];

    for (let i = 0; i < num; i++) {
        const balloon = document.createElement("img");

        // 2. Chọn ngẫu nhiên một đường dẫn từ mảng balloonImages
        const randomIndex = Math.floor(Math.random() * balloonImages.length);
        balloon.src = balloonImages[randomIndex];
        
        balloon.style.left = `${Math.random() * 95}%`; // Vị trí ngang ban đầu
        balloonContainer.appendChild(balloon);
    }
}

// Animation Timeline
const animationTimeline = () => {
  console.log(window.innerHeight);
   createBalloons(40); 
  const oneEl = document.querySelector('.one');
  Object.assign(oneEl.style, {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    margin: '0 auto',
    zIndex: 2
  });

  const hbdChatbox = document.querySelector(".hbd-chatbox");
  const chars = hbdChatbox.textContent.trim().split("");
  
  hbdChatbox.innerHTML = chars.map(char => `<span>${char === ' ' ? '&nbsp;' : char}</span>`).join("");
    
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;


  const text1 = document.querySelector(".three p");
  text1.innerHTML = `<span>${text1.textContent
    .trim()
    .split("")
    .join("</span><span>")}</span>`;
  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = gsap.timeline();
 const music = document.getElementById('birthday-music');
 
  tl.to(".container", { duration: 0.1, visibility: "visible" })
    .from(oneEl, { duration: 0.7, opacity: 0, y: -50, ease: "power2.out" })
    
  .to('[data-node-name="name"]', {
    duration: 0.6,
    color: "green",
    ease: "power1.inOut"
  }, "<")
    .to(".img-two", {
    duration: 0.6,
    opacity: 1,
    y: 0,
    scale: 0.5,
    ease: "back.out(1.7)"
  })
  .to(".one-2", {
    duration: 0.8,
    opacity: 1,
    y: -80,
    ease: "power2.out"
  }, "+=1")

  .to(".baby", {
    duration: 0.6,
    color: "red",
    ease: "power1.inOut"
  })

  .to("#heart", {
    duration: 0.5,
    opacity: 1,
    onComplete: () => {
      document.querySelector("#heart").style.animationPlayState = "running";
    }
  }, "<")
    .from(".two", { duration: 0.5, opacity: 0, y: -200, ease: "power2.out" })
    .to(".wink", {
  duration: 0.4,
  opacity: 1,
  ease: "power1.inOut"
}, "+=0.5")
    .to(".one", { duration: 0.7, opacity: 0, y: 10, delay: 2.5 })
    .to(".two", { duration: 0.7, opacity: 0, y: 10, delay: -1 })
    .from(".three", { duration: 0.7, opacity: 0, y: 20, ease: "power2.out" })
    // Animation cho từng ký tự trong .three bật ra
    // 1. Hiệu ứng chữ "nhảy" ra
    .from(".three span", {
        duration: 0.8,
        opacity: 0,
        scale: 0.1,
        y: 40,
        rotation: -90,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.03
    })

    // 2. Hiệu ứng hình ảnh bay lên và xoay vào
    // Hiệu ứng hình ảnh bay lên và xoay vào
.fromTo(".three img", 
    // Trạng thái bắt đầu
    {
        opacity: 0,
        y: 100,
        scale: 0.3,
        rotation: -360
    },
    // Trạng thái kết thúc
    {
        duration: 1.2,
        opacity: 1, // Đảm bảo opacity là 1
        y: 0,
        scale: 1,
        rotation: 0,
        ease: "power2.out",
        onStart: () => {
            // Kích hoạt pháo giấy!
            confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 }
            });
        }
    }
, "+=0.3") // Chờ 0.3s sau khi chữ hiện xong

    // 4. Làm mờ cả khối div.three để chuyển cảnh
    .to(".three", {
        duration: 1,
        opacity: 0,
        y: -50, // Bay lên trên khi biến mất
        delay: 2.5 // Chờ một lúc lâu hơn để xem ảnh và pháo
    })
    
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })

    // --- BẮT ĐẦU HIỆU ỨNG CHAT MỚI ---

    // 1. Hiệu ứng gõ chữ trong thanh nhập liệu
    .to(".hbd-chatbox span", {
      autoAlpha: 1,
      stagger: 0.08// Tốc độ gõ chữ
    })

    // 2. Hiệu ứng nhấn nút "Send"
    .to(".fake-btn", {
      duration: 0.1,
      scale: 0.9
    }, "+=0.5") 
    .to(".fake-btn", {
      duration: 0.1,
      scale: 1,
      onComplete: () => {
        // 3. Tạo và gửi tin nhắn đi
        const sentMessageText = document.querySelector(`[data-node-name="textInChatBox"]`).textContent;
        const chatArea = document.querySelector(".chat-area");
        
        // Tạo bong bóng chat mới
        const sentBubble = document.createElement("div");
        sentBubble.classList.add("sent-bubble");
        sentBubble.textContent = sentMessageText;
        chatArea.appendChild(sentBubble);

        // Làm mờ chữ trong ô input
        gsap.to(".hbd-chatbox", { duration: 0.3, opacity: 0.3 });

        // Animation cho bong bóng chat mới bay lên
        gsap.fromTo(sentBubble, 
          { y: 30, opacity: 0 }, 
          { duration: 0.5, y: 0, opacity: 1, ease: "power3.out" }
        );
      }
    })

    // --- KẾT THÚC HIỆU ỨNG CHAT ---

    // Làm mờ cả chiếc điện thoại để chuyển cảnh
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=1.5"
    )
    
    .from(".idea-1", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-1", { duration: 0.7, ...ideaTextTransLeave, delay: 1.5 })
    .from(".idea-2", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-2", { duration: 0.7, ...ideaTextTransLeave, delay: 1.5 })
    .from(".idea-3", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-3 strong", {
        duration: 0.6,
        scale: 1.2,
        backgroundColor: "rgba(31, 25, 211, 1)",
        color: "#fff",
        opacity: 1 /* Thêm dòng này để làm hiện cả chữ và ngôi sao */
    })
    .to(".idea-3", { duration: 0.7, ...ideaTextTransLeave, delay: 1.5 })
    .from(".idea-4", { duration: 0.7, ...ideaTextTrans })
    .to(".idea-4", { duration: 0.7, ...ideaTextTransLeave, delay: 1.5 })
    .from(".idea-5", {
      duration: 0.7,
      rotationX: 15,
      rotationZ: -10,
      skewY: "-5deg",
      y: 50,
      z: 10,
      opacity: 0,
      delay: 0.5
    })
    .to(".idea-5 .smiley", { duration: 0.7, rotation: 90, x: 8, delay: 0.4 })
    .to(".idea-5", { duration: 0.7, scale: 0.2, opacity: 0, delay: 2 })
    // Hiệu ứng "Lật Trang 3D" cho chữ S O
.from(".idea-6 span", {
    duration: 1,
    opacity: 0,
    scale: 0, // Bắt đầu từ kích thước 0
    rotationY: -90, // Bắt đầu từ góc lật 90 độ
    ease: "power3.out",
    stagger: 0.2 // Xuất hiện lần lượt
})
// Giữ lại một lúc rồi làm mờ đi
.to(".idea-6 span", {
    duration: 0.6,
    opacity: 0,
    scale: 0,
    rotationY: 90, // Lật ra ngoài khi biến mất
    ease: "power3.in",
    stagger: 0.1,
    delay: 1.5 // Chờ một lúc lâu hơn
})
.call(() => {
        if (music) music.play().catch(e => console.error("Trình duyệt đã chặn tự động phát nhạc."));
    }, null, "scene-six-start")

// Bắt đầu thay thế từ đây
    .to(".baloons img", {
        duration: 6,
        top: "-2%",
        ease: "sine.inOut",
        stagger: {
            each: 0.2,
            from: "random"
        },
        onComplete: () => {
    const balloons = document.querySelectorAll(".baloons img");

    // --- PHẦN 1: TƯƠNG TÁC TRÊN TỪNG QUẢ BÓNG (POP & HOVER) ---
    balloons.forEach(balloon => {
        balloon.style.cursor = 'pointer';
        balloon.addEventListener('click', () => {
            gsap.to(balloon, { duration: 0.3, scale: 0, opacity: 0, ease: 'power2.in' });
        });
        let hoverTween;
        balloon.addEventListener('mouseover', () => {
            hoverTween = gsap.to(balloon, { duration: 1.5, rotation: '+=8', x: '+=10', yoyo: true, repeat: -1, ease: 'sine.inOut' });
        });
        balloon.addEventListener('mouseout', () => {
            if (hoverTween) { hoverTween.kill(); }
        });
    });

    // --- PHẦN 2: HIỆU ỨNG NGHIÊNG KHI KÉO MÀN HÌNH ---
    let startX;
    let isDragging = false;
    function updateBalloonTilt(deltaX) {
        const tiltAngle = Math.max(-25, Math.min(25, deltaX * 0.1));
        gsap.to(balloons, { rotation: tiltAngle, duration: 0.5, ease: 'power2.out' });
    }
    function resetBalloonTilt() {
        gsap.to(balloons, { rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
    }
    const onDragStart = (e) => {
        isDragging = true;
        startX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
        document.body.style.cursor = 'grabbing';
    };
    const onDragMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
        updateBalloonTilt(currentX - startX);
    };
    const onDragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        document.body.style.cursor = 'default';
        resetBalloonTilt();
    };
    document.addEventListener('mousedown', onDragStart);
    document.addEventListener('touchstart', onDragStart, { passive: true });
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('touchmove', onDragMove, { passive: true });
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchend', onDragEnd);
    document.addEventListener('mouseleave', onDragEnd);
}
    }, "scene-six-start")

    // --- BẮT ĐẦU CHUỖI HIỆU ỨNG CHÚC MỪNG ĐÃ ĐƯỢC SẮP XẾP LẠI ---

    // 1. CÙNG LÚC: Hiện ảnh, hoa và bắn confetti từ hai bên
    .to(".six", { autoAlpha: 1 }, "show-scene")
    .from(".six .avatar-container", {
        duration: 1.2,
        scale: 3.5,
        opacity: 0,
        ease: "power2.out"
    }, "show-scene")
    .from(".hat", {
        duration: 0.5,
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0
    }, "show-scene+=0.5")
    .to(".corner-flower", { // Hiện hoa
        duration: 1,
        opacity: 1,
        y: 0
    }, "show-scene")
    // main_new.js

    // ... animation của .to(".corner-flower", ...)
    // Thay thế khối .add() cũ bằng khối này
    .add(() => {
        // Hàm để bắn một loạt confetti
        function shootConfetti() {
            // Bắn từ bên trái
            confetti({
                particleCount: 100,
                angle: 60,
                spread: 80,
                origin: { x: 0, y: 0.8 }
            });
            // Bắn từ bên phải
            confetti({
                particleCount: 100,
                angle: 120,
                spread: 80,
                origin: { x: 1, y: 0.8 }
            });
        }

        // Bắn loạt đầu tiên ngay lập tức
        shootConfetti();

        // Cứ mỗi 2 giây lại bắn thêm một loạt nữa
        const interval = setInterval(shootConfetti, 2000);

        // Dừng bắn sau khoảng 6 giây để tránh lặp vô hạn
        setTimeout(() => {
            clearInterval(interval);
        }, 10000);

    }, "show-scene")
    // ... animation của .fromTo(".wish-hbd span", ...)

    // 2. SAU ĐÓ: Chữ "HAPPY BIRTHDAY" lật ngược từng chữ một
    // Dùng fromTo để kiểm soát trạng thái đầu-cuối, sửa dứt điểm lỗi lật chữ
    .fromTo(".wish-hbd span", {
        opacity: 0,
        rotation: 180, // Bắt đầu: ẩn và lật ngược
        y: -40
    }, {
        duration: 0.8,
        opacity: 1,
        rotation: 0, // Kết thúc: hiện và thẳng đứng
        y: 0,
        ease: "elastic.out(1, 0.4)",
        stagger: 0.04
    }, "show-scene+=0.5")

    // 3. TIẾP THEO: Hiện chữ chúc và đổi màu chữ HBD
    .from(".wish h5", {
        duration: 0.5,
        opacity: 0,
        y: 10
    }, ">-0.5")
    .to(".wish-hbd span", {
        duration: 0.7,
        color: "#ff69b4",
        stagger: 0.05
    }, "<+=0.2") // Đổi màu sau khi chữ đã lật xong
    // THÊM KHỐI MÃ MỚI NÀY VÀO
// Hiệu ứng pháo hoa nền
  .to(".eight svg", { autoAlpha: 1, stagger: 0.2 }, "show-scene+=1")
  .to(".eight svg circle", {
      duration: 2.5,
      attr: { r: 250 },
      opacity: 0,
      ease: "power2.out",
      stagger: {
          each: 0.2,
          from: "center"
      }
  }, "show-scene+=1")
    // 4. CUỐI CÙNG: Màn hình biến mất (sau khi đã kéo dài thời gian)
    // Đoạn mã mới đã sửa lỗi
// 1. Làm mờ đồng loạt tất cả các phần tử của cảnh cũ và chờ 15 giây
.to(".six, .seven, .eight, .corner-flower", {
        duration: 1,
        opacity: 0,
        y: 30,
        pointerEvents: 'none',
        // Chờ cho đến khi nhạc kết thúc, với thời gian chờ mặc định là 28 giây nếu không lấy được
        delay: 15
    }, "outro")

// 2. SAU KHI animation trên KẾT THÚC HOÀN TOÀN, mới bắt đầu hiện div.nine
.from(".nine", {
    duration: 1,
    opacity: 0,
    y: 20,
    onStart: () => {
        gsap.set(".nine", { zIndex: 20 });
    }
}, ">") // Ký tự ">" đảm bảo animation này chỉ bắt đầu sau khi animation trước kết thúc

// 3. Hiệu ứng cho các dòng chữ trong div.nine
.from(".nine p", {
    duration: 1,
    opacity: 0,
    y: 20,
    stagger: 0.5
}, "<+=0.5") // Bắt đầu sau khi .nine hiện ra một chút// Đặt thời gian bắt đầu
    .to(".last-smile", { duration: 0.5, rotation: 90, delay: 1 });
// Kết thúc thay thế ở đây

 document.getElementById("replay").addEventListener("click", () => {
        if (music) {
            music.pause();
            music.currentTime = 0;
        }
        tl.restart();
    });
};

// Run fetch and animation in sequence
fetchData();
// --- THÊM TƯƠG TÁC CHO BÓNG BAY ---

// Chờ một chút để animation bóng bay bắt đầu
