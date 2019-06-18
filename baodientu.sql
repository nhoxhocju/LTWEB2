-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 19, 2019 lúc 01:23 AM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `baodientu`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Xã Hội'),
(2, 'Thế Giới'),
(3, 'test1'),
(4, 'test2'),
(5, 'test3'),
(6, 'test4');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `content` varchar(500) NOT NULL,
  `id_post` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `timeComment` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `content`, `id_post`, `id_user`, `timeComment`) VALUES
(1, 'fdfdfd', 1, 1, '2019-06-17 02:41:19'),
(2, 'dsdsd', 1, 1, '2019-06-17 02:43:39'),
(3, 'Chào buổi sáng', 1, 1, '2019-06-17 02:44:28'),
(4, 'mèo', 1, 1, '2019-06-17 02:45:22'),
(5, '2222', 1, 1, '2019-06-17 02:46:57'),
(6, '33333', 1, 1, '2019-06-17 02:47:02'),
(7, 'bực vl', 1, 1, '2019-06-17 03:01:24'),
(8, '222', 1, 1, '2019-06-17 03:40:47'),
(9, '33', 1, 1, '2019-06-17 03:42:27'),
(10, '33333', 2, 1, '2019-06-17 03:45:24'),
(11, '3333322222', 2, 1, '2019-06-17 03:46:44'),
(12, '555555', 1, 1, '2019-06-17 03:47:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `short_content` varchar(180) DEFAULT NULL,
  `content` text NOT NULL,
  `image` text NOT NULL,
  `date_post` date NOT NULL,
  `id_category` int(11) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `id_author` int(11) NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `hotNews` int(11) NOT NULL DEFAULT '0' COMMENT '0: tin bình thường, 1: tin nổi bật',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0: chờ, 1: chờ xuất bản, 2: đã xuất bản, -1: từ chối',
  `cause_not_approved` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `post`
--

INSERT INTO `post` (`id`, `title`, `short_content`, `content`, `image`, `date_post`, `id_category`, `tag`, `id_author`, `views`, `hotNews`, `status`, `cause_not_approved`) VALUES
(1, '8 ôtô hư hỏng sau vụ tai nạn liên hoàn giữa đêm ở Hà Nội', ' Cố vấn của chính phủ Trung Quốc tiết lộ nguyên nhân khiến đàm phán thương mại với Mỹ sụp đổ, cho rằn ffffffffff  Cố vấn của chính phủ Trung Quốc tiết lộ nguyên nhân khiến đàm phán', '<p>Tai nạn li&ecirc;n ho&agrave;n giữa 8 &ocirc;t&ocirc; tr&ecirc;n đường v&agrave;nh đai dẫn ra s&acirc;n bay Nội B&agrave;i khiến giao th&ocirc;ng bị &ugrave;n tắc nửa đ&ecirc;m. May mắn kh&ocirc;ng c&oacute; nạn nh&acirc;n bị thương nhưng 8 xe hư hỏng.Vụ tai nạn xảy ra khoảng 21h đ&ecirc;m 5/6, gần cầu vượt Bưởi - V&otilde; Ch&iacute; C&ocirc;ng hướng đi s&acirc;n bay Nội B&agrave;i (H&agrave; Nội). C&aacute;c phương tiện gặp nạn gồm một xe biển xanh 80A, 3 taxi v&agrave; 4 &ocirc;t&ocirc; kh&aacute;c.8 xe n&agrave;y &quot;d&iacute;nh&quot; v&agrave;o nhau, tạo th&agrave;nh h&agrave;ng d&agrave;i, chắn ngang đoạn đường v&agrave;nh đai. Trong đ&oacute;, chiếc taxi Mai Linh ở ph&iacute;a trước, sau c&ugrave;ng l&agrave; xe chở r&aacute;c.Một t&agrave;i xế l&aacute;i taxi gặp nạn kể khi d&ograve;ng xe cộ lưu th&ocirc;ng đến khu vực tr&ecirc;n, do trời mưa, đường đ&ocirc;ng, c&aacute;c phương tiện giảm tốc độ. &quot;Sau đ&oacute;, nhiều &ocirc;t&ocirc; ph&iacute;a sau bắt đầu t&ocirc;ng d&acirc;y chuyền&quot;, nh&acirc;n chứng n&agrave;y cho biết.May mắn kh&ocirc;ng c&oacute; nạn nh&acirc;n bị thương trong vụ tai nạn nhưng giao th&ocirc;ng qua khu vực bị &ugrave;n tắc khoảng 1 km v&agrave;o giữa đ&ecirc;m. Sự cố khiến 8 &ocirc;t&ocirc; bị biến dạng.C&ocirc;ng an quận Cầu Giấy đ&atilde; tổ chức ph&acirc;n luồng giao th&ocirc;ng, điều tra nguy&ecirc;n nh&acirc;n vụ va chạm.</p>\r\n', 'https://znews-photo.zadn.vn/w660/Uploaded/pwivovlb/2019_06_06/xe_3_zing.jpg', '2019-06-20', 2, 'tai nạn, o to', 1, 256, 1, 1, ''),
(2, 'Việt Nam đã gửi công hàm về phát biểu của thủ tướng Singapore', ' Cố vấn của chính phủ Trung Quốc tiết lộ nguyên nhân khiến đàm phán thương mại với Mỹ sụp đổ, cho rằn ffffffffff  Cố vấn của chính phủ Trung Quốc tiết lộ nguyên nhân khiến đàm phán', 'BNG tiếp tục lên tiếng sau khi thủ tướng Singapore dùng từ \"xâm lược\", \"chiếm đóng\" để nói về việc quân Việt Nam sang giúp Campuchia thoát khỏi chế độ diệt chủng Khmer Đỏ năm 1979.“Bộ Ngoại giao cũng như các cơ quan liên quan đã giao thiệp chính thức và không chính thức với đối tác Singapore. Chúng tôi đã có công hàm gửi tới Đại sứ quán Singapore tại Hà Nội. Tôi tin rằng phía Singapore hiểu rõ thông điệp của chúng ta”, người phát ngôn Bộ Ngoại giao Việt Nam Lê Thị Thu Hằng phát biểu trong buổi họp báo thường kỳ ngày 6/6.Trước đó, tại Đối thoại Shangri-La và trên trang mạng cá nhân ngày 31/5, Thủ tướng Singapore Lý Hiển Long dùng những lời lẽ cho rằng Việt Nam “xâm lược”, “chiếm đóng” Campuchia, để nói về việc quân tình nguyện Việt Nam sang trợ giúp Campuchia thoát khỏi chế độ diệt chủng Khmer Đỏ năm 1979.Bộ Ngoại giao Việt Nam ngày 4/6 đã lên tiếng phản bác lại phát biểu của ông Lý, cho biết Việt Nam “lấy làm tiếc” về những nội dung “phản ánh không khách quan thực tế lịch sử, gây tác động không tốt đến dư luận”.“Bộ Ngoại giao Việt Nam đã trao đổi với Bộ Ngoại giao Singapore về vấn đề này”, người phát ngôn Bộ Ngoại giao Việt Nam Lê Thị Thu Hằng nói trong thông cáo ngày 4/6.“Đóng góp và hy sinh của Việt Nam trong việc cùng nhân dân Campuchia chấm dứt tội ác diệt chủng của Khmer Đỏ là sự thật đã được thừa nhận rộng rãi. Ngày 16/11/2018, Toà án đặc biệt xét xử tội ác Khmer Đỏ (ECCC) đã ra phán quyết về tội ác diệt chủng chống nhân loại của Khmer Đỏ”.Nhiều quan chức cấp cao Campuchia đã lên tiếng phản bác phát ngôn “sai sự thật”, “không phản ánh lịch sử” của Thủ tướng Lý Hiển Long về quân đội Việt Nam.Ngày 4/6, ông Hun Many, đại biểu Quốc hội Campuchia từ tỉnh Kampong Speu, nói với Phnompenh Post thế giới không nên quên bao nhiêu người Campuchia đã phải gánh chịu đau thương. Gần 3 triệu nạn nhân vô tội đã chết dưới bàn tay Khmer Đỏ trong 3 năm, 8 tháng, 20 ngày do thế giới khi đó nhắm mắt làm ngơ với Campuchia.Phát biểu với báo chí đêm 3/6 ở Sân bay Quốc tế Phnom Penh, Bộ trưởng Quốc phòng Campuchia Tea Banh nói: “Nhận xét của ông ấy (Thủ tướng Lý Hiển Long) là không đúng và không phản ánh lịch sử. Điều đó hoàn toàn không đúng chút nào khi ông ấy nói rằng quân đội Việt Nam xâm lược Campuchia. Chúng tôi muốn ông ấy phải cải chính”.“Chúng tôi không chấp nhận những gì ông ấy nói. Chúng tôi đã làm rõ rằng quân tình nguyện Việt Nam đến đây để giải phóng dân tộc chúng tôi. Chúng tôi vẫn coi họ đến đây để cứu sống người dân của chúng tôi. Điều đó có ý nghĩa lớn đối với chúng tôi”.Ông cho biết đã nêu vấn đề này với người đồng cấp Singapore Ng Eng Hen khi dự Đối thoại Shangri-La tuần trước, và yêu cầu bộ trưởng quốc phòng Singapore thông tin tới Thủ tướng Lý Hiển Long để sửa sai bình luận của mình.', 'https://znews-photo.zadn.vn/w660/Uploaded/lce_cqdjw/2019_06_06/6438.jpg', '2019-06-20', 2, 'singapore', 1, 159, 1, -1, 'Người kiểm duyệt không đưa ra lý do'),
(8, 'bv123', 'ds', '<p>dsdds</p>', '/public/image/hinh1.png', '2019-06-19', 2, 'dsdsds', 2, 2, 0, 2, ''),
(12, '33333433', 'aaaa333', '<p>aaaaa333222</p>\r\n', '/public/image/3.jpg', '2019-06-19', 2, 'qqqqqqqqqqqq3333222', 2, 3, 0, 0, ''),
(13, 'test', 'dds', '<p>dsds</p>\r\n', '/public/image/avt.jpg', '2019-06-19', 2, 'dsdds', 2, 1, 0, 0, ''),
(14, 'Ông Trump dọa đánh thuế hàng Trung Quốc nếu ông Tập né hội nghị G20', 'dsddsd', '<p>dsdsdd</p>\r\n', '/public/image/21743744_481630928873675_5802042260440066205_o.jpg', '2019-06-19', 2, 'dsdds', 2, 1, 0, 2, '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `name` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `userRight` int(11) NOT NULL DEFAULT '0',
  `manageCategory` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `birthday`, `userRight`, `manageCategory`) VALUES
(1, 'nhoxxinhtrai98@gmail.com', '$2b$10$yhTDbDOBCYqx5lZe0Fg9BuEMODvuUI4ERMQSXMW1vgvL4jh1AzIkK', 'Lương Trần Gia Bảo', '1998-04-30', 3, 2),
(2, 'meomeo@gmail.com', '$2b$10$ociXiCMIbp3NmltD2S9DMekQ0UDsQtAfVBPqF4qJTMla50tvHY7va', 'Mèo Con', '2019-06-19', 2, 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_post` (`id_post`);

--
-- Chỉ mục cho bảng `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_author` (`id_author`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_post`) REFERENCES `post` (`id`);

--
-- Các ràng buộc cho bảng `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`id_author`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `post_ibfk_3` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
