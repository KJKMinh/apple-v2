# Bằng Chứng Kỹ Thuật Khảo Sát Apple.com (`docs/apple-evidence.md`)

> **Mục tiêu tài liệu:** Ghi nhận toàn bộ bằng chứng kỹ thuật thực tế (DOM, bảng màu HEX/RGBA, Typography Scale, kích thước Navbar, bố cục Hero Banner, Bento Grid và bộ chọn màu tương tác) từ `https://www.apple.com/` và trang sản phẩm flagship `https://www.apple.com/iphone-18-pro/` thông qua **REA MCP** kết hợp **Playwright MCP**, làm cơ sở chuẩn xác trước khi lập trình giao diện **Apple Phiên Bản 2 (Apple v2 Redesign)**.

---

## 1. Hồ Sơ Bằng Chứng REA & Playwright (Evidence Ledger)

Theo quy chuẩn của skill `reverse-engineer-anything` (REA), mọi thông số dưới đây được phân tách rõ giữa **Quan sát thực nghiệm (Observations)**, **Suy luận kỹ thuật (Inferences)** và **Giới hạn/Chưa biết (Limitations & Unknowns)**.

### 1.1. Danh mục Evidence IDs từ REA MCP
| Evidence ID | Công cụ REA | Đối tượng / Thao tác | Thông số xác thực (SHA-256 / Kích thước) |
| :--- | :--- | :--- | :--- |
| `ev_5afa9e019365d585a35ba0384f86447b58e75841852c349954c0fcb7258e2461` | `capture_browser_scenario` | Phiên chạy kiểm thử tự động `https://www.apple.com/` trên `Chromium@157.0.8103.51` | Parent digest: `5afa9e019365d585a35ba0384f86447b58e75841852c349954c0fcb7258e2461` (`duration_ms: 3334`) |
| `ev_f151b89182a421df2636c9401fc6085d7287f80bf5d385edea001db8cb99b26c` | `inspect_analysis_view` | Bản tóm tắt (`kind: "summary"`) của kịch bản điều hướng đầu tiên | View digest: `4ea39348439e7dd5dcdd1300b7a453220770b24f8b6cc7740c183b8b108f6a82` |
| `ev_6b49bbd31f6c0a59e1364ebad51f5e068b64b1cd2dc7eeece3cfc10990c954c9` | `capture_browser_scenario` | Phiên thu thập toàn bộ cây DOM & Accessibility Tree của `https://www.apple.com/` sau bước `settle` (`1533ms`) | Parent digest: `6b49bbd31f6c0a59e1364ebad51f5e068b64b1cd2dc7eeece3cfc10990c954c9` (`duration_ms: 3208`) |
| `ev_ef497ed35e93804ae7763886c887aa9ebe08758d34c471a49d82e667f5c8ca83` | `inspect_analysis_view` | Trích xuất Accessibility Tree hoàn chỉnh tại bước `settle` (`step_index: 1`) | Accessibility SHA-256: `3ef1d3c2388c2cea30ec1f59c28dd483cf42117d3f785eed26e874cb597770e6` (`18,029 bytes`) |
| `ev_a6c8df7faf19a0deb2a3f212e11a4e26da86432fc5a72141155ee938842916c3` | `inspect_analysis_view` | Kiểm tra danh sách bước (`collection: "steps"`, `kind: "browser-scenario"`) | View digest: `5b1b98f64edf997ec6e45837cc5099073ac4264f4a58af15b3884304de17a0f5` |
| `ev_367f20cdbe5fd765fc84a9aed3388aa1b6a2dce6430e77bc44131ea5b7c59c81` | `inspect_analysis_view` | Trích xuất toàn văn HTML/DOM (`artifacts: ["dom"]`) tại bước `settle` (`step_index: 1`) | DOM SHA-256: `732687ac3a5451a8a6d0a4c78e7f5e78de9fb5345723d7692c5f4b5d1606bdba` (`363,172 bytes`) |

### 1.2. Phiên đo đạc Runtime qua Playwright MCP
- **Trình duyệt thực thi:** Chromium `157.0.8103.51` (`C:\Program Files\Google\Chrome\Application\chrome.exe`).
- **Kích thước Viewport khảo sát:**
  - Desktop chuẩn: `1440 × 900 px` (chiều rộng nội dung thực tế sau thanh cuộn: `1425px`).
  - Tablet / Compact Desktop: `929 × 981 px` (thuộc vùng `@media (max-width: 1068px)`).
- **Tập tin CSS gốc đã trích xuất (`document.styleSheets`):**
  1. `/api-www/global-elements/global-header/v1/assets/globalheader.css`
  2. `/ac/globalfooter/8/en_US/styles/ac-globalfooter.built.css`
  3. `/wss/fonts?families=SF+Pro,v3|SF+Pro+Icons,v3`
  4. `/v/homepage/a/styles/main.built.css`
  5. `/v/homepage/a/styles/homepage.built.css`
  6. `/autopush/us/fam-gallery/styles/home-gallery.built.css`

---

## 2. Cấu Trúc DOM Chính (Main DOM Structure)

