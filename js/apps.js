/*
  Danh sách ứng dụng hiện trên trang.
  Thêm app mới: chép một khối { ... } bên dưới, sửa thông tin, bỏ file cài vào thư mục downloads/
  và ảnh biểu tượng (vuông, 256px) vào img/apps/.
  - size: ghi sẵn cho nhanh (vd "626 KB").
  - file: đường dẫn tới file cài. App nặng (> 50 MB) nên để trên GitHub Releases rồi dán link vào đây.
  - sha256: không bắt buộc. Lấy bằng lệnh:  certutil -hashfile ten-file.exe SHA256
*/
window.LONG_APPS = [
  {
    id: 'finconvert',
    name: 'FinConvert',
    tagline: 'Kéo file, giữ Shift — đổi định dạng ngay tại chỗ.',
    description:
      'Kéo một hoặc nhiều file rồi nhấn Shift: một vòng tròn hiện quanh con trỏ, thả vào ô cần làm là xong. ' +
      'File mới nằm ngay cạnh file gốc, file gốc giữ nguyên. Mọi thứ chạy trên máy bạn, không gửi gì lên mạng.',
    icon: 'img/apps/finconvert.png',
    platform: 'Windows',
    version: '1.0',
    updated: '2026-10-21',
    size: '637 KB',
    file: 'downloads/FinConvert.exe',
    youtube: 'https://youtu.be/8TftZE-GmuM', // video giới thiệu (không bắt buộc)
    sha256: '4c9dd3d45c2be02ab96b2b0fd42ec2a35c28cfe29633cd6ee613db7dab18031c',
    tags: ['Ảnh', 'PDF', 'Video', 'Ghi âm'],
    requires: [
      'Windows 10 hoặc 11',
      'Không cần cài thêm gì để đổi ảnh và PDF',
      'Đổi video / ghi âm / WebP / AVIF cần ffmpeg — máy chưa có thì app hiện nút "Cài tự động" (tải khoảng 110 MB, không cần quyền quản trị)'
    ],
    features: [
      'Đổi ảnh qua lại JPG, PNG, WebP, HEIC, AVIF, ICO, TIFF',
      'Gộp, tách, nén PDF — giữ nguyên trang gốc',
      'Ảnh → PDF, PDF → ảnh, PDF → Word',
      'Nén ảnh có ước tính dung lượng trước khi làm',
      'Nhấn Shift hai lần trong Explorer để làm với file đang chọn',
      'Có trong menu chuột phải "Gửi tới", chạy ngầm ở khay hệ thống'
    ],
    steps: [
      'Tải file FinConvert.exe về, mở lên (không cần cài đặt).',
      'Kéo file bất kỳ, trong lúc kéo nhấn giữ Shift.',
      'Thả file vào ô muốn làm trên vòng tròn — file mới nằm cạnh file gốc.'
    ],
    changelog: [
      { v: '1.0', date: '2026-10-21', text: 'Đổi tên từ MT Đổi File thành FinConvert; tự cài ffmpeg khi cần đổi video, ghi âm.' },
      { v: '1.0', date: '2026-10-20', text: 'Bản đầu tiên (tên MT Đổi File).' }
    ]
  },
  {
    id: 'automkt',
    name: 'AutoMKT Cá nhân',
    tagline: 'Đăng bài có sẵn lên nhóm Facebook, trang cá nhân và Threads.',
    description:
      'Tiện ích cho Chrome: soạn một bài rồi để AutoMKT đăng lần lượt vào các nhóm Facebook, trang cá nhân và Threads ' +
      'bằng chính tài khoản bạn đang đăng nhập. Tự giãn thời gian giữa các lần đăng, dừng ở nhóm giữ bài chờ duyệt. ' +
      'Danh sách nhóm, bài viết, lịch sử đều lưu trong trình duyệt của bạn.',
    icon: 'img/apps/automkt.png',
    platform: 'Chrome',
    version: '1.4.1',
    updated: '2026-10-11',
    size: '56 KB',
    file: 'downloads/automkt-1.4.1-public.zip',
    video: 'videos/cai-dat-automkt.mp4', // video hướng dẫn cài (không bắt buộc)
    poster: 'videos/cai-dat-automkt.jpg',
    sha256: 'bbd5ecbfca8d4cacaa3b704c25f1d683488c7ae4808d0d2001b84d76dc4ec937',
    tags: ['Facebook', 'Threads', 'Đăng bài'],
    requires: [
      'Chrome, Edge, Cốc Cốc hoặc trình duyệt nhân Chromium khác',
      'Đã đăng nhập Facebook / Threads trên trình duyệt đó',
      'Bản công khai: tối đa 5 nhóm mỗi lượt, không có đăng lặp lại'
    ],
    features: [
      'Quét danh sách nhóm của nick đang đăng nhập, thêm nhóm bằng liên kết',
      'Một bài đăng cho nhiều nơi: nhóm Facebook, trang cá nhân, Threads',
      'Nhiều bản viết hoặc {Chào cả nhà|Xin chào anh chị} để mỗi nơi một cách',
      'Đính kèm ảnh, video; xem trước bài trước khi đăng',
      'Chia đều thời gian trong khung giờ, nghỉ ngẫu nhiên giữa các nơi',
      'Lịch sử đăng, cảnh báo nhóm từ chối hoặc gỡ bài'
    ],
    steps: [
      'Tải file .zip về và giải nén ra một thư mục (đừng xoá thư mục này sau khi cài).',
      'Mở chrome://extensions, bật "Chế độ dành cho nhà phát triển" (Developer mode) ở góc phải.',
      'Bấm "Tải tiện ích đã giải nén" (Load unpacked), chọn thư mục vừa giải nén.',
      'Bấm biểu tượng AutoMKT trên thanh công cụ, chọn nơi đăng và soạn bài.'
    ],
    changelog: [
      { v: '1.4.1', date: '2026-10-11', text: 'Bản công khai.' }
    ]
  }
];

