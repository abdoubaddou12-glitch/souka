
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';
import GeminiAssistant from './components/GeminiAssistant';
import VendorDashboard from './components/VendorDashboard';
import Auth from './components/Auth';
import { AppRoute, Product, CartItem, Vendor, User } from './types';
import { INITIAL_PRODUCTS, CATEGORIES, MOCK_VENDORS } from './constants';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [activeVendor, setActiveVendor] = useState<Vendor>(MOCK_VENDORS[0]);

  const navigate = (route: AppRoute, params?: any) => {
    // Check if route requires auth
    if (route === AppRoute.VENDOR_DASHBOARD && (!currentUser || currentUser.role !== 'vendor')) {
      setShowAuth(true);
      return;
    }
    setCurrentRoute(route);
    if (params?.id) setSelectedProductId(params.id);
    window.scrollTo(0, 0);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowAuth(false);
    if (user.role === 'vendor') {
      // Simulate creating a vendor object for the new user if it doesn't exist
      setActiveVendor({
        id: `v-${user.id}`,
        name: user.name,
        logo: user.avatar || '',
        rating: 5.0,
        joinedDate: new Date().toLocaleDateString(),
        totalSales: 0
      });
      setCurrentRoute(AppRoute.VENDOR_DASHBOARD);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRoute(AppRoute.HOME);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3 bg-white rounded shadow-sm py-4 hidden md:block border">
          <div className="px-4 pb-2 border-b mb-2 text-xs font-bold text-gray-400">تصفح الفئات</div>
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors text-sm font-medium hover:text-jumia-orange"
            >
              <i className={`fas ${cat.icon} w-5 text-gray-400 group-hover:text-jumia-orange`}></i>
              {cat.name}
            </div>
          ))}
        </div>

        <div className="md:col-span-9 relative group h-[300px] md:h-[400px] rounded overflow-hidden shadow-sm">
          <img src="https://picsum.photos/1200/600?random=10" className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
            <h2 className="text-4xl font-extrabold mb-2">أهلاً بكم في سوقنا</h2>
            <p className="text-lg opacity-90 mb-6">أكبر تجمع للبائعين الموثوقين في مكان واحد</p>
            <div className="flex gap-4">
              <button onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})} className="bg-jumia-orange text-white px-8 py-3 rounded-md font-bold hover:scale-105 transition-transform shadow-lg">تسوق الآن</button>
              {!currentUser && (
                <button onClick={() => setShowAuth(true)} className="bg-white text-black px-8 py-3 rounded-md font-bold hover:scale-105 transition-transform shadow-lg">ابدأ البيع معنا</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Stores */}
      <section className="bg-white p-6 rounded shadow-sm border">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-store text-jumia-orange"></i>
          متاجر مميزة
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {MOCK_VENDORS.map(v => (
            <div key={v.id} className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 rounded-full border-2 border-gray-100 p-1 group-hover:border-jumia-orange transition-colors mb-2 overflow-hidden bg-white">
                <img src={v.logo} className="w-full h-full rounded-full object-cover" alt={v.name} />
              </div>
              <span className="text-xs font-bold text-center group-hover:text-jumia-orange">{v.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grids */}
      <section className="space-y-4">
        <div className="bg-jumia-orange text-white p-3 rounded-t shadow-sm flex justify-between items-center px-6">
          <h2 className="text-xl font-bold">أحدث المنتجات</h2>
          <button className="text-sm font-bold hover:underline">عرض الكل</button>
        </div>
        <div className="bg-white p-4 grid grid-cols-2 md:grid-cols-6 gap-4 shadow-sm border rounded-b">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onClick={(id) => navigate(AppRoute.PRODUCT_DETAILS, {id})} onAddToCart={addToCart} />
          ))}
        </div>
      </section>
    </div>
  );

  const renderProductDetails = () => {
    const product = products.find(p => p.id === selectedProductId) || products[0];
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white p-4 rounded shadow-sm border">
              <img src={product.image} className="w-full h-auto rounded" alt={product.name} />
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded shadow-sm border">
              <div className="text-xs text-blue-500 font-bold mb-2 uppercase flex items-center gap-2">
                 <i className="fas fa-check-circle"></i> متجر رسمي
              </div>
              <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
              <div className="text-xs text-gray-500 mb-4">البائع: <span className="text-blue-500 font-bold cursor-pointer">{product.vendorName}</span></div>
              
              <hr className="mb-4" />
              
              <div className="space-y-1 mb-6">
                <div className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()} درهم</div>
                {product.oldPrice && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 line-through text-lg">{product.oldPrice.toLocaleString()} درهم</span>
                    <span className="bg-[#feefd3] text-jumia-orange text-xs font-bold px-2 py-0.5 rounded">
                      -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-jumia-orange text-white py-4 rounded-md font-bold text-lg hover:bg-[#e67e17] shadow-xl flex items-center justify-center gap-3 transform active:scale-95 transition-all"
              >
                <i className="fas fa-cart-plus"></i>
                أضف إلى السلة
              </button>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white p-6 rounded shadow-sm border">
              <h3 className="font-bold uppercase text-xs text-gray-400 mb-4">معلومات البائع</h3>
              <div className="flex items-center gap-4 mb-4">
                <img src={MOCK_VENDORS.find(v => v.id === product.vendorId)?.logo || `https://ui-avatars.com/api/?name=${product.vendorName}`} className="w-12 h-12 rounded-full border" />
                <div>
                  <div className="font-bold text-sm">{product.vendorName}</div>
                  <div className="text-[10px] text-green-500 font-bold">بائع موثوق</div>
                </div>
              </div>
              <button className="w-full text-sm font-bold text-jumia-orange border border-jumia-orange py-2 rounded hover:bg-jumia-orange/5">زيارة المتجر</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">سلة التسوق ({cart.length})</h1>
        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded shadow-sm border text-center">
            <i className="fas fa-shopping-cart text-6xl text-gray-200 mb-6"></i>
            <h2 className="text-xl font-bold mb-2">سلة التسوق الخاصة بك فارغة!</h2>
            <button onClick={() => navigate(AppRoute.HOME)} className="bg-jumia-orange text-white px-8 py-3 rounded-md font-bold mt-4 shadow-lg">ابدأ التسوق</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-9 space-y-4">
              <div className="bg-white rounded shadow-sm border">
                {cart.map(item => (
                  <div key={item.id} className="p-6 border-b last:border-0 flex gap-6">
                    <img src={item.image} className="w-20 h-20 object-cover rounded border" alt={item.name} />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <div className="text-lg font-bold">{(item.price * item.quantity).toLocaleString()} درهم</div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">البائع: {item.vendorName}</div>
                      <div className="mt-4 flex justify-between items-center">
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs font-bold">حذف</button>
                        <div className="flex items-center border rounded">
                          <button onClick={() => updateCartQuantity(item.id, -1)} className="px-3 py-1">-</button>
                          <span className="px-4 text-sm font-bold">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, 1)} className="px-3 py-1">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="bg-white p-6 rounded shadow-sm border sticky top-28">
                <h3 className="font-bold text-sm border-b pb-4 mb-4 uppercase text-gray-500">ملخص الطلب</h3>
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>الإجمالي</span>
                  <span className="text-jumia-orange">{total.toLocaleString()} درهم</span>
                </div>
                <button className="w-full bg-jumia-orange text-white py-3 rounded font-bold">إتمام الشراء</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout 
      onNavigate={navigate} 
      cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
      user={currentUser}
      onLogout={handleLogout}
      onShowAuth={() => setShowAuth(true)}
    >
      {currentRoute === AppRoute.HOME && renderHome()}
      {currentRoute === AppRoute.PRODUCT_DETAILS && renderProductDetails()}
      {currentRoute === AppRoute.CART && renderCart()}
      {currentRoute === AppRoute.VENDOR_DASHBOARD && (
        <VendorDashboard 
          vendor={activeVendor} 
          products={products} 
          onAddProduct={addProduct} 
          onDeleteProduct={deleteProduct} 
        />
      )}
      <GeminiAssistant />
      {showAuth && <Auth onLogin={handleLogin} onClose={() => setShowAuth(false)} />}
    </Layout>
  );
};

export default App;
