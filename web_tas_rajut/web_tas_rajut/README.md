# Benang Rejut - Platform Tas Rajutan Handmade

Platform digital yang menghubungkan pengrajin tas rajutan dengan para pecinta produk handmade di Indonesia.

## 🌟 Fitur Utama

### 🏠 Halaman Welcome
- Landing page yang menarik dengan desain tema crochet
- Navigasi mudah ke halaman login dan register
- Informasi tentang platform dan keunggulan

### 🔐 Sistem Autentikasi
- **Login**: Masuk dengan email dan password
- **Register**: Pendaftaran dengan pilihan tipe user (Pembeli/Penjual)
- **Firebase Authentication**: Integrasi dengan Firebase untuk keamanan
- **Auto-redirect**: Otomatis redirect berdasarkan status login

### 📱 Dashboard Aplikasi
- **Dashboard Interaktif**: Statistik produk, pesanan, dan views
- **Grid Produk**: Tampilan produk dengan filter kategori
- **Upload Produk**: Fitur upload dengan drag & drop
- **Detail Produk**: Modal dengan informasi lengkap produk
- **Sistem Pemesanan**: Form pemesanan terintegrasi WhatsApp

### 🛒 Fitur Produk
- **Upload Gambar**: Drag & drop atau click to upload
- **Kategori Produk**: Tas Tote, Selempang, Ransel, Clutch, Pantai, Aksesoris
- **Detail Lengkap**: Nama, harga, deskripsi, kategori
- **Preview Gambar**: Preview sebelum upload
- **Validasi Form**: Validasi input yang lengkap

### 📦 Sistem Pemesanan
- **Form Pemesanan**: Data pembeli lengkap
- **Kontak WhatsApp**: Langsung terhubung ke penjual
- **Tanpa Payment**: Sistem tanpa pembayaran online
- **Tracking Pesanan**: Simpan data pesanan di Firebase

### 🔥 Firebase Integration
- **Realtime Database**: Penyimpanan data real-time (termasuk gambar base64)
- **Authentication**: Sistem login yang aman
- **Real-time Updates**: Data update secara real-time
- **Base64 Images**: Gambar disimpan sebagai base64 untuk menghindari CORS

## 🚀 Cara Menggunakan

### 1. Setup Project
```bash
# Clone atau download project
# Buka di web server (XAMPP, WAMP, atau Live Server)
```

### 2. Konfigurasi Firebase
- Project sudah dikonfigurasi dengan Firebase
- Database URL: `https://web-tas-rajut-default-rtdb.asia-southeast1.firebasedatabase.app/`
- Authentication sudah disetup
- Gambar disimpan sebagai base64 di Realtime Database (max 2MB per gambar)

### 3. Jalankan Aplikasi
1. Buka `index.html` di browser
2. Daftar akun baru atau login
3. Mulai upload produk atau browse produk

## 📁 Struktur File

```
web_tas_rajut/
├── index.html              # Halaman welcome/landing
├── login.html              # Halaman login
├── register.html           # Halaman register
├── app.html                # Dashboard aplikasi utama
├── firebase-config.js      # Konfigurasi Firebase
├── web.html                # File original (backup)
└── README.md              # Dokumentasi
```

## 🎨 Desain & UI

### Tema Warna
- **Primary**: `#6c5b3c` (Coklat tua)
- **Secondary**: `#8b7355` (Coklat muda)
- **Background**: `#fdfcf9` (Krem)
- **Accent**: `#e0d4c0` (Beige)

### Komponen UI
- **Bootstrap 5.3.3**: Framework CSS responsif
- **Font Awesome 6.4.0**: Icon library
- **Google Fonts Poppins**: Typography
- **AOS**: Animation on scroll
- **Gradient Effects**: Modern gradient backgrounds

## 🔧 Fitur Teknis

### Firebase Services
- **Authentication**: Email/password login
- **Realtime Database**: Data storage (termasuk base64 images)
- **Security Rules**: Configured untuk keamanan
- **No CORS Issues**: Base64 storage menghindari masalah CORS

### Responsive Design
- **Mobile First**: Optimized untuk mobile
- **Tablet Support**: Layout responsif untuk tablet
- **Desktop**: Full feature untuk desktop

### Performance
- **Lazy Loading**: Gambar dimuat saat dibutuhkan
- **Optimized Images**: Kompresi gambar otomatis
- **Caching**: Browser caching untuk performa

## 📱 Cara Menggunakan Aplikasi

### Untuk Penjual:
1. **Daftar** sebagai penjual
2. **Login** ke dashboard
3. **Upload produk** dengan gambar dan detail
4. **Terima pesanan** melalui WhatsApp
5. **Kelola produk** dari dashboard

### Untuk Pembeli:
1. **Daftar** sebagai pembeli
2. **Browse produk** dengan filter kategori
3. **Lihat detail** produk yang menarik
4. **Pesan via WhatsApp** langsung ke penjual
5. **Koordinasi** pembayaran dan pengiriman

## 🛡️ Keamanan

- **Firebase Authentication**: Sistem login yang aman
- **Input Validation**: Validasi form di frontend
- **Image Upload**: Validasi tipe file gambar
- **User Authorization**: Akses berdasarkan user yang login

## 🌐 Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📞 Kontak & Support

- **WhatsApp**: +62 812-7676-1294
- **Email**: Support melalui platform
- **Website**: Platform Benang Rejut

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic authentication
- ✅ Product upload
- ✅ WhatsApp integration
- ✅ Firebase integration

### Phase 2 (Future)
- 🔄 Payment gateway integration
- 🔄 Advanced search & filters
- 🔄 Rating & review system
- 🔄 Push notifications

### Phase 3 (Future)
- 🔄 Mobile app
- 🔄 Advanced analytics
- 🔄 Multi-language support
- 🔄 Social media integration

## 🤝 Kontribusi

Project ini dibuat untuk membantu pengrajin tas rajutan di Indonesia. Kontribusi dan feedback sangat diterima!

## 📄 Lisensi

© 2024 Benang Rejut. Semua hak dilindungi.

---

**Benang Rejut** - *Dari Satu Helai, Tercipta Ribuan Cerita* 🧶✨ 