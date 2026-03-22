'use client';

import { useState, useEffect } from 'react';
import { useMemoryData } from '@/hooks/useMemoryData';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Shuffle, RotateCcw } from 'lucide-react';

export default function PracticePage() {
  const { items, isLoaded } = useMemoryData();
  const [practiceItems, setPracticeItems] = useState([...items]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isLoaded && items.length > 0) {
      setTimeout(() => {
        setPracticeItems([...items]);
      }, 0);
    }
  }, [isLoaded, items]);

  if (!isLoaded) return <div className="p-8 text-center text-zinc-500">Đang tải dữ liệu...</div>;

  if (items.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Chưa có dữ liệu để luyện tập</h2>
        <p className="text-zinc-500 mb-8 text-base">Vui lòng thêm dữ liệu vào thư viện trước khi bắt đầu.</p>
        <a href="/library" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors inline-block min-h-[2.75rem]">
          Đến Thư viện
        </a>
      </div>
    );
  }

  const currentItem = practiceItems[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % practiceItems.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + practiceItems.length) % practiceItems.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...practiceItems].sort(() => Math.random() - 0.5);
      setPracticeItems(shuffled);
      setCurrentIndex(0);
    }, 150);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const sorted = [...items].sort((a, b) => parseInt(a.number) - parseInt(b.number));
      setPracticeItems(sorted);
      setCurrentIndex(0);
    }, 150);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 flex flex-col items-center overflow-x-hidden">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6 md:mb-8 gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">Luyện tập Flashcard</h1>
          <p className="text-zinc-500 mt-0.5 text-sm md:text-base">
            Thẻ {currentIndex + 1} / {practiceItems.length}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="p-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-colors min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center"
            title="Sắp xếp theo thứ tự"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={handleShuffle}
            className="p-3 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors min-h-[2.75rem] min-w-[2.75rem] flex items-center justify-center"
            title="Trộn ngẫu nhiên"
          >
            <Shuffle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Flashcard */}
      <div className="w-full max-w-sm md:max-w-lg perspective-1000 mx-auto mb-8 md:mb-12">
        <motion.div
          className="relative w-full aspect-[3/4] sm:aspect-square cursor-pointer preserve-3d"
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Front (Number) */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border border-zinc-100 flex flex-col items-center justify-center p-6 md:p-8">
            <span className="text-zinc-400 font-medium tracking-widest uppercase mb-6 text-sm">Mặt trước</span>
            <h2 className="text-8xl md:text-[10rem] font-black text-zinc-900 tracking-tighter">
              {currentItem?.number}
            </h2>
            <p className="absolute bottom-6 text-zinc-400 text-sm">Chạm để lật thẻ</p>
          </div>

          {/* Back (Image & Action) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-3xl shadow-xl border border-zinc-100 overflow-hidden flex flex-col">
            <div className="h-3/5 w-full relative bg-zinc-100 overflow-hidden">
              {currentItem?.imageUrl && (
                <img 
                  src={currentItem.imageUrl} 
                  alt={currentItem.imageName}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl font-bold text-xl shadow-sm text-indigo-600">
                {currentItem?.number}
              </div>
            </div>
            <div className="h-2/5 p-5 md:p-8 flex flex-col justify-center items-center text-center bg-white">
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">{currentItem?.imageName}</h3>
              <p className="text-lg md:text-xl text-emerald-600 font-medium">
                Hành động: {currentItem?.action}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 w-full max-w-sm mx-auto">
        <button
          onClick={handlePrev}
          className="w-14 h-14 shrink-0 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex-1 py-4 rounded-2xl bg-zinc-900 text-white font-semibold shadow-md hover:bg-zinc-800 transition-colors active:scale-95 min-h-[3.25rem]"
        >
          {isFlipped ? 'Xem lại số' : 'Xem đáp án'}
        </button>

        <button
          onClick={handleNext}
          className="w-14 h-14 shrink-0 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all active:scale-95"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