### 2.1. Sơ đồ phân cấp DOM tổng thể (`https://www.apple.com/`)
Quan sát trực tiếp từ `ev_367f20cdbe5fd765fc84a9aed3388aa1b6a2dce6430e77bc44131ea5b7c59c81` và `ev_ef497ed35e93804ae7763886c887aa9ebe08758d34c471a49d82e667f5c8ca83`:

```html
<body class="ac-nav-overlap globalheader-light globalnav-scrim" data-anim-scroll-group="body">
  <!-- 1. Thanh chọn vùng/quốc gia (khi truy cập ngoài US) -->
  <aside id="ac-localeswitcher" aria-label="Choose country or region">...</aside>

  <!-- 2. Tiêu đề ẩn phục vụ SEO & Screen Reader -->
  <h1 class="visuallyhidden">Apple</h1>

  <!-- 3. Khối điều hướng toàn cục (Global Header / Glassmorphism Navbar) -->
  <div id="globalheader">
    <aside id="globalmessage-segment" class="globalmessage-segment"></aside>
    <nav id="globalnav" aria-label="Global" class="globalnav js">
      <div class="globalnav-content">
        <ul id="globalnav-list" class="globalnav-list">
          <li class="globalnav-item globalnav-item-apple">...</li>
          <li class="globalnav-item globalnav-menu">
            <!-- Chứa 11 mục: Store, Mac, iPad, iPhone, Watch, Vision, AirPods, Home, Entertainment, Accessories, Support -->
            <!-- Mỗi mục kèm 1 khối .globalnav-flyout.globalnav-submenu -->
          </li>
          <li class="globalnav-item globalnav-search">...</li>
          <li class="globalnav-item globalnav-bag">...</li>
        </ul>
      </div>
      <div id="globalnav-curtain" class="globalnav-curtain"></div>
    </nav>
  </div>

  <!-- 4. Nội dung chính (Main Landmark) -->
  <main class="main" role="main">
    <!-- 4.1. Khối Hero (3 banner xếp dọc toàn chiều rộng, cách nhau 12px) -->
    <section class="section section-hero">
      <div class="tile-wrapper" data-tile-id="apple-homeview">...</div>
      <div class="tile-wrapper theme-dark holiday-2026-yellow">...</div>
      <div class="tile-wrapper" data-tile-id="iphone-duo">...</div>
    </section>

    <!-- 4.2. Khối Promo / Bento Grid trang chủ (Lưới 2 cột × 3 hàng = 6 ô, gap 12px) -->
    <section class="section section-promo">
      <div class="tile-wrapper theme-dark" data-tile-id="iphone-18-pro">...</div>
      <div class="tile-wrapper" data-tile-id="apple-tv-4k">...</div>
      <div class="tile-wrapper theme-dark" data-tile-id="apple-watch-series-12">...</div>
      <div class="tile-wrapper" data-tile-id="ipad">...</div>
      <div class="tile-wrapper" data-tile-id="apple-upgrade">...</div>
      <div class="tile-wrapper" data-tile-id="apple-card">...</div>
    </section>

    <!-- 4.3. Khối Carousel Giải trí (Apple TV+ & Services) -->
    <section class="section-endless-entertainment-gallery">
      <div class="endless-entertainment">
        <div class="media-gallery-headline-container">
          <h2 class="media-gallery-headline">Endless entertainment.</h2>
        </div>
        <div id="tv-media-gallery" class="media-gallery tv-media-gallery">...</div>
        <div id="fam-media-gallery" class="media-gallery fam-media-gallery">...</div>
        <div class="media-gallery-dotnav dotnav">...</div>
      </div>
    </section>
  </main>

  <!-- 5. Chân trang toàn cục (Global Footer) -->
  <footer id="ac-globalfooter" class="js" role="contentinfo" aria-labelledby="ac-gf-label">
    <div class="ac-gf-content">
      <h2 class="ac-gf-label" id="ac-gf-label">Apple Footer</h2>
      <section class="ac-gf-sosumi" aria-label="Footnotes">...</section>
      <nav class="ac-gf-directory" aria-label="Apple Directory">...</nav>
      <section class="ac-gf-footer">...</section>
    </div>
  </footer>
</body>
```

### 2.2. Cấu trúc vi mô của một ô hiển thị (`.tile-wrapper` trong Hero & Promo)
Mỗi ô trong `.section-hero` và `.section-promo` dùng chung một kiến trúc phân lớp 3 tầng (`z-index`) rất đặc trưng:
```html
<div class="tile-wrapper [theme-dark]">
  <!-- Tầng 1: Link phủ kín toàn bộ diện tích ô (100% × 100%, position: absolute) -->
  <a class="tile-link" href="/iphone-18-pro/"></a>

  <!-- Tầng 2: Nội dung chữ & nút bấm (position: relative, display: flex, flex-direction: column, align-items: center) -->
  <div class="tile-content">
    <div class="tile-copy-wrapper">
      <h2 class="tile-headline typography-tile-headline">...</h2>
      <p class="tile-subhead typography-tile-subhead">...</p>
    </div>
    <div class="tile-ctas"> <!-- display: grid; grid-template-columns: min-content min-content; column-gap: 17px (Hero) / 14px (Promo); z-index: 3 -->
      <a class="button" href="...">Learn more</a> <!-- z-index: 4 -->
      <a class="button button-secondary" href="...">Buy</a> <!-- z-index: 4 -->
    </div>
  </div>

  <!-- Tầng 3: Hình nền sản phẩm đặt tuyệt đối ở đáy (position: absolute; bottom: 0; width: 100%; height: var(--hero-content-height)) -->
  <div class="tile-image-wrapper">
    <picture class="static">
      <source media="(max-width: 734px)" srcset="..." />
      <source media="(max-width: 1068px)" srcset="..." />
      <img src="..." alt="..." />
    </picture>
  </div>
</div>
```

