import Link from 'next/link';
import { BookOpen, BrainCircuit, LayoutGrid, Timer, ListOrdered } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 flex-1 flex flex-col justify-center overflow-x-hidden">
      {/* Hero */}
      <div className="text-center mb-8 md:mb-16">
        <h1 className="text-[1.75rem] leading-tight font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl lg:text-6xl">
          Rèn luyện <span className="text-indigo-600">Trí Nhớ Hình Ảnh</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-xl text-zinc-500 leading-relaxed">
          Hệ thống hóa các con số thành hình ảnh và hành động. Mở rộng không giới hạn, luyện tập phản xạ như các tuyển thủ siêu trí tuệ.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full">
        {/* Library Card */}
        <Link href="/library" className="group relative bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8 hover:shadow-lg transition-all hover:border-indigo-300 overflow-hidden min-h-[11rem] block">
          <div className="absolute -top-6 -right-6 text-zinc-50 group-hover:text-indigo-50 transition-colors duration-500">
            <LayoutGrid className="w-40 h-40" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 text-indigo-600 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">Thư viện Dữ liệu</h2>
            <p className="text-zinc-500 mb-6 leading-relaxed text-sm md:text-base">
              Quản lý danh sách các con số, hình ảnh và hành động tương ứng. Thêm mới và chỉnh sửa bất cứ lúc nào.
            </p>
            <span className="text-indigo-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all text-sm md:text-base">
              Quản lý ngay <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </Link>

        {/* Practice Card */}
        <Link href="/practice" className="group relative bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8 hover:shadow-lg transition-all hover:border-emerald-300 overflow-hidden min-h-[11rem] block">
          <div className="absolute -top-6 -right-6 text-zinc-50 group-hover:text-emerald-50 transition-colors duration-500">
            <BrainCircuit className="w-40 h-40" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 text-emerald-600 shadow-inner">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">Luyện tập Flashcard</h2>
            <p className="text-zinc-500 mb-6 leading-relaxed text-sm md:text-base">
              Sử dụng Flashcard để kiểm tra trí nhớ. Lật thẻ để xem hình ảnh và hành động được liên kết với con số.
            </p>
            <span className="text-emerald-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all text-sm md:text-base">
              Bắt đầu luyện tập <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </Link>

        {/* Reflex Game Card */}
        <Link href="/game-reflex" className="group relative bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8 hover:shadow-lg transition-all hover:border-amber-300 overflow-hidden min-h-[11rem] block">
          <div className="absolute -top-6 -right-6 text-zinc-50 group-hover:text-amber-50 transition-colors duration-500">
            <Timer className="w-40 h-40" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 text-amber-600 shadow-inner">
              <Timer className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">Phản xạ tính giờ</h2>
            <p className="text-zinc-500 mb-6 leading-relaxed text-sm md:text-base">
              Thử thách tốc độ truy xuất của não bộ. Chọn đúng hình ảnh tương ứng với con số trong thời gian giới hạn 60 giây.
            </p>
            <span className="text-amber-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all text-sm md:text-base">
              Chơi ngay <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </Link>

        {/* Sequence Game Card */}
        <Link href="/game-sequence" className="group relative bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 md:p-8 hover:shadow-lg transition-all hover:border-rose-300 overflow-hidden min-h-[11rem] block">
          <div className="absolute -top-6 -right-6 text-zinc-50 group-hover:text-rose-50 transition-colors duration-500">
            <ListOrdered className="w-40 h-40" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-4 text-rose-600 shadow-inner">
              <ListOrdered className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-2">Nhớ dãy số dài</h2>
            <p className="text-zinc-500 mb-6 leading-relaxed text-sm md:text-base">
              Tạo ngẫu nhiên một dãy số dài (20, 40, 100 số). Sử dụng phương pháp mã hóa để ghi nhớ và kiểm tra lại độ chính xác.
            </p>
            <span className="text-rose-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all text-sm md:text-base">
              Thử thách ngay <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

