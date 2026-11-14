# Dự án: Apple Phiên Bản 2 (Apple v2 Redesign)
## Mục tiêu
- Sử dụng MCP `rea` và `playwright` để khảo sát https://www.apple.com/.
- Thiết kế và lập trình trang "Apple Phiên Bản 2" mang phong cách hiện đại, có tính năng tương tác trực tiếp trên giao diện.
- Đóng gói tĩnh ra thư mục `dist` để triển khai lên GitHub Pages.

## Quy chuẩn kỹ thuật
- Công nghệ: React + TypeScript + Vite + Tailwind CSS + Lucide Icons.
- Giao diện: Thanh điều hướng kính mờ (Glassmorphism Navbar cao 44px, backdrop-blur-md), Hero Section có bộ chọn màu sắc trực tiếp (Interactive Color Switcher), lưới Bento (Bento Grid bo góc rounded-3xl), hiệu ứng chuyển động mượt.
- Cấu trúc: Tách rõ từng phần vào `src/components/` (Navbar, Hero, BentoGrid, SpecCompare, Footer).

## Quy tắc thực thi cho Antigravity Agent
- Lưu toàn bộ thông số khảo sát từ REA vào file `docs/apple-evidence.md` trước khi viết code.
- Sau khi code xong mỗi component, dùng Playwright mở localhost kiểm tra hiển thị rồi mới tạo git commit.