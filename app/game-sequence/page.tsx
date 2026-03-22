'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useHighscore } from '@/hooks/useHighscore';
import { Brain, CheckCircle, XCircle, RotateCcw, Eye, EyeOff, Medal } from 'lucide-react';

type GameState = 'setup' | 'memorize' | 'recall' | 'result';

export default function GameSequencePage() {
  const { user } = useAuth();
  const { sequenceHighscore, updateSequenceHighscore } = useHighscore(user);

  const [gameState, setGameState] = useState<GameState>('setup');
  const [pairCount, setPairCount] = useState(10); 
  const [sequence, setSequence] = useState<string[]>([]); 
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const generateSequence = () => {
    const newSeq = [];
    for (let i = 0; i < pairCount; i++) {
      const num = Math.floor(Math.random() * 100).toString().padStart(2, '0');
      newSeq.push(num);
    }
    setSequence(newSeq);
    setUserInputs(Array(pairCount).fill(''));
    setGameState('memorize');
    setIsNewRecord(false);
  };

  const startRecall = () => {
    setGameState('recall');
  };

  const checkResult = async () => {
    let correctCount = 0;
    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i] === userInputs[i]) {
        correctCount++;
      }
    }
    setScore(correctCount);
    setGameState('result');
    // Save to Cloud if perfect or beat record
    if (correctCount > 0) {
      const isNew = await updateSequenceHighscore(correctCount);
      setIsNewRecord(isNew);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '').slice(0, 2);
    const newInputs = [...userInputs];
    newInputs[index] = cleanValue;
    setUserInputs(newInputs);

    if (cleanValue.length === 2 && index < pairCount - 1) {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Nhớ dãy số dài</h1>
          <p className="text-zinc-500 mt-1">Sử dụng phương pháp mã hóa để ghi nhớ các con số ngẫu nhiên</p>
        </div>
        
        {/* Điểm kỷ lục Display */}
        <div className="bg-rose-50 text-rose-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold border border-rose-200">
          <Medal className="w-5 h-5 text-rose-500" />
          <div className="flex flex-col text-sm text-right leading-tight">
            <span className="text-rose-600/70 text-[10px] uppercase">Kỷ lục nhớ đúng</span>
            <span>{sequenceHighscore} cặp số</span>
          </div>
        </div>
      </div>

      {gameState === 'setup' && (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-12 w-full max-w-2xl text-center">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Cài đặt thử thách</h2>
          <div className="max-w-xs mx-auto mb-8 text-left">
            <label className="block text-sm font-medium text-zinc-700 mb-2">Số lượng cặp số (2 chữ số)</label>
            <select 
              value={pairCount}
              onChange={(e) => setPairCount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-lg"
            >
              <option value={10}>10 cặp (20 chữ số)</option>
              <option value={20}>20 cặp (40 chữ số)</option>
              <option value={40}>40 cặp (80 chữ số)</option>
              <option value={50}>50 cặp (100 chữ số)</option>
            </select>
          </div>
          <button onClick={generateSequence} className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-colors w-full sm:w-auto shadow-md">
            Tạo dãy số & Bắt đầu
          </button>
        </div>
      )}

      {gameState === 'memorize' && (
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 mb-8">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-rose-500" /> Giai đoạn Ghi nhớ
              </h2>
              <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-bold">{sequence.length * 2} chữ số</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center text-center">
              {sequence.map((num, idx) => (
                <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 w-16 shadow-sm">
                  <div className="text-xs text-zinc-400 mb-1 font-mono">{idx + 1}</div>
                  <div className="text-2xl font-black text-zinc-900 tracking-widest">{num}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button onClick={startRecall} className="bg-rose-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-rose-700 transition-colors shadow-md">Đã nhớ xong! Bắt đầu điền</button>
          </div>
        </div>
      )}

      {gameState === 'recall' && (
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 mb-8">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-indigo-500" /> Giai đoạn Hồi tưởng
              </h2>
              <span className="text-zinc-500 text-sm">Hãy điền lại các cặp số theo đúng thứ tự</span>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center text-center">
              {userInputs.map((input, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs text-zinc-400 mb-1 font-mono">{idx + 1}</div>
                  <input
                    id={`input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={input}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    className="w-16 h-14 text-center text-2xl font-black text-zinc-900 bg-white border-2 border-zinc-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="--"
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button onClick={checkResult} className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-colors shadow-md">Kiểm tra kết quả</button>
          </div>
        </div>
      )}

      {gameState === 'result' && (
        <div className="w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8 mb-8 text-center">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">Kết quả của bạn</h2>
            
            <div className="text-6xl font-black text-rose-600 mb-4">
              {score} <span className="text-3xl text-zinc-400">/ {sequence.length}</span>
              <div className="text-lg text-zinc-500 font-medium mt-2">cặp số chính xác</div>
            </div>

            {isNewRecord && (
              <div className="bg-amber-100 text-amber-700 py-2 px-6 rounded-full inline-block font-bold text-lg mb-8 animate-bounce flex items-center justify-center gap-2 max-w-max mx-auto">
                <Medal className="w-5 h-5" /> Đỉnh Phong Tân Kỷ Lục!
              </div>
            )}
            {!user && (
              <div className="text-sm text-red-500 mb-6 italic">Hãy Đăng nhập để tự động lưu mốc điểm <b>{score} cặp số</b> này vào bảng vàng nhé!</div>
            )}

            <div className="flex flex-wrap gap-3 justify-center text-center mt-8 pt-6 border-t border-zinc-200">
              {sequence.map((correctNum, idx) => {
                const userNum = userInputs[idx];
                const isCorrect = correctNum === userNum;
                return (
                  <div key={idx} className={`border-2 rounded-xl p-3 w-20 relative ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="text-xs text-zinc-500 mb-1 font-mono">#{idx + 1}</div>
                    <div className={`text-xl font-black ${isCorrect ? 'text-emerald-700' : 'text-red-700 line-through opacity-50'}`}>{userNum || '--'}</div>
                    {!isCorrect && <div className="text-lg font-black text-emerald-600 mt-1">{correctNum}</div>}
                    <div className="absolute -top-2 -right-2 bg-white rounded-full">
                      {isCorrect ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-center">
            <button onClick={() => setGameState('setup')} className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-colors inline-flex items-center gap-2 shadow-md">
              <RotateCcw className="w-5 h-5" /> Thử thách mới
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
