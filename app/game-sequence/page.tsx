'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useHighscore } from '@/hooks/useHighscore';
import { Brain, CheckCircle, XCircle, RotateCcw, Eye, EyeOff, Medal, Timer } from 'lucide-react';

type GameState = 'setup' | 'memorize' | 'recall' | 'result';

export default function GameSequencePage() {
  const { user } = useAuth();
  const { sequenceHighscore, updateSequenceHighscore } = useHighscore(user);

  const [gameState, setGameState] = useState<GameState>('setup');
  
  // Custom Settings
  const [pairCount, setPairCount] = useState(10); 
  const [memTime, setMemTime] = useState(60); 
  const [recallTime, setRecallTime] = useState(60); 
  
  // Core Data
  const [sequence, setSequence] = useState<string[]>([]); 
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const generateSequence = () => {
    const count = Math.max(1, pairCount);
    const newSeq = [];
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 100).toString().padStart(2, '0');
      newSeq.push(num);
    }
    setSequence(newSeq);
    setUserInputs(Array(count).fill(''));
    setGameState('memorize');
    setIsNewRecord(false);
    setTimeLeft(memTime > 0 ? memTime : null);
  };

  const startRecall = useCallback(() => {
    setGameState('recall');
    setTimeLeft(recallTime > 0 ? recallTime : null);
  }, [recallTime]);

  const checkResult = useCallback(async () => {
    let correctCount = 0;
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] === userInputs[i]) {
        correctCount++;
      }
    }
    setScore(correctCount);
    setGameState('result');
    setTimeLeft(null);
    // Save to Cloud if score > 0 and beats record
    if (correctCount > 0) {
      const isNew = await updateSequenceHighscore(correctCount);
      setIsNewRecord(isNew);
    }
  }, [sequence, userInputs, updateSequenceHighscore]);

  // Master Timer Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if ((gameState === 'memorize' || gameState === 'recall') && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timeLeft === 0) {
      setTimeLeft(null); // Prevent infinite loop
      if (gameState === 'memorize') {
        startRecall();
      } else if (gameState === 'recall') {
        checkResult();
      }
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, startRecall, checkResult]);

  const handleInputChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '').slice(0, 2);
    const newInputs = [...userInputs];
    newInputs[index] = cleanValue;
    setUserInputs(newInputs);

    // Auto focus next input
    if (cleanValue.length === 2 && index < pairCount - 1) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Nhớ dãy số dài</h1>
          <p className="text-zinc-500 mt-1">Sử dụng phương pháp mã hóa để ghi nhớ các con số ngẫu nhiên</p>
        </div>
        
        <div className="bg-rose-50 text-rose-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold border border-rose-200">
          <Medal className="w-5 h-5 text-rose-500" />
          <div className="flex flex-col text-sm text-right leading-tight">
            <span className="text-rose-600/70 text-[10px] uppercase">Kỷ lục của bạn</span>
            <span>{sequenceHighscore} cặp</span>
          </div>
        </div>
      </div>

      {gameState === 'setup' && (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 sm:p-12 w-full max-w-2xl text-center">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Cài đặt thử thách</h2>
          
          {/* Mốc Thi Đấu Tiêu Chuẩn */}
          <div className="mb-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Các Mốc Thi Đấu Tiêu Chuẩn</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => { setPairCount(20); setMemTime(60); setRecallTime(120); }}
                className="bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-amber-700 py-3 px-4 rounded-xl flex flex-col items-center transition-all active:scale-95 shadow-sm"
              >
                <span className="font-bold text-lg mb-1">Khởi Động</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600/70">20 Cặp • 1m / 2m</span>
              </button>
              
              <button 
                onClick={() => { setPairCount(50); setMemTime(300); setRecallTime(600); }}
                className="bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-700 py-3 px-4 rounded-xl flex flex-col items-center transition-all active:scale-95 shadow-sm"
              >
                <span className="font-bold text-lg mb-1">Thi Đấu</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600/70">50 Cặp • 5m / 10m</span>
              </button>
              
              <button 
                onClick={() => { setPairCount(200); setMemTime(300); setRecallTime(900); }}
                className="bg-white border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-700 py-3 px-4 rounded-xl flex flex-col items-center transition-all active:scale-95 shadow-sm"
              >
                <span className="font-bold text-lg mb-1">Siêu Trí Tuệ</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600/70">200 Cặp • 5m / 15m</span>
              </button>
            </div>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-zinc-500 font-bold uppercase tracking-widest text-[11px]">Hoặc Tùy Chỉnh Tự Do</span></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 text-left">
            <div>
              <label className="block text-[13px] font-bold uppercase tracking-wide text-zinc-500 mb-2">Số lượng Cặp</label>
              <input 
                type="number" min="1" max="500"
                value={pairCount}
                onChange={(e) => setPairCount(Math.max(1, Number(e.target.value)))}
                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-xl text-center font-black text-zinc-800 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold uppercase tracking-wide text-zinc-500 mb-2">Giây Ghi Nhớ</label>
              <input 
                type="number" min="0" max="3600"
                value={memTime}
                onChange={(e) => setMemTime(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-xl text-center font-black text-zinc-800 transition-colors"
                placeholder="0 = Vô cực"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold uppercase tracking-wide text-zinc-500 mb-2">Giây Hồi Tưởng</label>
              <input 
                type="number" min="0" max="3600"
                value={recallTime}
                onChange={(e) => setRecallTime(Math.max(0, Number(e.target.value)))}
                className="w-full px-4 py-3 border-2 border-zinc-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-xl text-center font-black text-zinc-800 transition-colors"
                placeholder="0 = Vô cực"
              />
            </div>
          </div>
          <div className="text-sm text-zinc-500 mb-10 italic">Lưu ý: Để "0" ở phần thời gian nếu bạn muốn suy nghĩ vô cực không giới hạn.</div>

          <button onClick={generateSequence} className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all active:scale-95 w-full sm:w-auto shadow-md">
            Tạo dãy số & Bắt đầu
          </button>
        </div>
      )}

      {gameState === 'memorize' && (
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 mb-8 relative">
            
            {/* Timer Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 border-b border-zinc-100 pb-6 gap-4">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-rose-500" /> Giai đoạn Ghi nhớ
              </h2>
              
              <div className="flex items-center gap-4">
                <span className="bg-rose-100 text-rose-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">{sequence.length * 2} chữ số</span>
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-mono font-bold text-xl min-w-[120px] justify-center shadow-sm border ${timeLeft !== null && timeLeft <= 10 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-zinc-50 text-zinc-700 border-zinc-200'}`}>
                  <Timer className={`w-5 h-5 ${timeLeft !== null && timeLeft <= 10 ? 'text-red-500' : 'text-zinc-400'}`} />
                  {timeLeft !== null ? formatTime(timeLeft) : 'Vô Cực'}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center text-center">
              {sequence.map((num, idx) => (
                <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 w-16 sm:w-20 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="text-[10px] sm:text-xs text-zinc-400 mb-1 font-mono uppercase font-bold">#{idx + 1}</div>
                  <div className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tighter">{num}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button onClick={startRecall} className="bg-rose-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-rose-700 transition-all active:scale-95 shadow-md shadow-rose-600/20">
              Tôi đã nhớ xong! Bắt đầu điền (Nộp bài sớm)
            </button>
          </div>
        </div>
      )}

      {gameState === 'recall' && (
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 mb-8">
            
            {/* Timer Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 border-b border-zinc-100 pb-6 gap-4">
              <div className="flex flex-col items-center sm:items-start">
                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <EyeOff className="w-5 h-5 text-indigo-500" /> Giai đoạn Hồi tưởng
                </h2>
                <span className="text-zinc-500 text-sm mt-1">Hãy điền lại các cặp số theo đúng thứ tự bạn đã nhớ</span>
              </div>
              
              <div className={`px-4 py-2 rounded-xl flex items-center gap-2 font-mono font-bold text-xl min-w-[120px] justify-center shadow-sm border ${timeLeft !== null && timeLeft <= 10 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-zinc-50 text-zinc-700 border-zinc-200'}`}>
                <Timer className={`w-5 h-5 ${timeLeft !== null && timeLeft <= 10 ? 'text-red-500' : 'text-zinc-400'}`} />
                {timeLeft !== null ? formatTime(timeLeft) : 'Vô Cực'}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center text-center">
              {userInputs.map((input, idx) => (
                <div key={idx} className="flex flex-col items-center relative group">
                  <div className="text-[10px] text-zinc-400 mb-1 font-mono uppercase font-bold absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity">#{idx + 1}</div>
                  <input
                    id={`input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={input}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl sm:text-3xl font-black text-zinc-900 bg-white border-2 border-zinc-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all shadow-sm"
                    placeholder="--"
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button onClick={checkResult} className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all active:scale-95 shadow-md">
              Chấm điểm ngay (Nộp bài sớm)
            </button>
          </div>
        </div>
      )}

      {gameState === 'result' && (
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 sm:p-12 mb-8 text-center animate-in zoom-in-95 duration-500">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">Kết quả của bạn</h2>
            
            <div className="text-6xl sm:text-7xl font-black text-rose-600 mb-4 tracking-tighter">
              {score} <span className="text-3xl text-zinc-300 font-bold">/ {sequence.length}</span>
              <div className="text-lg text-zinc-500 font-medium mt-2 tracking-normal">cặp số chính xác</div>
            </div>

            {isNewRecord && (
              <div className="bg-amber-100 text-amber-700 py-3 px-8 rounded-full inline-block font-black text-lg mb-8 animate-bounce flex items-center justify-center gap-2 max-w-max mx-auto shadow-sm shadow-amber-200/50">
                <Medal className="w-6 h-6" /> Kỷ Lục Đỉnh Phong Mới!
              </div>
            )}
            {!user && (
              <div className="text-sm text-red-500 mb-6 italic hover:underline cursor-pointer">Hãy Đăng nhập để lưu mốc kỉ lục này vào bảng xếp hạng cá nhân vĩnh viễn nhé!</div>
            )}

            <div className="flex flex-wrap gap-3 justify-center text-center mt-10 pt-8 border-t border-zinc-100">
              {sequence.map((correctNum, idx) => {
                const userNum = userInputs[idx];
                const isCorrect = correctNum === userNum;
                return (
                  <div key={idx} className={`border-2 rounded-xl p-3 sm:p-4 w-16 sm:w-20 relative transition-transform hover:-translate-y-1 shadow-sm ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="text-[10px] text-zinc-500 mb-1 font-mono uppercase font-bold">#{idx + 1}</div>
                    <div className={`text-xl sm:text-2xl font-black tracking-tighter ${isCorrect ? 'text-emerald-700' : 'text-red-700 line-through opacity-50'}`}>{userNum || '--'}</div>
                    {!isCorrect && <div className="text-lg sm:text-xl font-black text-emerald-600 mt-1 tracking-tighter">{correctNum}</div>}
                    <div className="absolute -top-3 -right-3 bg-white rounded-full shadow-sm">
                      {isCorrect ? <CheckCircle className="w-6 h-6 text-emerald-500 bg-white rounded-full" /> : <XCircle className="w-6 h-6 text-red-500 bg-white rounded-full" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-center">
            <button onClick={() => setGameState('setup')} className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all active:scale-95 inline-flex items-center justify-center gap-3 shadow-md w-full sm:w-auto">
              <RotateCcw className="w-6 h-6" /> Chơi ván mới
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
