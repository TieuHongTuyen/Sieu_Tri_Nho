'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMemoryData } from '@/hooks/useMemoryData';
import { Plus, Trash2, Image as ImageIcon, BookOpen, Pencil, X } from 'lucide-react';
import { MemoryItem } from '@/types';
import PAOGuide from '@/components/PAOGuide';

export default function LibraryPage() {
  const { user } = useAuth();
  const { items, isLoaded, addItem, updateItem, deleteItem, seedToFirestore } = useMemoryData();
  const [activeTab, setActiveTab] = useState<'library' | 'pao'>('library');
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<MemoryItem | null>(null);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    number: '',
    imageName: '',
    action: '',
    object: '',
    reason: '',
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
        number: formData.number.padStart(2, '0'),
        imageName: formData.imageName,
        action: formData.action,
        object: formData.object,
        reason: formData.reason,
        imageUrl: formData.imageUrl || `/images/${formData.number.padStart(2, '0')}.jpg`
      });
      
      setFormData({ number: '', imageName: '', action: '', object: '', reason: '', imageUrl: '' });
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 overflow-x-hidden">
      {/* Tab Switcher */}
      <div className="flex gap-1 bg-zinc-100 p-1 rounded-2xl mb-6 w-full">
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[2.75rem] ${
            activeTab === 'library'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          📚 Thư viện ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('pao')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[2.75rem] ${
            activeTab === 'pao'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          🧠 Bộ quy tắc PAO
        </button>
      </div>

      {/* Tab: PAO Guide */}
      {activeTab === 'pao' && <PAOGuide />}

      {/* Tab: Library */}
      {activeTab === 'library' && <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 md:mb-8 gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">Thư viện Dữ liệu</h1>
          <p className="text-zinc-500 mt-0.5 text-sm md:text-base">Quản lý {items.length} cặp số và hình ảnh</p>
        </div>
        {user?.email === 'tieuhongtuyen@gmail.com' && (
        <div className="flex gap-2">
          <button
            onClick={async () => {
              if (confirm('Thao tác này sẽ đẩy 100 bản ghi lên Firestore. Đảm bảo Firestore rules cho phép. Tiếp tục?')) {
                await seedToFirestore();
              }
            }}
            className="bg-amber-500 text-white px-4 py-3 rounded-xl font-medium hover:bg-amber-600 transition-colors flex items-center shadow-sm min-h-[2.75rem] shrink-0"
          >
            <span className="hidden sm:inline">Đồng bộ (Seed 1 lân)</span>
            <span className="sm:hidden">Seed</span>
          </button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm min-h-[2.75rem] shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Thêm mới</span>
          </button>
        </div>
        )}
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-zinc-200 mb-6 md:mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-semibold mb-4">Thêm dữ liệu mới</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Con số</label>
                <input
                  type="number"
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  className="w-full px-3 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                  placeholder="VD: 06"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Hình ảnh</label>
                <input
                  type="text"
                  value={formData.imageName}
                  onChange={(e) => setFormData({...formData, imageName: e.target.value})}
                  className="w-full px-3 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                  placeholder="VD: Vỏ ốc"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Hành động (Động từ)</label>
              <input
                type="text"
                value={formData.action}
                onChange={(e) => setFormData({...formData, action: e.target.value})}
                className="w-full px-3 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                placeholder="VD: Thổi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Vật thể</label>
              <input
                type="text"
                value={formData.object}
                onChange={(e) => setFormData({...formData, object: e.target.value})}
                className="w-full px-3 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                placeholder="VD: Cây gậy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Lý do khớp hình</label>
              <input
                type="text"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full px-3 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                placeholder="VD: Gậy giống số 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Đường dẫn Ảnh</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-3 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                placeholder="VD: /images/01.jpg"
              />
            </div>
            <button type="submit" className="w-full bg-zinc-900 text-white px-4 py-3 rounded-xl font-medium hover:bg-zinc-800 transition-colors min-h-[2.75rem]">
              Lưu lại
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden group flex flex-col">
            <div className="w-full bg-zinc-100 relative overflow-hidden shrink-0 border-b border-zinc-100 aspect-[5/4]">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.imageName} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-300">
                  <ImageIcon className="w-10 h-10" />
                </div>
              )}
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg font-bold text-sm md:text-base shadow-sm text-indigo-600">
                {item.number}
              </div>
              {/* Edit/Delete buttons */}
              {user?.email === 'tieuhongtuyen@gmail.com' && (
              <div className="absolute top-2 right-2 flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="bg-indigo-500 text-white p-1.5 md:p-2 rounded-lg hover:bg-indigo-600 shadow-sm min-h-[2.25rem] min-w-[2.25rem] md:min-h-[2.5rem] md:min-w-[2.5rem] flex items-center justify-center"
                  title="Sửa"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white p-1.5 md:p-2 rounded-lg hover:bg-red-600 shadow-sm min-h-[2.25rem] min-w-[2.25rem] md:min-h-[2.5rem] md:min-w-[2.5rem] flex items-center justify-center"
                  title="Xóa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              )}
            </div>
            <div className="p-3 md:p-4 flex flex-col justify-start items-start text-left bg-white">
              <h3 className="font-bold text-sm md:text-base text-zinc-900 leading-tight w-full mb-1.5">{item.imageName}</h3>
              <div className="flex flex-col gap-1 w-full text-xs sm:text-sm leading-snug">
                <p className="text-emerald-700 font-medium flex gap-1.5 items-start">
                  <span className="text-emerald-800/60 uppercase tracking-wider font-bold shrink-0 text-[10px] mt-[1px]">HĐ:</span>
                  <span>{item.action}</span>
                </p>
                <p className="text-amber-700 font-medium flex gap-1.5 items-start">
                  <span className="text-amber-800/60 uppercase tracking-wider font-bold shrink-0 text-[10px] mt-[1px]">VT:</span>
                  <span>{item.object}</span>
                </p>
                {item.reason && (
                  <p className="text-zinc-500 italic mt-1 border-l-2 border-zinc-200 pl-2 py-0.5 text-[11px] sm:text-xs leading-snug">
                    &ldquo;{item.reason}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-16 md:py-20 bg-white rounded-3xl border border-zinc-200 border-dashed">
          <BookOpen className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-900">Thư viện trống</h3>
          <p className="text-zinc-500 mt-1 text-sm md:text-base">Hãy thêm các con số và hình ảnh đầu tiên của bạn.</p>
        </div>
      )}

      </> /* end library tab */}

      {/* Edit Modal — ngoài tab để luôn render được */}
      {editingItem && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-xl w-full md:max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-5 md:p-6 border-b border-zinc-100">
              <h2 className="text-xl font-bold text-zinc-900">Chỉnh sửa thẻ nhớ</h2>
              <button onClick={() => setEditingItem(null)} className="text-zinc-400 hover:text-zinc-600 transition-colors p-2 min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Con số</label>
                  <input
                    type="number"
                    value={editingItem.number}
                    onChange={(e) => setEditingItem({...editingItem, number: e.target.value})}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Hình ảnh</label>
                  <input
                    type="text"
                    value={editingItem.imageName}
                    onChange={(e) => setEditingItem({...editingItem, imageName: e.target.value})}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Hành động</label>
                  <input
                    type="text"
                    value={editingItem.action}
                    onChange={(e) => setEditingItem({...editingItem, action: e.target.value})}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Vật thể</label>
                  <input
                    type="text"
                    value={editingItem.object}
                    onChange={(e) => setEditingItem({...editingItem, object: e.target.value})}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Lý do khớp hình</label>
                  <input
                    type="text"
                    value={editingItem.reason}
                    onChange={(e) => setEditingItem({...editingItem, reason: e.target.value})}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Đường dẫn Ảnh</label>
                  <input
                    type="text"
                    value={editingItem.imageUrl}
                    onChange={(e) => setEditingItem({...editingItem, imageUrl: e.target.value})}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-base"
                    placeholder="VD: /images/01.jpg"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setEditingItem(null)} className="flex-1 py-3 rounded-xl font-medium text-zinc-600 hover:bg-zinc-100 transition-colors min-h-[2.75rem]">
                  Hủy
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm min-h-[2.75rem]">
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