---

## 3. Bảng Màu Kỹ Thuật (Color Palette - HEX / RGB / RGBA)

Trích xuất từ `window.getComputedStyle` và các biến CSS gốc (`:root`, `#globalnav`, `.button`, `.theme-dark`, `.colornav-swatch`):

### 3.1. Màu nền & Bề mặt (Background & Surface Colors)
| Tên vai trò | Mã HEX | Giá trị RGB / RGBA | Phần tử áp dụng thực tế |
| :--- | :--- | :--- | :--- |
| **Page Background (Light)** | `#ffffff` | `rgb(255, 255, 255)` | `body.ac-nav-overlap.globalheader-light`, khoảng hở lưới (grid gap `12px`) |
| **Tile / Surface Gray (Light)** | `#f5f5f7` | `rgb(245, 245, 247)` | `.tile-wrapper` (mặc định), `.endless-entertainment`, `footer#ac-globalfooter` |
| **Navbar Scrim (Light Glass)** | `#ffffff` / `#fafafc` | `rgba(255, 255, 255, 0.8)` / `rgba(250, 250, 252, 0.8)` | `nav#globalnav.globalnav.js` khi hỗ trợ `backdrop-filter` (`--globalnav-background`) |
| **Navbar Opened Flyout (Light)** | `#fafafc` | `rgb(250, 250, 252)` | `--r-globalnav-background-opened`, `aside#ac-localeswitcher` |
| **Navbar Curtain Overlay (Light)** | `#e8e8ed` | `rgba(232, 232, 237, 0.4)` | `div#globalnav-curtain` (lớp mờ che nội dung khi mở menu) |
| **Tile / Surface Pure Black (Dark)** | `#000000` | `rgb(0, 0, 0)` | `.tile-wrapper.theme-dark`, `body` trang `/iphone-18-pro/`, `.upgrader-item` |
| **Surface Elevated Dark (Carbon)** | `#1d1d1f` | `rgb(29, 29, 31)` | `section.background-alt` (`/iphone-18-pro/`), `#upgrader-gallery.card.tile-rounded` |
| **Surface Deep Charcoal (Bento)** | `#161617` | `rgb(22, 22, 23)` | `--r-globalnav-background-opened-dark`, `.header-stats-container` (`border-radius: 28px`) |
| **Navbar Scrim (Dark Glass)** | `#161617` | `rgba(22, 22, 23, 0.8)` | `.globalnav-scrim.globalnav-dark` (`--globalnav-background`) |
| **Holiday Special Accent Surface** | `#822704` | `rgb(130, 39, 4)` | `.tile-wrapper.theme-dark.holiday-2026-yellow` |

### 3.2. Màu chữ (Typography Colors)
| Tên vai trò | Mã HEX | Giá trị RGB / RGBA | Phần tử áp dụng thực tế |
| :--- | :--- | :--- | :--- |
| **Primary Text (Light Theme)** | `#1d1d1f` | `rgb(29, 29, 31)` | `body`, `.tile-headline`, `.tile-subhead` trên nền sáng |
| **Primary Text (Dark Theme)** | `#f5f5f7` | `rgb(245, 245, 247)` | `.theme-dark .tile-headline`, `.theme-dark .tile-subhead`, chữ trên nền tối |
| **Navbar Link Default (Light)** | `#000000` | `rgba(0, 0, 0, 0.8)` | `--r-globalnav-color`, `.globalnav-link` |
| **Navbar Link Hover (Light)** | `#000000` | `rgb(0, 0, 0)` | `--r-globalnav-color-hover` |
| **Navbar Link Default (Dark)** | `#ffffff` | `rgba(255, 255, 255, 0.8)` | `.theme-dark #globalnav` (`--r-globalnav-color`) |
| **Navbar Submenu Link (Light)** | `#333336` | `rgb(51, 51, 54)` | `--r-globalnav-color-secondary`, `a.globalnav-submenu-link` |
| **Navbar Submenu Header (Light)** | `#6e6e73` | `rgb(110, 110, 115)` | `--r-globalnav-submenu-header-color`, `h2.globalnav-submenu-header` |
| **Navbar Submenu Header (Dark)** | `#86868b` | `rgb(134, 134, 139)` | `.theme-dark #globalnav .globalnav-submenu-header` |
| **Footer Footnotes & Legal** | `#000000` | `rgba(0, 0, 0, 0.56)` | `#ac-globalfooter`, `.ac-gf-sosumi` |
| **Footer Directory Links** | `#000000` | `rgba(0, 0, 0, 0.72)` | `a.ac-gf-directory-column-section-link`, `a.ac-gf-footer-legal-link` |
| **Footer Column Headings** | `#000000` | `rgba(0, 0, 0, 0.88)` | `h3.ac-gf-directory-column-section-title` |

