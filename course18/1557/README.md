# Tạo mixins & biến

Mở index.html để xem CSS đã biên dịch. Cấu trúc SCSS: abstracts/variables, abstracts/mixins, base, layout, components.

Từ thư mục course18:

```sh
npm ci
npx sass 1557/scss/main.scss 1557/css/style.css --no-source-map
```

Dùng @use thay @import cũ, giữ các giá trị CSS yêu cầu. original.css lưu CSS ban đầu để đối chiếu. Thay biến primary-color rồi biên dịch lại để thay đổi toàn bộ nút.
