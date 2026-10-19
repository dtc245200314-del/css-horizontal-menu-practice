# Thực hành: Tạo menu ngang

Bài 432, chương 7 — Thiết kế bố cục trang web.

Mở `index.html` bằng trình duyệt. Không cần cài thư viện hay build.

## Nội dung

- Menu hai cấp dùng `div#menu`, `ul`, `li`, `a`.
- Các mục cha dùng `float: left`; liên kết rộng 100px, cao 30px.
- Menu con dùng `position: absolute`, `top: 30px`, `left: 15px` và `visibility: hidden`.
- Hover mở menu con và đổi nền liên kết thành đỏ.
- Hỗ trợ bàn phím bằng `:focus-within`, cùng điều chỉnh cho màn hình nhỏ.
- Các liên kết trỏ tới phần nội dung tương ứng trong trang.

## Kiểm tra

Di chuột hoặc dùng Tab đến Sem 1 / Sem 2, kiểm tra menu con hiện ra. Chuyển sang Sem 3 để kiểm tra menu con cũ được ẩn. Thu nhỏ màn hình để kiểm tra thanh menu không tràn.
