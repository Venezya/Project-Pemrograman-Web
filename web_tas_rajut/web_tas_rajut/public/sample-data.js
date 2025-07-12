// Sample data untuk demo aplikasi Benang Rejut
// Menggunakan placeholder default untuk gambar produk

const sampleProducts = [
  {
    id: 'sample-1',
    name: 'Tas Rajut Boho Chic',
    description: 'Tas rajutan dengan desain boho yang trendy dan elegan. Cocok untuk acara casual maupun formal. Dibuat dengan benang berkualitas tinggi dan tahan lama.',
    price: 175000,
    category: 'tas-tote',
    imageUrl: '', // Menggunakan placeholder default
    sellerId: 'demo-seller-1',
    sellerName: 'Amira Handcraft',
    sellerPhone: '6281234567890',
    createdAt: new Date().toISOString(),
    isActive: true,
    views: 45,
    likes: 12
  },
  {
    id: 'sample-2',
    name: 'Tas Selempang Rajut Mini',
    description: 'Tas selempang rajutan berukuran mini yang praktis dan stylish. Perfect untuk membawa barang-barang essential. Dilengkapi dengan tali panjang yang bisa disesuaikan.',
    price: 125000,
    category: 'tas-selempang',
    imageUrl: '', // Menggunakan placeholder default
    sellerId: 'demo-seller-2',
    sellerName: 'Dewi Craft Studio',
    sellerPhone: '6281234567891',
    createdAt: new Date().toISOString(),
    isActive: true,
    views: 32,
    likes: 8
  },
  {
    id: 'sample-3',
    name: 'Tas Pantai Rajut Mesh',
    description: 'Tas rajutan dengan pola mesh yang sempurna untuk ke pantai. Breathable dan mudah dibersihkan. Cocok untuk membawa handuk, sunscreen, dan perlengkapan pantai lainnya.',
    price: 95000,
    category: 'tas-pantai',
    imageUrl: '', // Menggunakan placeholder default
    sellerId: 'demo-seller-3',
    sellerName: 'Sari Beach Craft',
    sellerPhone: '6281234567892',
    createdAt: new Date().toISOString(),
    isActive: true,
    views: 28,
    likes: 6
  },
  {
    id: 'sample-4',
    name: 'Clutch Rajut Elegant',
    description: 'Clutch rajutan elegan dengan desain minimalis. Cocok untuk acara formal atau dinner. Dilengkapi dengan tali rantai yang bisa dilepas pasang.',
    price: 85000,
    category: 'tas-clutch',
    imageUrl: '', // Menggunakan placeholder default
    sellerId: 'demo-seller-4',
    sellerName: 'Luna Elegant Bags',
    sellerPhone: '6281234567893',
    createdAt: new Date().toISOString(),
    isActive: true,
    views: 38,
    likes: 15
  },
  {
    id: 'sample-5',
    name: 'Tas Ransel Rajut Casual',
    description: 'Tas ransel rajutan dengan desain casual dan nyaman dipakai. Dilengkapi dengan multiple compartments untuk laptop dan barang-barang lainnya.',
    price: 225000,
    category: 'tas-ransel',
    imageUrl: '', // Menggunakan placeholder default
    sellerId: 'demo-seller-5',
    sellerName: 'Rika Backpack Co',
    sellerPhone: '6281234567894',
    createdAt: new Date().toISOString(),
    isActive: true,
    views: 52,
    likes: 18
  },
  {
    id: 'sample-6',
    name: 'Bandana Rajut Lucu',
    description: 'Bandana rajutan dengan motif lucu dan warna-warna cerah. Cocok untuk anak-anak maupun dewasa. Bahan lembut dan nyaman dipakai.',
    price: 35000,
    category: 'aksesoris',
    imageUrl: '', // Menggunakan placeholder default
    sellerId: 'demo-seller-6',
    sellerName: 'Cute Accessories',
    sellerPhone: '6281234567895',
    createdAt: new Date().toISOString(),
    isActive: true,
    views: 23,
    likes: 9
  }
];