### 3.3. Màu tương tác, Nút bấm & Bộ chọn màu sản phẩm (Interactive & Swatch Colors)
| Tên vai trò | Mã HEX | Giá trị RGB / RGBA | Phần tử áp dụng thực tế |
| :--- | :--- | :--- | :--- |
| **Primary CTA Blue (Default)** | `#0071e3` | `rgb(0, 113, 227)` | `a.button` (`--sk-button-background`), viền focus (`--sk-focus-color`) |
| **Primary CTA Blue (Hover)** | `#0076df` | `rgb(0, 118, 223)` | `--sk-button-background-hover` (cả nút Primary và nút Secondary khi hover) |
| **Primary CTA Blue (Active)** | `#006edb` | `rgb(0, 110, 219)` | `--sk-button-background-active` |
| **Secondary CTA / Link (Light)** | `#0066cc` | `rgb(0, 102, 204)` | `a.button.button-secondary` (chữ & viền `1px solid` trên nền sáng), `a.tile-link` |
| **Secondary CTA / Link (Dark)** | `#2997ff` | `rgb(41, 151, 255)` | `.theme-dark .button-secondary` (chữ & viền `1px solid` trên nền tối) |
| **Swatch 1: Burgundy (Plum)** | `#2e0f14` | `rgb(46, 15, 20)` | `.colornav-swatch-Plum` (Bộ chọn màu iPhone 18 Pro) |
| **Swatch 2: Glacier (Sky Blue)** | `#a3b1c4` | `rgb(163, 177, 196)` | `.colornav-swatch-Sky_Blue` (Bộ chọn màu iPhone 18 Pro) |
| **Swatch 3: Silver** | `#c4c4c4` | `rgb(196, 196, 196)` | `.colornav-swatch-Silver` (Bộ chọn màu iPhone 18 Pro) |
| **Swatch 4: Black** | `#1d1d1f` / `#000000` | `rgb(29, 29, 31)` / `rgb(0, 0, 0)` | `#colornav-value-Black` (Bộ chọn màu iPhone 18 Pro) |

---

## 4. Tỷ Lệ Chữ (Typography Scale)

### 4.1. Họ phông chữ (Font Families)
Apple phân tách rõ 2 họ chữ theo kích thước hiển thị:
- **Tiêu đề & Phụ đề lớn (`>= 20px`):**
  ```css
  font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  ```
- **Văn bản thân bài, Nút bấm, Thanh điều hướng & Chân trang (`< 20px`):**
  ```css
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
  ```

### 4.2. Bảng tỷ lệ chữ chi tiết theo Breakpoint
| Cấp độ chữ (Selector / Role) | Desktop (`> 1068px`) | Tablet (`735px – 1068px`) | Mobile (`<= 734px`) | Font Weight | Letter Spacing (Desktop) | Họ Font |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Headline** (`.typography-tile-headline`, `h2`) | `56px` / `60px` (`1.07143`) | `48px` / `52px` (`1.08349`) | `32px` / `36px` (`1.125`) | `600` (Semibold) | `-0.005em` (`-0.28px`) | `SF Pro Display` |
| **Media Gallery Headline** (`.media-gallery-headline`, `h2`) | `56px` / `60px` (`1.07143`) | `32px` / `36px` (`1.125`) | `32px` / `36px` (`1.125`) | `600` (Semibold) | `-0.005em` (`-0.28px`) | `SF Pro Display` |
| **Promo / Bento Tile Headline** (`.section-promo .tile-headline`, `h3`) | `40px` / `44px` (`1.1`) | `32px` / `36px` (`1.125`) | `32px` / `36px` (`1.125`) | `600` (Semibold) | `0em` (`normal`) | `SF Pro Display` |
| **Hero Subhead** (`.typography-tile-subhead`, `p`) | `28px` / `32px` (`1.14286`) | `24px` / `28px` (`1.16667`) | `19px` / `23px` (`1.21053`) | `400` (Regular) | `0.007em` (`+0.196px`) | `SF Pro Display` |
| **Navbar Flyout Elevated Link** (`.globalnav-submenu-list-item-elevated a`) | `24px` / `28px` (`1.16667`) | `24px` / `28px` | `24px` / `28px` | `600` (Semibold) | `0.009em` (`+0.216px`) | `SF Pro Display` |
| **Promo / Bento Tile Subhead** (`.section-promo .tile-subhead`, `p`) | `21px` / `25px` (`1.19048`) | `19px` / `23px` (`1.21053`) | `19px` / `23px` (`1.21053`) | `400` (Regular) | `0.011em` (`+0.231px`) | `SF Pro Display` |
| **Hero Callout** (`.typography-tile-callout`) | `19px` / `23px` (`1.21053`) | `17px` / `21px` (`1.23536`) | `14px` / `18px` (`1.28577`) | `400` (Regular) | `0.012em` | `SF Pro Display` |
| **Body Default** (`body`) | `17px` / `25px` (`1.47059`) | `17px` / `25px` | `17px` / `25px` | `400` (Regular) | `-0.022em` (`-0.374px`) | `SF Pro Text` |
| **Hero CTA Button** (`.section-hero .button`, `.button-elevated`) | `17px` / `20px` (`1.17648`) | `17px` / `20px` (`1.17648`) | `14px` / `18px` (`1.28577`) | `400` (Regular) | `-0.022em` (`-0.374px`) | `SF Pro Text` |
| **Promo / Standard CTA Button** (`.button`, `.section-promo .button`) | `14px` / `18px` (`1.28577`) | `14px` / `18px` (`1.28577`) | `14px` / `18px` (`1.28577`) | `400` (Regular) | `-0.016em` (`-0.224px`) | `SF Pro Text` |
| **Promo Callout / Badge** (`.section-promo .tile-callout`) | `14px` / `18px` (`1.28577`) | `14px` / `18px` | `14px` / `18px` | `400` / `500` | `-0.016em` (`-0.224px`) | `SF Pro Text` |
| **Navbar Top-Level Link** (`#globalnav .globalnav-link`) | `12px` / `12px` (`1.0`) | `12px` / `12px` | `17px` (trong menu mở) | `400` (Regular) | `-0.01em` (`-0.12px`) | `SF Pro Text` |
| **Navbar Submenu Header & Quick Links** (`.globalnav-submenu-header`) | `12px` / `16px` (`1.33337`) | `12px` / `16px` | `12px` / `16px` | `400` (Header) / `600` (Link) | `-0.01em` (`-0.12px`) | `SF Pro Text` |
| **Footer Text & Directory** (`#ac-globalfooter`) | `12px` / `16px` (`1.33337`) | `12px` / `16px` | `12px` / `16px` | `400` (Link) / `600` (Title) | `-0.01em` (`-0.12px`) | `SF Pro Text` |

