// Lấy các phần tử HTML cần thiết
const wishButton = document.getElementById('wishButton');
const messageDisplay = document.getElementById('messageDisplay');
const messageText = messageDisplay.querySelector('p');
const mainImage = document.getElementById('main-image');
const petalContainer = document.getElementById('petal-container');

// Danh sách các lời chúc
const wishes = [
    "Chúc chị em ngày càng xinh đẹp, trẻ trung, và đạt được mọi ước mơ trong cuộc sống! Luôn mỉm cười nhé!",
    "Chúc một nửa thế giới luôn rạng ngời, hạnh phúc và thành công trên mọi con đường. Happy Vietnamese Women's Day!",
    "Chúc bạn luôn giữ được sự nhiệt huyết, mạnh mẽ và là nguồn cảm hứng cho tất cả mọi người xung quanh!",
    "Cảm ơn bạn vì tất cả những điều tuyệt vời bạn đã làm. Chúc mừng Ngày 20/10!",
    "Chúc Phụ nữ Việt Nam ngày 20/10 thật ấm áp, ý nghĩa và ngập tràn niềm vui bên gia đình và người thân!"
];

// Mảng các đường dẫn ảnh để thay đổi (Ảnh 2 là placeholder nếu không có)
const imageSources = [
    "chuc_mung_20_10_chinh.png", // Ảnh ban đầu (bạn đã gửi)
    "chuc_mung_20_10_phu.png",    // Ảnh thay đổi (cần bạn cung cấp)
    "chuc_mung_20_10_phu_2.png",   // Ảnh thay đổi thứ 2 (cần bạn cung cấp)
    "chuc_mung_20_10_phu_3.png",   // Ảnh thay đổi thứ 3 (cần bạn cung cấp)
    "chuc_mung_20_10_phu_4.png",    // Ảnh thay đổi thứ 4 (cần bạn cung cấp)
    "chuc_mung-20_10_phu_5.png"     // Ảnh thay đổi thứ 5 (cần bạn cung cấp)
];
let currentImageIndex = 0; // Chỉ số của ảnh hiện tại

// Biến để theo dõi lần nhấn
let clickCount = 0;

// --- Hàm tạo cánh hoa rơi (Animation) ---
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Random kích thước, vị trí và độ trễ
    const size = Math.random() * 8 + 4; // 4px to 12px
    const duration = Math.random() * 15 + 10; // 10s to 25s
    const delay = Math.random() * 15; // 0s to 15s
    const left = Math.random() * 100; // 0% to 100% width

    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${left}vw`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.opacity = Math.random() * 0.5 + 0.3; // Độ trong suốt
    
    petalContainer.appendChild(petal);

    // Xóa cánh hoa sau khi rơi xuống
    petal.addEventListener('animationend', () => {
        petal.remove();
        // Tạo lại cánh hoa ngay lập tức để duy trì hiệu ứng liên tục
        createPetal();
    });
}

// Khởi tạo ban đầu: tạo 30 cánh hoa và duy trì hiệu ứng
for (let i = 0; i < 30; i++) {
    createPetal();
}

// --- Hàm xử lý hiệu ứng khi ảnh được nhấn hoặc nút được nhấn ---
function activateImageEffect() {
    // Hiệu ứng "chuyển động" mạnh hơn và thêm hiệu ứng Glow 
    mainImage.style.transform = 'scale(1.08) rotate(-2deg)';
    mainImage.style.filter = 'brightness(1.2) drop-shadow(0 0 10px #f97316)'; // Tăng độ sáng và đổ bóng rực rỡ

    // Tắt hiệu ứng sau 300ms
    setTimeout(() => {
        mainImage.style.transform = 'scale(1) rotate(0deg)';
        mainImage.style.filter = 'none'; 
    }, 300);
}

// --- Hàm xử lý khi nút ĐƯỢC NHẤN ---
function handleButtonClick() {
    // Thay đổi lời chúc
    const wishIndex = clickCount % wishes.length;
    const currentWish = wishes[wishIndex];
    messageText.textContent = currentWish;
    
    if (messageDisplay.classList.contains('hidden')) {
        messageDisplay.classList.remove('hidden');
    }

    // Thay đổi hình ảnh (chuyển đổi giữa 2 ảnh)
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    mainImage.src = imageSources[currentImageIndex];
    
    // Xử lý khi ảnh thứ 2 không tồn tại, tránh lỗi hiển thị ảnh vỡ
    mainImage.onerror = function() {
        this.onerror=null; 
        this.src='https://placehold.co/300x300/fcc2d3/9f1239?text=20/10_IMAGE_MISSING'; 
    };

    // Kích hoạt hiệu ứng động
    activateImageEffect();

    // Cập nhật bộ đếm và text nút
    clickCount++;
    if (clickCount < wishes.length) {
         wishButton.textContent = `🌹 Nhấn tiếp để xem lời chúc khác (${clickCount}/${wishes.length}) 🌹`;
    } else {
         wishButton.textContent = `✨ Tuyệt vời! Bạn đã xem ${clickCount} lời chúc! Nhấn tiếp nhé! ✨`;
    }
}

// Gắn sự kiện click cho nút bấm
wishButton.addEventListener('click', handleButtonClick);

// Gắn sự kiện click cho ảnh 
mainImage.addEventListener('click', handleButtonClick);

// Bật vệt sáng ngay khi tải trang để hình ảnh trông nổi bật hơn
mainImage.classList.add('glow-active');