// Sample users data
const sampleUsers = [
  {
    uid: 'demo-seller-1',
    firstName: 'Amira',
    lastName: 'Handcraft',
    email: 'amira@example.com',
    phone: '6281234567890',
    userType: 'seller',
    bio: 'Pengrajin tas rajutan dengan pengalaman 5 tahun. Spesialisasi dalam tas boho dan vintage style.',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'demo-seller-2',
    firstName: 'Dewi',
    lastName: 'Craft Studio',
    email: 'dewi@example.com',
    phone: '6281234567891',
    userType: 'seller',
    bio: 'Studio craft yang fokus pada produk rajutan berkualitas tinggi dengan desain modern.',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'demo-seller-3',
    firstName: 'Sari',
    lastName: 'Beach Craft',
    email: 'sari@example.com',
    phone: '6281234567892',
    userType: 'seller',
    bio: 'Spesialis tas pantai dan produk rajutan untuk aktivitas outdoor.',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'demo-seller-4',
    firstName: 'Luna',
    lastName: 'Elegant Bags',
    email: 'luna@example.com',
    phone: '6281234567893',
    userType: 'seller',
    bio: 'Pembuat tas rajutan elegant untuk acara formal dan kasual.',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'demo-seller-5',
    firstName: 'Rika',
    lastName: 'Backpack Co',
    email: 'rika@example.com',
    phone: '6281234567894',
    userType: 'seller',
    bio: 'Produsen tas ransel rajutan dengan fokus pada kenyamanan dan fungsi.',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'demo-seller-6',
    firstName: 'Cute',
    lastName: 'Accessories',
    email: 'cute@example.com',
    phone: '6281234567895',
    userType: 'seller',
    bio: 'Pembuat aksesoris rajutan lucu dan unik untuk semua usia.',
    createdAt: new Date().toISOString(),
    isActive: true
  }
];

// Function to load sample data to Firebase
async function loadSampleData() {
  if (!window.FirebaseHelper) {
    console.error('Firebase not loaded yet');
    return;
  }

  try {
    // Note: In a real app, you would need to create user accounts first
    // For demo purposes, we'll just add products assuming users exist
    
    console.log('Loading sample data...');
    
    // Add sample products
    for (const product of sampleProducts) {
      // Simulate adding product without actual image file
      const result = await window.FirebaseHelper.addProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category
      }, null); // No image file for demo
      
      if (result.success) {
        console.log(`Added product: ${product.name}`);
      } else {
        console.error(`Failed to add product: ${product.name}`, result.error);
      }
    }
    
    console.log('Sample data loaded successfully!');
    
  } catch (error) {
    console.error('Error loading sample data:', error);
  }
}

// Function to create demo account for testing
async function createDemoAccount() {
  if (!window.FirebaseHelper) {
    console.error('Firebase not loaded yet');
    return;
  }

  try {
    const demoUser = {
      email: 'demo@benangrejut.com',
      password: 'demo123456',
      firstName: 'Demo',
      lastName: 'User',
      phone: '6281234567890',
      userType: 'seller',
      bio: 'Demo account untuk testing aplikasi Benang Rejut'
    };

    const result = await window.FirebaseHelper.registerUser(
      demoUser.email, 
      demoUser.password, 
      {
        firstName: demoUser.firstName,
        lastName: demoUser.lastName,
        phone: demoUser.phone,
        userType: demoUser.userType,
        bio: demoUser.bio
      }
    );

    if (result.success) {
      console.log('Demo account created successfully!');
      console.log('Email: demo@benangrejut.com');
      console.log('Password: demo123456');
      
      // Auto login the demo user
      const loginResult = await window.FirebaseHelper.loginUser(demoUser.email, demoUser.password);
      if (loginResult.success) {
        console.log('Demo user logged in successfully!');
      }
    } else {
      console.error('Failed to create demo account:', result.error);
    }
    
  } catch (error) {
    console.error('Error creating demo account:', error);
  }
}

// Export functions for use in other files
window.loadSampleData = loadSampleData;
window.createDemoAccount = createDemoAccount;
window.sampleProducts = sampleProducts;
window.sampleUsers = sampleUsers; 