# Kiểm tra SASS CLI

- Node.js: v24.19.0
- SASS: 1.105.2 compiled with dart2js 3.13.5
- Đã cài SASS bằng npm trong dự án.
- CLI đã biên dịch styles.scss thành styles.css.
- Chế độ --watch phát hiện thay đổi biến primary từ #175d83 sang #196a45 và tự biên dịch lại thành công.
- Đã dừng tiến trình watch sau kiểm tra.

Lệnh đã dùng:

```sh
node node_modules/sass/sass.js 1514/scss/styles.scss 1514/css/styles.css --watch --no-source-map
node node_modules/sass/sass.js 1514/scss:1514/css --no-source-map
```

Log:

```text
[2026-10-19 21:03] Compiled 1514\scss\styles.scss to 1514\css\styles.css.
Sass is watching for changes. Press Ctrl-C to stop.

[2026-10-19 21:03] Compiled 1514\scss\styles.scss to 1514\css\styles.css.

```
