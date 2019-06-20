-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 19, 2019 lúc 09:23 PM
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
(4, 'test2'),
(5, 'test3'),
(6, 'test4'),
(7, 'dsdds');

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
(1, '8 ôtô hư hỏng sau vụ tai nạn liên hoàn giữa đêm ở Hà Nội', ' Cố vấn của chính phủ Trung Quốc tiết lộ nguyên nhân khiến đàm phán thương mại với Mỹ sụp đổ, cho rằn ffffffffff  Cố vấn của chính phủ Trung Quốc tiết lộ nguyên nhân khiến đàm phán', '<p>Tai nạn li&ecirc;n ho&agrave;n giữa 8 &ocirc;t&ocirc; tr&ecirc;n đường v&agrave;nh đai dẫn ra s&acirc;n bay Nội B&agrave;i khiến giao th&ocirc;ng bị &ugrave;n tắc nửa đ&ecirc;m. May mắn kh&ocirc;ng c&oacute; nạn nh&acirc;n bị thương nhưng 8 xe hư hỏng.Vụ tai nạn xảy ra khoảng 21h đ&ecirc;m 5/6, gần cầu vượt Bưởi - V&otilde; Ch&iacute; C&ocirc;ng hướng đi s&acirc;n bay Nội B&agrave;i (H&agrave; Nội). C&aacute;c phương tiện gặp nạn gồm một xe biển xanh 80A, 3 taxi v&agrave; 4 &ocirc;t&ocirc; kh&aacute;c.8 xe n&agrave;y &quot;d&iacute;nh&quot; v&agrave;o nhau, tạo th&agrave;nh h&agrave;ng d&agrave;i, chắn ngang đoạn đường v&agrave;nh đai. Trong đ&oacute;, chiếc taxi Mai Linh ở ph&iacute;a trước, sau c&ugrave;ng l&agrave; xe chở r&aacute;c.Một t&agrave;i xế l&aacute;i taxi gặp nạn kể khi d&ograve;ng xe cộ lưu th&ocirc;ng đến khu vực tr&ecirc;n, do trời mưa, đường đ&ocirc;ng, c&aacute;c phương tiện giảm tốc độ. &quot;Sau đ&oacute;, nhiều &ocirc;t&ocirc; ph&iacute;a sau bắt đầu t&ocirc;ng d&acirc;y chuyền&quot;, nh&acirc;n chứng n&agrave;y cho biết.May mắn kh&ocirc;ng c&oacute; nạn nh&acirc;n bị thương trong vụ tai nạn nhưng giao th&ocirc;ng qua khu vực bị &ugrave;n tắc khoảng 1 km v&agrave;o giữa đ&ecirc;m. Sự cố khiến 8 &ocirc;t&ocirc; bị biến dạng.C&ocirc;ng an quận Cầu Giấy đ&atilde; tổ chức ph&acirc;n luồng giao th&ocirc;ng, điều tra nguy&ecirc;n nh&acirc;n vụ va chạm.</p>\r\n', 'https://znews-photo.zadn.vn/w660/Uploaded/pwivovlb/2019_06_06/xe_3_zing.jpg', '2019-06-20', 2, 'tai nạn, o to', 1, 256, 1, 2, ''),
(2, 'Việt Nam đã gửi công hàm về phát biểu của thủ tướng Singapore', ' Cố vấn của chính phủ Trung Quốc tiết lộ nguyên nhân khiến đàm phán thương mại với Mỹ sụp đổ, cho rằn ffffffffff  Cố vấn của chính phủ Trung Quốc tiết lộ nguyên nhân khiến đàm phán', '<p>BNG tiếp tục l&ecirc;n tiếng sau khi thủ tướng Singapore d&ugrave;ng từ &quot;x&acirc;m lược&quot;, &quot;chiếm đ&oacute;ng&quot; để n&oacute;i về việc qu&acirc;n Việt Nam sang gi&uacute;p Campuchia tho&aacute;t khỏi chế độ diệt chủng Khmer Đỏ năm 1979.&ldquo;Bộ Ngoại giao cũng như c&aacute;c cơ quan li&ecirc;n quan đ&atilde; giao thiệp ch&iacute;nh thức v&agrave; kh&ocirc;ng ch&iacute;nh thức với đối t&aacute;c Singapore. Ch&uacute;ng t&ocirc;i đ&atilde; c&oacute; c&ocirc;ng h&agrave;m gửi tới Đại sứ qu&aacute;n Singapore tại H&agrave; Nội. T&ocirc;i tin rằng ph&iacute;a Singapore hiểu r&otilde; th&ocirc;ng điệp của ch&uacute;ng ta&rdquo;, người ph&aacute;t ng&ocirc;n Bộ Ngoại giao Việt Nam L&ecirc; Thị Thu Hằng ph&aacute;t biểu trong buổi họp b&aacute;o thường kỳ ng&agrave;y 6/6.Trước đ&oacute;, tại Đối thoại Shangri-La v&agrave; tr&ecirc;n trang mạng c&aacute; nh&acirc;n ng&agrave;y 31/5, Thủ tướng Singapore L&yacute; Hiển Long d&ugrave;ng những lời lẽ cho rằng Việt Nam &ldquo;x&acirc;m lược&rdquo;, &ldquo;chiếm đ&oacute;ng&rdquo; Campuchia, để n&oacute;i về việc qu&acirc;n t&igrave;nh nguyện Việt Nam sang trợ gi&uacute;p Campuchia tho&aacute;t khỏi chế độ diệt chủng Khmer Đỏ năm 1979.Bộ Ngoại giao Việt Nam ng&agrave;y 4/6 đ&atilde; l&ecirc;n tiếng phản b&aacute;c lại ph&aacute;t biểu của &ocirc;ng L&yacute;, cho biết Việt Nam &ldquo;lấy l&agrave;m tiếc&rdquo; về những nội dung &ldquo;phản &aacute;nh kh&ocirc;ng kh&aacute;ch quan thực tế lịch sử, g&acirc;y t&aacute;c động kh&ocirc;ng tốt đến dư luận&rdquo;.&ldquo;Bộ Ngoại giao Việt Nam đ&atilde; trao đổi với Bộ Ngoại giao Singapore về vấn đề n&agrave;y&rdquo;, người ph&aacute;t ng&ocirc;n Bộ Ngoại giao Việt Nam L&ecirc; Thị Thu Hằng n&oacute;i trong th&ocirc;ng c&aacute;o ng&agrave;y 4/6.&ldquo;Đ&oacute;ng g&oacute;p v&agrave; hy sinh của Việt Nam trong việc c&ugrave;ng nh&acirc;n d&acirc;n Campuchia chấm dứt tội &aacute;c diệt chủng của Khmer Đỏ l&agrave; sự thật đ&atilde; được thừa nhận rộng r&atilde;i. Ng&agrave;y 16/11/2018, To&agrave; &aacute;n đặc biệt x&eacute;t xử tội &aacute;c Khmer Đỏ (ECCC) đ&atilde; ra ph&aacute;n quyết về tội &aacute;c diệt chủng chống nh&acirc;n loại của Khmer Đỏ&rdquo;.Nhiều quan chức cấp cao Campuchia đ&atilde; l&ecirc;n tiếng phản b&aacute;c ph&aacute;t ng&ocirc;n &ldquo;sai sự thật&rdquo;, &ldquo;kh&ocirc;ng phản &aacute;nh lịch sử&rdquo; của Thủ tướng L&yacute; Hiển Long về qu&acirc;n đội Việt Nam.Ng&agrave;y 4/6, &ocirc;ng Hun Many, đại biểu Quốc hội Campuchia từ tỉnh Kampong Speu, n&oacute;i với Phnompenh Post thế giới kh&ocirc;ng n&ecirc;n qu&ecirc;n bao nhi&ecirc;u người Campuchia đ&atilde; phải g&aacute;nh chịu đau thương. Gần 3 triệu nạn nh&acirc;n v&ocirc; tội đ&atilde; chết dưới b&agrave;n tay Khmer Đỏ trong 3 năm, 8 th&aacute;ng, 20 ng&agrave;y do thế giới khi đ&oacute; nhắm mắt l&agrave;m ngơ với Campuchia.Ph&aacute;t biểu với b&aacute;o ch&iacute; đ&ecirc;m 3/6 ở S&acirc;n bay Quốc tế Phnom Penh, Bộ trưởng Quốc ph&ograve;ng Campuchia Tea Banh n&oacute;i: &ldquo;Nhận x&eacute;t của &ocirc;ng ấy (Thủ tướng L&yacute; Hiển Long) l&agrave; kh&ocirc;ng đ&uacute;ng v&agrave; kh&ocirc;ng phản &aacute;nh lịch sử. Điều đ&oacute; ho&agrave;n to&agrave;n kh&ocirc;ng đ&uacute;ng ch&uacute;t n&agrave;o khi &ocirc;ng ấy n&oacute;i rằng qu&acirc;n đội Việt Nam x&acirc;m lược Campuchia. Ch&uacute;ng t&ocirc;i muốn &ocirc;ng ấy phải cải ch&iacute;nh&rdquo;.&ldquo;Ch&uacute;ng t&ocirc;i kh&ocirc;ng chấp nhận những g&igrave; &ocirc;ng ấy n&oacute;i. Ch&uacute;ng t&ocirc;i đ&atilde; l&agrave;m r&otilde; rằng qu&acirc;n t&igrave;nh nguyện Việt Nam đến đ&acirc;y để giải ph&oacute;ng d&acirc;n tộc ch&uacute;ng t&ocirc;i. Ch&uacute;ng t&ocirc;i vẫn coi họ đến đ&acirc;y để cứu sống người d&acirc;n của ch&uacute;ng t&ocirc;i. Điều đ&oacute; c&oacute; &yacute; nghĩa lớn đối với ch&uacute;ng t&ocirc;i&rdquo;.&Ocirc;ng cho biết đ&atilde; n&ecirc;u vấn đề n&agrave;y với người đồng cấp Singapore Ng Eng Hen khi dự Đối thoại Shangri-La tuần trước, v&agrave; y&ecirc;u cầu bộ trưởng quốc ph&ograve;ng Singapore th&ocirc;ng tin tới Thủ tướng L&yacute; Hiển Long để sửa sai b&igrave;nh luận của m&igrave;nh.</p>\r\n', 'https://znews-photo.zadn.vn/w660/Uploaded/lce_cqdjw/2019_06_06/6438.jpg', '2019-06-20', 2, 'singapore', 1, 161, 1, 2, '');

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
(2, 'meomeo@gmail.com', '$2b$10$ociXiCMIbp3NmltD2S9DMekQ0UDsQtAfVBPqF4qJTMla50tvHY7va', 'Mèo Con', '2019-06-19', 2, 0),
(3, 'admin@gmail.com', '$2b$10$3Rde9Ghocitj5t43npMjuumyu/c01AsAg0n9B58HpWQYw8NLo/cwm', 'Admin', '2019-06-10', 9, 0);

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
ALTER TABLE `post` ADD FULLTEXT KEY `title` (`title`,`short_content`,`content`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