---

## 5. Kích Thước & Cấu Hình Thanh Điều Hướng (`Navbar` / `#globalnav`)

### 5.1. Kích thước hình học & Bố cục (Box Model & Flex Layout)
- **Selector chính:** `nav#globalnav.globalnav.js`
- **Chiều cao cố định (Height):**
  - Desktop (`>= 834px`): `44px` (`--r-globalnav-height: 44px; height: 48px; max-height: 44px`).
  - Mobile (`<= 833px`): `48px` (`--r-globalnav-height: 48px; max-height: none`).
- **Vị trí & Lớp hiển thị (Positioning):**
  - `position: fixed` (hoặc `absolute` kết hợp sticky wrapper tùy trang; trên trang chủ khi hiển thị thanh thông báo vùng sẽ cố định ở đỉnh viewport với `z-index: 9999`, `width: 100%`, `min-width: 320px`).
- **Hiệu ứng kính mờ (Glassmorphism Scrim):**
  - `background-color: rgba(255, 255, 255, 0.8)` (trong CSS gốc khai báo `--globalnav-background: rgba(250, 250, 252, 0.8)` ở chế độ sáng và `rgba(22, 22, 23, 0.8)` ở chế độ tối).
  - `backdrop-filter: saturate(180%) blur(20px)` (computed style trả về `saturate(1.8) blur(20px)`).
- **Khung giới hạn nội dung (`.globalnav-content`):**
  - `max-width: 1024px` (`width: 100%`, `margin: 0 auto`, `box-sizing: border-box`).
  - `padding-inline-start: max(22px, env(safe-area-inset-left))` (`22px`).
  - `padding-inline-end: max(22px, env(safe-area-inset-right))` (`22px`).
- **Danh sách mục điều hướng (`ul#globalnav-list.globalnav-list`):**
  - `display: flex; justify-content: space-between; align-items: normal; height: 44px; margin: 0 -8px; list-style: none;`
  - Mỗi mục `a.globalnav-link` có `height: 44px; padding: 0 8px; display: flex; align-items: center; justify-content: center; transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);`.

### 5.2. Kích thước thực tế từng mục trên Navbar (Đo tại Viewport `1440 × 900`)
| STT | Mục (`aria-label` / Text) | Selector Class | Kích thước Bounding Box (`W × H`) | Padding Ngang |
| :---: | :--- | :--- | :---: | :---: |
| 1 | **Apple** (Logo SVG `14×44`) | `.globalnav-item-apple` | `30px × 44px` | `8px` trái / `8px` phải |
| 2 | **Store** | `.globalnav-item-store` | `46px × 44px` | `8px` trái / `8px` phải |
| 3 | **Mac** | `.globalnav-item-mac` | `39px × 44px` | `8px` trái / `8px` phải |
| 4 | **iPad** | `.globalnav-item-ipad` | `40px × 44px` | `8px` trái / `8px` phải |
| 5 | **iPhone** | `.globalnav-item-iphone` | `54px × 44px` | `8px` trái / `8px` phải |
| 6 | **Watch** | `.globalnav-item-watch` | `51px × 44px` | `8px` trái / `8px` phải |
| 7 | **Vision** | `.globalnav-item-vision` | `50px × 44px` | `8px` trái / `8px` phải |
| 8 | **AirPods** | `.globalnav-item-airpods` | `59px × 44px` | `8px` trái / `8px` phải |
| 9 | **Home** | `.globalnav-item-tv-home` | `49px × 44px` | `8px` trái / `8px` phải |
| 10 | **Entertainment** | `.globalnav-item-entertainment` | `93px × 44px` | `8px` trái / `8px` phải |
| 11 | **Accessories** | `.globalnav-item-accessories` | `83px × 44px` | `8px` trái / `8px` phải |
| 12 | **Support** | `.globalnav-item-support` | `60px × 44px` | `8px` trái / `8px` phải |
| 13 | **Search apple.com** (Icon) | `.globalnav-search` | `31px × 44px` | `8px` trái / `8px` phải |
| 14 | **Shopping Bag** (Icon) | `.globalnav-bag` | `30px × 44px` | `8px` trái / `8px` phải |

