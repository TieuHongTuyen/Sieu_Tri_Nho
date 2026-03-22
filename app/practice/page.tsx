'use client';

import { useState, useEffect } from 'react';
import { useMemoryData } from '@/hooks/useMemoryData';
import { MemoryItem } from '@/types';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Shuffle, RotateCcw, ChevronDown } from 'lucide-react';

const RANGE_OPTIONS = [
  { label: 'Tất cả', min: 0, max: 99 },
  { label: '00–09', min: 0, max: 9 },
  { label: '10–19', min: 10, max: 19 },
  { label: '20–29', min: 20, max: 29 },
  { label: '30–39', min: 30, max: 39 },
  { label: '40–49', min: 40, max: 49 },
  { label: '50–59', min: 50, max: 59 },
  { label: '60–69', min: 60, max: 69 },
  { label: '70–79', min: 70, max: 79 },
  { label: '80–89', min: 80, max: 89 },
  { label: '90–99', min: 90, max: 99 },
];

export default function PracticePage() {
  const { items, isLoaded } = useMemoryData();
  const [selectedRange, setSelectedRange] = useState(0); // index vào RANGE_OPTIONS
  const [practiceItems, setPracticeItems] = useState<MemoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterByRange = (allItems: MemoryItem[], rangeIdx: number) => {
    const { min, max } = RANGE_OPTIONS[rangeIdx];
    return allItems.filter(item => {
      const n = parseInt(item.number);
      return n >= min && n <= max;
    });
  };

  useEffect(() => {
    if (isLoaded && items.length > 0) {
      const filtered = filterByRange(items, selectedRange);
      setPracticeItems(filtered);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [isLoaded, items, selectedRange]);

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
      const filtered = filterByRange(items, selectedRange);
      setPracticeItems(filtered);
      setCurrentIndex(0);
    }, 150);
  };

  const handleRangeSelect = (idx: number) => {
    setSelectedRange(idx);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 flex flex-col items-center overflow-x-hidden">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4 gap-3">
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

      {/* Range Selector */}
      <div className="w-full mb-6 relative">
        {/* Mobile dropdown */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 shadow-sm"
          >
            <span>Dải số: <span className="text-indigo-600 font-semibold">{RANGE_OPTIONS[selectedRange].label}</span></span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-lg z-10 overflow-hidden">
              {RANGE_OPTIONS.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRangeSelect(idx)}
                  className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                    selectedRange === idx
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop chips */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {RANGE_OPTIONS.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleRangeSelect(idx)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedRange === idx
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard */}
      {practiceItems.length === 0 ? (
        <div className="w-full text-center py-16 text-zinc-400">
          <p className="text-lg">Không có thẻ nào trong dải số này.</p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-sm md:max-w-lg perspective-1000 mx-auto mb-8 md:mb-12">
            <motion.div
              className="relative w-full aspect-[3/4] cursor-pointer preserve-3d"
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
                <div className="h-[60%] w-full relative bg-zinc-100 overflow-hidden shrink-0 border-b border-zinc-100">
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
                <div className="h-[40%] p-5 md:p-6 flex flex-col justify-center items-start text-left bg-white overflow-y-auto">
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2 w-full">{currentItem?.imageName}</h3>
                  <div className="flex flex-col gap-1.5 w-full text-sm md:text-base">
                    <p className="text-emerald-700 font-medium flex gap-2">
                      <span className="text-emerald-800/60 text-xs uppercase tracking-wider font-bold mt-1 shrink-0">Hành động:</span> 
                      <span>{currentItem?.action}</span>
                    </p>
                    <p className="text-amber-700 font-medium flex gap-2">
                      <span className="text-amber-800/60 text-xs uppercase tracking-wider font-bold mt-1 shrink-0">Vật thể:</span> 
                      <span>{currentItem?.object}</span>
                    </p>
                    {currentItem?.reason && (
                      <p className="text-zinc-500 italic mt-2 text-xs md:text-sm border-l-2 border-zinc-200 pl-3 py-0.5">
                        "{currentItem.reason}"
                      </p>
                    )}
                  </div>
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
        </>
      )}
    </div>
  );
}
