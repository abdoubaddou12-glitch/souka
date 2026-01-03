
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const mockUser: User = {
      id: `u-${Date.now()}`,
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      role: isLogin ? 'customer' : role, // In a real app, role comes from DB
      avatar: `https://ui-avatars.com/api/?name=${formData.name || formData.email}&background=f68b1e&color=fff`
    };
    onLogin(mockUser);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-black mb-2">
              SOUQNA<span className="text-jumia-orange">.</span>
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'مرحباً بعودتك! سجل دخولك للمتابعة' : 'أنشئ حساباً جديداً وابدأ التسوق أو البيع'}
            </p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-white shadow-sm text-jumia-orange' : 'text-gray-500'}`}
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-white shadow-sm text-jumia-orange' : 'text-gray-500'}`}
            >
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase mr-1">نوع الحساب</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      type="button"
                      onClick={() => setRole('customer')}
                      className={`py-2 text-xs border rounded-lg font-bold ${role === 'customer' ? 'border-jumia-orange bg-jumia-orange/5 text-jumia-orange' : 'border-gray-200 text-gray-400'}`}
                    >
                      <i className="fas fa-user mr-1"></i> مشتري
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRole('vendor')}
                      className={`py-2 text-xs border rounded-lg font-bold ${role === 'vendor' ? 'border-jumia-orange bg-jumia-orange/5 text-jumia-orange' : 'border-gray-200 text-gray-400'}`}
                    >
                      <i className="fas fa-shop mr-1"></i> بائع
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase mr-1">الاسم الكامل</label>
                  <input 
                    required
                    type="text" 
                    placeholder="أدخل اسمك"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-jumia-orange outline-none transition-colors"
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase mr-1">البريد الإلكتروني</label>
              <input 
                required
                type="email" 
                placeholder="example@mail.com"
                className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-jumia-orange outline-none transition-colors"
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase mr-1">كلمة المرور</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full border-2 border-gray-100 rounded-xl p-3 focus:border-jumia-orange outline-none transition-colors"
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-jumia-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e67e17] shadow-lg shadow-jumia-orange/20 transition-all active:scale-95 mt-4"
            >
              {isLogin ? 'دخول' : 'إنشاء الحساب'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">أو عبر</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="flex items-center justify-center gap-2 border-2 border-gray-100 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                <i className="fab fa-google text-red-500"></i>
                <span className="text-sm font-bold">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 border-2 border-gray-100 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                <i className="fab fa-facebook text-blue-600"></i>
                <span className="text-sm font-bold">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
