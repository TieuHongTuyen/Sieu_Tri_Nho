'use client';

import { useState, useEffect, useCallback } from 'react';
import { useMemoryData } from '@/hooks/useMemoryData';
import { useAuth } from '@/hooks/useAuth';
import { useHighscore } from '@/hooks/useHighscore';
import { MemoryItem } from '@/types';
import { Timer, Play, RotateCcw, Trophy, Medal, ChevronDown } from 'lucide-react';

type GameState = 'idle' | 'playing' | 'finished';

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

export default function GameReflexPage() {
  const { items, isLoaded } = useMemoryData();
  const { user } = useAuth();
  const { reflexHighscore, updateReflexHighscore } = useHighscore(user);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<MemoryItem | null>(null);
  const [options, setOptions] = useState<MemoryItem[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [selectedRange, setSelectedRange] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredItems = items.filter(item => {
    const n = parseInt(item.number);
    const { min, max } = RANGE_OPTIONS[selectedRange];
    return n >= min && n <= max;
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setTimeout(async () => {
        setGameState('finished');
        if (score > 0) {
          const isNew = await updateReflexHighscore(score);
          setIsNewRecord(isNew);
        }
      }, 0);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, score, updateReflexHighscore]);

  const generateQuestion = useCallback(() => {
    if (filteredItems.length < 4) return;
    const correct = filteredItems[Math.floor(Math.random() * filteredItems.length)];
    // Lấy wrong options từ tất cả items hoặc từ filtered (nếu có đủ)
    const pool = filteredItems.length >= 4 ? filteredItems : items;
    const wrongOptions = pool.filter((i: MemoryItem) => i.id !== correct.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [correct, ...wrongOptions].sort(() => 0.5 - Math.random());
    setCurrentQuestion(correct);
    setOptions(allOptions);
    setFeedback(null);
  }, [filteredItems, items]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setIsNewRecord(false);
    setGameState('playing');
    generateQuestion();
  };

  const handleAnswer = (selectedItem: MemoryItem) => {
    if (feedback !== null) return; 
    if (selectedItem.id === currentQuestion?.id) {
      setScore(prev => prev + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setTimeout(() => {
      if (gameState === 'playing') {
        generateQuestion();
      }
    }, 500);
  };

  const handleRangeSelect = (idx: number) => {
    setSelectedRange(idx);
    setIsDropdownOpen(false);
    // Nếu đang chơi thì reset về idle
    if (gameState === 'playing') {
      setGameState('idle');
    }
  };

  if (!isLoaded) return <div className="p-8 text-center text-zinc-500">Đang tải dữ liệu...</div>;

  if (items.length < 4) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Chưa đủ dữ liệu</h2>
        <p className="text-zinc-500 mb-8 text-base">Bạn cần có ít nhất 4 mục trong thư viện để chơi game phản xạ trắc nghiệm.</p>
        <a href="/library" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors inline-block min-h-[2.75rem]">
          Đến Thư viện thêm dữ liệu
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 flex flex-col items-center overflow-x-hidden">
      {/* Header */}
      <div className="w-full flex justify-between items-start mb-4 gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">Phản xạ tính giờ</h1>
          <p className="text-zinc-500 mt-0.5 text-sm md:text-base">Chọn đúng hình ảnh cho con số trong 60 giây</p>
        </div>
        
        <div className="bg-amber-50 text-amber-700 px-3 py-2 rounded-xl flex items-center gap-2 font-bold border border-amber-200 shrink-0">
          <Medal className="w-4 h-4 text-amber-500 shrink-0" />
          <div className="flex flex-col text-right leading-tight">
            <span className="text-amber-600/70 text-[10px] uppercase">Kỷ lục</span>
            <span className="text-sm">{reflexHighscore} điểm</span>
          </div>
        </div>
      </div>

      {/* Range Selector — chỉ hiện khi đang idle hoặc finished */}
      {(gameState === 'idle' || gameState === 'finished') && (
        <div className="w-full mb-6">
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

          {filteredItems.length < 4 && (
            <p className="mt-2 text-sm text-red-500">Dải số này có ít hơn 4 thẻ. Vui lòng chọn dải khác.</p>
          )}
        </div>
      )}

      {/* IDLE */}
      {gameState === 'idle' && (
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 md:p-12 w-full max-w-2xl text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-5">
            <Timer className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4">Sẵn sàng thử thách?</h2>
          <p className="text-zinc-500 mb-2 text-base leading-relaxed">Bạn sẽ có 60 giây để trả lời càng nhiều câu hỏi càng tốt.</p>
          <p className="text-zinc-400 mb-8 text-sm">
            Dải số: <span className="font-semibold text-indigo-600">{RANGE_OPTIONS[selectedRange].label}</span> 
            ({filteredItems.length} thẻ)
          </p>
          <button
            onClick={startGame}
            disabled={filteredItems.length < 4}
            className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-colors inline-flex items-center gap-2 shadow-md w-full md:w-auto min-h-[3.25rem] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" /> Bắt đầu (60s)
          </button>
        </div>
      )}

      {/* PLAYING */}
      {gameState === 'playing' && currentQuestion && (
        <div className="w-full max-w-2xl">
          {/* Score banner */}
          <div className="flex justify-between items-center mb-5 bg-white px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex items-center gap-2 md:gap-3">
              <Timer className={`w-5 h-5 md:w-6 md:h-6 ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-amber-500'}`} />
              <span className={`text-xl md:text-2xl font-mono font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-zinc-900'}`}>
                00:{timeLeft.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              {RANGE_OPTIONS[selectedRange].label}
            </div>
            <div className="text-lg md:text-xl font-bold text-zinc-900">
              Điểm: <span className="text-indigo-600">{score}</span>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8 mb-5 text-center relative overflow-hidden">
            <span className="text-zinc-400 font-medium tracking-widest uppercase mb-3 block text-sm">Con số</span>
            <h2 className="text-7xl md:text-9xl font-black text-zinc-900 tracking-tighter mb-4">{currentQuestion.number}</h2>
            {feedback === 'correct' && (
              <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-3xl md:text-4xl animate-in zoom-in duration-200">Chính xác!</span>
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
                <span className="text-red-600 font-bold text-3xl md:text-4xl animate-in zoom-in duration-200">Sai rồi!</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
                className="bg-white border-2 border-zinc-200 rounded-2xl p-4 md:p-5 text-left hover:border-indigo-500 hover:bg-indigo-50 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed group min-h-[4.5rem] flex flex-col gap-1"
              >
                <div className="font-bold text-base md:text-xl text-zinc-900 group-hover:text-indigo-700">{option.imageName}</div>
                <div className="text-zinc-500 text-sm md:text-base flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{option.action}</div>
                <div className="text-zinc-500 text-sm md:text-base flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>{option.object}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FINISHED */}
      {gameState === 'finished' && (
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 md:p-12 w-full max-w-2xl text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5">
            <Trophy className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">Hết giờ!</h2>
          <p className="text-zinc-500 mb-5 text-base">Bạn đã phản xạ đúng:</p>
          
          <div className="text-6xl md:text-7xl font-black text-indigo-600 mb-4">
            {score} <span className="text-xl md:text-2xl text-zinc-400 font-medium">câu</span>
          </div>

          {isNewRecord && (
            <div className="bg-amber-100 text-amber-700 py-2 px-6 rounded-full inline-flex items-center gap-2 font-bold text-base md:text-lg mb-6 animate-bounce">
              <Medal className="w-5 h-5" /> Kỷ Lục Mới! Quá Đỉnh!
            </div>
          )}
          {!isNewRecord && (
            <div className="text-zinc-400 mb-6 mt-1 text-sm md:text-base">Kỷ lục hiện tại của bạn: {reflexHighscore}</div>
          )}
          {!user && (
            <div className="text-sm text-red-500 mb-6 italic">Hãy Đăng nhập Google để lưu giữ các kỷ lục cá nhân lên hệ thống nhé.</div>
          )}

          <div className="flex justify-center w-full">
            <button onClick={startGame} className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-colors inline-flex items-center gap-2 shadow-md w-full md:w-auto min-h-[3.25rem]">
              <RotateCcw className="w-5 h-5" /> Chơi lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
