
import React, { useState } from 'react';
import { Product, Vendor, Category } from '../types';
import { CATEGORIES } from '../constants';

interface VendorDashboardProps {
  vendor: Vendor;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ vendor, products, onAddProduct, onDeleteProduct }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProd, setNewProd] = useState({ name: '', price: '', category: CATEGORIES[0].name, description: '' });

  const vendorProducts = products.filter(p => p.vendorId === vendor.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `p-${Date.now()}`,
      name: newProd.name,
      price: Number(newProd.price),
      image: `https://picsum.photos/400/400?random=${Math.random()}`,
      category: newProd.category,
      rating: 0,
      reviewsCount: 0,
      vendorId: vendor.id,
      vendorName: vendor.name,
      description: newProd.description
    };
    onAddProduct(product);
    setShowAddForm(false);
    setNewProd({ name: '', price: '', category: CATEGORIES[0].name, description: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Info */}
        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col items-center text-center mb-6">
              <img src={vendor.logo} className="w-24 h-24 rounded-full mb-4 border-4 border-jumia-orange/20" alt={vendor.name} />
              <h2 className="text-xl font-bold">{vendor.name}</h2>
              <p className="text-gray-500 text-sm">بائع منذ {vendor.joinedDate}</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                <span className="text-gray-500">إجمالي المبيعات</span>
                <span className="font-bold">{vendor.totalSales}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg flex justify-between">
                <span className="text-gray-500">التقييم</span>
                <span className="font-bold text-yellow-500">{vendor.rating} ★</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="md:w-3/4 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">إدارة المنتجات ({vendorProducts.length})</h1>
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-jumia-orange text-white px-6 py-2 rounded-lg font-bold hover:bg-[#e67e17] shadow-lg transition-all active:scale-95"
            >
              إضافة منتج جديد
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white p-6 rounded-xl shadow-xl border-2 border-jumia-orange/20 animate-in fade-in zoom-in duration-200">
              <h3 className="font-bold text-lg mb-4">تفاصيل المنتج الجديد</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">اسم المنتج</label>
                  <input required value={newProd.name} onChange={e => setNewProd({...newProd, name: e.target.value})} type="text" className="w-full border rounded-lg p-2 focus:ring-2 ring-jumia-orange outline-none" placeholder="مثلاً: هاتف ذكي جديد" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">السعر (درهم)</label>
                  <input required value={newProd.price} onChange={e => setNewProd({...newProd, price: e.target.value})} type="number" className="w-full border rounded-lg p-2 focus:ring-2 ring-jumia-orange outline-none" placeholder="0.00" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">الفئة</label>
                  <select value={newProd.category} onChange={e => setNewProd({...newProd, category: e.target.value})} className="w-full border rounded-lg p-2 outline-none">
                    {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">الوصف</label>
                  <textarea required value={newProd.description} onChange={e => setNewProd({...newProd, description: e.target.value})} className="w-full border rounded-lg p-2 h-24 outline-none" placeholder="اكتب تفاصيل المنتج هنا..."></textarea>
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 text-gray-500 font-bold">إلغاء</button>
                  <button type="submit" className="bg-black text-white px-8 py-2 rounded-lg font-bold">حفظ المنتج</button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-sm font-bold text-gray-500">المنتج</th>
                  <th className="p-4 text-sm font-bold text-gray-500">الفئة</th>
                  <th className="p-4 text-sm font-bold text-gray-500">السعر</th>
                  <th className="p-4 text-sm font-bold text-gray-500">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {vendorProducts.map(p => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.image} className="w-12 h-12 rounded object-cover border" alt={p.name} />
                      <span className="text-sm font-medium">{p.name}</span>
                    </td>
                    <td className="p-4 text-sm">{p.category}</td>
                    <td className="p-4 text-sm font-bold">{p.price} درهم</td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <button className="text-blue-500 hover:text-blue-700"><i className="fas fa-edit"></i></button>
                        <button onClick={() => onDeleteProduct(p.id)} className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {vendorProducts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-400">
                      <i className="fas fa-box-open text-4xl mb-4 block"></i>
                      لا توجد منتجات معروضة حالياً
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
