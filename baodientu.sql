-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 20, 2019 lúc 07:58 AM
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
(1, 'Điện Thoại'),
(2, 'Máy Ảnh'),
(3, 'Laptop'),
(4, 'Phần Cứng Máy Tính'),
(5, 'Thiết bị Công Nghệ');

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
(15, 'meo', 9, 3, '2019-06-20 12:53:07'),
(16, 'meo con', 9, 3, '2019-06-20 12:53:13'),
(21, 'aaaaa', 9, 2, '2019-06-20 12:53:54');

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
  `id_author` int(11) NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `hotNews` int(11) NOT NULL DEFAULT '0' COMMENT '0: tin bình thường, 1: tin nổi bật',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0: chờ, 1: chờ xuất bản, 2: đã xuất bản, -1: từ chối',
  `cause_not_approved` varchar(200) DEFAULT '',
  `id_tag` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `post`
--

INSERT INTO `post` (`id`, `title`, `short_content`, `content`, `image`, `date_post`, `id_category`, `id_author`, `views`, `hotNews`, `status`, `cause_not_approved`, `id_tag`) VALUES
(9, '444444444444444', '4444444444444', '<p>44444444444444</p>\r\n', '/public/image/Dn1iP.jpg', '2019-06-20', 1, 2, 7, 0, 2, '', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `nameTag` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tag`
--

INSERT INTO `tag` (`id`, `nameTag`) VALUES
(1, 'default'),
(2, 'Công nghệ'),
(3, 'Laptop'),
(4, 'Phần mềm'),
(5, 'Phần cứng');

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
  ADD KEY `id_author` (`id_author`),
  ADD KEY `id_tag` (`id_tag`);
ALTER TABLE `post` ADD FULLTEXT KEY `title` (`title`,`short_content`,`content`);

--
-- Chỉ mục cho bảng `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `post_ibfk_3` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `post_ibfk_4` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
