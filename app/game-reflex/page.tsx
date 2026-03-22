'use client';

import { useState, useEffect, useCallback } from 'react';
import { useMemoryData } from '@/hooks/useMemoryData';
import { useAuth } from '@/hooks/useAuth';
import { useHighscore } from '@/hooks/useHighscore';
import { MemoryItem } from '@/types';
import { Timer, Play, RotateCcw, Trophy, Medal } from 'lucide-react';

type GameState = 'idle' | 'playing' | 'finished';

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      // Game Over, wait a bit before showing result
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
    if (items.length < 4) return;
    const correct = items[Math.floor(Math.random() * items.length)];
    const wrongOptions = items.filter(i => i.id !== correct.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [correct, ...wrongOptions].sort(() => 0.5 - Math.random());
    setCurrentQuestion(correct);
    setOptions(allOptions);
    setFeedback(null);
  }, [items]);

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

  if (!isLoaded) return <div className="p-8 text-center text-zinc-500">Đang tải dữ liệu...</div>;

  if (items.length < 4) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center w-full">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Chưa đủ dữ liệu</h2>
        <p className="text-zinc-500 mb-8">Bạn cần có ít nhất 4 mục trong thư viện để chơi game phản xạ trắc nghiệm.</p>
        <a href="/library" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">Đến Thư viện thêm dữ liệu</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Phản xạ tính giờ</h1>
          <p className="text-zinc-500 mt-1">Chọn đúng hình ảnh cho con số trong 60 giây</p>
        </div>
        
        {/* Điểm kỷ lục Display */}
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold border border-amber-200">
          <Medal className="w-5 h-5 text-amber-500" />
          <div className="flex flex-col text-sm text-right leading-tight">
            <span className="text-amber-600/70 text-[10px] uppercase">Kỷ lục cá nhân</span>
            <span>{reflexHighscore} điểm</span>
          </div>
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-12 w-full max-w-2xl text-center">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Timer className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">Sẵn sàng thử thách?</h2>
          <p className="text-zinc-500 mb-8">Bạn sẽ có 60 giây để trả lời càng nhiều câu hỏi càng tốt. Hãy nhìn con số và chọn hình ảnh/hành động tương ứng.</p>
          <button onClick={startGame} className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-colors inline-flex items-center gap-2 shadow-md">
            <Play className="w-5 h-5" /> Bắt đầu (60s)
          </button>
        </div>
      )}

      {gameState === 'playing' && currentQuestion && (
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-center mb-8 bg-white px-6 py-4 rounded-2xl shadow-sm border border-zinc-200">
            <div className="flex items-center gap-3">
              <Timer className={`w-6 h-6 ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-amber-500'}`} />
              <span className={`text-2xl font-mono font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-zinc-900'}`}>
                00:{timeLeft.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-xl font-bold text-zinc-900">
              Điểm: <span className="text-indigo-600">{score}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 mb-8 text-center relative overflow-hidden">
            <span className="text-zinc-400 font-medium tracking-widest uppercase mb-4 block">Con số</span>
            <h2 className="text-8xl sm:text-9xl font-black text-zinc-900 tracking-tighter mb-4">{currentQuestion.number}</h2>
            {feedback === 'correct' && (
              <div className="absolute inset-0 bg-emerald-500/10 flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-4xl animate-in zoom-in duration-200">Chính xác!</span>
              </div>
            )}
            {feedback === 'incorrect' && (
              <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
                <span className="text-red-600 font-bold text-4xl animate-in zoom-in duration-200">Sai rồi!</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
                className="bg-white border-2 border-zinc-200 rounded-2xl p-5 text-left hover:border-indigo-500 hover:bg-indigo-50 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="font-bold text-lg md:text-xl text-zinc-900 group-hover:text-indigo-700">{option.imageName}</div>
                <div className="text-zinc-500 text-sm md:text-base mt-1">{option.action}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-12 w-full max-w-2xl text-center animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <Trophy className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Hết giờ!</h2>
          <p className="text-zinc-500 mb-6">Bạn đã phản xạ đúng:</p>
          
          <div className="text-7xl font-black text-indigo-600 mb-4">
            {score} <span className="text-2xl text-zinc-400 font-medium">câu</span>
          </div>

          {isNewRecord && (
            <div className="bg-amber-100 text-amber-700 py-2 px-6 rounded-full inline-block font-bold text-lg mb-8 animate-bounce flex items-center gap-2">
              <Medal className="w-5 h-5" /> Kỷ Lục Mới! Quá Đỉnh!
            </div>
          )}
          {!isNewRecord && (
            <div className="text-zinc-400 mb-8 mt-2">Kỷ lục hiện tại của bạn: {reflexHighscore}</div>
          )}
          {!user && (
            <div className="text-sm text-red-500 mb-6 italic">Hãy Đăng nhập Google ở góc phải để lưu giữ các kỷ lục cá nhân lên hệ thống máy chủ nhé.</div>
          )}

          <div className="flex justify-center w-full">
             <button onClick={startGame} className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-colors inline-flex items-center gap-2 shadow-md">
               <RotateCcw className="w-5 h-5" /> Chơi lại
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
