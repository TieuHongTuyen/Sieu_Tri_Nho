# KẾ HOẠCH DỰ ÁN ANDROID — SIÊU TRÍ NHỚ (Capacitor)

## Tổng quan

Dự án Android là **phiên bản song song** của ứng dụng web Siêu Trí Nhớ, chạy trên Android bằng **Capacitor** (Ionic). Hai phiên bản hoàn toàn **dùng chung tất cả kết nối** (Firebase Auth, Firestore, cấu hình môi trường), không tách biệt.

> [!IMPORTANT]
> **Mã nguồn Android (`/android/`) KHÔNG được push lên GitHub.** Toàn bộ thư mục này nằm trong `.gitignore`. Repo GitHub chỉ lưu trữ mã nguồn web (Next.js) như hiện tại.

**Cách hoạt động song song:**
- Web (Cloudflare Pages) và Android (APK) là **cùng một ứng dụng**, khác nhau về nền tảng hiển thị
- Sửa đổi code web → build → sync Capacitor → build APK mới
- Dữ liệu Firestore, tài khoản người dùng đều chia sẻ chung giữa hai phiên bản

---

## Cấu trúc thư mục sau khi tích hợp

```
Sieu Tri Nho - web/
├── app/                   ← Next.js source (không đổi)
├── public/
├── out/                   ← Build web tĩnh (npm run build)
├── android/               ← 📱 Android Studio project (KHÔNG push GitHub - .gitignore)
│   ├── app/
│   └── ...
└── capacitor.config.ts    ← File cấu hình Capacitor (được push GitHub)
```

---

## Quy trình đồng bộ (Web → APK)

Mỗi khi có thay đổi trên web, chạy theo thứ tự:

```bash
# 1. Build web tĩnh
npm run build

# 2. Đồng bộ sang Android
npx cap copy android
npx cap sync android

# 3. Mở Android Studio để build APK
npx cap open android
```

Sau đó trong Android Studio: **Build → Generate Signed Bundle/APK → APK**

---

## Các bước thiết lập ban đầu (chỉ làm 1 lần)

### Bước 1: Cài Capacitor vào dự án

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
```

- **App name**: Siêu Trí Nhớ
- **App ID**: `com.tieuhongtuyen.sieutrinho`
- **Web dir**: `out`

### Bước 2: Thêm platform Android

```bash
npx cap add android
```

→ Tạo ra thư mục `/android/` là một project Android Studio đầy đủ.

### Bước 3: Build lần đầu

```bash
npm run build
npx cap sync android
npx cap open android
```

→ Android Studio mở ra. Kết nối thiết bị hoặc dùng Emulator để test.

### Bước 4: Tùy chỉnh App Icon và Splash Screen

```bash
npm install @capacitor/assets --save-dev
```

- Đặt file `assets/icon.png` (1024×1024) và `assets/splash.png` (2732×2732)
- Chạy: `npx capacitor-assets generate`

### Bước 5: Build APK release

Trong Android Studio:
- **Build → Generate Signed Bundle/APK**
- Chọn **APK → Release**
- Tạo hoặc chọn Keystore (giữ file `.jks` an toàn, đừng commit lên GitHub!)
- APK output tại: `android/app/build/outputs/apk/release/app-release.apk`

---

## Cấu hình Firebase (quan trọng)

Ứng dụng dùng Firebase Firestore. Trên Android cần thêm:

1. Vào Firebase Console → Project Settings → Thêm app Android với package `com.tieuhongtuyen.sieutrinho`
2. Tải `google-services.json` → đặt vào `android/app/`
3. Trong `android/app/build.gradle` thêm plugin `google-services`
4. **Bắt buộc**: Lấy mã SHA-1 của thiết bị build (lệnh `cd android && ./gradlew signingReport`) và thêm vào Firebase Console (Project Settings → Your apps)
5. **Bắt buộc**: Vào Authentication → Settings → Authorized domains → Thêm miền `localhost` để môi trường Capacitor có quyền xác thực Google.

> Không cần thay đổi code Firebase vì ứng dụng dùng Firebase JS SDK qua WebView. Tuy nhiên, tính năng **Google Sign-In** yêu cầu cấu hình thêm (xem bên dưới).

---

## Cấu hình Google Sign-In (Native) trên Android

Vì WebView của Android chặn tính năng tạo cửa sổ popup (`signInWithPopup`), dự án đã tích hợp plugin Native Google Auth cho Android:

1. **Plugin**: `@codetrix-studio/capacitor-google-auth`
2. **Cách hoạt động**: 
   - Hàm `useAuth.ts` tự động phát hiện nền tảng (detect platform).
   - Nếu chạy trên Web: Gây ra popup đăng nhập qua Browser.
   - Nếu chạy trên iOS/Android (Capacitor): Gọi plugin native để mở màn hình đăng nhập tài khoản Google của máy → nhận ID Token → ủy quyền vào Firebase Credential.
3. **Lưu ý cấu hình Client ID**:
   - `capacitor.config.ts` cần khai báo Web Client ID (dạng `xxx.apps.googleusercontent.com` kiểu Web Application) lấy từ `google-services.json`. (Lưu ý: Capacitor CLI không nhận biến môi trường Next.js nên giá trị phải được hard-code trực tiếp vào file cấu hình).
   - Biến môi trường `NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID` được thiết lập trong `.env.local` cho plugin sử dụng bên phần code React (thay vì popup).

---

## Quản lý Git cho thư mục `/android/`

> [!IMPORTANT]
> **Toàn bộ thư mục `/android/` KHÔNG được push lên GitHub.** Repo GitHub chỉ lưu mã nguồn web.

Thêm vào `.gitignore`:

```gitignore
# Toàn bộ Android project - không push GitHub
android/