---

## 6. Bố Cục Hero Banner (`section.section-hero` & Interactive Color Switcher)

### 6.1. Thông số lưới & kích thước `section.section-hero` trên Trang chủ
- **Container (`section.section-hero`):**
  - `display: grid`
  - `grid-template-columns: 1fr` (tại viewport `1440px` đạt `1425px`).
  - `grid-template-rows: 692px 692px 692px` (3 banner xếp chồng dọc).
  - `gap: 12px` (`row-gap: 12px`, `column-gap: 12px`).
  - `margin: 0px 0px 12px 0px`, `padding: 0px`.
- **Biến chiều cao động (`--hero-content-height`) theo Breakpoint:**
  - Desktop màn hình cao (`@media (min-width: 1069px) and (min-height: 776px)`): `692px` (padding `.tile-wrapper`: `56px 0px 63px`).
  - Desktop tiêu chuẩn (`> 1068px`, chiều cao `< 776px`): `580px` (padding `.tile-wrapper`: `48px 0px 56px`).
  - Tablet màn hình cao (`735px – 1068px`, `min-height: 734px`): `650px` (padding `.tile-wrapper`: `61px 0px 69px`).
  - Tablet tiêu chuẩn (`<= 1068px`): `570px` (padding `.tile-wrapper`: `54px 0px 61px`).
  - Mobile (`<= 734px`): `500px` (padding `.tile-wrapper`: `39px 0px 43px`).
- **Căn chỉnh nội dung bên trong mỗi Hero Tile:**
  - `.tile-content`: `display: flex; flex-direction: column; align-items: center; position: relative;` (chiều cao vùng nội dung `573px` bên trong tile `692px`).
  - `.tile-headline`: `margin: 0 auto;` (`56px`, `font-weight: 600`, `line-height: 60px`).
  - `.tile-subhead`: `margin-top: 6px; margin-inline: auto;` (`28px`, `font-weight: 400`, `line-height: 32px`).
  - `.tile-ctas`: `display: grid; grid-template-columns: min-content min-content; justify-content: center; column-gap: 17px; margin-top: 17px; z-index: 3;` (trên mobile `<= 734px`: `column-gap: 14px; margin-top: 11px`).
  - **Nút bấm Hero (`.section-hero .button`):**
    - Kích thước: Cao `44px` (`padding: 11px 21px`, `border-width: 1px`, `border-radius: 980px` dạng viên thuốc pill-shape).
    - Nút chính (`Learn more`): Rộng `131px × 44px`, nền `#0071e3`, chữ `#ffffff`.
    - Nút phụ (`Buy` - `.button-secondary`): Rộng `73px × 44px`, nền `transparent`, viền `1px solid #0066cc` (hoặc `#2997ff` trên nền tối), chữ `#0066cc` (khi hover đổi nền sang `#0076df` và chữ sang `#ffffff`).

### 6.2. Cấu trúc Bộ Chọn Màu Tương Tác (Interactive Color Switcher trên `/iphone-18-pro/`)
Trên trang sản phẩm flagship (`/iphone-18-pro/`), Apple sử dụng cụm điều khiển `fieldset.colornav` cho phép chuyển đổi màu sắc thiết bị trực tiếp:
- **DOM Structure:**
  ```html
  <div class="colornav-gallery product-viewer-media">
    <picture id="overview-product-viewer-color-burgundy-2" class="gallery-image gallery-image-color1">...</picture>
    <picture id="overview-product-viewer-color-glacier-2" class="gallery-image gallery-image-color2">...</picture>
    <picture id="overview-product-viewer-color-silver-2" class="gallery-image gallery-image-color3">...</picture>
    <picture id="overview-product-viewer-color-black-2" class="gallery-image gallery-image-color4">...</picture>
  </div>
  <fieldset class="colornav colornav-reduced colornav-neutral">
    <legend class="colornav-title">Product Colors.</legend>
    <ul class="colornav-items">
      <li class="colornav-item">
        <input type="radio" id="colornav-value-Plum" class="colornav-value" />
        <label class="colornav-link">
          <span class="colornav-swatch colornav-swatch-Plum" style="background-color: #2e0f14; border-radius: 50%;">Burgundy</span>
          <span class="colornav-label">Burgundy</span>
        </label>
      </li>
      <!-- Tương tự cho Glacier (#a3b1c4), Silver (#c4c4c4), Black (#1d1d1f) -->
    </ul>
  </fieldset>
  ```
