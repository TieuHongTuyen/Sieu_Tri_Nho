'use client';

import { useState } from 'react';
import { useMemoryData } from '@/hooks/useMemoryData';
import { Plus, Trash2, Image as ImageIcon, BookOpen, Pencil, X } from 'lucide-react';
import { MemoryItem } from '@/types';

export default function LibraryPage() {
  const { items, isLoaded, addItem, updateItem, deleteItem } = useMemoryData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<MemoryItem | null>(null);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    number: '',
    imageName: '',
    action: '',
    imageUrl: ''
  });

  if (!isLoaded) return <div className="p-8 text-center text-zinc-500">Đang tải dữ liệu...</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.number || !formData.imageName || !formData.action) {
      setError('Vui lòng điền đầy đủ Số, Tên hình ảnh và Hành động.');
      return;
    }

    try {
      addItem({
        id: Date.now().toString(),
        number: formData.number.padStart(2, '0'), // Ensure at least 2 digits
        imageName: formData.imageName,
        action: formData.action,
        imageUrl: formData.imageUrl || `/images/${formData.number.padStart(2, '0')}.jpg`
      });
      
      setFormData({ number: '', imageName: '', action: '', imageUrl: '' });
      setIsAdding(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!editingItem?.number || !editingItem?.imageName || !editingItem?.action) {
      setError('Vui lòng điền đầy đủ Số, Tên hình ảnh và Hành động.');
      return;
    }

    try {
      updateItem({
        ...editingItem,
        number: editingItem.number.padStart(2, '0'),
        imageUrl: editingItem.imageUrl || `/images/${editingItem.number.padStart(2, '0')}.jpg`
      });
      setEditingItem(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Thư viện Dữ liệu</h1>
          <p className="text-zinc-500 mt-1">Quản lý {items.length} cặp số và hình ảnh</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Thêm mới
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-semibold mb-4">Thêm dữ liệu mới</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Con số</label>
              <input
                type="number"
                value={formData.number}
                onChange={(e) => setFormData({...formData, number: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="VD: 06"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Hình ảnh (Danh từ)</label>
              <input
                type="text"
                value={formData.imageName}
                onChange={(e) => setFormData({...formData, imageName: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="VD: Vỏ ốc"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Hành động (Động từ)</label>
              <input
                type="text"
                value={formData.action}
                onChange={(e) => setFormData({...formData, action: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="VD: Thổi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Đường dẫn Ảnh</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="VD: /images/01.jpg"
              />
            </div>
            <div className="flex items-end h-full pt-6">
              <button type="submit" className="w-full bg-zinc-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-zinc-800 transition-colors">
                Lưu lại
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden group">
            <div className="aspect-video w-full bg-zinc-100 relative overflow-hidden">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.imageName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-300">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-xl shadow-sm text-indigo-600">
                {item.number}
              </div>
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 shadow-sm"
                  title="Sửa"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 shadow-sm"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-zinc-900">{item.imageName}</h3>
              <p className="text-zinc-500 mt-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                {item.action}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 border-dashed">
          <BookOpen className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-900">Thư viện trống</h3>
          <p className="text-zinc-500 mt-1">Hãy thêm các con số và hình ảnh đầu tiên của bạn.</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <h2 className="text-xl font-bold text-zinc-900">Chỉnh sửa thẻ nhớ</h2>
              <button onClick={() => setEditingItem(null)} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Con số</label>
                  <input
                    type="number"
                    value={editingItem.number}
                    onChange={(e) => setEditingItem({...editingItem, number: e.target.value})}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Hình ảnh</label>
                  <input
                    type="text"
                    value={editingItem.imageName}
                    onChange={(e) => setEditingItem({...editingItem, imageName: e.target.value})}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Hành động</label>
                  <input
                    type="text"
                    value={editingItem.action}
                    onChange={(e) => setEditingItem({...editingItem, action: e.target.value})}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Đường dẫn Ảnh</label>
                  <input
                    type="text"
                    value={editingItem.imageUrl}
                    onChange={(e) => setEditingItem({...editingItem, imageUrl: e.target.value})}
                    className="w-full px-4 py-2 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="VD: /images/01.jpg"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setEditingItem(null)} className="px-5 py-2.5 rounded-xl font-medium text-zinc-600 hover:bg-zinc-100 transition-colors">
                  Hủy
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