/*
  Website đã làm — lấy từ portfolio (D:\Portfolio\RoomilyWeb, src/constants/index.js).
  Ảnh chụp cả trang để ở img/web/ (rộng 800px, cắt phần trên).
*/
window.LONG_PORTFOLIO = 'https://thanhlongportfolio.vercel.app/';
window.LONG_SITES = [
  {
    name: 'MTHouse.vn',
    url: 'https://www.mthouse.vn',
    img: 'img/web/mthouse.jpg',
    category: 'Kiến trúc & nội thất',
    stack: ['WordPress', 'Custom code', 'Elementor'],
    summary: 'Website công ty thiết kế và thi công trọn gói. Cả trang kể chuyện bằng chuyển động theo cuộn; PageSpeed di động 93 điểm.'
  },
  {
    name: 'GMHouse.vn',
    url: 'https://gmhouse.vn',
    img: 'img/web/gmhouse.jpg',
    category: 'Cho thuê căn hộ',
    stack: ['Astro', 'Custom code', 'SEO'],
    summary: 'Tìm phòng theo khu vực, loại phòng, giá thuê, xem quỹ phòng trên bản đồ và để lại số để được gọi lại tư vấn.'
  },
  {
    name: 'GreenGO',
    url: 'http://greengo.io.vn/',
    img: 'img/web/greengo.jpg',
    category: 'Dịch vụ thuê xe điện',
    stack: ['Custom code', '5 ngôn ngữ', 'Đặt xe online'],
    summary: 'Cho thuê xe máy điện VinFast tại Đà Nẵng: bảng giá, thủ tục 5 bước, đặt xe nhanh, chuyển 5 ngôn ngữ và tự quy đổi giá sang USD.'
  }
];

window.LONG_CONTACT = {
  phone: '0349402518',
  phoneDisplay: '0349 402 518',
  email: 'longthanh.dev@gmail.com',
  zalo: 'https://zalo.me/0349402518'
};
