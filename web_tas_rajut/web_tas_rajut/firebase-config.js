// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set, get, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDdyLmGZ5DfdoFphVT79ZneEN_Wa0Vi70",
  authDomain: "web-tas-rajut.firebaseapp.com",
  databaseURL: "https://web-tas-rajut-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-tas-rajut",
  storageBucket: "web-tas-rajut.firebasestorage.app",
  messagingSenderId: "967704585349",
  appId: "1:967704585349:web:069883239aff925755f5ec",
  measurementId: "G-HSPHRN4499"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Firebase helper functions
const FirebaseHelper = {
  // Authentication functions
  async registerUser(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save additional user data to database
      await set(ref(database, `users/${user.uid}`), {
        uid: user.uid,
        email: email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        userType: userData.userType,
        bio: userData.bio || '',
        createdAt: new Date().toISOString(),
        isActive: true
      });
      
      return { success: true, user: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async logoutUser() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Product functions
  async addProduct(productData, imageBase64) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Add product to database with base64 image
      const productRef = ref(database, 'products');
      const newProductRef = push(productRef);
      
      await set(newProductRef, {
        id: newProductRef.key,
        sellerId: user.uid,
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        imageUrl: imageBase64 || '', // Store base64 directly
        createdAt: new Date().toISOString(),
        isActive: true,
        views: 0,
        likes: 0
      });

      return { success: true, productId: newProductRef.key };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getProducts() {
    try {
      const productsRef = ref(database, 'products');
      const snapshot = await get(productsRef);
      
      if (snapshot.exists()) {
        const products = [];
        snapshot.forEach(childSnapshot => {
          const product = childSnapshot.val();
          if (product.isActive) {
            products.push(product);
          }
        });
        return { success: true, products: products };
      } else {
        return { success: true, products: [] };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getUserProducts(userId) {
    try {
      const productsRef = ref(database, 'products');
      const snapshot = await get(productsRef);
      
      if (snapshot.exists()) {
        const products = [];
        snapshot.forEach(childSnapshot => {
          const product = childSnapshot.val();
          if (product.sellerId === userId && product.isActive) {
            products.push(product);
          }
        });
        return { success: true, products: products };
      } else {
        return { success: true, products: [] };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deleteProduct(productId) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const productRef = ref(database, `products/${productId}`);
      await remove(productRef);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Order functions
  async createOrder(orderData) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const orderRef = ref(database, 'orders');
      const newOrderRef = push(orderRef);
      
      await set(newOrderRef, {
        id: newOrderRef.key,
        buyerId: user.uid,
        sellerId: orderData.sellerId,
        productId: orderData.productId,
        productName: orderData.productName,
        price: parseFloat(orderData.price),
        quantity: parseInt(orderData.quantity),
        totalAmount: parseFloat(orderData.price) * parseInt(orderData.quantity),
        buyerName: orderData.buyerName,
        buyerPhone: orderData.buyerPhone,
        buyerAddress: orderData.buyerAddress,
        notes: orderData.notes || '',
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      return { success: true, orderId: newOrderRef.key };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getOrders(userId) {
    try {
      const ordersRef = ref(database, 'orders');
      const snapshot = await get(ordersRef);
      
      if (snapshot.exists()) {
        const orders = [];
        snapshot.forEach(childSnapshot => {
          const order = childSnapshot.val();
          if (order.buyerId === userId || order.sellerId === userId) {
            orders.push(order);
          }
        });
        return { success: true, orders: orders };
      } else {
        return { success: true, orders: [] };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const orderRef = ref(database, `orders/${orderId}`);
      await set(orderRef, {
        status: status,
        updatedAt: new Date().toISOString()
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // User functions
  async getUserData(userId) {
    try {
      const userRef = ref(database, `users/${userId}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        return { success: true, userData: snapshot.val() };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateUserData(userId, userData) {
    try {
      const userRef = ref(database, `users/${userId}`);
      await set(userRef, {
        ...userData,
        updatedAt: new Date().toISOString()
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Utility functions
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser() {
    return auth.currentUser;
  },

  // Real-time listeners
  listenToProducts(callback) {
    const productsRef = ref(database, 'products');
    return onValue(productsRef, (snapshot) => {
      const products = [];
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const product = childSnapshot.val();
          if (product.isActive) {
            products.push(product);
          }
        });
      }
      callback(products);
    });
  },

  listenToOrders(userId, callback) {
    const ordersRef = ref(database, 'orders');
    return onValue(ordersRef, (snapshot) => {
      const orders = [];
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const order = childSnapshot.val();
          if (order.buyerId === userId || order.sellerId === userId) {
            orders.push(order);
          }
        });
      }
      callback(orders);
    });
  }
};

// Export for use in other files
window.FirebaseHelper = FirebaseHelper;
window.auth = auth;
window.database = database; 