// Firebase configuration dan helper functions
// Loaded via CDN untuk menghindari masalah CORS

// Initialize Firebase setelah CDN loaded
document.addEventListener('DOMContentLoaded', function() {
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
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const auth = firebase.auth();

  // Firebase helper functions
  const FirebaseHelper = {
    // Authentication functions
    async registerUser(email, password, userData) {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Save additional user data to database
        await database.ref(`users/${user.uid}`).set({
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
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async logoutUser() {
      try {
        await auth.signOut();
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
        const productRef = database.ref('products').push();
        
        await productRef.set({
          id: productRef.key,
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

        return { success: true, productId: productRef.key };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async getProducts() {
      try {
        const snapshot = await database.ref('products').once('value');
        
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
        const snapshot = await database.ref('products').once('value');
        
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

        await database.ref(`products/${productId}`).remove();
        
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

        const orderRef = database.ref('orders').push();
        
        await orderRef.set({
          id: orderRef.key,
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

        return { success: true, orderId: orderRef.key };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async getOrders(userId) {
      try {
        const snapshot = await database.ref('orders').once('value');
        
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

        await database.ref(`orders/${orderId}/status`).set(status);
        
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // User functions
    async getUserData(userId) {
      try {
        const snapshot = await database.ref(`users/${userId}`).once('value');
        
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
        await database.ref(`users/${userId}`).set(userData);
        
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Utility functions
    onAuthStateChange(callback) {
      return auth.onAuthStateChanged(callback);
    },

    getCurrentUser() {
      return auth.currentUser;
    },

    // Real-time listeners
    listenToProducts(callback) {
      return database.ref('products').on('value', (snapshot) => {
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
      return database.ref('orders').on('value', (snapshot) => {
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
  
  // Dispatch event when Firebase is ready
  window.dispatchEvent(new Event('firebaseReady'));
}); 