# Keystore - tuyệt đối không commit
*.jks
*.keystore
```

**Lý do không push `/android/`:**
- Thư mục này rất nặng (~50–200MB) và có thể tái tạo bằng `npx cap add android` bất cứ lúc nào
- Chứa file build tạm, không cần thiết lưu trữ trên GitHub
- Web và Android dùng chung Firebase nên không cần đồng bộ qua Git

**`capacitor.config.ts`** vẫn được push GitHub (nhẹ, chứa cấu hình quan trọng).

## Lưu ý về Status Bar (Thanh trạng thái)

Để Status Bar không chèn lên giao diện nội dung Web App, dự án đã cấu hình:
1. `capacitor.config.ts`: `plugins.StatusBar.overlaysWebView = false` (Không vẽ chồng lên component React).
2. `components/ThemeProvider.tsx`: Sử dụng `StatusBar.show()` từ `@capacitor/status-bar` để chủ động hiển thị nó ở mọi theme, tránh việc bị hàm `hide()` của hệ thống làm mất đi khi chạy native app.

---

## Lưu ý quan trọng

| Vấn đề | Giải pháp |
|--------|-----------|
| Ảnh/font không load | Kiểm tra đường dẫn tương đối, dùng `/` thay `./` |
| Firebase không kết nối | Thêm domain `localhost` vào Firebase Auth whitelist |
| App bị cấm camera/mic | Khai báo permissions trong `AndroidManifest.xml` |
| APK quá nặng | Dùng AAB (`Build → Bundle`) thay vì APK khi upload lên Play Store |
| Keystore mất | **Mất keystore = không update được app trên Play Store.** Backup kỹ! |

---

## Lộ trình (Timeline dự kiến)

- [ ] **Giai đoạn 1**: Thiết lập Capacitor, build APK thử nghiệm nội bộ
- [ ] **Giai đoạn 2**: Test toàn bộ tính năng trên thiết bị Android thật
- [ ] **Giai đoạn 3**: Tùy chỉnh Icon, Splash Screen, tên app
- [ ] **Giai đoạn 4**: Build APK release có ký (signed)
- [ ] **Giai đoạn 5** *(tuỳ chọn)*: Đăng lên Google Play Store

---

🎊 Chúc bạn sớm ra mắt **Siêu Trí Nhớ** trên Android!
