# HƯỚNG DẪN CẬP NHẬT VÀ DEPLOY DỰ ÁN

Tài liệu này hướng dẫn chi tiết quy trình chuẩn để cập nhật tính năng mới, kiểm tra lỗi và đẩy (push) mã nguồn lên GitHub sao cho nền tảng **Cloudflare Pages** có thể nhận diện và tự động cập nhật trang web (Deploy) thành công.

Dự án này sử dụng **Next.js** với cơ chế **Static Export**. Web thực tế trên Cloudflare sẽ đọc dữ liệu tĩnh từ thư mục `out/`. Do đó, nếu bạn quên build để tạo thư mục `out/` trước khi push, web trên mạng sẽ không được cập nhật hoặc bị lỗi.

---

## QUY TRÌNH CHUẨN 5 BƯỚC

Mỗi khi bạn sửa đổi mã nguồn (code) xong, hãy tuần tự thực hiện các bước sau trên Terminal (dấu nhắc lệnh).

### Bước 1: Khởi chạy và kiểm tra tại Local (Máy cá nhân)
Trước khi đóng gói, hãy chắc chắn rằng code của bạn hoạt động hoàn hảo và không có bất kỳ lỗi nào.

```bash
npm run dev
```

- Mở trình duyệt vào `http://localhost:3000`.
- Kiểm tra lại toàn bộ giao diện, các nút bấm, tính năng vừa làm.
- Nếu bạn hài lòng, nhấn `Ctrl + C` trên terminal để tắt server local.

### Bước 2: Build dự án ra thư mục `out/` (Cực kỳ Quan trọng) ⚠️
Đây là bước bắt buộc để biến code React/Next.js của bạn thành các file HTML/CSS/JS thuần tĩnh. Cloudflare Pages chỉ đọc duy nhất các file trong thư mục `out/` này.

```bash
npm run build
```

- Lệnh này sẽ kiểm tra lỗi cú pháp (TypeScript) nghiêm ngặt nhất.
- Nếu báo lỗi (màu đỏ) -> Bạn phải sửa lỗi code rồi chạy lại lệnh trên.
- Nếu thành công (Exit 0) -> Sẽ có thông báo `Compiled successfully`. Toàn bộ web đã được kết xuất tĩnh vào thư mục `out/`.

### Bước 3: Đưa tất cả thay đổi vào Git
Cập nhật mọi sự thay đổi (bao gồm cả code bạn viết và thư mục `out/` mới sinh ra) vào hàng đợi của Git.

```bash
git add -A
```

### Bước 4: Tạo Commit 
Tạo nhãn ghi chú cho lần thay đổi hiện tại. Bạn hãy ghi chú ngắn gọn nhưng rõ ràng về tính năng vừa sửa.

```bash
git commit -m "feat: [Ghi chú tính năng bạn vừa làm]"
```
*(Tham khảo: "feat: them trang moi", "fix: sua loi hien thi mau the", "update: cap nhat 10 pao thu vien")*

### Bước 5: Đẩy (Push) lên GitHub
Đưa toàn bộ thành quả của 4 bước trên lên kho lưu trữ GitHub.

```bash
git push
```

- Nhập tài khoản/mật khẩu GitHub (nếu được yêu cầu) hoặc để nó tự động dùng Token máy bạn hiện có.
- Sau khi có thông báo thành công. Mở kho lưu trữ GitHub lên sẽ thấy code mới. Cùng lúc đó Cloudflare Pages sẽ tự động kích hoạt tiến trình cập nhật web thực tế. Thường chỉ mất 1-2 phút là trang web online của bạn sẽ được làm mới!

---

## CÁC LƯU Ý QUAN TRỌNG
Dưới đây là một số mẹo và lưu ý để tránh các lỗi lặt vặt (đặc biệt là lỗi X đỏ trên GitHub).

1. **Không bỏ qua mục `out/` trong tệp `.gitignore`**
   - Đảm bảo trong `.gitignore` KHÔNG CÓ dòng `out/`. Bởi vì nếu cấu hình chặn đẩy thư mục này, Cloudflare sẽ bị trắng tay khi web build. (Hiện tại .gitignore đã được cấu hình rất chuẩn, vui lòng không thêm `out/` vào nó nữa).

2. **Cách cấu hình lệnh push gộp 1 dòng cho nhanh**
   - Thay vì gõ 3 dòng dài dòng, bạn có thể chạy tuần tự 1 phát cả 4 quy trình sau khi test xong bằng lệnh một dòng. Cú pháp như sau:
     ```bash
     npm run build && git add -A && git commit -m "update: [chú thích]" && git push
     ```

3. **Hình ảnh thẻ PAO thật (Đuôi `.jpg`)**
   - Do hiện tại bạn chưa chuẩn bị ảnh thật, tệp cài đặt gốc đang tạm thời chặn push ảnh đuôi `.jpg` để giảm nhẹ kho chứa nhánh.
   - Khi bạn ĐÃ CÓ ảnh PAO chuẩn, chỉ việc bỏ chúng vào thư mục `/public/images/`.
   - Mở tệp `.gitignore`, Mở hoặc xoá dòng `public/images/*.jpg` đi. Lưu thẻ file đó lại, sau đó tiến hành chạy quy trình chuẩn 5 bước phía trên để web trên Cloudflare nhận ảnh đầy đủ.

4. **Khi Lỗi Compile Check (TypeScript)**
   - Đôi khi chạy `npm run build` sẽ hiện lô lỗi kiểu `error TS1005: ',' expected`. Đây là lỗi cú pháp Javascript/Typescript do bạn gõ sai, thiếu ngoặc hoặc chấm phẩy. Chú ý dòng thứ mấy ở tệp nào bị thông báo. Quay lại sửa tệp đó và build lại đến khi sạch bóng lỗi.

---

🎊 Chúc bạn phát triển dự án "Siêu Trí Nhớ" ngày càng tốt hơn!
