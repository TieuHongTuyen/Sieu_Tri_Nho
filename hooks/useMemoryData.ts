'use client';

import { useState, useEffect } from 'react';
import { MemoryItem } from '@/types';

export const DEFAULT_DATA: MemoryItem[] = [
  {
    "id": "00",
    "number": "00",
    "imageName": "Grakk",
    "action": "Hút (chiêu cuối)",
    "object": "Cái bụng béo",
    "reason": "Hai số 0 giống như hai mắt to tròn hoặc bụng Grakk.",
    "imageUrl": "/images/00.jpg"
  },
  {
    "id": "01",
    "number": "01",
    "imageName": "Mganga",
    "action": "Quăng độc",
    "object": "Trượng đầu lâu",
    "reason": "Số 0 là mặt nạ, số 1 là cây trượng dài.",
    "imageUrl": "/images/01.jpg"
  },
  {
    "id": "02",
    "number": "02",
    "imageName": "Alice",
    "action": "Thả vòng choáng",
    "object": "Trượng cổ cong",
    "reason": "Dáng người nhỏ (0) và gậy cong (2).",
    "imageUrl": "/images/02.jpg"
  },
  {
    "id": "03",
    "number": "03",
    "imageName": "Krixi",
    "action": "Tung cánh",
    "object": "Đôi cánh bướm",
    "reason": "Đôi cánh bướm nhìn nghiêng rất giống số 3.",
    "imageUrl": "/images/03.jpg"
  },
  {
    "id": "04",
    "number": "04",
    "imageName": "Thane",
    "action": "Đâm kiếm",
    "object": "Khiên khổng lồ",
    "reason": "Số 4 có góc nhọn giống khiên chắn vuông vức.",
    "imageUrl": "/images/04.jpg"
  },
  {
    "id": "05",
    "number": "05",
    "imageName": "Mina",
    "action": "Xoay lưỡi hái",
    "object": "Lưỡi hái",
    "reason": "Lưỡi hái có độ cong như móc dưới của số 5.",
    "imageUrl": "/images/05.jpg"
  },
  {
    "id": "06",
    "number": "06",
    "imageName": "Zip",
    "action": "Hút đồng đội",
    "object": "Bụng phồng to",
    "reason": "Số 6 có phần bụng tròn giống Zip lúc đang hút.",
    "imageUrl": "/images/06.jpg"
  },
  {
    "id": "07",
    "number": "07",
    "imageName": "Nakroth",
    "action": "Lướt (múa đao)",
    "object": "Song đao",
    "reason": "Đao của Nakroth góc cạnh sắc lẹm như số 7.",
    "imageUrl": "/images/07.jpg"
  },
  {
    "id": "08",
    "number": "08",
    "imageName": "Kriknak",
    "action": "Nhảy vồ",
    "object": "Cánh bọ cứng",
    "reason": "Thân và cánh chéo nhau tạo hình số 8.",
    "imageUrl": "/images/08.jpg"
  },
  {
    "id": "09",
    "number": "09",
    "imageName": "Wisp",
    "action": "Bắn pháo",
    "object": "Robot tròn",
    "reason": "Buồng lái tròn (0) và chân máy (9).",
    "imageUrl": "/images/09.jpg"
  },
  {
    "id": "10",
    "number": "10",
    "imageName": "Valhein",
    "action": "Phi tiêu choáng",
    "object": "Súng 6 nòng",
    "reason": "Số 1 là nòng súng, 0 là ổ đạn tròn.",
    "imageUrl": "/images/10.jpg"
  },
  {
    "id": "11",
    "number": "11",
    "imageName": "Triệu Vân",
    "action": "Đâm thương",
    "object": "Long thương",
    "reason": "Hai số 1 giống như hai cây thương song song.",
    "imageUrl": "/images/11.jpg"
  },
  {
    "id": "12",
    "number": "12",
    "imageName": "Ryoma",
    "action": "Đâm kiếm (nhất kích)",
    "object": "Kiếm Naginata",
    "reason": "Số 1 là người, số 2 là thế đứng cầm kiếm cong.",
    "imageUrl": "/images/12.jpg"
  },
  {
    "id": "13",
    "number": "13",
    "imageName": "Ngộ Không",
    "action": "Gõ gậy",
    "object": "Gậy Như Ý",
    "reason": "Số 1 là gậy dài, số 3 là vành kim cô.",
    "imageUrl": "/images/13.jpg"
  },
  {
    "id": "14",
    "number": "14",
    "imageName": "Florentino",
    "action": "Tung hoa",
    "object": "Kiếm mỏng",
    "reason": "Kiếm (1) và bông hoa 4 cánh (4).",
    "imageUrl": "/images/14.jpg"
  },
  {
    "id": "15",
    "number": "15",
    "imageName": "Murad",
    "action": "Ảo ảnh trảm",
    "object": "Thanh kiếm cát",
    "reason": "Kiếm (1) và đường lướt cong như móc (5).",
    "imageUrl": "/images/15.jpg"
  },
  {
    "id": "16",
    "number": "16",
    "imageName": "Ignis",
    "action": "Hỏa trận",
    "object": "Trượng lửa",
    "reason": "Trượng dài (1) và ngọn lửa cuộn tròn (6).",
    "imageUrl": "/images/16.jpg"
  },
  {
    "id": "17",
    "number": "17",
    "imageName": "Airi",
    "action": "Phi Long Kiếm",
    "object": "Long kiếm",
    "reason": "Kiếm (1) và tư thế ném Shuriken góc cạnh (7).",
    "imageUrl": "/images/17.jpg"
  },
  {
    "id": "18",
    "number": "18",
    "imageName": "Tulen",
    "action": "Lôi điểu",
    "object": "Luồng sét",
    "reason": "Số 8 giống biểu tượng vô cực của sấm sét.",
    "imageUrl": "/images/18.jpg"
  },
  {
    "id": "19",
    "number": "19",
    "imageName": "Slimz",
    "action": "Lao cơ khí",
    "object": "Mũi lao vút",
    "reason": "Lao thẳng (1) và tai thỏ tròn (9).",
    "imageUrl": "/images/19.jpg"
  },
  {
    "id": "20",
    "number": "20",
    "imageName": "Lauriel",
    "action": "Vỗ cánh",
    "object": "Cánh thiên sứ",
    "reason": "Số 2 uốn lượn như cánh, 0 là vòng sáng.",
    "imageUrl": "/images/20.jpg"
  },
  {
    "id": "21",
    "number": "21",
    "imageName": "Veera",
    "action": "Hôn gió",
    "object": "Trái tim tình ái",
    "reason": "Đường cong cánh (2) và đuôi nhọn (1).",
    "imageUrl": "/images/21.jpg"
  },
  {
    "id": "22",
    "number": "22",
    "imageName": "Helen",
    "action": "Bơm máu",
    "object": "Cây đàn hạc",
    "reason": "Hai số 2 giống như hai viền của cây đàn hạc.",
    "imageUrl": "/images/22.jpg"
  },
  {
    "id": "23",
    "number": "23",
    "imageName": "Tel'Annas",
    "action": "Bắn tên",
    "object": "Cung tên",
    "reason": "Số 2 là cung, số 3 là các mũi tên đang bay.",
    "imageUrl": "/images/23.jpg"
  },
  {
    "id": "24",
    "number": "24",
    "imageName": "Ilumia",
    "action": "Thả thiên thạch",
    "object": "Quyền trượng",
    "reason": "Váy dài (2) và quyền trượng có đỉnh nhọn (4).",
    "imageUrl": "/images/24.jpg"
  },
  {
    "id": "25",
    "number": "25",
    "imageName": "Marja",
    "action": "Triệu hồi oán hồn",
    "object": "Đuôi rắn",
    "reason": "Thân nửa người nửa rắn cuộn như số 2 và 5.",
    "imageUrl": "/images/25.jpg"
  },
  {
    "id": "26",
    "number": "26",
    "imageName": "Kahlii",
    "action": "Đổ quân oán",
    "object": "Sáu cánh tay",
    "reason": "Các cánh tay uốn lượn giống số 2 và 6.",
    "imageUrl": "/images/26.jpg"
  },
  {
    "id": "27",
    "number": "27",
    "imageName": "Natalya",
    "action": "Bắn tia sáng",
    "object": "Quả cầu năng lượng",
    "reason": "Số 2 là tay, số 7 là tia sáng bắn thẳng.",
    "imageUrl": "/images/27.jpg"
  },
  {
    "id": "28",
    "number": "28",
    "imageName": "Điêu Thuyền",
    "action": "Đóng băng",
    "object": "Hoa tuyết",
    "reason": "Váy xòe (2) và quả cầu băng tròn đôi (8).",
    "imageUrl": "/images/28.jpg"
  },
  {
    "id": "29",
    "number": "29",
    "imageName": "Liliana",
    "action": "Biến hình cáo",
    "object": "Linh hồ",
    "reason": "Đuôi cáo uốn lượn rất giống số 2 và 9.",
    "imageUrl": "/images/29.jpg"
  },
  {
    "id": "30",
    "number": "30",
    "imageName": "Yue",
    "action": "Cắt quạt",
    "object": "Quạt lông vũ",
    "reason": "Quạt xòe (3) và vòng trung tâm (0).",
    "imageUrl": "/images/30.jpg"
  },
  {
    "id": "31",
    "number": "31",
    "imageName": "Dirak",
    "action": "Dựng khiên",
    "object": "Pháo tử quang",
    "reason": "Khiên sóng (3) và luồng pháo thẳng (1).",
    "imageUrl": "/images/31.jpg"
  },
  {
    "id": "32",
    "number": "32",
    "imageName": "Annette",
    "action": "Gió nồm",
    "object": "Cây gậy gió",
    "reason": "Sóng gió (3) và gậy cong (2).",
    "imageUrl": "/images/32.jpg"
  },
  {
    "id": "33",
    "number": "33",
    "imageName": "Sephera",
    "action": "Đàn nước",
    "object": "Đàn tỳ bà",
    "reason": "Những gợn sóng nước uốn lượn như hai số 3.",
    "imageUrl": "/images/33.jpg"
  },
  {
    "id": "34",
    "number": "34",
    "imageName": "Rouie",
    "action": "Mở cổng dịch chuyển",
    "object": "Vòng ma pháp",
    "reason": "Cổng dịch chuyển có các ký tự góc cạnh (3-4).",
    "imageUrl": "/images/34.jpg"
  },
  {
    "id": "35",
    "number": "35",
    "imageName": "Teeri",
    "action": "Ném song luân",
    "object": "Cặp luân hồi",
    "reason": "Hai vòng tròn răng cưa móc như 3 và 5.",
    "imageUrl": "/images/35.jpg"
  },
  {
    "id": "36",
    "number": "36",
    "imageName": "Bonnie",
    "action": "Ném thỏ",
    "object": "Nam châm thỏ",
    "reason": "Tai thỏ (3) và người thỏ tròn (6).",
    "imageUrl": "/images/36.jpg"
  },
  {
    "id": "37",
    "number": "37",
    "imageName": "Ishar",
    "action": "Gọi Tí Nị",
    "object": "Thú bông",
    "reason": "Tai thú (3) và chân đá thẳng (7).",
    "imageUrl": "/images/37.jpg"
  },
  {
    "id": "38",
    "number": "38",
    "imageName": "Aya",
    "action": "Nhập hồn",
    "object": "Bong bóng nhạc",
    "reason": "Tai mèo (3) và nốt nhạc tròn đôi (8).",
    "imageUrl": "/images/38.jpg"
  },
  {
    "id": "39",
    "number": "39",
    "imageName": "Tachi",
    "action": "Khai mở phong ấn",
    "object": "Kiếm Katana",
    "reason": "Sóng kiếm (3) và bao kiếm dài (9).",
    "imageUrl": "/images/39.jpg"
  },
  {
    "id": "40",
    "number": "40",
    "imageName": "Maloch",
    "action": "Luyện ngục",
    "object": "Kiếm quỷ",
    "reason": "Cánh vuông (4) và vùng ảnh hưởng tròn (0).",
    "imageUrl": "/images/40.jpg"
  },
  {
    "id": "41",
    "number": "41",
    "imageName": "Omen",
    "action": "Xích tử vong",
    "object": "Roi xích",
    "reason": "Kiếm thẳng (1) và lồng nhốt hình vuông (4).",
    "imageUrl": "/images/41.jpg"
  },
  {
    "id": "42",
    "number": "42",
    "imageName": "Lữ Bố",
    "action": "Chiến thần",
    "object": "Phương thiên họa kích",
    "reason": "Kích nhọn (4) và dáng đứng oai vệ (2).",
    "imageUrl": "/images/42.jpg"
  },
  {
    "id": "43",
    "number": "43",
    "imageName": "Arthur",
    "action": "Gầm thét",
    "object": "Kiếm thánh",
    "reason": "Khiên vuông (4) và hào quang quanh người (3).",
    "imageUrl": "/images/43.jpg"
  },
  {
    "id": "44",
    "number": "44",
    "imageName": "Superman",
    "action": "Bay lượn",
    "object": "Áo choàng đỏ",
    "reason": "Hai góc vai vuông vức tạo hình số 44.",
    "imageUrl": "/images/44.jpg"
  },
  {
    "id": "45",
    "number": "45",
    "imageName": "Batman",
    "action": "Phóng phi tiêu",
    "object": "Bat-boomerang",
    "reason": "Cánh tay vuông (4) và móc leo trèo (5).",
    "imageUrl": "/images/45.jpg"
  },
  {
    "id": "46",
    "number": "46",
    "imageName": "Joker",
    "action": "Cười điên dại",
    "object": "Súng bazooka",
    "reason": "Vai áo nhọn (4) và khẩu súng tròn (6).",
    "imageUrl": "/images/46.jpg"
  },
  {
    "id": "47",
    "number": "47",
    "imageName": "The Flash",
    "action": "Chạy thần tốc",
    "object": "Luồng điện",
    "reason": "Góc chạy nghiêng (4) và tia chớp (7).",
    "imageUrl": "/images/47.jpg"
  },
  {
    "id": "48",
    "number": "48",
    "imageName": "Baldum",
    "action": "Địa chấn",
    "object": "Cột đá",
    "reason": "Cột đá vuông (4) và vết nứt số 8.",
    "imageUrl": "/images/48.jpg"
  },
  {
    "id": "49",
    "number": "49",
    "imageName": "Arduin",
    "action": "Hồn tử sĩ",
    "object": "Rìu khổng lồ",
    "reason": "Rìu góc cạnh (4) và đầu lâu (9).",
    "imageUrl": "/images/49.jpg"
  },
  {
    "id": "50",
    "number": "50",
    "imageName": "Arum",
    "action": "Triệu hồi thú",
    "object": "Thú linh",
    "reason": "Vòng tròn thú (0) và dáng người đứng (5).",
    "imageUrl": "/images/50.jpg"
  },
  {
    "id": "51",
    "number": "51",
    "imageName": "Gildur",
    "action": "Vàng thử lửa",
    "object": "Găng tay vàng",
    "reason": "Tay đấm thẳng (1) và tư thế gồng (5).",
    "imageUrl": "/images/51.jpg"
  },
  {
    "id": "52",
    "number": "52",
    "imageName": "Cresht",
    "action": "Biến thân",
    "object": "Gậy thủy thần",
    "reason": "Gậy cong (2) và sừng quái vật (5).",
    "imageUrl": "/images/52.jpg"
  },
  {
    "id": "53",
    "number": "53",
    "imageName": "Kil'Groth",
    "action": "Mâu thuẫn",
    "object": "Mâu biển sâu",
    "reason": "Mũi mâu nhọn (3) và cán cong (5).",
    "imageUrl": "/images/53.jpg"
  },
  {
    "id": "54",
    "number": "54",
    "imageName": "Taara",
    "action": "Đập búa",
    "object": "Búa tạ",
    "reason": "Cán búa thẳng nhọn (4) và đầu búa (5).",
    "imageUrl": "/images/54.jpg"
  },
  {
    "id": "55",
    "number": "55",
    "imageName": "D'Arcy",
    "action": "Ma trận thứ nguyên",
    "object": "Lập phương",
    "reason": "Hai đường liên kết ma trận uốn như số 55.",
    "imageUrl": "/images/55.jpg"
  },
  {
    "id": "56",
    "number": "56",
    "imageName": "Xeniel",
    "action": "Sứ mệnh cứu thế",
    "object": "Sách thánh",
    "reason": "Sách mở ra (5) và vòng sáng dưới chân (6).",
    "imageUrl": "/images/56.jpg"
  },
  {
    "id": "57",
    "number": "57",
    "imageName": "Skud",
    "action": "Đấm phát chết luôn",
    "object": "Găng tay cơ khí",
    "reason": "Tư thế gồng tay rất giống số 5 và 7.",
    "imageUrl": "/images/57.jpg"
  },
  {
    "id": "58",
    "number": "58",
    "imageName": "Roxie",
    "action": "Trượt patin",
    "object": "Đèn dầu",
    "reason": "Dây kéo (5) và bánh xe tròn đôi (8).",
    "imageUrl": "/images/58.jpg"
  },
  {
    "id": "59",
    "number": "59",
    "imageName": "Astrid",
    "action": "Cự kiếm",
    "object": "Kiếm khổng lồ",
    "reason": "Kiếm dài (9) và dáng vung kiếm (5).",
    "imageUrl": "/images/59.jpg"
  },
  {
    "id": "60",
    "number": "60",
    "imageName": "TeeMee",
    "action": "Đánh rắm",
    "object": "Nồi thuốc",
    "reason": "Cái nồi tròn (0) và tay cầm (6).",
    "imageUrl": "/images/60.jpg"
  },
  {
    "id": "61",
    "number": "61",
    "imageName": "Omega",
    "action": "Chế độ hủy diệt",
    "object": "Cánh tay máy",
    "reason": "Thân robot tròn (6) và trục thẳng (1).",
    "imageUrl": "/images/61.jpg"
  },
  {
    "id": "62",
    "number": "62",
    "imageName": "Lumburr",
    "action": "Đất nứt",
    "object": "Vai đá",
    "reason": "Thân đá tròn (6) và tay dài (2).",
    "imageUrl": "/images/62.jpg"
  },
  {
    "id": "63",
    "number": "63",
    "imageName": "Toro",
    "action": "Húc sừng",
    "object": "Sừng trâu",
    "reason": "Sừng uốn (3) và thân hình vạm vỡ (6).",
    "imageUrl": "/images/63.jpg"
  },
  {
    "id": "64",
    "number": "64",
    "imageName": "Chaugnar",
    "action": "Sóng triều",
    "object": "Vòi voi",
    "reason": "Vòi voi cuộn (6) và tai to (4).",
    "imageUrl": "/images/64.jpg"
  },
  {
    "id": "65",
    "number": "65",
    "imageName": "Y'bneth",
    "action": "Vỗ tay",
    "object": "Cành cây",
    "reason": "Thân cây tròn (6) và cành móc (5).",
    "imageUrl": "/images/65.jpg"
  },
  {
    "id": "66",
    "number": "66",
    "imageName": "Ormarr",
    "action": "Hiên ngang",
    "object": "Búa chiến",
    "reason": "Thân người bụng phệ (6) và búa tròn (6).",
    "imageUrl": "/images/66.jpg"
  },
  {
    "id": "67",
    "number": "67",
    "imageName": "Ata",
    "action": "Thuyền trưởng",
    "object": "Neo thuyền",
    "reason": "Neo cong (6) và móc nhọn (7).",
    "imageUrl": "/images/67.jpg"
  },
  {
    "id": "68",
    "number": "68",
    "imageName": "Wiro",
    "action": "Nện rìu",
    "object": "Rìu thần",
    "reason": "Thân lực lưỡng (6) và mắt thần (8).",
    "imageUrl": "/images/68.jpg"
  },
  {
    "id": "69",
    "number": "69",
    "imageName": "Yorn",
    "action": "Tên thần",
    "object": "Cung vàng",
    "reason": "Bụng tên tròn (6) và cung dài (9).",
    "imageUrl": "/images/69.jpg"
  },
  {
    "id": "70",
    "number": "70",
    "imageName": "Butterfly",
    "action": "Ám sát",
    "object": "Đoản kiếm",
    "reason": "Kiếm nhọn (7) và vòng tròn hạ gục (0).",
    "imageUrl": "/images/70.jpg"
  },
  {
    "id": "71",
    "number": "71",
    "imageName": "Yan",
    "action": "Hoạ long",
    "object": "Bút vẽ kiếm",
    "reason": "Bút lông (1) và những nét vẽ sắc (7).",
    "imageUrl": "/images/71.jpg"
  },
  {
    "id": "72",
    "number": "72",
    "imageName": "Quillen",
    "action": "Chém lén",
    "object": "Đoản đao",
    "reason": "Tư thế khom người (2) và dao găm (7).",
    "imageUrl": "/images/72.jpg"
  },
  {
    "id": "73",
    "number": "73",
    "imageName": "Enzo",
    "action": "Truy bức",
    "object": "Xích liềm",
    "reason": "Lưỡi liềm (7) và xích uốn (3).",
    "imageUrl": "/images/73.jpg"
  },
  {
    "id": "74",
    "number": "74",
    "imageName": "Veres",
    "action": "Xích ra",
    "object": "Sợi xích gai",
    "reason": "Xích góc cạnh tạo thành hình 7 và 4.",
    "imageUrl": "/images/74.jpg"
  },
  {
    "id": "75",
    "number": "75",
    "imageName": "Amily",
    "action": "Liên hoàn cước",
    "object": "Đôi chân",
    "reason": "Chân đá tạo thành góc chữ L (7) và (5).",
    "imageUrl": "/images/75.jpg"
  },
  {
    "id": "76",
    "number": "76",
    "imageName": "Tachi",
    "action": "Long phá",
    "object": "Kiếm mộc",
    "reason": "Kiếm gỗ (7) và bao tròn (6).",
    "imageUrl": "/images/76.jpg"
  },
  {
    "id": "77",
    "number": "77",
    "imageName": "Zuka",
    "action": "Nhảy dậm",
    "object": "Gậy tre",
    "reason": "Hai thanh tre đan chéo như số 77.",
    "imageUrl": "/images/77.jpg"
  },
  {
    "id": "78",
    "number": "78",
    "imageName": "Qi",
    "action": "Đấm vỡ tường",
    "object": "Hào quang tay",
    "reason": "Tay đấm (7) và ngực áo (8).",
    "imageUrl": "/images/78.jpg"
  },
  {
    "id": "79",
    "number": "79",
    "imageName": "Sinestrea",
    "action": "Đổi máu",
    "object": "Kiếm máu",
    "reason": "Kiếm sắc (7) và giọt máu tròn (9).",
    "imageUrl": "/images/79.jpg"
  },
  {
    "id": "80",
    "number": "80",
    "imageName": "Zata",
    "action": "Bay lên",
    "object": "Lông vũ",
    "reason": "Cánh vỗ (8) và vòng lốc xoáy (0).",
    "imageUrl": "/images/80.jpg"
  },
  {
    "id": "81",
    "number": "81",
    "imageName": "Paine",
    "action": "Di hồn",
    "object": "Lưỡi hái hồn",
    "reason": "Luồng hồn ma (8) và cán dài (1).",
    "imageUrl": "/images/81.jpg"
  },
  {
    "id": "82",
    "number": "82",
    "imageName": "Keera",
    "action": "Đi xuyên tường",
    "object": "Tam giác ma thuật",
    "reason": "Đôi tai mèo (8) và dáng chạy (2).",
    "imageUrl": "/images/82.jpg"
  },
  {
    "id": "83",
    "number": "83",
    "imageName": "Zill",
    "action": "Phong đao",
    "object": "Cơn lốc",
    "reason": "Vòng xoáy gió giống số 8 và 3.",
    "imageUrl": "/images/83.jpg"
  },
  {
    "id": "84",
    "number": "84",
    "imageName": "Volkath",
    "action": "Cưỡi ngựa",
    "object": "Đại đao",
    "reason": "Giáp vai (8) và đao góc cạnh (4).",
    "imageUrl": "/images/84.jpg"
  },
  {
    "id": "85",
    "number": "85",
    "imageName": "Lorion",
    "action": "Khống chế hắc ám",
    "object": "Cầu hắc ám",
    "reason": "Chuỗi hạt bay (8) và tay móc (5).",
    "imageUrl": "/images/85.jpg"
  },
  {
    "id": "86",
    "number": "86",
    "imageName": "Bright",
    "action": "Tốc độ ánh sáng",
    "object": "Thánh kiếm",
    "reason": "Vòng sáng (8) và chuôi kiếm tròn (6).",
    "imageUrl": "/images/86.jpg"
  },
  {
    "id": "87",
    "number": "87",
    "imageName": "Iggy",
    "action": "Hỏa cầu",
    "object": "Quả bom lửa",
    "reason": "Mắt (8) và tia lửa bắn (7).",
    "imageUrl": "/images/87.jpg"
  },
  {
    "id": "88",
    "number": "88",
    "imageName": "Allain",
    "action": "Kiếm tất sát",
    "object": "Song kiếm",
    "reason": "Hai thanh kiếm chéo nhau tạo hình số 88.",
    "imageUrl": "/images/88.jpg"
  },
  {
    "id": "89",
    "number": "89",
    "imageName": "Thorne",
    "action": "Nạp đạn",
    "object": "Ma súng",
    "reason": "Ổ đạn tròn (8) và nòng súng (9).",
    "imageUrl": "/images/89.jpg"
  },
  {
    "id": "90",
    "number": "90",
    "imageName": "Moren",
    "action": "Bắn liên thanh",
    "object": "Súng cối",
    "reason": "Đầu súng to (9) và ổ đạn (0).",
    "imageUrl": "/images/90.jpg"
  },
  {
    "id": "91",
    "number": "91",
    "imageName": "Fennik",
    "action": "Ném kíp nổ",
    "object": "Ná cao su",
    "reason": "Ná tròn (9) và dây ná (1).",
    "imageUrl": "/images/91.jpg"
  },
  {
    "id": "92",
    "number": "92",
    "imageName": "Lindis",
    "action": "Đặt bẫy",
    "object": "Cung mặt trăng",
    "reason": "Vòng cung tròn (9) và dáng chạy lướt (2).",
    "imageUrl": "/images/92.jpg"
  },
  {
    "id": "93",
    "number": "93",
    "imageName": "Violet",
    "action": "Lộn bắn",
    "object": "Súng đôi",
    "reason": "Đầu súng (9) và làn đạn bay (3).",
    "imageUrl": "/images/93.jpg"
  },
  {
    "id": "94",
    "number": "94",
    "imageName": "Elsu",
    "action": "Viễn trình kích",
    "object": "Súng bắn tỉa",
    "reason": "Ống ngắm (9) và chân chống súng (4).",
    "imageUrl": "/images/94.jpg"
  },
  {
    "id": "95",
    "number": "95",
    "imageName": "Kaine",
    "action": "Tàng hình",
    "object": "Dao găm",
    "reason": "Đầu dao (9) và tay móc (5).",
    "imageUrl": "/images/95.jpg"
  },
  {
    "id": "96",
    "number": "96",
    "imageName": "Laville",
    "action": "Đạn lạc",
    "object": "Song súng",
    "reason": "Hai nòng súng tròn đầu giống 9 và 6.",
    "imageUrl": "/images/96.jpg"
  },
  {
    "id": "97",
    "number": "97",
    "imageName": "Hayate",
    "action": "Phi tiêu",
    "object": "Shuriken",
    "reason": "Tiêu tròn (9) và đường phi thẳng (7).",
    "imageUrl": "/images/97.jpg"
  },
  {
    "id": "98",
    "number": "98",
    "imageName": "Eland'orr",
    "action": "Thả bướm",
    "object": "Đèn lồng",
    "reason": "Đèn lồng tròn (9) và bướm đôi (8).",
    "imageUrl": "/images/98.jpg"
  },
  {
    "id": "99",
    "number": "99",
    "imageName": "Brunhilda",
    "action": "Pháo đài",
    "object": "Đại bác",
    "reason": "Hai nòng pháo khổng lồ giống hệt số 99.",
    "imageUrl": "/images/99.jpg"
  }
];

