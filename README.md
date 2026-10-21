# Long Apps — trang tải ứng dụng

Trang tĩnh (HTML/CSS/JS thuần, không cần build). Màu chính xanh dương `#1A5CFF`, chữ Roboto (nội dung),
Be Vietnam Pro (tiêu đề), Fz-Ruthligos (chữ viết tay "nhanh gọn").

## Thêm / cập nhật ứng dụng

1. Bỏ file cài vào `downloads/`, ảnh biểu tượng vuông 256px vào `img/apps/`.
2. Sửa `js/apps.js`: chép một khối `{ ... }`, đổi tên, mô tả, phiên bản, dung lượng, đường dẫn file.
3. Mã SHA-256 (không bắt buộc): `certutil -hashfile ten-file.exe SHA256`.

Video hướng dẫn (không bắt buộc): bỏ .mp4 vào `videos/`, ghi `video` (và ảnh bìa `poster`) trong khối của app —
hiện trong phần Chi tiết; app Chrome có video thì hiện thêm ở mục "Cài trong 3 bước". Video cài AutoMKT dựng bằng
Remotion ở `../video-huong-dan/nguon/caidat-automkt` (đổi `SITE_URL` trong `src/scenes.ts` rồi `npm run render`).

App nặng (> 50 MB) nên để ở GitHub Releases hoặc Google Drive rồi dán link đầy đủ vào `file`.

## Deploy lên Vercel

- Cách 1: kéo cả thư mục `long-apps-web` vào https://vercel.com/new (Framework: **Other**, không cần lệnh build).
- Cách 2: `npm i -g vercel` rồi chạy `vercel` trong thư mục này, lần sau `vercel --prod`.

`vercel.json` đặt cho file trong `downloads/` luôn tải xuống (không mở trong trình duyệt).