- **Đặc điểm kỹ thuật áp dụng cho Apple Phiên Bản 2 (`Hero.tsx`):**
  - Các nút chọn màu (`swatch`) có dạng hình tròn hoàn hảo (`border-radius: 50%` / `rounded-full`), đặt trong thanh điều khiển dạng viên thuốc kính mờ (`backdrop-blur-md`).
  - Khi người dùng click chọn một màu, nhãn tên màu (`control-color-current`) cập nhật tức thời và hình ảnh sản phẩm/ánh sáng nền chuyển đổi mượt mà (`transition-all duration-500`).

---

## 7. Bố Cục Lưới Bento (`Bento Grid` — `section.section-promo` & `.card.tile.tile-rounded`)

Khảo sát trên Apple.com cho thấy 2 biến thể lưới Bento bổ trợ cho nhau: **Lưới Promo 2 cột trên Trang chủ (`section.section-promo`)** và **Lưới Bento bo góc lớn trên Trang sản phẩm (`.card.tile.tile-rounded`)**.

### 7.1. Lưới Promo 2 Cột trên Trang chủ (`section.section-promo`)
- **Container CSS (`section.section-promo`):**
  - `display: grid`
  - `grid-template-columns: 1fr 1fr` (tại viewport `1440px`, mỗi cột rộng chính xác `694.5px`, tổng 2 cột + gap + padding = `1425px`).
  - `grid-template-rows: 580px 580px 580px` (3 hàng × 2 cột = 6 ô).
  - `gap: 12px` (`row-gap: 12px`, `column-gap: 12px`).
  - `padding: 0px 12px` (`padding-left: max(12px, env(safe-area-inset-left) - 12px)`).
  - `margin: 0px 0px 12px 0px`.
  - **Responsive:**
    - Tablet (`735px – 1068px`): Giữ `grid-template-columns: 1fr 1fr`, chiều cao mỗi ô giảm xuống `--promo-content-height: 490px`, padding mỗi ô `44px 0px 48px`.
    - Mobile (`<= 734px`): Chuyển thành 1 cột `grid-template-columns: 1fr`, `padding: 0px`, chiều cao mỗi ô `--promo-content-height: 500px`.
- **Chi tiết 6 ô trong `section.section-promo` (Đo tại Viewport `1440 × 900`):**

| Ô số | Định danh (`data-tile-id` / Tiêu đề) | Tọa độ `(x, y)` | Kích thước (`W × H`) | Chủ đề & Màu nền | Màu chữ Tiêu đề / Phụ đề | Kích thước Nút CTA |
| :---: | :--- | :---: | :---: | :--- | :--- | :--- |
| **1** | **iPhone 18 Pro** (`Pro further.`) | `(12, 2226)` | `695 × 580 px` | `.theme-dark` (`#000000`) | `#f5f5f7` (`40px` / `21px`) | `104×36` (`#0071e3`) & `60×36` (viền `#2997ff`) |
| **2** | **Apple TV 4K** (`Stunning picture...`) | `(719, 2226)` | `695 × 580 px` | Light (`#f5f5f7`) | `#1d1d1f` (`40px` / `21px`) | `104×36` (`#0071e3`) & `60×36` (viền `#0066cc`) |
| **3** | **Apple Watch Series 12** (`The most accurate...`) | `(12, 2818)` | `695 × 580 px` | `.theme-dark` (`#000000`) | `#f5f5f7` (`40px` / `21px`) | `104×36` (`#0071e3`) & `60×36` (viền `#2997ff`) |
| **4** | **iPad** (`Now with the speed of A16...`) | `(719, 2818)` | `695 × 580 px` | Light (`#f5f5f7`) | `#1d1d1f` (`40px` / `21px`) | `104×36` (`#0071e3`) & `60×36` (viền `#0066cc`) |
| **5** | **Apple Upgrade** (`Love it. Lease it...`) | `(12, 3410)` | `695 × 580 px` | Light (`#f5f5f7`) | `#1d1d1f` (`40px` / `21px`) | `104×36` (`#0071e3` - 1 nút duy nhất) |
| **6** | **Apple Card** (`Get up to 3% Daily Cash...`) | `(719, 3410)` | `695 × 580 px` | Light (`#f5f5f7`) | `#1d1d1f` (`40px` / `21px`) | `104×36` (`#0071e3`) & `99×36` (viền `#0066cc`) |

### 7.2. Lưới Bento Bo Góc Lớn trên Trang Sản Phẩm (`div.card.tile.tile-rounded`)
Khi khảo sát sâu vào trang sản phẩm `/iphone-18-pro/`, Apple sử dụng hệ thống thẻ Bento hiện đại với các thông số chuẩn:
- **Selector:** `div.card.tile.tile-rounded`, `div.upgrader-item.card.tile.tile-rounded`, `div.header-stats-container`.
- **Độ bo góc (Border Radius):** `border-radius: 28px` (tương đương chuẩn `rounded-3xl` = `24px` hoặc `rounded-[28px]` trong Tailwind CSS).
- **Tỷ lệ phân chia ô bất đối xứng (Asymmetric Bento Spans):**
  - **Ô Hero Bento toàn chiều rộng (Full-span):** `1245 × 612 px` (`border-radius: 28px`).
  - **Ô Bento 2/3 chiều rộng (Large 2-col span):** `696 × 452 px` (`border-radius: 28px`).
  - **Ô Bento 1/3 chiều rộng (Compact 1-col span):** `372 × 452 px` (`border-radius: 28px`).
  - **Ô Bento thống kê / so sánh (`.upgrader-item`):** `333 × 300 px` (`border-radius: 28px`, nền `#000000` bên trong khung `#1d1d1f` hoặc `#161617`).

