-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2023 at 09:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hrm_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `bacluong`
--

CREATE TABLE `bacluong` (
  `id` int(11) NOT NULL,
  `idNgachLuong` int(11) DEFAULT NULL,
  `TenBacLuong` varchar(100) DEFAULT NULL,
  `TienLuong` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bacluong`
--

INSERT INTO `bacluong` (`id`, `idNgachLuong`, `TenBacLuong`, `TienLuong`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'I', '5000000', '2023-06-10 15:06:07', '2023-06-11 00:40:25'),
(2, 1, 'II', '6000000', '2023-06-10 15:06:07', '2023-06-11 00:40:25'),
(3, 1, 'III', '7000000', '2023-06-10 15:06:07', '2023-06-11 00:40:25'),
(7, 2, 'I', '7600000', '2023-06-10 15:06:21', '2023-06-10 15:06:21'),
(8, 2, 'II', '8400000', '2023-06-10 15:06:22', '2023-06-10 15:06:22'),
(9, 2, 'III', '9700000', '2023-06-10 15:06:22', '2023-06-10 15:06:22'),
(10, 3, 'I', '10500000', '2023-06-10 15:06:35', '2023-06-10 15:06:35'),
(11, 3, 'II', '12000000', '2023-06-10 15:06:35', '2023-06-10 15:06:35'),
(12, 3, 'III', '15000000', '2023-06-10 15:06:35', '2023-06-10 15:06:35'),
(13, 3, 'IV', '17000000', '2023-06-10 15:06:35', '2023-06-10 15:06:35'),
(14, 3, 'V', '21000000', '2023-06-10 15:06:35', '2023-06-10 15:06:35');

-- --------------------------------------------------------

--
-- Table structure for table `bangcap`
--

CREATE TABLE `bangcap` (
  `id` int(11) NOT NULL,
  `MaBC` varchar(20) NOT NULL,
  `SoQD` varchar(20) NOT NULL,
  `TenBC` varchar(50) NOT NULL,
  `LoaiBC` varchar(50) NOT NULL,
  `ChuyenNganh` varchar(50) NOT NULL,
  `HinhThuc` varchar(50) DEFAULT NULL,
  `XepLoai` varchar(30) NOT NULL,
  `DiemSo` varchar(10) NOT NULL,
  `NgayKy` date NOT NULL,
  `HieuLuc` varchar(20) NOT NULL,
  `ToChuc` varchar(50) NOT NULL,
  `DiaChi` varchar(100) NOT NULL,
  `GhiChu` varchar(255) DEFAULT NULL,
  `TrangThai` varchar(20) NOT NULL DEFAULT 'Còn hiệu lực',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bangluong`
--

CREATE TABLE `bangluong` (
  `id` int(11) NOT NULL,
  `Thang` varchar(20) NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date NOT NULL,
  `NgayCongChuan` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bangluong`
--

INSERT INTO `bangluong` (`id`, `Thang`, `NgayBatDau`, `NgayKetThuc`, `NgayCongChuan`, `createdAt`, `updatedAt`) VALUES
(3, '2023-06', '2023-06-01', '2023-06-30', 26, '2023-06-12 19:27:50', '2023-06-12 19:27:50');

-- --------------------------------------------------------

--
-- Table structure for table `baohiem`
--

CREATE TABLE `baohiem` (
  `id` int(11) NOT NULL,
  `MaBH` varchar(30) DEFAULT NULL,
  `MaYT` varchar(30) DEFAULT NULL,
  `NoiKhamYT` varchar(100) DEFAULT NULL,
  `NgayBD` date DEFAULT NULL,
  `LuongDongBaoHiem` varchar(30) DEFAULT NULL,
  `TrangThai` varchar(30) DEFAULT 'Đang tham gia',
  `GhiChu` varchar(255) DEFAULT NULL,
  `NguoiThucHien` varchar(255) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `baohiem`
--

INSERT INTO `baohiem` (`id`, `MaBH`, `MaYT`, `NoiKhamYT`, `NgayBD`, `LuongDongBaoHiem`, `TrangThai`, `GhiChu`, `NguoiThucHien`, `idNhanVien`, `createdAt`, `updatedAt`) VALUES
(1, '', '', '', '0000-00-00', '', 'Chưa tham gia', NULL, '', 1, '2023-06-10 15:08:46', '2023-06-10 15:08:46'),
(2, '', '', '', '0000-00-00', '', 'Chưa tham gia', NULL, '', 2, '2023-06-10 15:09:56', '2023-06-10 15:09:56');

-- --------------------------------------------------------

--
-- Table structure for table `chamcong`
--

CREATE TABLE `chamcong` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `Ngay` varchar(255) NOT NULL,
  `GioVao` time DEFAULT NULL,
  `GioRa` time DEFAULT NULL,
  `TongGio` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chucvu`
--

CREATE TABLE `chucvu` (
  `id` int(11) NOT NULL,
  `MaChucVu` varchar(10) NOT NULL,
  `TenChucVu` varchar(30) NOT NULL,
  `MoTa` text DEFAULT NULL,
  `NhiemVu` varchar(255) DEFAULT NULL,
  `NguoiTao` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chucvu`
--

INSERT INTO `chucvu` (`id`, `MaChucVu`, `TenChucVu`, `MoTa`, `NhiemVu`, `NguoiTao`, `createdAt`, `updatedAt`) VALUES
(1, 'MCV4096258', 'Trưởng phòng', '', 'Có chức năng quản lý phòng ban', 'Nguyễn Văn An', '2023-06-10 15:07:11', '2023-06-10 15:07:11'),
(2, 'MCV4096330', 'Giám đốc', '', 'Có chức năng hướng dẫn công việc cho nhân viên', 'Nguyễn Văn An', '2023-06-10 15:07:17', '2023-06-10 15:07:17'),
(3, 'MCV4096393', 'Phó giám đốc', '', 'Có chức năng quản lý phòng ban 1', 'Nguyễn Văn An', '2023-06-10 15:07:23', '2023-06-10 15:07:23'),
(7, 'MCV4096692', 'Nhân viên', '', 'Có chức năng làm việc tạo năng suất cho công ty', 'Nguyễn Văn An', '2023-06-10 15:07:53', '2023-06-10 15:07:53');

-- --------------------------------------------------------

--
-- Table structure for table `congty`
--

CREATE TABLE `congty` (
  `id` int(11) NOT NULL,
  `MaDonVi` varchar(50) NOT NULL,
  `TenDonVi` varchar(100) NOT NULL,
  `DiaChi` varchar(255) NOT NULL,
  `DienThoai` varchar(20) NOT NULL,
  `Fax` varchar(20) NOT NULL,
  `Website` varchar(100) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `LinhVuc` varchar(50) NOT NULL,
  `MaSoThue` varchar(30) NOT NULL,
  `NganHang` varchar(50) NOT NULL,
  `SoTK` varchar(30) NOT NULL,
  `DiaBan` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `congty`
--

INSERT INTO `congty` (`id`, `MaDonVi`, `TenDonVi`, `DiaChi`, `DienThoai`, `Fax`, `Website`, `Email`, `LinhVuc`, `MaSoThue`, `NganHang`, `SoTK`, `DiaBan`, `createdAt`, `updatedAt`) VALUES
(1, '080006253876', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0866748561', '0866748591', 'https://www.perfect.com.vn', 'sales@perfect.com.vn', 'Thương mại', '1100803080', 'Ngân hàng Sài Gòn Thương Tín - Sacombank', '070005293896', 'II', '2023-06-10 15:03:37', '2023-06-10 15:04:37');

-- --------------------------------------------------------

--
-- Table structure for table `duan`
--

CREATE TABLE `duan` (
  `id` int(11) NOT NULL,
  `TenDuAn` varchar(250) NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date DEFAULT NULL,
  `idNhanVien` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`idNhanVien`)),
  `PhongBan` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `duan`
--

INSERT INTO `duan` (`id`, `TenDuAn`, `NgayBatDau`, `NgayKetThuc`, `idNhanVien`, `PhongBan`, `createdAt`, `updatedAt`) VALUES
(0, 'dự án 12', '2023-06-13', '2023-06-14', '[\"Nguyễn Văn  A\"]', 'Phòng tuyển dụng', '2023-06-12 10:39:30', '2023-06-12 10:53:28');

-- --------------------------------------------------------

--
-- Table structure for table `hopdong`
--

CREATE TABLE `hopdong` (
  `id` int(11) NOT NULL,
  `idDaiDien` int(11) NOT NULL,
  `HoTenA` varchar(100) DEFAULT NULL,
  `ChucVuA` varchar(100) DEFAULT NULL,
  `DaiDienA` varchar(100) DEFAULT NULL,
  `DiaChiA` varchar(100) DEFAULT NULL,
  `SoDTA` varchar(100) DEFAULT NULL,
  `ThoiGianLV` varchar(100) DEFAULT NULL,
  `HoTenB` varchar(100) DEFAULT NULL,
  `CCCDB` varchar(100) DEFAULT NULL,
  `NgayCapB` varchar(100) DEFAULT NULL,
  `TaiB` varchar(100) DEFAULT NULL,
  `DiaChiLV` varchar(255) DEFAULT NULL,
  `MaHD` varchar(100) DEFAULT NULL,
  `TenHD` varchar(100) DEFAULT NULL,
  `LoaiHD` varchar(100) DEFAULT NULL,
  `ThoiHan` varchar(100) DEFAULT NULL,
  `LuongChinh` varchar(100) DEFAULT NULL,
  `LuongChinhThucTap` varchar(100) DEFAULT NULL,
  `LuongChinhThuViec` varchar(100) DEFAULT NULL,
  `NgachLuong` varchar(100) DEFAULT NULL,
  `BacLuong` varchar(100) DEFAULT NULL,
  `GhiChu` text DEFAULT NULL,
  `HetHan` varchar(255) DEFAULT NULL,
  `HinhThucTra` varchar(255) DEFAULT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `TrangThai` varchar(30) NOT NULL DEFAULT 'Còn hiệu lực',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hopdong`
--

INSERT INTO `hopdong` (`id`, `idDaiDien`, `HoTenA`, `ChucVuA`, `DaiDienA`, `DiaChiA`, `SoDTA`, `ThoiGianLV`, `HoTenB`, `CCCDB`, `NgayCapB`, `TaiB`, `DiaChiLV`, `MaHD`, `TenHD`, `LoaiHD`, `ThoiHan`, `LuongChinh`, `LuongChinhThucTap`, `LuongChinhThuViec`, `NgachLuong`, `BacLuong`, `GhiChu`, `HetHan`, `HinhThucTra`, `idNhanVien`, `TrangThai`, `createdAt`, `updatedAt`) VALUES
(11, 2, 'Đặng Hoàng Linh', 'Giám đốc', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0392312341', 'Theo quy định công ty', 'Nguyễn Văn  A', '301271990321', '2003-02-03', 'Công An Tỉnh Long An', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', 'MHD418193217', 'Hợp đồng lao động', 'Hợp đồng không xác định thời hạn', '', '', '', '', 'Nhân viên', 'III', '', NULL, 'Trả lương theo bậc lương', 1, 'Hết hiệu lực', '2023-06-10 17:34:32', '2023-06-10 17:52:09'),
(12, 2, 'Đặng Hoàng Linh', 'Giám đốc', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0392312341', 'Theo quy định công ty', 'Nguyễn Văn  A', '301271990321', '2003-02-03', 'Công An Tỉnh Long An', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', 'MHD419714882', 'Hợp đồng lao động', 'Thỏa thuận thực tập', '3 Tháng', '', '2000000', '', '', '', '', '2023-09-10', '', 1, 'Hết hiệu lực', '2023-06-10 17:55:38', '2023-06-10 17:55:41'),
(13, 2, 'Đặng Hoàng Linh', 'Giám đốc', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0392312341', 'Theo quy định công ty', 'Nguyễn Văn  A', '301271990321', '2003-02-03', 'Công An Tỉnh Long An', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', 'MHD419791052', 'Hợp đồng lao động', 'Thoả thuận thử việc', '3 Tháng', '', '', '5000000', '', '', '', '2023-09-10', '', 1, 'Hết hiệu lực', '2023-06-10 17:56:51', '2023-06-10 17:56:54'),
(14, 2, 'Đặng Hoàng Linh', 'Giám đốc', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0392312341', 'Theo quy định công ty', 'Nguyễn Văn  A', '301271990321', '2003-02-03', 'Công An Tỉnh Long An', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', 'MHD419816965', 'Hợp đồng lao động', 'Hợp đồng không xác định thời hạn', '', '', '', '', 'Nhân viên', 'IV', '', NULL, 'Trả lương theo bậc lương', 1, 'Hết hiệu lực', '2023-06-10 17:57:11', '2023-06-11 00:29:44'),
(15, 2, 'Đặng Hoàng Linh', 'Giám đốc', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0392312341', 'Theo quy định công ty', 'Nguyễn Văn  A', '301271990321', '2003-02-03', 'Công An Tỉnh Long An', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', 'MHD443406785', 'Hợp đồng lao động', 'Hợp đồng không xác định thời hạn', '', '', '', '', 'Nhân viên', 'III', '', NULL, 'Trả lương theo bậc lương', 1, 'Hết hiệu lực', '2023-06-11 00:30:23', '2023-06-11 00:30:34'),
(16, 2, 'Đặng Hoàng Linh', 'Giám đốc', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0392312341', 'Theo quy định công ty', 'Nguyễn Văn  A', '301271990321', '2003-02-03', 'Công An Tỉnh Long An', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', 'MHD443436241', 'Hợp đồng lao động', 'Thoả thuận thử việc', '3 Tháng', '', '', '5000000', '', '', '', '2023-09-10', '', 1, 'Hết hiệu lực', '2023-06-11 00:30:49', '2023-06-12 02:48:29'),
(17, 1, 'Nguyễn Văn  A', 'Giám đốc', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0905175283', 'Theo quy định công ty', 'Đặng Hoàng Linh', '301271912312', '2023-06-06', 'Công An Tỉnh Long An', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', 'MHD443927095', 'Hợp đồng lao động', 'Hợp đồng không xác định thời hạn', '', '', '', '', 'Nhân viên', 'IV', '', NULL, 'Trả lương theo bậc lương', 2, 'Hết hiệu lực', '2023-06-11 00:39:10', '2023-06-11 00:57:29'),
(18, 1, 'Nguyễn Văn  A', 'Giám đốc', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0905175283', 'Theo quy định công ty', 'Đặng Hoàng Linh', '301271912312', '2023-06-06', 'Công An Tỉnh Long An', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', 'MHD445051430', 'Hợp đồng lao động', 'Hợp đồng không xác định thời hạn', '', '', '', '', 'Nhân viên', 'III', '', NULL, 'Trả lương theo bậc lương', 2, 'Còn hiệu lực', '2023-06-11 00:57:46', '2023-06-11 00:57:46'),
(19, 2, 'Đặng Hoàng Linh', 'Giám đốc', 'Công Ty Phần Mềm Hoàn Hảo', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', '0392312341', 'Theo quy định công ty', 'Nguyễn Văn  A', '301271990321', '2003-02-03', 'Công An Tỉnh Long An', '122 Nguyễn Sỹ Sách, Phường 15, Quận Tân Bình', 'MHD538621602', 'Hợp đồng lao động', 'Hợp đồng xác định thời hạn', '6 Tháng', '', '', '', 'Nhân viên', 'III', '', '2023-12-11', 'Trả lương theo bậc lương', 1, 'Còn hiệu lực', '2023-06-12 02:57:16', '2023-06-12 02:57:16');

-- --------------------------------------------------------

--
-- Table structure for table `khenthuongcanhan`
--

CREATE TABLE `khenthuongcanhan` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `MaKT` varchar(30) NOT NULL,
  `SoQD` varchar(30) DEFAULT NULL,
  `NgayQD` date NOT NULL,
  `CanCu` text DEFAULT NULL,
  `LyDo` text DEFAULT NULL,
  `HinhThuc` text DEFAULT NULL,
  `Thang` int(11) DEFAULT NULL,
  `TienThuong` varchar(40) DEFAULT NULL,
  `NguoiBanHanh` varchar(80) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khenthuongtapthe`
--

CREATE TABLE `khenthuongtapthe` (
  `id` int(11) NOT NULL,
  `MaKT` varchar(30) NOT NULL,
  `TrangThai` varchar(30) DEFAULT 'Lên kế hoạch',
  `SoQD` varchar(30) DEFAULT NULL,
  `NgayQD` date NOT NULL,
  `NgayKT` date NOT NULL,
  `CanCu` text DEFAULT NULL,
  `LyDo` text DEFAULT NULL,
  `idDoiTuong` int(11) DEFAULT NULL,
  `HinhThuc` text DEFAULT NULL,
  `NguonChi` varchar(255) DEFAULT NULL,
  `Thang` int(11) DEFAULT NULL,
  `TienThuong` varchar(40) DEFAULT NULL,
  `NguoiBanHanh` varchar(80) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kyluat`
--

CREATE TABLE `kyluat` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `ThoiGian` date DEFAULT NULL,
  `SuViec` varchar(100) DEFAULT NULL,
  `MoTa` text DEFAULT NULL,
  `DiaDiem` varchar(100) DEFAULT NULL,
  `ChungKien` varchar(100) DEFAULT NULL,
  `TuongThuat` text DEFAULT NULL,
  `HinhThucKyLuat` text DEFAULT NULL,
  `SoQD` varchar(30) DEFAULT NULL,
  `NguoiBanHanh` varchar(80) DEFAULT NULL,
  `NgayQD` date NOT NULL,
  `TrangThai` varchar(30) DEFAULT 'Lên kế hoạch',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lichsucapnhatbaohiem`
--

CREATE TABLE `lichsucapnhatbaohiem` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `TruongTD` varchar(40) DEFAULT NULL,
  `NoiDungCu` varchar(100) DEFAULT NULL,
  `NoiDungMoi` varchar(100) DEFAULT NULL,
  `LyDo` varchar(100) DEFAULT NULL,
  `idThayDoi` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lichsuchamcong`
--

CREATE TABLE `lichsuchamcong` (
  `id` int(11) NOT NULL,
  `TenFile` varchar(50) NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lichsuphongban`
--

CREATE TABLE `lichsuphongban` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `TenPhongBanCu` varchar(50) DEFAULT NULL,
  `TenChucVuCu` varchar(50) DEFAULT NULL,
  `TenPhongBanMoi` varchar(50) DEFAULT NULL,
  `TenChucVuMoi` varchar(50) DEFAULT NULL,
  `LyDo` text DEFAULT NULL,
  `SoQD` varchar(30) DEFAULT NULL,
  `NgayQD` date NOT NULL,
  `NguoiBanHanh` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lichsuphongban`
--

INSERT INTO `lichsuphongban` (`id`, `idNhanVien`, `TenPhongBanCu`, `TenChucVuCu`, `TenPhongBanMoi`, `TenChucVuMoi`, `LyDo`, `SoQD`, `NgayQD`, `NguoiBanHanh`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Phòng tuyển dụng', 'Giám đốc', 'Phòng tuyển dụng', 'Trưởng phòng', '', '', '2023-06-12', NULL, '2023-06-12 07:51:55', '2023-06-12 07:51:55'),
(2, 1, 'Phòng tuyển dụng', 'Giám đốc', 'Phòng tuyển dụng', 'Nhân viên', '', '', '2023-06-12', NULL, '2023-06-12 07:53:04', '2023-06-12 07:53:04');

-- --------------------------------------------------------

--
-- Table structure for table `luongtoithieu`
--

CREATE TABLE `luongtoithieu` (
  `id` int(11) NOT NULL,
  `SoQD` varchar(30) NOT NULL,
  `TenQD` varchar(255) NOT NULL,
  `VungIThang` varchar(30) DEFAULT NULL,
  `VungIIThang` varchar(30) DEFAULT NULL,
  `VungIIIThang` varchar(30) DEFAULT NULL,
  `VungIVThang` varchar(30) DEFAULT NULL,
  `VungIGio` varchar(30) DEFAULT NULL,
  `VungIIGio` varchar(30) DEFAULT NULL,
  `VungIIIGio` varchar(30) DEFAULT NULL,
  `VungIVGio` varchar(30) DEFAULT NULL,
  `TenFile` varchar(255) DEFAULT NULL,
  `NoiDungLQ` text DEFAULT NULL,
  `TrangThai` varchar(30) DEFAULT 'Đang sử dụng',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `luongtoithieu`
--

INSERT INTO `luongtoithieu` (`id`, `SoQD`, `TenQD`, `VungIThang`, `VungIIThang`, `VungIIIThang`, `VungIVThang`, `VungIGio`, `VungIIGio`, `VungIIIGio`, `VungIVGio`, `TenFile`, `NoiDungLQ`, `TrangThai`, `createdAt`, `updatedAt`) VALUES
(1, '38/2022/NĐ-CP', 'Quy định mức lương tối thiểu đối với người lao động làm việc theo hợp đồng lao động', '4680000', '4160000', '3640000', '3250000', '22500', '20000', '17500', '15600', 'nghi-dinh-38-2022-nd-cp-muc-luong-toi-thieu-doi-voi-nguoi-lao-dong-lam-viec-theo-hdld.doc', NULL, 'Đang sử dụng', '2023-06-10 15:05:17', '2023-06-10 15:05:17');

-- --------------------------------------------------------

--
-- Table structure for table `ngachluong`
--

CREATE TABLE `ngachluong` (
  `id` int(11) NOT NULL,
  `MaNgachLuong` varchar(20) NOT NULL,
  `TenNgachLuong` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ngachluong`
--

INSERT INTO `ngachluong` (`id`, `MaNgachLuong`, `TenNgachLuong`, `createdAt`, `updatedAt`) VALUES
(1, 'MNL409520981', 'Nhân viên', '2023-06-10 15:05:24', '2023-06-10 15:05:24'),
(2, 'MNL409524975', 'Trainer', '2023-06-10 15:05:33', '2023-06-10 15:05:33'),
(3, 'MNL409533374', 'Giám đốc', '2023-06-10 15:05:47', '2023-06-10 15:05:47');

-- --------------------------------------------------------

--
-- Table structure for table `nguoiphuthuoc`
--

CREATE TABLE `nguoiphuthuoc` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `HoTen` varchar(255) DEFAULT NULL,
  `QuanHe` varchar(255) DEFAULT NULL,
  `SoDT` varchar(255) DEFAULT NULL,
  `NgaySinh` varchar(255) DEFAULT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `id` int(11) NOT NULL,
  `MaSoThue` varchar(30) DEFAULT NULL,
  `isBacLuong` tinyint(1) DEFAULT 0,
  `LuongChinh` varchar(255) DEFAULT NULL,
  `idBacLuong` varchar(30) DEFAULT NULL,
  `LoaiNV` varchar(30) DEFAULT NULL,
  `HoTen` varchar(255) NOT NULL,
  `NgaySinh` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `GioiTinh` varchar(255) NOT NULL,
  `HonNhan` varchar(50) NOT NULL,
  `DanToc` varchar(50) NOT NULL,
  `QuocTich` varchar(50) NOT NULL,
  `TonGiao` varchar(50) NOT NULL,
  `SoDT` varchar(30) NOT NULL,
  `QueQuan` varchar(60) NOT NULL,
  `NoiO` varchar(60) NOT NULL,
  `HoKhau` varchar(60) NOT NULL,
  `CCCD` varchar(30) NOT NULL,
  `NgayCap` date NOT NULL,
  `NoiCap` varchar(60) NOT NULL,
  `TinhTrang` varchar(255) NOT NULL DEFAULT 'Đang Làm Việc',
  `HinhAnh` varchar(255) NOT NULL DEFAULT 'public/assets/avatar.jpg',
  `isAdmin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idPhongBan` int(11) DEFAULT NULL,
  `idChucVu` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`id`, `MaSoThue`, `isBacLuong`, `LuongChinh`, `idBacLuong`, `LoaiNV`, `HoTen`, `NgaySinh`, `Email`, `Password`, `GioiTinh`, `HonNhan`, `DanToc`, `QuocTich`, `TonGiao`, `SoDT`, `QueQuan`, `NoiO`, `HoKhau`, `CCCD`, `NgayCap`, `NoiCap`, `TinhTrang`, `HinhAnh`, `isAdmin`, `createdAt`, `updatedAt`, `idPhongBan`, `idChucVu`) VALUES
(1, '1100803080', 1, '0', '3', 'Nhân viên chính thức', 'Nguyễn Văn  A', '2023-06-08', 'danhnguyen1382@gmail.com', '$2b$10$xDvxDTBpMGUA/foNCY9ikONM.PO349ZCnS5NC3pRnGGiYOWHzsWL.', 'Nữ', 'Đã kết hôn', 'Kinh', 'Việt Nam', 'Không', '0905175283', '40/1, Đường số 1, Phường 4, Tân An, Long An', '40/1, Đường số 1, Phường 4, Tân An, Long An', '32 Ấp Bình An A - Lợi Bình Nhơn -Tân An - Long An', '301271990321', '2003-02-03', 'Công An Tỉnh Long An', 'Đang Làm Việc', '1.jpg', 0, '2023-06-10 15:08:46', '2023-06-12 07:53:04', 2, 7),
(2, '1100803080432', 0, '5000000', NULL, 'Nhân viên chính thức', 'Đặng Hoàng Linh', '2023-06-14', 'hoanglinh@gmail.com', '$2b$10$uv6bessz44Bwb9IgK587UeOetQYwXOQDBJRbkIqz6LDKDL0wpfyWe', 'Nữ', 'Độc thân', 'Kinh', 'Việt Nam', 'Không', '0392312341', '40/1, Đường số 1, Phường 4, Tân An, Long An', '40/1, Đường số 1, Phường 4, Tân An, Long An', '32 Ấp Bình An A - Lợi Bình Nhơn -Tân An - Long An', '301271912312', '2023-06-06', 'Công An Tỉnh Long An', 'Đang Làm Việc', 'z3210589223775_63a5c5a8f80339c86c14863515b58c74.jpg', 0, '2023-06-10 15:09:56', '2023-06-12 07:51:55', 2, 1),
(3, '2134345562', 0, '10000000', NULL, 'Nhân viên chính thức', 'Nguyễn Quang Huy', '2023-06-08', 'admin@gmail.com', '$2b$10$xDvxDTBpMGUA/foNCY9ikONM.PO349ZCnS5NC3pRnGGiYOWHzsWL.', 'Nam', 'Độc thân', 'Kinh', 'Việt Nam', 'Không', '0912753576', 'Đà Nẵng', 'Tân Phú HCM', 'Đà Nẵng', '203123232345', '2023-04-10', 'CA Đà Nẵng', 'Đang Làm Việc', 'z3210589223775_63a5c5a8f80339c86c14863515b58c74.jpg', 1, '0000-00-00 00:00:00', '2023-06-12 06:27:08', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `nhanvienbangluong`
--

CREATE TABLE `nhanvienbangluong` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `idBangLuong` int(11) DEFAULT NULL,
  `HinhThuc` varchar(40) DEFAULT NULL,
  `NgachLuong` varchar(40) DEFAULT NULL,
  `BacLuong` varchar(40) DEFAULT NULL,
  `MucLuong` varchar(100) DEFAULT NULL,
  `KhenThuong` varchar(100) DEFAULT NULL,
  `TongGioLam` varchar(50) DEFAULT NULL,
  `TongNgayLam` varchar(50) DEFAULT NULL,
  `TienSauTinhCong` varchar(50) DEFAULT NULL,
  `BHXHNV` varchar(50) DEFAULT NULL,
  `BHYTNV` varchar(50) DEFAULT NULL,
  `TongBHNV` varchar(50) DEFAULT NULL,
  `BHXHDN` varchar(50) DEFAULT NULL,
  `BHYTDN` varchar(50) DEFAULT NULL,
  `TongBHXH` varchar(50) DEFAULT NULL,
  `TienSauTruBH` varchar(50) DEFAULT NULL,
  `SoNguoiPhuThuoc` varchar(50) DEFAULT NULL,
  `TienSauGiamTru` varchar(50) DEFAULT NULL,
  `TienDongThue` varchar(50) DEFAULT NULL,
  `ThucLanh` varchar(50) DEFAULT NULL,
  `GhiChu` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvienbangluong`
--

INSERT INTO `nhanvienbangluong` (`id`, `idNhanVien`, `idBangLuong`, `HinhThuc`, `NgachLuong`, `BacLuong`, `MucLuong`, `KhenThuong`, `TongGioLam`, `TongNgayLam`, `TienSauTinhCong`, `BHXHNV`, `BHYTNV`, `TongBHNV`, `BHXHDN`, `BHYTDN`, `TongBHXH`, `TienSauTruBH`, `SoNguoiPhuThuoc`, `TienSauGiamTru`, `TienDongThue`, `ThucLanh`, `GhiChu`, `createdAt`, `updatedAt`) VALUES
(7, 1, 3, 'Trả lương theo lương chính', '', '', '0', '0', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'Nhân viên', '2023-06-12 19:27:50', '2023-06-12 19:27:50'),
(8, 2, 3, 'Trả lương theo lương chính', '', '', '5000000', '0', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'Nhân viên', '2023-06-12 19:27:50', '2023-06-12 19:27:50'),
(9, 3, 3, 'Trả lương theo lương chính', '', '', '10000000', '0', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'Nhân viên', '2023-06-12 19:27:50', '2023-06-12 19:27:50');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvienthongbao`
--

CREATE TABLE `nhanvienthongbao` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `idThongBao` int(11) DEFAULT NULL,
  `TrangThai` varchar(50) DEFAULT 'Chưa xem',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvienthongbao`
--

INSERT INTO `nhanvienthongbao` (`id`, `idNhanVien`, `idThongBao`, `TrangThai`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 'Đã xem', '2023-06-12 06:39:43', '2023-06-12 07:47:16'),
(2, 1, 1, 'Đã xem', '2023-06-12 06:39:43', '2023-06-12 08:41:28'),
(3, 2, 2, 'Đã xem', '2023-06-12 07:17:25', '2023-06-12 07:44:40'),
(4, 1, 2, 'Đã xem', '2023-06-12 07:17:25', '2023-06-12 08:41:17'),
(5, 2, 3, 'Đã xem', '2023-06-12 07:22:15', '2023-06-12 08:12:40'),
(6, 1, 3, 'Đã xem', '2023-06-12 07:22:15', '2023-06-12 08:41:44'),
(7, 1, 4, 'Đã xem', '2023-06-12 08:45:43', '2023-06-12 08:54:28'),
(8, 2, 4, 'Đã xem', '2023-06-12 08:45:43', '2023-06-12 08:56:41'),
(9, 1, 5, 'Đã xem', '2023-06-12 08:47:57', '2023-06-12 08:54:58'),
(10, 2, 5, 'Đã xem', '2023-06-12 08:47:57', '2023-06-12 08:58:24'),
(11, 1, 6, 'Đã xem', '2023-06-12 08:53:12', '2023-06-12 08:54:44'),
(12, 2, 6, 'Đã xem', '2023-06-12 08:53:12', '2023-06-12 08:58:32'),
(13, 1, 7, 'Đã xem', '2023-06-12 08:53:58', '2023-06-12 08:54:53'),
(14, 2, 7, 'Đã xem', '2023-06-12 08:53:58', '2023-06-12 08:58:45'),
(15, 1, 8, 'Đã xem', '2023-06-12 09:01:31', '2023-06-12 09:13:39'),
(16, 2, 8, 'Đã xem', '2023-06-12 09:01:31', '2023-06-12 09:02:26'),
(17, 1, 9, 'Đã xem', '2023-06-12 09:05:26', '2023-06-12 09:43:33'),
(18, 2, 9, 'Đã xem', '2023-06-12 09:05:26', '2023-06-12 09:06:42'),
(19, 1, 10, 'Đã xem', '2023-06-12 09:08:56', '2023-06-12 09:47:41'),
(20, 2, 10, 'Đã xem', '2023-06-12 09:08:56', '2023-06-12 09:09:33'),
(21, 1, 11, 'Đã xem', '2023-06-12 09:47:55', '2023-06-12 09:52:46'),
(22, 2, 11, 'Đã xem', '2023-06-12 09:47:55', '2023-06-12 14:22:42'),
(23, 1, 12, 'Đã xem', '2023-06-12 09:52:23', '2023-06-12 10:35:10'),
(24, 2, 12, 'Đã xem', '2023-06-12 09:52:23', '2023-06-12 14:22:35'),
(25, 1, 13, 'Đã xem', '2023-06-12 10:34:42', '2023-06-12 10:35:20'),
(26, 2, 13, 'Đã xem', '2023-06-12 10:34:42', '2023-06-12 14:22:28');

-- --------------------------------------------------------

--
-- Table structure for table `phancong`
--

CREATE TABLE `phancong` (
  `id` int(11) NOT NULL,
  `NgayBatDau` date NOT NULL,
  `NgayKetThuc` date DEFAULT NULL,
  `TongKPI` float DEFAULT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phancong`
--

INSERT INTO `phancong` (`id`, `NgayBatDau`, `NgayKetThuc`, `TongKPI`, `idNhanVien`, `createdAt`, `updatedAt`) VALUES
(1, '2023-06-12', '2023-06-17', NULL, 1, '2023-06-12 07:53:18', '2023-06-12 07:53:18'),
(2, '2023-06-19', '2023-06-24', NULL, 1, '2023-06-12 10:50:09', '2023-06-12 10:50:09');

-- --------------------------------------------------------

--
-- Table structure for table `phancongtheongay`
--

CREATE TABLE `phancongtheongay` (
  `id` int(11) NOT NULL,
  `NgayPhanCong` varchar(255) NOT NULL,
  `TenCV` varchar(40) NOT NULL,
  `DanhGia` varchar(255) DEFAULT NULL,
  `TienDo` varchar(250) NOT NULL,
  `KPI` varchar(255) DEFAULT NULL,
  `idPhanCong` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phancongtheongay`
--

INSERT INTO `phancongtheongay` (`id`, `NgayPhanCong`, `TenCV`, `DanhGia`, `TienDo`, `KPI`, `idPhanCong`, `createdAt`, `updatedAt`) VALUES
(6, '2023-06-11T17:00:00.000Z', 'ewqeqw', NULL, 'Đã hoàn thành', '90', 1, '2023-06-12 10:45:14', '2023-06-12 14:23:36'),
(14, '2023-06-12T17:00:00.000Z', 'dự án 12', NULL, 'Đã hoàn thành', '99', 1, '2023-06-12 10:53:29', '2023-06-12 14:23:48'),
(15, '2023-06-13T17:00:00.000Z', 'dự án 12', NULL, 'Đang thực hiện', '88', 1, '2023-06-12 10:53:29', '2023-06-12 19:56:38'),
(16, '2023-06-14T17:00:00.000Z', 'dsadasfas', NULL, 'Đang thực hiện', NULL, 1, '2023-06-12 14:23:12', '2023-06-12 14:23:18');

-- --------------------------------------------------------

--
-- Table structure for table `phongban`
--

CREATE TABLE `phongban` (
  `id` int(11) NOT NULL,
  `MaPB` varchar(30) NOT NULL,
  `TenPB` varchar(30) NOT NULL,
  `SoLuong` varchar(30) NOT NULL,
  `SiSo` varchar(30) NOT NULL DEFAULT '0',
  `SoDienThoai` varchar(30) NOT NULL,
  `DiaChi` varchar(100) NOT NULL,
  `MoTa` text NOT NULL,
  `NgayThanhLap` date NOT NULL,
  `NguoiDaiDien` varchar(50) NOT NULL,
  `TrangThai` varchar(50) NOT NULL DEFAULT 'Đang hoạt động',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phongban`
--

INSERT INTO `phongban` (`id`, `MaPB`, `TenPB`, `SoLuong`, `SiSo`, `SoDienThoai`, `DiaChi`, `MoTa`, `NgayThanhLap`, `NguoiDaiDien`, `TrangThai`, `createdAt`, `updatedAt`) VALUES
(1, 'MPB409599949', 'Phòng hành chính', '20', '0', '0905471387', '131 Tân Cảng, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh 700000, Việt Nam', '', '2023-06-10', '', 'Đang hoạt động', '2023-06-10 15:06:46', '2023-06-10 15:06:46'),
(2, 'MPB409608522', 'Phòng tuyển dụng', '12', '2', '0905471356', '131 Tân Cảng, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh 700000, Việt Nam', '', '2023-06-10', '', 'Đang hoạt động', '2023-06-10 15:06:54', '2023-06-12 07:53:04'),
(3, 'MPB409616704', 'Phòng Sales', '23', '0', '0973231321', 'TP Hồ Chí Minh 2', '', '2023-06-10', '', 'Đang hoạt động', '2023-06-10 15:07:03', '2023-06-10 15:07:03');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230320195421-create-nhan-vien.js'),
('20230322145102-create-phongban.js'),
('20230322151624-create-chucvu.js'),
('20230322153614-create-bangcap.js'),
('20230322161304-create-hopdong.js'),
('20230322162212-create-kyluat.js'),
('20230323030742-create-khenthuongtapthe.js'),
('20230323175804-add_idPhongBan_to_nhanvien.js'),
('20230324031218-add_idNhanVien_to_BangCap.js'),
('20230411042104-create-baohiem.js'),
('20230411044427-create-khenthuongcanhan.js'),
('20230412153808-create-duan.js'),
('20230412153808-create-phancong.js'),
('20230413074037-create-phancongtheongay.js'),
('20230503161213-create-chamcong.js'),
('20230504151234-create-lichsuchamcong.js'),
('20230506153417-create-thongbao.js'),
('20230506154709-create-nhanvienthongbao.js'),
('20230511095159-add_column_idChucVu_to_nhanvien.js'),
('20230513082407-create-congty.js'),
('20230514012403-create-bangluong.js'),
('20230514013333-create-nhanvienbangluong.js'),
('20230517044319-create-lichsuphongban.js'),
('20230519085336-create-lichsucapnhatbaohiem.js'),
('20230529020130-create-thietlapthoigian.js'),
('20230529091313-create-tonghopngaycong.js'),
('20230530033439-create-thongsoluong.js'),
('20230604013626-create-luongtoithieu.js'),
('20230608084341-create-ngachluong.js'),
('2023060907-create-bacluong.js'),
('20230610191759-create-thaydoiluong.js'),
('20230612014102-create-nguoiphuthuoc.js');

-- --------------------------------------------------------

--
-- Table structure for table `thaydoiluong`
--

CREATE TABLE `thaydoiluong` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `HinhThucCu` varchar(100) DEFAULT NULL,
  `NgachLuongCu` varchar(100) DEFAULT NULL,
  `BacLuongCu` varchar(100) DEFAULT NULL,
  `TienLuongCu` varchar(100) DEFAULT NULL,
  `HinhThucMoi` varchar(100) DEFAULT NULL,
  `NgachLuongMoi` varchar(100) DEFAULT NULL,
  `BacLuongMoi` varchar(100) DEFAULT NULL,
  `TienLuongMoi` varchar(100) DEFAULT NULL,
  `LyDo` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thaydoiluong`
--

INSERT INTO `thaydoiluong` (`id`, `idNhanVien`, `HinhThucCu`, `NgachLuongCu`, `BacLuongCu`, `TienLuongCu`, `HinhThucMoi`, `NgachLuongMoi`, `BacLuongMoi`, `TienLuongMoi`, `LyDo`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Trả lương theo lương chính', '', '', '5000000', 'Trả lương theo bậc lương', 'Nhân viên', 'III', '', '', '2023-06-11 02:18:08', '2023-06-11 02:18:08'),
(2, 1, 'Trả lương theo bậc lương', 'Nhân viên', 'III', '0', 'Trả lương theo lương chính', '', '', '5000000', '', '2023-06-11 02:18:46', '2023-06-11 02:18:46'),
(3, 1, 'Trả lương theo lương chính', '', '', '5000000', 'Trả lương theo lương chính', '', '', '6000000', '', '2023-06-11 02:19:20', '2023-06-11 02:19:20'),
(4, 2, 'Trả lương theo bậc lương', 'Nhân viên', 'III', '0', 'Trả lương theo bậc lương', 'Nhân viên', 'II', '', '', '2023-06-11 02:48:35', '2023-06-11 02:48:35'),
(5, 2, 'Trả lương theo bậc lương', 'Nhân viên', 'II', '0', 'Trả lương theo lương chính', '', '', '5000000', '', '2023-06-11 02:49:53', '2023-06-11 02:49:53'),
(6, 1, 'Trả lương theo lương chính', '', '', '6000000', 'Trả lương theo bậc lương', 'Nhân viên', 'III', '', '', '2023-06-12 01:36:32', '2023-06-12 01:36:32');

-- --------------------------------------------------------

--
-- Table structure for table `thietlapthoigian`
--

CREATE TABLE `thietlapthoigian` (
  `id` int(11) NOT NULL,
  `GioVao` time DEFAULT NULL,
  `GioRa` time DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thietlapthoigian`
--

INSERT INTO `thietlapthoigian` (`id`, `GioVao`, `GioRa`, `createdAt`, `updatedAt`) VALUES
(1, '00:00:00', '00:00:00', '2023-06-10 17:59:07', '2023-06-10 17:59:07');

-- --------------------------------------------------------

--
-- Table structure for table `thongbao`
--

CREATE TABLE `thongbao` (
  `id` int(11) NOT NULL,
  `TieuDe` varchar(50) NOT NULL,
  `NoiDung` text NOT NULL,
  `TrangThai` varchar(80) NOT NULL DEFAULT 'Chưa gửi',
  `ThoiGianGui` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thongbao`
--

INSERT INTO `thongbao` (`id`, `TieuDe`, `NoiDung`, `TrangThai`, `ThoiGianGui`, `createdAt`, `updatedAt`) VALUES
(1, 'thông báo số 1', '<p>thông báo nghỉ lễ</p>', 'Đã gửi', '2023-06-12 06:39:47', '2023-06-12 06:39:43', '2023-06-12 06:39:47'),
(2, 'thông báo 2', '<p>thông báo nghỉ </p>', 'Đã gửi', '2023-06-12 07:17:29', '2023-06-12 07:17:25', '2023-06-12 07:17:29'),
(3, 'thông báo 3', '<p>thông báo 3</p>', 'Đã gửi', '2023-06-12 07:22:17', '2023-06-12 07:22:15', '2023-06-12 07:22:17'),
(4, 'thông báo 4', '<p>thong báo 4</p>', 'Đã gửi', '2023-06-12 08:46:00', '2023-06-12 08:45:43', '2023-06-12 08:46:00'),
(5, 'Quyết định kỷ luật nhân viên đi trễ', '<p>kỷ luật</p>', 'Đã gửi', '2023-06-12 08:48:05', '2023-06-12 08:47:57', '2023-06-12 08:48:05'),
(6, 'Quyết định khen thưởng đạt KPI', '<p>khen thưởng</p>', 'Đã gửi', '2023-06-12 08:54:22', '2023-06-12 08:53:12', '2023-06-12 08:54:22'),
(7, 'Lab 2 Wireshark Lab: HTTP v8.0', '<p>lab</p>', 'Đã gửi', '2023-06-12 08:54:14', '2023-06-12 08:53:58', '2023-06-12 08:54:14'),
(8, 'wqewe', '<p>dsda</p>', 'Đã gửi', '2023-06-12 09:01:51', '2023-06-12 09:01:31', '2023-06-12 09:01:51'),
(9, 'nodejs', '<p>dsadsad</p>', 'Đã gửi', '2023-06-12 09:05:32', '2023-06-12 09:05:26', '2023-06-12 09:05:32'),
(10, 'teeeee', '<p>eeeeeeeeeeeeeee</p>', 'Đã gửi', '2023-06-12 09:08:59', '2023-06-12 09:08:56', '2023-06-12 09:08:59'),
(11, 'Quyết định khen thưởng đạt KPI', '<p>sdadsadad</p>', 'Đã gửi', '2023-06-12 09:48:01', '2023-06-12 09:47:55', '2023-06-12 09:48:01'),
(12, 'Quyết định kỷ luật nhân viên đi trễ', '<p>sadsdadsa</p>', 'Đã gửi', '2023-06-12 09:52:28', '2023-06-12 09:52:23', '2023-06-12 09:52:28'),
(13, 'Lab 2 Wireshark Lab: HTTP v8.0', '<p>lab2</p>', 'Đã gửi', '2023-06-12 10:34:53', '2023-06-12 10:34:42', '2023-06-12 10:34:53');

-- --------------------------------------------------------

--
-- Table structure for table `thongsoluong`
--

CREATE TABLE `thongsoluong` (
  `id` int(11) NOT NULL,
  `BHXHNV` float DEFAULT NULL,
  `BHYTNV` float DEFAULT NULL,
  `BHYTDN` float DEFAULT NULL,
  `BHXHDN` float DEFAULT NULL,
  `DinhMuc` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thongsoluong`
--

INSERT INTO `thongsoluong` (`id`, `BHXHNV`, `BHYTNV`, `BHYTDN`, `BHXHDN`, `DinhMuc`, `createdAt`, `updatedAt`) VALUES
(1, 0, 0, 0, 0, '0', '2023-06-12 06:16:26', '2023-06-12 06:16:26');

-- --------------------------------------------------------

--
-- Table structure for table `tonghopngaycong`
--

CREATE TABLE `tonghopngaycong` (
  `id` int(11) NOT NULL,
  `idNhanVien` int(11) DEFAULT NULL,
  `Thang` varchar(30) DEFAULT NULL,
  `NgayLamViec` varchar(100) DEFAULT NULL,
  `TongGio` varchar(30) DEFAULT NULL,
  `DiTre` varchar(30) DEFAULT NULL,
  `VeSom` varchar(30) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tonghopngaycong`
--

INSERT INTO `tonghopngaycong` (`id`, `idNhanVien`, `Thang`, `NgayLamViec`, `TongGio`, `DiTre`, `VeSom`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2023-06', '0', '0', '0', '0', '2023-06-10 18:51:56', '2023-06-10 18:51:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bacluong`
--
ALTER TABLE `bacluong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNgachLuong` (`idNgachLuong`);

--
-- Indexes for table `bangcap`
--
ALTER TABLE `bangcap`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaBC` (`MaBC`),
  ADD UNIQUE KEY `SoQD` (`SoQD`),
  ADD KEY `BangCap_idNhanVien_foreign_idx` (`idNhanVien`);

--
-- Indexes for table `bangluong`
--
ALTER TABLE `bangluong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `baohiem`
--
ALTER TABLE `baohiem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `chamcong`
--
ALTER TABLE `chamcong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `chucvu`
--
ALTER TABLE `chucvu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaChucVu` (`MaChucVu`),
  ADD UNIQUE KEY `TenChucVu` (`TenChucVu`);

--
-- Indexes for table `congty`
--
ALTER TABLE `congty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hopdong`
--
ALTER TABLE `hopdong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `khenthuongcanhan`
--
ALTER TABLE `khenthuongcanhan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `khenthuongtapthe`
--
ALTER TABLE `khenthuongtapthe`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaKT` (`MaKT`),
  ADD KEY `idDoiTuong` (`idDoiTuong`);

--
-- Indexes for table `kyluat`
--
ALTER TABLE `kyluat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `lichsucapnhatbaohiem`
--
ALTER TABLE `lichsucapnhatbaohiem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`),
  ADD KEY `idThayDoi` (`idThayDoi`);

--
-- Indexes for table `lichsuchamcong`
--
ALTER TABLE `lichsuchamcong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lichsuphongban`
--
ALTER TABLE `lichsuphongban`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `luongtoithieu`
--
ALTER TABLE `luongtoithieu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SoQD` (`SoQD`);

--
-- Indexes for table `ngachluong`
--
ALTER TABLE `ngachluong`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaNgachLuong` (`MaNgachLuong`);

--
-- Indexes for table `nguoiphuthuoc`
--
ALTER TABLE `nguoiphuthuoc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `MaSoThue` (`MaSoThue`),
  ADD KEY `NhanVien_idPhongBan_foreign_idx` (`idPhongBan`),
  ADD KEY `NhanVien_idChucVu_foreign_idx` (`idChucVu`);

--
-- Indexes for table `nhanvienbangluong`
--
ALTER TABLE `nhanvienbangluong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`),
  ADD KEY `idBangLuong` (`idBangLuong`);

--
-- Indexes for table `nhanvienthongbao`
--
ALTER TABLE `nhanvienthongbao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`),
  ADD KEY `idThongBao` (`idThongBao`);

--
-- Indexes for table `phancong`
--
ALTER TABLE `phancong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `phancongtheongay`
--
ALTER TABLE `phancongtheongay`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPhanCong` (`idPhanCong`);

--
-- Indexes for table `phongban`
--
ALTER TABLE `phongban`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaPB` (`MaPB`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `thaydoiluong`
--
ALTER TABLE `thaydoiluong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- Indexes for table `thietlapthoigian`
--
ALTER TABLE `thietlapthoigian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `thongbao`
--
ALTER TABLE `thongbao`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `thongsoluong`
--
ALTER TABLE `thongsoluong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tonghopngaycong`
--
ALTER TABLE `tonghopngaycong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idNhanVien` (`idNhanVien`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bacluong`
--
ALTER TABLE `bacluong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `bangcap`
--
ALTER TABLE `bangcap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bangluong`
--
ALTER TABLE `bangluong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `baohiem`
--
ALTER TABLE `baohiem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chamcong`
--
ALTER TABLE `chamcong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chucvu`
--
ALTER TABLE `chucvu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `congty`
--
ALTER TABLE `congty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hopdong`
--
ALTER TABLE `hopdong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `khenthuongcanhan`
--
ALTER TABLE `khenthuongcanhan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khenthuongtapthe`
--
ALTER TABLE `khenthuongtapthe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kyluat`
--
ALTER TABLE `kyluat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lichsucapnhatbaohiem`
--
ALTER TABLE `lichsucapnhatbaohiem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lichsuchamcong`
--
ALTER TABLE `lichsuchamcong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lichsuphongban`
--
ALTER TABLE `lichsuphongban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `luongtoithieu`
--
ALTER TABLE `luongtoithieu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ngachluong`
--
ALTER TABLE `ngachluong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `nguoiphuthuoc`
--
ALTER TABLE `nguoiphuthuoc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `nhanvienbangluong`
--
ALTER TABLE `nhanvienbangluong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `nhanvienthongbao`
--
ALTER TABLE `nhanvienthongbao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `phancong`
--
ALTER TABLE `phancong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `phancongtheongay`
--
ALTER TABLE `phancongtheongay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `phongban`
--
ALTER TABLE `phongban`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `thaydoiluong`
--
ALTER TABLE `thaydoiluong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `thietlapthoigian`
--
ALTER TABLE `thietlapthoigian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `thongbao`
--
ALTER TABLE `thongbao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `thongsoluong`
--
ALTER TABLE `thongsoluong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tonghopngaycong`
--
ALTER TABLE `tonghopngaycong`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bacluong`
--
ALTER TABLE `bacluong`
  ADD CONSTRAINT `bacluong_ibfk_1` FOREIGN KEY (`idNgachLuong`) REFERENCES `ngachluong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bangcap`
--
ALTER TABLE `bangcap`
  ADD CONSTRAINT `BangCap_idNhanVien_foreign_idx` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `baohiem`
--
ALTER TABLE `baohiem`
  ADD CONSTRAINT `baohiem_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `chamcong`
--
ALTER TABLE `chamcong`
  ADD CONSTRAINT `chamcong_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hopdong`
--
ALTER TABLE `hopdong`
  ADD CONSTRAINT `hopdong_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `khenthuongcanhan`
--
ALTER TABLE `khenthuongcanhan`
  ADD CONSTRAINT `khenthuongcanhan_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `khenthuongtapthe`
--
ALTER TABLE `khenthuongtapthe`
  ADD CONSTRAINT `khenthuongtapthe_ibfk_1` FOREIGN KEY (`idDoiTuong`) REFERENCES `phongban` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `kyluat`
--
ALTER TABLE `kyluat`
  ADD CONSTRAINT `kyluat_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lichsucapnhatbaohiem`
--
ALTER TABLE `lichsucapnhatbaohiem`
  ADD CONSTRAINT `lichsucapnhatbaohiem_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lichsucapnhatbaohiem_ibfk_2` FOREIGN KEY (`idThayDoi`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lichsuphongban`
--
ALTER TABLE `lichsuphongban`
  ADD CONSTRAINT `lichsuphongban_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `nguoiphuthuoc`
--
ALTER TABLE `nguoiphuthuoc`
  ADD CONSTRAINT `nguoiphuthuoc_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `chucvu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `NhanVien_idChucVu_foreign_idx` FOREIGN KEY (`idChucVu`) REFERENCES `chucvu` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `NhanVien_idPhongBan_foreign_idx` FOREIGN KEY (`idPhongBan`) REFERENCES `phongban` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `nhanvienbangluong`
--
ALTER TABLE `nhanvienbangluong`
  ADD CONSTRAINT `nhanvienbangluong_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nhanvienbangluong_ibfk_2` FOREIGN KEY (`idBangLuong`) REFERENCES `bangluong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nhanvienthongbao`
--
ALTER TABLE `nhanvienthongbao`
  ADD CONSTRAINT `nhanvienthongbao_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nhanvienthongbao_ibfk_2` FOREIGN KEY (`idThongBao`) REFERENCES `thongbao` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phancong`
--
ALTER TABLE `phancong`
  ADD CONSTRAINT `phancong_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phancongtheongay`
--
ALTER TABLE `phancongtheongay`
  ADD CONSTRAINT `phancongtheongay_ibfk_1` FOREIGN KEY (`idPhanCong`) REFERENCES `phancong` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `thaydoiluong`
--
ALTER TABLE `thaydoiluong`
  ADD CONSTRAINT `thaydoiluong_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tonghopngaycong`
--
ALTER TABLE `tonghopngaycong`
  ADD CONSTRAINT `tonghopngaycong_ibfk_1` FOREIGN KEY (`idNhanVien`) REFERENCES `nhanvien` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