import { db } from '@/lib/firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';

export function useMemoryData() {
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu 1 lần từ Firestore thay vì onSnapshot để tránh tiền fetch nếu không cần thiết
    // nhưng nếu bạn muốn real-time (tức thì khi máy khác sửa) có thể dùng onSnapshot.
    // Ở đây ta dùng getDocs kết hợp fallback.
    const colRef = collection(db, 'pao_items');
    
    getDocs(colRef)
      .then((snapshot) => {
        if (snapshot.empty) {
          // Fallback: Firestore rỗng (chưa seed), dùng DEFAULT_DATA
          setItems(DEFAULT_DATA);
        } else {
          const fetchedItems: MemoryItem[] = [];
          snapshot.forEach((d) => {
            fetchedItems.push(d.data() as MemoryItem);
          });
          fetchedItems.sort((a, b) => parseInt(a.number) - parseInt(b.number));
          setItems(fetchedItems);
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu Firestore:", err);
        // Fallback: Mất mạng hoặc rules lỗi
        setItems(DEFAULT_DATA);
        setIsLoaded(true);
      });
  }, []);

  const addItem = async (item: MemoryItem) => {
    if (items.some(i => i.number === item.number)) {
      throw new Error('Số này đã tồn tại trong thư viện!');
    }
    const docRef = doc(db, 'pao_items', item.number);
    await setDoc(docRef, item);
    
    // Cập nhật local state sau khi push thành công
    const newItems = [...items, item].sort((a, b) => parseInt(a.number) - parseInt(b.number));
    setItems(newItems);
  };

  const updateItem = async (updatedItem: MemoryItem) => {
    const docRef = doc(db, 'pao_items', updatedItem.number);
    await setDoc(docRef, updatedItem);
    
    setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
  };

  const deleteItem = async (id: string) => {
    // Vì doc ID là number (VD: "00")
    const itemToDelete = items.find(i => i.id === id);
    if (itemToDelete) {
      const docRef = doc(db, 'pao_items', itemToDelete.number);
      await deleteDoc(docRef);
      setItems(items.filter(i => i.id !== id));
    }
  };

  const seedToFirestore = async () => {
    const colRef = collection(db, 'pao_items');
    for (const item of DEFAULT_DATA) {
      const docRef = doc(colRef, item.number);
      await setDoc(docRef, item);
    }
    setItems(DEFAULT_DATA);
    alert('Đã đẩy 100 bản ghi DEFAULT_DATA lên Firestore thành công!');
  };

  return { items, isLoaded, addItem, updateItem, deleteItem, seedToFirestore };
}
