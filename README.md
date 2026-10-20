# 🌸 CĂN PHÒNG KÝ NIỆM 20/10 - HƯỚNG DẪN CÁ NHÂN HÓA

Dự án web quà tặng 20/10 với nhân vật Chibi mô phỏng bạn gái và căn phòng tương tác ấm áp.

---

## 📂 1. Cấu trúc thư mục
* `index.html`: Khung cảnh phòng ấm cúng (có giường, tủ, đèn ngủ, đĩa than, ảnh kỷ niệm, mèo Tom).
* `style.css`: Giao diện pastel, chế độ ban đêm tối phòng khi tắt đèn, tối ưu điện thoại.
* `script.js`: Chứa thông tin tên, ngày yêu (18/01/2025), lời thoại chibi, nội dung thư tình 20/10.
* `assets/`:
  * `music.mp3`: **File ghi âm hoặc bài hát của bạn** (Chỉ cần chép file ghi âm vào đây và đổi tên thành `music.mp3`!).
  * `chibi.png`: Ảnh nhân vật hoạt hình của bạn gái (PNG trong suốt).
  * `photos/`: 4 bức ảnh kỷ niệm của hai bạn (`photo1.jpg` đến `photo4.jpg`).

---

## 🎨 2. Cách tạo ảnh Chibi từ ảnh thật của bạn gái
1. **Dùng AI miễn phí (Bing Image Creator / Microsoft Designer / ChatGPT)**:
   * Tải ảnh bạn gái lên và nhập prompt mẫu:
     > *"Turn this photo into an ultra-cute 3D chibi Pixar/Ghibli style character, full body standing holding a small red heart, big expressive shiny eyes, sweet smile, wearing [mô tả quần áo trong ảnh], pastel aesthetic, transparent background, high resolution 8k."*
2. **Dùng App điện thoại**:
   * App **ToonMe**, **CapCut** (bộ lọc "Manga/Chibi 3D").
3. **Tách nền trong suốt**:
   * Truy cập [remove.bg](https://www.remove.bg) để xóa nền và tải về file `chibi.png`.
   * Đổi tên file thành `chibi.png` và chép đè vào thư mục `assets/`.

---

## ✍️ 3. Chỉnh sửa thông tin cá nhân (Trong file `script.js`)
Mở file `script.js` (dòng 8 - 40) để sửa:
* `girlfriendName`: Tên hoặc biệt danh của bạn gái (VD: "Bé Heo", "Công chúa Linh",...).
* `startDate`: Ngày hai bạn bắt đầu yêu nhau (VD: `"2023-05-18"`), hệ thống sẽ tự tính số ngày bên nhau.
* `chibiQuotes`: Các câu nói nũng nịu / trêu chọc dễ thương khi bạn gái ấn vào nhân vật.
* `letterContent`: Nội dung bức thư 20/10 mà bạn muốn nhắn nhủ.

---

## 🚀 4. Đưa lên mạng miễn phí để lấy link gửi tặng (Chỉ mất 1 phút)
### Cách đơn giản nhất: Dùng Netlify Drop (Không cần cài đặt, không cần code)
1. Truy cập [app.netlify.com/drop](https://app.netlify.com/drop)
2. Kéo thả toàn bộ thư mục `chibi-room-20-10` vào khung trên trang web.
3. Chờ 5 giây, Netlify sẽ cấp ngay cho bạn một đường link web miễn phí (dạng `https://ten-ngau-nhien.netlify.app`).
4. Bạn có thể đổi tên link cho đẹp (VD: `tang-em-20-10.netlify.app`) và copy gửi cho bạn gái qua Zalo / Messenger / Instagram!
