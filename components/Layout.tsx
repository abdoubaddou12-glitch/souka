
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { AppRoute, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (route: AppRoute, params?: any) => void;
  cartCount: number;
  user: User | null;
  onLogout: () => void;
  onShowAuth: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, cartCount, user, onLogout, onShowAuth }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(AppRoute.CATEGORY, { query: searchQuery });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <div className="bg-black text-white text-[11px] py-1 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <button onClick={() => onNavigate(AppRoute.VENDOR_DASHBOARD)} className="hover:text-jumia-orange transition-colors">
               <i className="fas fa-hand-holding-dollar text-jumia-orange mr-1"></i> ابدأ البيع في سوقنا
            </button>
            <span className="opacity-20">|</span>
            <span className="cursor-pointer hover:text-jumia-orange">تتبع طلبك</span>
          </div>
          <div className="flex gap-4">
            <span className="cursor-pointer">المساعدة</span>
            <span className="cursor-pointer font-bold">English | العربية</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div 
              className="text-3xl font-extrabold tracking-tighter text-black cursor-pointer select-none"
              onClick={() => onNavigate(AppRoute.HOME)}
            >
              SOUQNA<span className="text-jumia-orange">.</span>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="ابحث عن منتجات أو بائعين في سوقنا"
                className="w-full border-2 border-gray-200 rounded-md py-2 px-10 focus:outline-none focus:border-jumia-orange transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <button className="bg-jumia-orange text-white px-8 rounded-md mr-2 font-bold hover:bg-[#e67e17] shadow-md transition-all active:scale-95">بحث</button>
          </form>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex flex-col items-center cursor-pointer hover:text-jumia-orange group"
                >
                  <img src={user.avatar} className="w-6 h-6 rounded-full border group-hover:border-jumia-orange transition-colors" alt={user.name} />
                  <span className="text-xs font-bold mt-1 max-w-[80px] truncate">مرحباً، {user.name.split(' ')[0]}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[100] animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b mb-1">
                      <div className="text-xs font-bold text-gray-400 uppercase">حسابي</div>
                      <div className="text-sm font-bold truncate">{user.email}</div>
                    </div>
                    {user.role === 'vendor' && (
                      <button 
                        onClick={() => {onNavigate(AppRoute.VENDOR_DASHBOARD); setShowUserMenu(false)}}
                        className="w-full text-right px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <i className="fas fa-shop text-jumia-orange w-4"></i> لوحة البائع
                      </button>
                    )}
                    <button className="w-full text-right px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                      <i className="fas fa-box text-gray-400 w-4"></i> طلباتي
                    </button>
                    <button className="w-full text-right px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                      <i className="fas fa-heart text-gray-400 w-4"></i> المفضلة
                    </button>
                    <button 
                      onClick={() => {onLogout(); setShowUserMenu(false)}}
                      className="w-full text-right px-4 py-2 text-sm hover:bg-red-50 text-red-500 flex items-center gap-2 border-t mt-1"
                    >
                      <i className="fas fa-sign-out-alt w-4"></i> تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onShowAuth}
                className="flex flex-col items-center cursor-pointer hover:text-jumia-orange group"
              >
                <i className="far fa-user text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-xs font-bold mt-1">دخول</span>
              </button>
            )}
            
            <div 
              className="flex items-center gap-2 cursor-pointer hover:text-jumia-orange relative group"
              onClick={() => onNavigate(AppRoute.CART)}
            >
              <div className="relative">
                <i className="fas fa-shopping-cart text-xl group-hover:scale-110 transition-transform"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-jumia-orange text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline font-bold">السلة</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#1a1a1a] text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-jumia-orange">سوقنا - وجهتكم المفضلة</h3>
            <p className="text-sm text-gray-400 mb-4 italic">نجمع لك أفضل البائعين من كل أنحاء المملكة في مكان واحد مع ضمان الجودة.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase text-gray-300 border-b border-gray-700 pb-2">كن جزءاً منا</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li onClick={() => onNavigate(AppRoute.VENDOR_DASHBOARD)} className="hover:text-jumia-orange cursor-pointer">سجل كبائع</li>
              <li className="hover:text-jumia-orange cursor-pointer">سياسة البائعين</li>
              <li className="hover:text-jumia-orange cursor-pointer">الأسئلة الشائعة</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase text-gray-300 border-b border-gray-700 pb-2">عن المنصة</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li className="hover:text-jumia-orange cursor-pointer">من نحن</li>
              <li className="hover:text-jumia-orange cursor-pointer">وظائف</li>
              <li className="hover:text-jumia-orange cursor-pointer">الخصوصية</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 uppercase text-gray-300 border-b border-gray-700 pb-2">تواصل معنا</h3>
            <div className="flex gap-4 text-xl">
              <i className="fab fa-facebook hover:text-jumia-orange cursor-pointer"></i>
              <i className="fab fa-instagram hover:text-jumia-orange cursor-pointer"></i>
              <i className="fab fa-twitter hover:text-jumia-orange cursor-pointer"></i>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
          <p>© 2024 سوقنا (SOUQNA) - منصة متعددة البائعين. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
