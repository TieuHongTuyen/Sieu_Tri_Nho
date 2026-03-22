// Component hiển thị Bộ quy tắc PAO — nội dung từ PAO_System_00-99.md
export default function PAOGuide() {
  return (
    <div className="w-full max-w-4xl mx-auto pb-4 space-y-8 text-zinc-800">

      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Hệ Thống PAO — 10 Hình Ảnh (00–09)</h1>
        <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
          Ghi nhớ dãy số dài bằng cách chuyển mỗi cặp số thành một cảnh hành động sống động gồm{' '}
          <strong className="text-white">Người — Hành động — Vật thể</strong>.
        </p>
      </div>

      {/* ===== PHẦN 1: SHAPE SYSTEM ===== */}
      <Section title="Phần 1 — Shape System" subtitle="Mỗi chữ số có một hình dạng gốc" color="indigo">
        <p className="text-sm md:text-base text-zinc-600 mb-4 leading-relaxed">
          Trước khi tạo PAO, bạn cần &quot;neo&quot; 10 chữ số vào 10 hình ảnh dựa trên <strong>hình dạng trực quan</strong> của chúng. Đây là nền móng của toàn bộ hệ thống.
        </p>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-indigo-50">
                <th className="text-left px-3 py-2 rounded-tl-lg font-bold text-indigo-700 w-10">Số</th>
                <th className="text-left px-3 py-2 font-bold text-indigo-700">Hình dạng</th>
                <th className="text-left px-3 py-2 rounded-tr-lg font-bold text-indigo-700">Gợi ý hình ảnh</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['0', '⭕ Hình tròn / quả trứng', 'Bánh xe, mặt trăng tròn, quả bóng'],
                ['1', '🕯 Cây gậy thẳng đứng', 'Nến, mũi tên, cột điện'],
                ['2', '🦢 Con thiên nga cúi đầu', 'Thiên nga, móc câu, cổ rắn'],
                ['3', '👂 Đôi môi / hình sóng đôi', 'Tai thỏ, sóng biển đôi'],
                ['4', '⛵ Lá cờ / góc vuông', 'Buồm thuyền, ghế gấp, cờ đua'],
                ['5', '🪝 Cái móc / bàn tay', 'Lưỡi câu, vòi voi, dấu hỏi'],
                ['6', '🐌 Bụng tròn / con nòng nọc', 'Quả cherry, ốc sên, bom tròn'],
                ['7', '⚡ Lưỡi dao / boomerang', 'Gậy golf, búa rìu, tia sét'],
                ['8', '🕶 Đồng hồ cát / con nhện', 'Kính mắt, số 8 nằm = vô cực'],
                ['9', '🎈 Nòng nọc đuôi thẳng / bóng bay', 'Khinh khí cầu, quả lắc, củ tỏi'],
              ].map(([num, shape, examples], i) => (
                <tr key={num} className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}>
                  <td className="px-3 py-2 font-black text-xl text-indigo-600 border-b border-zinc-100">{num}</td>
                  <td className="px-3 py-2 font-medium border-b border-zinc-100">{shape}</td>
                  <td className="px-3 py-2 text-zinc-500 border-b border-zinc-100 text-xs md:text-sm">{examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Tip>Không cần dùng đúng hình ảnh trong bảng. Quan trọng là hình ảnh của <strong>bạn</strong> — cái nào bạn nhìn vào số và thấy ngay, dùng cái đó.</Tip>
      </Section>

      {/* ===== PHẦN 2: CẤU TRÚC PAO ===== */}
      <Section title="Phần 2 — Cấu Trúc PAO" subtitle="Mỗi cặp số = 1 nhân vật + 1 hành động + 1 vật thể" color="purple">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 font-mono text-sm md:text-base mb-4">
          <div className="text-purple-700 font-bold mb-1">SỐ → PERSON (Ai?) + ACTION (Làm gì?) + OBJECT (Với vật gì?)</div>
        </div>
        <p className="text-sm md:text-base text-zinc-600 mb-3">Ví dụ với dãy 6 chữ số <code className="bg-zinc-100 px-1 rounded font-mono">14 83 96</code>:</p>
        <div className="bg-zinc-900 text-green-400 rounded-xl p-4 font-mono text-sm mb-3 overflow-x-auto">
          <div>14 → P₁₄ A₁₄ O₁₄</div>
          <div>83 → P₈₃ A₈₃ O₈₃</div>
          <div>96 → P₉₆ A₉₆ O₉₆</div>
        </div>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Ghép lại thành <strong>1 cảnh phim</strong>: <em>Người của 14</em> đang <em>làm hành động của 83</em> với <em>vật thể của 96</em>. Chỉ 1 cảnh = 6 chữ số. Đặt các cảnh vào <strong>Cung Ký Ức (Memory Palace)</strong>.
        </p>
      </Section>

      {/* ===== PHẦN 3: SMASHIN SCOPE ===== */}
      <Section title="Phần 3 — Quy Tắc Tạo Hình Ảnh" subtitle="Nguyên tắc SMASHIN SCOPE (chuẩn thi đấu)" color="emerald">
        <p className="text-sm text-zinc-500 mb-3">Hình ảnh càng có nhiều yếu tố sau, càng dễ nhớ:</p>
        <div className="grid grid-cols-1 gap-2">
          {[
            ['S', 'Senses — Giác quan', 'Mùi khét, tiếng nổ, cảm giác lạnh'],
            ['M', 'Movement — Chuyển động', 'Đang bay, đang xoay, đang nổ'],
            ['A', 'Association — Liên kết', 'Gắn với ký ức cá nhân của bạn'],
            ['S', 'Silly — Vô lý, buồn cười', 'Càng kỳ quái càng tốt'],
            ['H', 'Humor — Hài hước', 'Tình huống lố bịch, phóng đại'],
            ['I', 'Imagination — Tưởng tượng', 'Không bị giới hạn thực tế'],
            ['N', 'Number — Kích thước cực đoan', 'Khổng lồ hoặc siêu nhỏ'],
          ].map(([letter, label, example]) => (
            <div key={label} className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
              <span className="text-xl font-black text-emerald-600 w-7 shrink-0 mt-0.5">{letter}</span>
              <div>
                <div className="font-semibold text-sm text-zinc-800">{label}</div>
                <div className="text-xs text-zinc-500">{example}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== PHẦN 4: BẢNG 100 HÌNH ẢNH ===== */}
      <Section title="Phần 4 — Bảng 10 Hình Ảnh Mẫu" subtitle="00–09 (chỉ là gợi ý tham khảo)" color="amber">
        <Tip type="warning">Bảng dưới là <strong>gợi ý tham khảo</strong>. Bạn nên <strong>thay thế</strong> bằng nhân vật quen thuộc với văn hóa Việt Nam / sở thích cá nhân. Hình ảnh do chính bạn tạo ra sẽ nhớ lâu hơn gấp 3–5 lần.</Tip>
        
        {[
          { label: '00–09', emoji: '⭕', theme: 'Tròn + ...', rows: [
            ['00','⭕⭕','Sumo wrestler','Lăn người','Bánh xe khổng lồ'],
            ['01','⭕🕯','Đầu bếp','Đập trứng','Cây đũa phép'],
            ['02','⭕🦢','Ballerina','Xoay tròn','Quả bóng tuyết'],
            ['03','⭕👂','DJ','Mix nhạc','Tai nghe khổng lồ'],
            ['04','⭕⛵','Thuyền trưởng','Cắm cờ','Bánh lái tàu'],
            ['05','⭕🪝','Ngư dân','Câu cá','Xô nước tròn'],
            ['06','⭕🐌','Cô gái tóc xoăn','Chạy vòng','Quả cherry đỏ'],
            ['07','⭕⚡','Ninja','Ném phi tiêu','Khiên tròn'],
            ['08','⭕🕶','Điệp viên','Nhìn qua ống nhòm','Kính mắt tròn'],
            ['09','⭕🎈','Trẻ em','Thả bóng','Dây thừng'],
          ]},

        ].map(group => (
          <div key={group.label} className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{group.emoji}</span>
              <h3 className="font-bold text-zinc-700 text-sm md:text-base">
                Nhóm {group.label} <span className="text-zinc-400 font-normal">— {group.theme}</span>
              </h3>
            </div>
            <div className="overflow-x-auto rounded-xl border border-zinc-200">
              <table className="w-full text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-500 uppercase text-[10px] tracking-wide">
                    <th className="px-2 py-1.5 text-left font-bold w-10">Số</th>
                    <th className="px-2 py-1.5 text-left font-bold w-16">Hình</th>
                    <th className="px-2 py-1.5 text-left font-bold">Người (P)</th>
                    <th className="px-2 py-1.5 text-left font-bold">Hành động (A)</th>
                    <th className="px-2 py-1.5 text-left font-bold">Vật thể (O)</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map(([num, shape, person, action, object], i) => (
                    <tr key={num} className={`border-t border-zinc-100 ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}`}>
                      <td className="px-2 py-2 font-black text-base text-indigo-600">{num}</td>
                      <td className="px-2 py-2">{shape}</td>
                      <td className="px-2 py-2 text-zinc-700 font-medium">{person}</td>
                      <td className="px-2 py-2 text-emerald-700">{action}</td>
                      <td className="px-2 py-2 text-amber-700">{object}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </Section>

      {/* ===== PHẦN 5: QUY TRÌNH XÂY DỰNG ===== */}
      <Section title="Phần 5 — Quy Trình Xây Dựng Của Riêng Bạn" subtitle="" color="rose">
        <div className="space-y-3">
          {[
            ['Bước 1', 'Neo hình dạng', '1–2 giờ', 'Nhìn từng chữ số 0–9, tự hỏi: "Số này trông giống cái gì?" Ghi xuống ngay cái đầu tiên hiện ra. Đừng suy nghĩ quá.'],
            ['Bước 2', 'Tạo hình ảnh 2 chữ số', '4–6 giờ, chia nhiều buổi', 'Với mỗi cặp 00–99: Nhìn 2 chữ số → thấy 2 hình dạng → chọn 1 người → gắn 1 hành động → gắn 1 vật thể.'],
            ['Bước 3', 'Kiểm tra (quan trọng nhất)', '', 'Che cột số, nhìn hình ảnh → đọc được số không? Nếu không → thay hình ảnh khác.'],
            ['Bước 4', 'Thực hành theo lộ trình', 'Tuần 1–8', 'Tuần 1–2: 00–19 | Tuần 3–4: 20–49 | Tuần 5–6: 50–79 | Tuần 7–8: 80–99. Sau 2 tháng bắt đầu luyện dãy số thực tế.'],
          ].map(([step, title, time, desc]) => (
            <div key={step} className="flex gap-3 bg-rose-50 border border-rose-100 rounded-xl p-4">
              <div className="text-rose-600 font-black text-sm shrink-0 w-14 pt-0.5">{step}</div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-sm text-zinc-800">{title}</span>
                  {time && <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">{time}</span>}
                </div>
                <p className="text-xs md:text-sm text-zinc-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== PHẦN 6: LỖI THƯỜNG GẶP ===== */}
      <Section title="Phần 6 — Lỗi Thường Gặp" subtitle="" color="zinc">
        <div className="space-y-2">
          {[
            ['Chọn người quá giống nhau', 'Nhầm lẫn khi giải mã', 'Mỗi nhóm 10 nên có phong cách người khác nhau'],
            ['Hành động quá chung (đi, đứng, ngồi)', 'Không phân biệt được', 'Dùng hành động cực đoan, đặc thù'],
            ['Vật thể trừu tượng (tình yêu, thời gian)', 'Não không hình dung được', 'Chỉ dùng vật thể có hình dạng vật lý'],
            ['Làm hết 100 số trong 1 ngày', 'Nhớ không kịp, bỏ giữa chừng', 'Chia nhỏ, mỗi buổi 10–20 số'],
            ['Không kiểm tra ngược', 'Không biết hình ảnh yếu chỗ nào', 'Luôn test: số → hình ảnh VÀ hình ảnh → số'],
          ].map(([loi, hq, fix]) => (
            <div key={loi} className="bg-white border border-zinc-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <span className="text-red-500 text-base shrink-0 mt-0.5">✗</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-zinc-800">{loi}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Hậu quả: {hq}</div>
                  <div className="text-xs text-emerald-700 mt-1 flex items-center gap-1">
                    <span>✓</span> {fix}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== TÓM TẮT ===== */}
      <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-5 font-mono text-xs md:text-sm leading-relaxed">
        <div className="text-zinc-400 mb-2 font-sans font-bold text-xs uppercase tracking-widest">Tóm Tắt Nhanh</div>
        <div><span className="text-indigo-400 font-bold">SHAPE:</span>  0=⭕  1=🕯  2=🦢  3=👂  4=⛵  5=🪝  6=🐌  7=⚡  8=🕶  9=🎈</div>
        <div className="mt-1"><span className="text-emerald-400 font-bold">PAO:</span>    [Số 2 chữ số] = [Người] + [Hành động] + [Vật thể]</div>
        <div className="mt-1"><span className="text-amber-400 font-bold">DÃY:</span>    6 chữ số = 1 cảnh phim → đặt vào Memory Palace</div>
      </div>

      <p className="text-center text-zinc-400 text-xs italic pb-2">
        Hệ thống PAO là công cụ — không phải đáp án. Thay thế bằng hình ảnh của riêng bạn càng nhiều càng tốt.
      </p>
    </div>
  );
}

// ===== Helper Components =====

function Section({ title, subtitle, color, children }: {
  title: string; subtitle: string; color: string; children: React.ReactNode;
}) {
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    rose: 'bg-rose-50 border-rose-200 text-rose-700',
    zinc: 'bg-zinc-50 border-zinc-200 text-zinc-700',
  };
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm">
      <div className={`inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-lg border mb-3 ${colorMap[color] || colorMap.zinc}`}>
        {title}
      </div>
      {subtitle && <h2 className="text-base md:text-lg font-bold text-zinc-900 mb-4">{subtitle}</h2>}
      {children}
    </div>
  );
}

function Tip({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' }) {
  return (
    <div className={`mt-3 rounded-xl px-4 py-3 text-sm leading-relaxed ${
      type === 'warning' ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-blue-50 border border-blue-200 text-blue-800'
    }`}>
      <span className="mr-1">{type === 'warning' ? '⚠️' : '💡'}</span>
      {children}
    </div>
  );
}