---

## 8. Bảng Quy Đổi Sang Quy Chuẩn Thiết Kế "Apple Phiên Bản 2" (Tailwind CSS Mapping)

Để phục vụ bước lập trình tiếp theo theo đúng quy tắc trong `GEMINI.md`, bảng dưới đây ánh xạ trực tiếp bằng chứng khảo sát từ Apple.com sang hệ thống Component của dự án:

| Thành phần (`src/components/`) | Bằng chứng kỹ thuật từ Apple.com | Quy chuẩn áp dụng trong Apple Phiên Bản 2 (Tailwind CSS) |
| :--- | :--- | :--- |
| **`Navbar.tsx`** | `#globalnav`: cao `44px`, `max-width: 1024px`, `padding: 0 22px`, nền `rgba(255,255,255,0.8)` / `rgba(22,22,23,0.8)`, `backdrop-filter: saturate(180%) blur(20px)`, chữ `12px`. | `fixed top-0 inset-x-0 z-50 h-[44px] bg-white/80 dark:bg-[#161617]/80 backdrop-blur-md backdrop-saturate-[1.8]` với container `max-w-[1024px] mx-auto px-[22px] flex items-center justify-between text-[12px] tracking-[-0.01em]`. |
| **`Hero.tsx`** | `.section-hero`: tiêu đề `56px` (`font-semibold tracking-tight`), phụ đề `28px`, nút pill `rounded-full` (`#0071e3` & `#0066cc`/`#2997ff`), kèm `fieldset.colornav` (`#2e0f14`, `#a3b1c4`, `#c4c4c4`, `#1d1d1f`). | Hero Section có **Interactive Color Switcher** trực tiếp (chuyển đổi giữa các phiên bản màu sắc thực tế như Burgundy, Glacier, Silver, Titanium Black), cập nhật hình ảnh, ánh sáng nền và thông số động mượt mà. |
| **`BentoGrid.tsx`** | Kết hợp `.section-promo` (`gap: 12px`) và `.card.tile.tile-rounded` (`border-radius: 28px`, ô bất đối xứng `2-col` `696×452` và `1-col` `372×452`, nền `#f5f5f7` / `#1d1d1f` / `#000000`). | Lưới Bento hiện đại sử dụng `grid-cols-1 md:grid-cols-12 gap-4 md:gap-5`, các thẻ bo góc `rounded-3xl` (`24px`–`28px`), hiệu ứng hover micro-interaction (`hover:scale-[1.01] transition-all duration-500`). |
| **`SpecCompare.tsx`** | `#upgrader-gallery` & `/mac/compare/`: bảng đối chiếu trực quan giữa các dòng máy với nền `#f5f5f7` / `#161617`, bo góc `28px`, typography rõ ràng. | Bộ so sánh thông số kỹ thuật tương tác trực tiếp (chọn 2–3 mẫu flagship để đối chiếu Chip, Camera, Màn hình, Pin, Trọng lượng và Giá bán). |
| **`Footer.tsx`** | `#ac-globalfooter`: nền `#f5f5f7`, chữ `12px`, footnote `rgba(0,0,0,0.56)`, tiêu đề cột `rgba(0,0,0,0.88)` (`font-semibold`), link `rgba(0,0,0,0.72)`, `max-width: 980px`. | Footer chuẩn cấu trúc Apple (`bg-[#f5f5f7] text-[12px] leading-[16px] text-black/56`), khung `max-w-[980px] mx-auto px-[22px]`, gồm phần ghi chú pháp lý (sosumi), lưới 5 cột danh mục và bản quyền. |

---

## 9. Ghi Chú Về Giới Hạn & Phạm Vi Quan Sát (REA Limitations & Unknowns)
- **Phạm vi quan sát (Observation Scope):** Các thông số DOM và Computed Styles được thu thập trực tiếp từ phiên chạy thực tế trên `https://www.apple.com/` và `https://www.apple.com/iphone-18-pro/` qua Chromium `157.0.8103.51` (Windows x64) vào thời điểm khảo sát.
- **Giới hạn của REA Browser Scenario (`ev_6b49bbd3...`):** Các sự kiện mạng trong `capture_browser_scenario` ghi nhận theo thứ tự phản hồi của trình duyệt và không suy diễn nhân quả đồng thời hoặc initiator stack sâu của từng script nội bộ.
- **Trạng thái thực thi dự án:** Toàn bộ bằng chứng kỹ thuật đã được lưu trữ đầy đủ vào `docs/apple-evidence.md` đúng quy tắc trong `GEMINI.md`. Chưa viết hoặc chỉnh sửa bất kỳ file code giao diện nào ở bước này.
