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

5. **Cách tự động ép vuông ảnh (Crop 1:1) bằng thư viện Sharp**
   - Nếu bạn có quá nhiều hình ảnh ở nhiều kích thước khác nhau ở thư mục `public/images/`, bạn có thể dùng đoạn mã Node.js để tự động lấy phần trung tâm của bức ảnh và ép thành hình vuông tiêu chuẩn.
   - Bật Terminal tại thư mục dự án và cài thư viện xử lý ảnh: `npm install sharp --no-save`
   - Tạo một file `crop.js` ở bất kỳ đâu (hoặc dùng thư mục tạm), dán mã script sau:

     ```javascript
     const sharp = require('sharp');
     const fs = require('fs');
     const path = require('path');
     
     // Trỏ đường dẫn đến thư mục chứa ảnh của bạn
     const dir = path.resolve(__dirname, 'public/images');
     // Quét các tệp định dạng cơ bản
     const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
     
     (async () => {
         for (const file of files) {
             const fp = path.join(dir, file);
             const tmp = path.join(dir, 'tmp_' + file);
             try {
                 const m = await sharp(fp).metadata();
                 const size = Math.min(m.width, m.height);
                 // Tự động căn giữa theo điểm ảnh phân bổ (entropy)
                 await sharp(fp).resize(size, size, { fit: 'cover', position: 'entropy' }).toFile(tmp);
                 fs.unlinkSync(fp); 
                 fs.renameSync(tmp, fp);
                 console.log(`Đã cắt vuông tỉ lệ 1:1 thành công cho: ${file}`);
             } catch (e) {
                 console.error(`Lỗi khi xử lý ${file}`, e);
             }
         }
     })();
     ```
   - Chạy lệnh `node crop.js` để thuật toán tự động xử lý toàn bộ các ảnh trong chưa tới 1 giây! 

---
6. ** Cách thiết kế giao diện mobile**
Yêu cầu bắt buộc:

VIEWPORT & LAYOUT
- Thêm <meta name="viewport" content="width=device-width, 
  initial-scale=1.0, maximum-scale=1.0"> nếu chưa có
- Không có element nào vượt quá 100vw
- Dùng overflow-x: hidden trên body và wrapper ngoài cùng
- Tất cả width dùng % hoặc vw, không dùng px cố định cho layout

TYPOGRAPHY — chuẩn Android
- Body text: 16px (1rem) tối thiểu, line-height: 1.6
- Heading H1: 24–28px, H2: 20–22px, H3: 18px
- Không có text nào nhỏ hơn 14px
- Font-size dùng rem, không dùng px

SPACING — chuẩn touch target
- Padding ngang tối thiểu: 16px (1rem) mỗi bên
- Mọi button/link có min-height: 44px (touch target Android)
- Khoảng cách giữa các section: 24–32px
- Margin/padding dùng rem hoặc %, không dùng px lẻ

APP-LIKE UX
- Navigation nằm dưới cùng (bottom nav) nếu có nhiều hơn 3 mục
- Không có horizontal scroll trừ khi là carousel có chủ đích
- Card/item list full-width trên mobile, padding trong 16px
- Image dùng width: 100%, height: auto
Thêm các cấu hình vào `.env.local`

DỮ LIỆU THƯ VIỆN PAO (Firestore)
- Dữ liệu 100 thẻ kỹ năng PAO (`pao_items`) hiện được lưu trực tiếp trên Firebase Firestore để dễ chỉnh sửa trực tuyến.
- **Cách hoạt động**:
  + Chỉnh sửa/thêm/xóa thẻ trên giao diện web bằng tài khoản Admin (`tieuhongtuyen@gmail.com`), web sẽ kết nối và lưu trực tiếp lên cơ sở dữ liệu.
  + Mọi người dùng / thiết bị khác sẽ nhìn thấy thay đổi ngay lập tức (không cần phải Edit code + Push GitHub + Build lại nữa).
- **Rule bảo mật Firestore**:
  `pao_items`: `read: true` (ai cũng xem được), `write: if request.auth.email == tieuhongtuyen...`
- **Fallback / Mất mạng**:
  Nếu Firebase rỗng hoặc đứt kết nối, website sẽ tự động load mảng `DEFAULT_DATA` định sẵn trong `useMemoryData.ts` để hiển thị tạm thời tránh trang rỗng.

BREAKPOINT
- Mobile-first: viết CSS cho mobile trước, 
  dùng @media (min-width: 768px) cho tablet/desktop
- Không dùng @media max-width

CARD / THẺ NHỚ (áp dụng cho library và practice)
- Ảnh thẻ PAO có tỉ lệ 5:4 (ngang) → dùng `aspect-[5/4]` cho vùng ảnh,
  ảnh bên trong dùng `absolute inset-0 w-full h-full object-cover` → không bị letterbox
- Không dùng `h-[60%]` / `h-[40%]` cứng nhắc cho ảnh và text → text bị khuất
- Vùng text: để tự nhiên (padding only), không cố định chiều cao bằng %
- Chiều cao nhất quán trên mobile:
  + Thêm `min-h-[7rem] md:min-h-0` cho vùng text (đảm bảo card ngắn không bị lép)
  + Dùng `line-clamp-1` cho tên nhân vật, `line-clamp-2` cho hành động/vật thể/lý do
- Flashcard lật 3D (practice):
  + Mặt sau (Back) để **normal flow** → tự định chiều cao container
  + Mặt trước (Front) dùng `absolute inset-0` → fill đúng chiều cao mặt sau
  + Không dùng ghost element (dễ bị lệch do text wrap khác nhau)
- Grid thư viện:
  + Mobile: `grid-cols-1` (1 cột) → card đủ rộng để đọc, không bị bẹp
  + Tablet+: `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`

Sau khi refactor, liệt kê ngắn những gì đã thay đổi.
Đừng chỉnh logic hay nội dung, chỉ chỉnh CSS/layout/spacing.

🎊 Chúc bạn phát triển dự án "Siêu Trí Nhớ" ngày càng tốt hơn!
