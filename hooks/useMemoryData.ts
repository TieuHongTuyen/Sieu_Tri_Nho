'use client';

import { useState, useEffect } from 'react';
import { MemoryItem } from '@/types';

export const DEFAULT_DATA: MemoryItem[] = [
  {
    "id": "00",
    "number": "00",
    "imageName": "Arum",
    "action": "Trói kẻ địch bằng phép thuật",
    "object": "Dây phép thuật",
    "reason": "Thân hình to tròn, 2 vòng năng lượng bao quanh",
    "imageUrl": "/images/00.jpg"
  },
  {
    "id": "01",
    "number": "01",
    "imageName": "Arduin",
    "action": "Đâm vũ kí về phía trước",
    "object": "Vũ khí dài thẳng",
    "reason": "Thân to tròn + vũ khí dài thẳng",
    "imageUrl": "/images/01.jpg"
  },
  {
    "id": "02",
    "number": "02",
    "imageName": "Annette",
    "action": "Thổi lốc xoáy cuốn kẻ địch",
    "object": "Cây quạt xòe tròn",
    "reason": "Váy xòe tròn + tóc dài uốn cong",
    "imageUrl": "/images/02.jpg"
  },
  {
    "id": "03",
    "number": "03",
    "imageName": "Alice",
    "action": "Hút kẻ địch vào tâm điểm bằng lực hút",
    "object": "Gậy ma thuật",
    "reason": "Khối cầu tròn + tóc 2 bên tai",
    "imageUrl": "/images/03.jpg"
  },
  {
    "id": "04",
    "number": "04",
    "imageName": "Ata",
    "action": "Phóng mỏ neo bắt kẻ địch",
    "object": "Mỏ neo dài",
    "reason": "Mỏ neo + tư thế cầm góc vuông",
    "imageUrl": "/images/04.jpg"
  },
  {
    "id": "05",
    "number": "05",
    "imageName": "Aoi",
    "action": "Vung móng vuốt móc ngược kéo địch lại",
    "object": "Móng vuốt cong",
    "reason": "Móng vuốt cong + di chuyển vòng tròn",
    "imageUrl": "/images/05.jpg"
  },
  {
    "id": "06",
    "number": "06",
    "imageName": "Chaugnar",
    "action": "Xoay vòi húc bay địch sang ngang",
    "object": "Vòi khổng lồ",
    "reason": "Bụng phình to tròn + vòi dài",
    "imageUrl": "/images/06.jpg"
  },
  {
    "id": "07",
    "number": "07",
    "imageName": "Aleister",
    "action": "Phóng năng lượng bóng tối",
    "object": "Quả cầu bóng tối nhọn",
    "reason": "Hào quang cầu tròn + áo choàng nhọn góc",
    "imageUrl": "/images/07.jpg"
  },
  {
    "id": "08",
    "number": "08",
    "imageName": "Azzen'Ka",
    "action": "Triệu hồi 2 quả cầu xoay quanh người",
    "object": "2 quả cầu đá xoay",
    "reason": "2 quả cầu năng lượng xoay tròn",
    "imageUrl": "/images/08.jpg"
  },
  {
    "id": "09",
    "number": "09",
    "imageName": "Amily",
    "action": "Tung cước đá vào đầu địch",
    "object": "Đôi giày chiến đấu",
    "reason": "Vũ khí là đôi giày có ám khí",
    "imageUrl": "/images/09.jpg"
  },
  {
    "id": "10",
    "number": "10",
    "imageName": "Thane",
    "action": "Vung kiếm chém đứng xuyên giáp",
    "object": "Kiếm một tay + khiên tròn",
    "reason": "Kiếm thẳng + khiên tròn",
    "imageUrl": "/images/10.jpg"
  },
  {
    "id": "11",
    "number": "11",
    "imageName": "Allain",
    "action": "Chém chéo X bằng 2 kiếm cùng lúc",
    "object": "2 kiếm thẳng song song",
    "reason": "2 kiếm thẳng song song, đánh chéo X",
    "imageUrl": "/images/11.jpg"
  },
  {
    "id": "12",
    "number": "12",
    "imageName": "Airi",
    "action": "Lướt và chém liên tiếp",
    "object": "Kiếm dài Katana",
    "reason": "Cầm kiếm dài + di chuyển nhẹ nhàng",
    "imageUrl": "/images/12.jpg"
  },
  {
    "id": "13",
    "number": "13",
    "imageName": "Krixi",
    "action": "Tạo mưa sao băng",
    "object": "Mưa sao băng",
    "reason": "Thân hình nhỏ nhắn + 2 cánh bướm",
    "imageUrl": "/images/13.jpg"
  },
  {
    "id": "14",
    "number": "14",
    "imageName": "Baldum",
    "action": "Lao vào húc tung hàng loạt địch",
    "object": "Gậy lớn dài",
    "reason": "Gậy lớn thẳng + bốn chân",
    "imageUrl": "/images/14.jpg"
  },
  {
    "id": "15",
    "number": "15",
    "imageName": "Mina",
    "action": "Xoay lưỡi hái móc kẻ địch",
    "object": "Lưỡi hái cong",
    "reason": "Thân cao to + lưỡi hái cong",
    "imageUrl": "/images/15.jpg"
  },
  {
    "id": "16",
    "number": "16",
    "imageName": "Enzo",
    "action": "Tung tỏa liêm móc kẻ địch",
    "object": "Tỏa liêm cong",
    "reason": "Thân mảnh thẳng + tỏa liêm cong",
    "imageUrl": "/images/16.jpg"
  },
  {
    "id": "17",
    "number": "17",
    "imageName": "Bright",
    "action": "Vung đao ánh sáng đột kích kẻ địch",
    "object": "Đao ánh sáng dài",
    "reason": "Đao ánh sáng + bắn tia tốc độ cao",
    "imageUrl": "/images/17.jpg"
  },
  {
    "id": "18",
    "number": "18",
    "imageName": "Celica",
    "action": "Khóa mục tiêu ngắm bắn",
    "object": "Súng ngắm + kính",
    "reason": "Súng dài + kính ngắm công nghệ cao",
    "imageUrl": "/images/18.jpg"
  },
  {
    "id": "19",
    "number": "19",
    "imageName": "Capheny",
    "action": "Thả drone tấn công bắn dồn dập",
    "object": "Drone bay + súng điều khiển",
    "reason": "Súng điều khiển + drone bay lên như bóng",
    "imageUrl": "/images/19.jpg"
  },
  {
    "id": "20",
    "number": "20",
    "imageName": "D'Arcy",
    "action": "Triệu hồi hố đen hút tất cả vào giữa",
    "object": "Quả cầu hố đen tròn",
    "reason": "Áo xanh tà bay + hào quang cầu tròn",
    "imageUrl": "/images/20.jpg"
  },
  {
    "id": "21",
    "number": "21",
    "imageName": "Dextra",
    "action": "Lao thẳng vào địch cắt liên hoàn",
    "object": "Máy cưa năng lượng",
    "reason": "Máy cưa cong + dáng cao thanh",
    "imageUrl": "/images/21.jpg"
  },
  {
    "id": "22",
    "number": "22",
    "imageName": "Keera",
    "action": "Lướt, đồng thời tỏa ra 2 phân thân",
    "object": "Hai phân thân",
    "reason": "Hai ống tay áo dài + hai phân thân",
    "imageUrl": "/images/22.jpg"
  },
  {
    "id": "23",
    "number": "23",
    "imageName": "Dirak",
    "action": "Bắn tia sáng năng lượng",
    "object": "Đôi cánh cơ học",
    "reason": "Đôi cánh cơ học + năng lượng 2 bên",
    "imageUrl": "/images/23.jpg"
  },
  {
    "id": "24",
    "number": "24",
    "imageName": "Eland'orr",
    "action": "Nhảy lên bắn mưa tên xuống đầu địch",
    "object": "Cung tiên + tên sáng",
    "reason": "Cánh tiên + tư thế bắn cung như buồm thuyền",
    "imageUrl": "/images/24.jpg"
  },
  {
    "id": "25",
    "number": "25",
    "imageName": "Elsu",
    "action": "Nằm xuống ngắm bắn tỉa từ xa 1 phát hạ địch",
    "object": "Súng bắn tỉa dài",
    "reason": "Nằm cúi bắn tỉa như thiên nga cúi đầu + kính ngắm cong",
    "imageUrl": "/images/25.jpg"
  },
  {
    "id": "26",
    "number": "26",
    "imageName": "Enzo",
    "action": "Phun độc trùm khu vực rộng",
    "object": "Bình độc + mây khói",
    "reason": "Áo tối + vũ khí uốn cuộn tròn",
    "imageUrl": "/images/26.jpg"
  },
  {
    "id": "27",
    "number": "27",
    "imageName": "Errol",
    "action": "Nhảy lên chém mạnh 1 nhát từ trên cao",
    "object": "Đại kiếm 2 tay nặng",
    "reason": "Kiếm lớn chém chéo góc nhọn + di chuyển lướt",
    "imageUrl": "/images/27.jpg"
  },
  {
    "id": "28",
    "number": "28",
    "imageName": "Fennik",
    "action": "Đặt bẫy vòng quay hất văng địch bước vào",
    "object": "Vòng xoáy + bẫy sáng",
    "reason": "Vòng quay bắn + kính công nghệ",
    "imageUrl": "/images/28.jpg"
  },
  {
    "id": "29",
    "number": "29",
    "imageName": "Flash",
    "action": "Vụt biến mất tốc độ ánh sáng đến vị trí mới",
    "object": "Tia sáng trắng",
    "reason": "Di chuyển vụt nhanh lên cao như bóng bay thả lên",
    "imageUrl": "/images/29.jpg"
  },
  {
    "id": "30",
    "number": "30",
    "imageName": "Florentino",
    "action": "Lướt hoa kiếm 3 bước vũ đạo gây sát thương",
    "object": "Kiếm hoa + cánh hồng",
    "reason": "Tóc xoăn sóng + di chuyển lượn tròn hào hoa",
    "imageUrl": "/images/30.jpg"
  },
  {
    "id": "31",
    "number": "31",
    "imageName": "Gildur",
    "action": "Đập tay xuống đất gây chấn động sóng lan rộng",
    "object": "Găng tay vàng khổng lồ",
    "reason": "Sóng năng lượng phát 2 tay + thân đứng thẳng",
    "imageUrl": "/images/31.jpg"
  },
  {
    "id": "32",
    "number": "32",
    "imageName": "Grakk",
    "action": "Phóng xúc tu móc kéo địch về phía mình",
    "object": "Xúc tu dài nhớt nhát",
    "reason": "Xúc tu 2 bên như tai / sóng + thân cong như thiên nga",
    "imageUrl": "/images/32.jpg"
  },
  {
    "id": "33",
    "number": "33",
    "imageName": "Hayate",
    "action": "Bắn 2 mũi tên song song cùng 1 lúc",
    "object": "Cung + 2 tên sáng",
    "reason": "Bắn 2 mũi tên song song = sóng đôi đối xứng",
    "imageUrl": "/images/33.jpg"
  },
  {
    "id": "34",
    "number": "34",
    "imageName": "Iggy",
    "action": "Phun lửa liên tục đốt cháy diện rộng",
    "object": "Súng phun lửa + Scorch",
    "reason": "Ngọn lửa 2 bên như tai + hình dạng góc lửa như cờ",
    "imageUrl": "/images/34.jpg"
  },
  {
    "id": "35",
    "number": "35",
    "imageName": "Ignis",
    "action": "Ném cầu lửa nổ tung thành mảnh văng tứ phía",
    "object": "Quả cầu lửa bùng nổ",
    "reason": "Đuốc lửa cong + cầm tay như móc",
    "imageUrl": "/images/35.jpg"
  },
  {
    "id": "36",
    "number": "36",
    "imageName": "Ilumia",
    "action": "Bắn chùm sáng tự động truy đuổi mục tiêu",
    "object": "Cầu sáng trắng tự bay",
    "reason": "Hào quang 2 bên như tai + váy phình tròn nòng nọc",
    "imageUrl": "/images/36.jpg"
  },
  {
    "id": "37",
    "number": "37",
    "imageName": "Ishar",
    "action": "Đóng băng khu vực xung quanh bằng băng tuyết",
    "object": "Gậy băng + tinh thể",
    "reason": "Gậy đầu chẻ đôi như tai + năng lượng chém tia",
    "imageUrl": "/images/37.jpg"
  },
  {
    "id": "38",
    "number": "38",
    "imageName": "Jinnar",
    "action": "Tạo xoáy năng lượng hút và nổ tung địch",
    "object": "Xoáy cầu năng lượng",
    "reason": "Xoáy năng lượng sóng + mắt kính phát sáng",
    "imageUrl": "/images/38.jpg"
  },
  {
    "id": "39",
    "number": "39",
    "imageName": "Joker",
    "action": "Ném bài tú lơ khơ bay thành vòng tròn",
    "object": "Bộ bài tú lơ khơ",
    "reason": "Ném bài bay lên + tóc dựng như tai nhọn",
    "imageUrl": "/images/39.jpg"
  },
  {
    "id": "40",
    "number": "40",
    "imageName": "Kahlii",
    "action": "Phóng linh hồn xuyên qua hàng địch",
    "object": "Linh hồn xanh lướt thẳng",
    "reason": "Khiên hào quang tròn + dáng đứng cầm cờ",
    "imageUrl": "/images/40.jpg"
  },
  {
    "id": "41",
    "number": "41",
    "imageName": "Keera",
    "action": "Bay lên rồi lao xuống đâm thẳng vào địch",
    "object": "Kiếm năng lượng + cánh",
    "reason": "Cánh mở như cờ + thân cao thẳng",
    "imageUrl": "/images/41.jpg"
  },
  {
    "id": "42",
    "number": "42",
    "imageName": "Kil'Groth",
    "action": "Quay tròn vung rìu to chém tất cả xung quanh",
    "object": "Rìu chiến khổng lồ",
    "reason": "Vũ khí hình cờ to + di chuyển lướt thiên nga",
    "imageUrl": "/images/42.jpg"
  },
  {
    "id": "43",
    "number": "43",
    "imageName": "Kriknak",
    "action": "Phóng mình lao tới cắn chích độc địch",
    "object": "Nanh độc + cánh bướm",
    "reason": "Cánh bướm như cờ + ăng-ten côn trùng sóng đôi",
    "imageUrl": "/images/43.jpg"
  },
  {
    "id": "44",
    "number": "44",
    "imageName": "Krixi",
    "action": "Bắn 2 viên đạn phép đồng thời 2 hướng",
    "object": "Cây gậy phép + 2 đạn",
    "reason": "Bắn 2 viên đạn góc đối xứng = cờ đôi",
    "imageUrl": "/images/44.jpg"
  },
  {
    "id": "45",
    "number": "45",
    "imageName": "Laville",
    "action": "Lăn người tránh rồi bắn chính xác từ dưới",
    "object": "Súng ngắn + tư thế lộn",
    "reason": "Tư thế cúi móc súng + áo vest góc vuông",
    "imageUrl": "/images/45.jpg"
  },
  {
    "id": "46",
    "number": "46",
    "imageName": "Lauriel",
    "action": "Triệu hồi kiếm sáng từ trên trời rơi xuống",
    "object": "Kiếm thiên sứ từ trên cao",
    "reason": "Cánh thiên thần như cờ + áo váy tròn phình",
    "imageUrl": "/images/46.jpg"
  },
  {
    "id": "47",
    "number": "47",
    "imageName": "Lindis",
    "action": "Cắm mũi tên xuống đất tạo bẫy nổ",
    "object": "Cung + mũi tên cắm đất",
    "reason": "Mũi tên cắm đất như cờ + bắn tốc độ lưỡi dao",
    "imageUrl": "/images/47.jpg"
  },
  {
    "id": "48",
    "number": "48",
    "imageName": "Lorion",
    "action": "Phóng rào chắn năng lượng khóa cả khu vực",
    "object": "Tường ánh sáng vuông",
    "reason": "Khiên vuông góc + kính năng lượng",
    "imageUrl": "/images/48.jpg"
  },
  {
    "id": "49",
    "number": "49",
    "imageName": "Lu Bu",
    "action": "Vung phương thiên họa kích quét ngang cả hàng",
    "object": "Giáo 3 lưỡi khổng lồ",
    "reason": "Giáo phương thiên họa kích cắm cờ + hào quang bay",
    "imageUrl": "/images/49.jpg"
  },
  {
    "id": "50",
    "number": "50",
    "imageName": "Maloch",
    "action": "Đập rìu xuống đất nứt vỡ cả mặt đất",
    "object": "Rìu to bằng người",
    "reason": "Rìu cong móc + bụng tròn to khổng lồ",
    "imageUrl": "/images/50.jpg"
  },
  {
    "id": "51",
    "number": "51",
    "imageName": "Marja",
    "action": "Đóng băng đất phía trước thành gai băng nhọn",
    "object": "Gậy băng + gai băng",
    "reason": "Gậy băng thẳng dài + đầu gậy cong",
    "imageUrl": "/images/51.jpg"
  },
  {
    "id": "52",
    "number": "52",
    "imageName": "Max",
    "action": "Phóng tên lửa từ vai nổ tung diện rộng",
    "object": "Súng vai phóng rocket",
    "reason": "Giáp cơ học + cánh thiên nga máy mở ra",
    "imageUrl": "/images/52.jpg"
  },
  {
    "id": "53",
    "number": "53",
    "imageName": "Mganga",
    "action": "Triệu hồi bùa ngải nhảy múa tấn công tự động",
    "object": "Búp bê bùa ngải nhảy",
    "reason": "Gậy đầu cong vòng tròn + sóng bùa chú 2 bên",
    "imageUrl": "/images/53.jpg"
  },
  {
    "id": "54",
    "number": "54",
    "imageName": "Mina",
    "action": "Kéo địch vào rồi giáng búa trúng đầu",
    "object": "Búa chiến cán cong",
    "reason": "Búa cán cong như móc + góc vuông cờ",
    "imageUrl": "/images/54.jpg"
  },
  {
    "id": "55",
    "number": "55",
    "imageName": "Moren",
    "action": "Bắn 2 súng cùng lúc không ngừng nghỉ",
    "object": "2 súng ngắn song sinh",
    "reason": "2 súng móc song song đối xứng",
    "imageUrl": "/images/55.jpg"
  },
  {
    "id": "56",
    "number": "56",
    "imageName": "Murad",
    "action": "Biến vào bóng tối rồi cắt xuyên từ trong ra",
    "object": "Kiếm cong xuyên không gian",
    "reason": "Kiếm cong móc + di chuyển cuộn xoáy nòng nọc",
    "imageUrl": "/images/56.jpg"
  },
  {
    "id": "57",
    "number": "57",
    "imageName": "Nakroth",
    "action": "Vung gươm xoay liên tục không bị khống chế",
    "object": "2 lưỡi kiếm cong chữ C",
    "reason": "2 lưỡi kiếm cong cắt chéo tia sét",
    "imageUrl": "/images/57.jpg"
  },
  {
    "id": "58",
    "number": "58",
    "imageName": "Natalya",
    "action": "Giam địch trong lồng băng không thoát được",
    "object": "Lồng băng + tóc trắng",
    "reason": "Tóc bạc cong + kính phát năng lượng",
    "imageUrl": "/images/58.jpg"
  },
  {
    "id": "59",
    "number": "59",
    "imageName": "Omega",
    "action": "Phóng tay cơ học ra móc kéo địch lại",
    "object": "Tay móc cơ học dài",
    "reason": "Tay móc cơ học + di chuyển phóng lên không",
    "imageUrl": "/images/59.jpg"
  },
  {
    "id": "60",
    "number": "60",
    "imageName": "Ormarr",
    "action": "Đấm liên hoàn vào mặt địch không thở được",
    "object": "Tay thép bọc giáp tròn",
    "reason": "Tay bọc thép tròn bụng + đuôi gậy thẳng",
    "imageUrl": "/images/60.jpg"
  },
  {
    "id": "61",
    "number": "61",
    "imageName": "Peura",
    "action": "Hồi máu đồng đội bằng hào quang thiêng liêng",
    "object": "Sừng hươu phát sáng",
    "reason": "Thân nhỏ tròn + sừng hươu như gậy thẳng",
    "imageUrl": "/images/61.jpg"
  },
  {
    "id": "62",
    "number": "62",
    "imageName": "Pháp Vân",
    "action": "Triệu hồi sấm sét từ trên trời đánh thẳng xuống",
    "object": "Chuỗi sét trên trời",
    "reason": "Áo dài bay cong thanh thoát + đầu tóc thiên nga",
    "imageUrl": "/images/62.jpg"
  },
  {
    "id": "63",
    "number": "63",
    "imageName": "Qi",
    "action": "Tung chiêu âm thanh làm choáng hàng loạt địch",
    "object": "Sóng âm vô hình lan rộng",
    "reason": "Vòng tròn năng lượng phình + sóng âm 2 bên",
    "imageUrl": "/images/63.jpg"
  },
  {
    "id": "64",
    "number": "64",
    "imageName": "Raz",
    "action": "Đấm liên tiếp tốc độ cao bằng găng năng lượng",
    "object": "Găng đấm năng lượng đỏ",
    "reason": "Găng tay tròn to + tư thế đứng cầm cờ đấm",
    "imageUrl": "/images/64.jpg"
  },
  {
    "id": "65",
    "number": "65",
    "imageName": "Richter",
    "action": "Phóng điện ra 2 tay chém địch trong điện trường",
    "object": "Kiếm điện + tia điện",
    "reason": "Bụng giáp tròn + kiếm điện đầu cong móc",
    "imageUrl": "/images/65.jpg"
  },
  {
    "id": "66",
    "number": "66",
    "imageName": "Riktor",
    "action": "Quay 2 dây xích hất văng địch ra xa",
    "object": "2 dây xích sắt dài",
    "reason": "2 dây xích xoáy tròn đối xứng = nòng nọc đôi",
    "imageUrl": "/images/66.jpg"
  },
  {
    "id": "67",
    "number": "67",
    "imageName": "Rouie",
    "action": "Lao qua địch cắt ngang rồi quay lại",
    "object": "Vũ khí cánh cong nhỏ",
    "reason": "Di chuyển vòng tròn tốc độ + vũ khí lưỡi cong",
    "imageUrl": "/images/67.jpg"
  },
  {
    "id": "68",
    "number": "68",
    "imageName": "Roxie",
    "action": "Lao xe vào địch nghiền qua không phanh",
    "object": "Xe chiến đấu cơ học",
    "reason": "Xe tròn nòng nọc + kính mắt tròn to công nghệ",
    "imageUrl": "/images/68.jpg"
  },
  {
    "id": "69",
    "number": "69",
    "imageName": "Ryoma",
    "action": "Rút kiếm đứng tấn công 1 nhát dứt điểm",
    "object": "Kiếm Nhật dài trong vỏ",
    "reason": "Thân mảnh cúi cong + tóc búi tròn cao như bóng bay",
    "imageUrl": "/images/69.jpg"
  },
  {
    "id": "70",
    "number": "70",
    "imageName": "Skud",
    "action": "Vung gậy đập địch bắn văng như bóng golf",
    "object": "Gậy bóng + bóng phát sáng",
    "reason": "Gậy đánh + bóng lăn tròn = golf phiên bản chiến đấu",
    "imageUrl": "/images/70.jpg"
  },
  {
    "id": "71",
    "number": "71",
    "imageName": "Slimz",
    "action": "Trượt nhanh trên mặt đất xuyên qua hàng địch",
    "object": "Tấm trượt + súng dài",
    "reason": "Súng dài thẳng + chém ngang tốc độ sét",
    "imageUrl": "/images/71.jpg"
  },
  {
    "id": "72",
    "number": "72",
    "imageName": "Superman",
    "action": "Bay lao thẳng vào địch với tốc độ siêu thanh",
    "object": "Áo choàng đỏ bay",
    "reason": "Bay lướt ngang tốc độ cao + áo choàng thiên nga",
    "imageUrl": "/images/72.jpg"
  },
  {
    "id": "73",
    "number": "73",
    "imageName": "Taara",
    "action": "Vung 2 kiếm chữ X tạo làn sóng chém ra xa",
    "object": "2 kiếm đôi chữ X",
    "reason": "2 kiếm chữ X tia sét + vung ra sóng 2 bên",
    "imageUrl": "/images/73.jpg"
  },
  {
    "id": "74",
    "number": "74",
    "imageName": "Tel'Annas",
    "action": "Bắn mưa tên cực nhanh từ xa không ngừng",
    "object": "Cung tiên + tên sáng",
    "reason": "Bắn tên tốc độ cao góc nhọn + cánh tiên như cờ",
    "imageUrl": "/images/74.jpg"
  },
  {
    "id": "75",
    "number": "75",
    "imageName": "Thane",
    "action": "Ném búa bay xa rồi tự quay về tay",
    "object": "Búa boomerang phát sáng",
    "reason": "Ném búa boomerang = lưỡi + móc quay về",
    "imageUrl": "/images/75.jpg"
  },
  {
    "id": "76",
    "number": "76",
    "imageName": "Toro",
    "action": "Tích điện toàn thân rồi phóng ra điện xung quanh",
    "object": "Thân người phát điện",
    "reason": "Điện năng toàn thân + thân tròn lăn xoáy",
    "imageUrl": "/images/76.jpg"
  },
  {
    "id": "77",
    "number": "77",
    "imageName": "Tulen",
    "action": "Phóng 2 tia sét song song từ 2 tay",
    "object": "2 tia sét xanh trắng",
    "reason": "Phóng 2 tia sét song song = lưỡi đôi đối xứng",
    "imageUrl": "/images/77.jpg"
  },
  {
    "id": "78",
    "number": "78",
    "imageName": "Valhein",
    "action": "Ném phi tiêu liên tiếp cả 2 tay cực nhanh",
    "object": "Phi tiêu đôi",
    "reason": "Phi tiêu tốc độ sét + kính ngắm",
    "imageUrl": "/images/78.jpg"
  },
  {
    "id": "79",
    "number": "79",
    "imageName": "Veera",
    "action": "Thả bọ độc lớn lao vào cắn xé địch",
    "object": "Bọ độc khổng lồ bay",
    "reason": "Thả độc nổ tung bay lên + năng lượng tia",
    "imageUrl": "/images/79.jpg"
  },
  {
    "id": "80",
    "number": "80",
    "imageName": "Violet",
    "action": "Lộn người tránh đạn rồi bắn xuyên tất cả",
    "object": "Súng máy + tư thế lộn",
    "reason": "Súng to + kính ngắm tròn = đồng hồ cát + tròn",
    "imageUrl": "/images/80.jpg"
  },
  {
    "id": "81",
    "number": "81",
    "imageName": "Wisp",
    "action": "Bắn chùm đạn ma đuổi theo mục tiêu",
    "object": "Đạn ma trơi tự truy đuổi",
    "reason": "Hình thể đồng hồ cát ma trơi + bắn thẳng",
    "imageUrl": "/images/81.jpg"
  },
  {
    "id": "82",
    "number": "82",
    "imageName": "Wonder Woman",
    "action": "Quăng dây thòng lọng bắt trói địch",
    "object": "Dây vàng thòng lọng",
    "reason": "Vóc dáng đồng hồ cát hoàn hảo + cánh thiên nga",
    "imageUrl": "/images/82.jpg"
  },
  {
    "id": "83",
    "number": "83",
    "imageName": "Xeniel",
    "action": "Bay lên ôm đồng đội dịch chuyển về an toàn",
    "object": "Cánh trắng + hào quang",
    "reason": "Kính năng lượng + sóng âm thiên thần 2 bên",
    "imageUrl": "/images/83.jpg"
  },
  {
    "id": "84",
    "number": "84",
    "imageName": "Yena",
    "action": "Đặt bẫy tàng hình rồi kích nổ khi địch bước vào",
    "object": "Bẫy cơ học + mũ camo",
    "reason": "Mũ công nghệ + bẫy cắm góc như cờ",
    "imageUrl": "/images/84.jpg"
  },
  {
    "id": "85",
    "number": "85",
    "imageName": "Yorick",
    "action": "Triệu hồi linh hồn bao vây địch từ 4 phía",
    "object": "Xích ma + linh hồn",
    "reason": "Giáp nặng thắt eo + xích còng tay móc",
    "imageUrl": "/images/85.jpg"
  },
  {
    "id": "86",
    "number": "86",
    "imageName": "Zata",
    "action": "Biến tàng hình cơ học rồi cắt từ phía sau",
    "object": "Dao cơ học + giáp tàng",
    "reason": "Kính quan sát vi mô + di chuyển cuộn nhanh",
    "imageUrl": "/images/86.jpg"
  },
  {
    "id": "87",
    "number": "87",
    "imageName": "Zhao Yun",
    "action": "Phi ngựa lao thẳng xuyên toàn bộ hàng địch",
    "object": "Ngựa chiến + giáo thẳng",
    "reason": "Giáp bóng thắt eo + tốc độ sét chiến trường",
    "imageUrl": "/images/87.jpg"
  },
  {
    "id": "88",
    "number": "88",
    "imageName": "Zill",
    "action": "Tạo lốc xoáy cuốn tất cả vào tâm điểm",
    "object": "Lốc gió xanh xoáy tròn",
    "reason": "Xoáy gió vô cực = kính đôi + vô cực ∞",
    "imageUrl": "/images/88.jpg"
  },
  {
    "id": "89",
    "number": "89",
    "imageName": "Zip",
    "action": "Nuốt chửng đồng đội vào bụng rồi nhổ ra an toàn",
    "object": "Cái miệng to khổng lồ",
    "reason": "Mặt tròn như kính + nuốt người rồi nhổ lên = bóng bay",
    "imageUrl": "/images/89.jpg"
  },
  {
    "id": "90",
    "number": "90",
    "imageName": "Zephys",
    "action": "Nhảy vọt lên trời rồi lao xuống đầu địch",
    "object": "Hào quang tím + nắm đấm",
    "reason": "Nhảy lên từ mặt đất = bóng bay phóng lên + hào quang tròn",
    "imageUrl": "/images/90.jpg"
  },
  {
    "id": "91",
    "number": "91",
    "imageName": "Baldum (skin khác)",
    "action": "Lao người tới húc địch lên không trung",
    "object": "Thân to + cột sắt",
    "reason": "Bay ném + cầm cột thẳng — skin khác với 14",
    "imageUrl": "/images/91.jpg"
  },
  {
    "id": "92",
    "number": "92",
    "imageName": "Lauriel (skin khác)",
    "action": "Triệu hồi trụ ánh sáng thiên đình chiếu xuống",
    "object": "Cánh trắng + trụ sáng",
    "reason": "Thiên thần bay + cánh trắng thiên nga — skin khác với 46",
    "imageUrl": "/images/92.jpg"
  },
  {
    "id": "93",
    "number": "93",
    "imageName": "Xeniel (skin khác)",
    "action": "Cắm trụ hào quang xuống đất bảo vệ khu vực",
    "object": "Trụ vàng + sóng thiên thần",
    "reason": "Bay trên cao + sóng âm 2 bên — skin khác với 83",
    "imageUrl": "/images/93.jpg"
  },
  {
    "id": "94",
    "number": "94",
    "imageName": "Capheny (skin khác)",
    "action": "Điều khiển drone bắn loạt hỏa lực từ trên cao",
    "object": "Drone chiến đấu + cánh",
    "reason": "Drone bay cao + cánh mở như cờ — skin khác với 19",
    "imageUrl": "/images/94.jpg"
  },
  {
    "id": "95",
    "number": "95",
    "imageName": "Eland'orr (skin khác)",
    "action": "Lướt trên không bắn tên xuyên tường",
    "object": "Cung tiên + móc dây",
    "reason": "Tiên bay + móc leo cung — skin khác với 24",
    "imageUrl": "/images/95.jpg"
  },
  {
    "id": "96",
    "number": "96",
    "imageName": "Wisp (skin khác)",
    "action": "Nổ tung thành nhiều đạn ma xung quanh",
    "object": "Bóng nổ + mảnh đạn",
    "reason": "Thả bong bóng năng lượng + hình nòng nọc ma",
    "imageUrl": "/images/96.jpg"
  },
  {
    "id": "97",
    "number": "97",
    "imageName": "Flash (skin khác)",
    "action": "Dịch chuyển liên tiếp 5 lần trong 1 giây",
    "object": "Tia sáng trắng vệt dài",
    "reason": "Tốc độ ánh sáng vụt lên + tia điện — skin khác với 29",
    "imageUrl": "/images/97.jpg"
  },
  {
    "id": "98",
    "number": "98",
    "imageName": "Valhein (skin khác)",
    "action": "Nhảy từ trên cao xuống cắm phi tiêu vào mặt địch",
    "object": "Phi tiêu + nhảy dù",
    "reason": "Nhảy xuống từ trên cao + kính ngắm — skin khác với 78",
    "imageUrl": "/images/98.jpg"
  },
  {
    "id": "99",
    "number": "99",
    "imageName": "Zip (skin khác)",
    "action": "Nuốt 2 địch cùng lúc rồi nổ tung tất cả",
    "object": "Bụng phình to + nổ",
    "reason": "Nuốt 2 người = bóng đôi — skin khác với 89",
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
