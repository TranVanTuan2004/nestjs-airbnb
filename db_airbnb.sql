DROP DATABASE IF EXISTS db_airbnb;
CREATE DATABASE IF NOT EXISTS db_airbnb;

use db_airbnb;

CREATE TABLE IF NOT EXISTS NguoiDung(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    pass_word VARCHAR(255),
    phone VARCHAR(255),
    birth_day VARCHAR(255),
    gender VARCHAR(50),
    hinh_anh VARCHAR(255),
    role VARCHAR(50),
    isDeleted BOOLEAN
);

	CREATE TABLE IF NOT EXISTS ViTri(
	id INT PRIMARY KEY AUTO_INCREMENT,
    ten_vi_tri VARCHAR(255),
    tinh_thanh VARCHAR(255),
    quoc_gia INT,
	hinh_anh VARCHAR(255),
    isDeleted BOOLEAN
);
    
      CREATE TABLE IF NOT EXISTS Phong(
	id INT PRIMARY KEY AUTO_INCREMENT,
    ten_phong VARCHAR(255),
    khach INT,
	phong_ngu INT,
    giuong INT,
    phong_tam INT,
    mo_ta VARCHAR(255),
    gia_tien INT,
    may_giat BOOLEAN,
    ban_la BOOLEAN,
    tivi BOOLEAN,
    dieu_hoa BOOLEAN,
    wifi BOOLEAN,
    bep BOOLEAN,
    do_xe BOOLEAN,
    ho_boi BOOLEAN,
    ban_ui BOOLEAN,
    hinh_anh VARCHAR(255),
    nguoi_tao INT,
    vi_tri INT,
    FOREIGN KEY(nguoi_tao) REFERENCES NguoiDung(id),
    FOREIGN KEY(vi_tri) REFERENCES ViTri(id),
    isDeleted BOOLEAN
);  


    
  CREATE TABLE IF NOT EXISTS DatPhong(
	id INT PRIMARY KEY AUTO_INCREMENT,
    ma_phong INT,
    ngay_den DATETIME,
	ngay_di DATETIME,
    so_luong_khach INT,
    ma_nguoi_dat INT,
    FOREIGN KEY(ma_phong) REFERENCES Phong(id),
    FOREIGN KEY(ma_nguoi_dat) REFERENCES NguoiDung(id),
    isDeleted BOOLEAN
);
    
        
    
    
  CREATE TABLE IF NOT EXISTS BinhLuan(
	id INT PRIMARY KEY AUTO_INCREMENT,
	ngay_binh_luan timestamp DEFAULT CURRENT_TIMESTAMP,
    noi_dung VARCHAR(255),
    sao_binh_luan INT,
	ma_phong INT,
	ma_nguoi_binh_luan INT,
	FOREIGN KEY(ma_phong) REFERENCES Phong(id),
	FOREIGN KEY(ma_nguoi_binh_luan) REFERENCES NguoiDung(id),
    isDeleted BOOLEAN
);
    
        
    
    
    
    -- Chèn dữ liệu vào bảng NguoiDung
INSERT INTO NguoiDung (name, email, pass_word, phone, birth_day, gender, role, isDeleted)
VALUES
    ('Nguyen Van A', 'nguyenvana@example.com', 'password123', '123456789', '1990-01-01', 'Male', 'User', FALSE),
    ('Tran Thi B', 'tranthib@example.com', 'password456', '987654321', '1992-05-10', 'Female', 'User', FALSE),
    ('Le Van C', 'levanc@example.com', 'password789', '456123789', '1985-11-15', 'Male', 'Admin', FALSE),
    ('Pham Thi D', 'phamthid@example.com', 'passwordabc', '321654987', '1988-09-20', 'Female', 'User', FALSE),
    ('Hoang Van E', 'hoangvane@example.com', 'passwordxyz', '987321654', '1995-03-25', 'Male', 'User', FALSE),
    ('Nguyen Thi F', 'nguyenthif@example.com', 'password123', '456789123', '1993-07-05', 'Female', 'User', FALSE),
    ('Tran Van G', 'tranvang@example.com', 'password456', '789321654', '1987-04-08', 'Male', 'User', FALSE),
    ('Le Thi H', 'lethih@example.com', 'password789', '987123456', '1991-02-15', 'Female', 'Admin', FALSE),
    ('Pham Van I', 'phamvani@example.com', 'passwordabc', '321987654', '1994-06-30', 'Male', 'User', FALSE),
    ('Hoang Thi K', 'hoangthik@example.com', 'passwordxyz', '123987456', '1989-08-12', 'Female', 'User', FALSE);
    
    
-- Chèn dữ liệu vào bảng ViTri
INSERT INTO ViTri(ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh, isDeleted)
VALUES
    ('Khu vực A', 'Thành phố A', 84, 'location1.jpg', FALSE),
    ('Khu vực B', 'Thành phố B', 84, 'location2.jpg', FALSE),
    ('Khu vực C', 'Thành phố C', 84, 'location3.jpg', FALSE),
    ('Khu vực D', 'Thành phố D', 84, 'location4.jpg', FALSE),
    ('Khu vực E', 'Thành phố E', 84, 'location5.jpg', FALSE),
    ('Khu vực F', 'Thành phố F', 84, 'location6.jpg', FALSE),
    ('Khu vực G', 'Thành phố G', 84, 'location7.jpg', FALSE),
    ('Khu vực H', 'Thành phố H', 84, 'location8.jpg', FALSE),
    ('Khu vực I', 'Thành phố I', 84, 'location9.jpg', FALSE),
    ('Khu vực K', 'Thành phố K', 84, 'location10.jpg', FALSE);

    
        -- Chèn dữ liệu vào bảng Phong
INSERT INTO Phong (ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, nguoi_tao, vi_tri, isDeleted)
VALUES
    ('Phòng Deluxe', 2, 1, 1, 1, 'Phòng sang trọng với đầy đủ tiện nghi', 200000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, 'image1.jpg', 1, 1, FALSE),
    ('Phòng Twin', 2, 1, 2, 1, 'Phòng tiện nghi cho hai người', 150000, TRUE , FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, 'image2.jpg', 1, 1, FALSE),
    ('Phòng Suite', 3, 2, 2, 2, 'Phòng cao cấp với không gian rộng lớn', 300000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 'image3.jpg', 1, 1, FALSE),
    ('Phòng Family', 4, 2, 2, 2, 'Phòng phù hợp cho gia đình', 250000, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, 'image4.jpg', 1, 1, FALSE),
    ('Phòng Studio', 2, 1, 1, 1, 'Phòng thuận tiện cho người độc thân', 120000, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, 'image5.jpg', 1, 1, FALSE),
    ('Phòng VIP', 2, 1, 1, 1, 'Phòng sang trọng và tiện nghi cao cấp', 400000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 'image6.jpg', 1, 1, FALSE),
    ('Phòng Standard', 1, 1, 1, 1, 'Phòng tiêu chuẩn cho một người', 100000, TRUE, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, 'image7.jpg', 1, 1, FALSE),
    ('Phòng Executive', 2, 1, 1, 1, 'Phòng dành cho doanh nhân', 180000, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, 'image8.jpg', 1, 1, FALSE),
    ('Phòng Superior', 2, 1, 1, 1, 'Phòng cao cấp với không gian thoáng đãng', 160000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 'image9.jpg', 1, 1, FALSE),
    ('Phòng Duplex', 2, 1, 1, 1, 'Phòng hai tầng hiện đại và tiện nghi', 220000, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 'image10.jpg',1, 1, FALSE);


-- Chèn dữ liệu vào bảng DatPhong
INSERT INTO DatPhong (ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat, isDeleted)
VALUES
    (1, '2023-07-15 12:00:00', '2023-07-17 10:00:00', 2, 1, FALSE),
    (2, '2023-08-20 14:00:00', '2023-08-25 12:00:00', 3, 2, FALSE),
    (3, '2023-09-05 10:00:00', '2023-09-08 08:00:00', 1, 3, FALSE),
    (4, '2023-07-25 16:00:00', '2023-07-28 14:00:00', 2, 4, FALSE),
    (5, '2023-08-10 08:00:00', '2023-08-15 06:00:00', 4, 5, FALSE),
    (6, '2023-09-18 20:00:00', '2023-09-22 18:00:00', 2, 6, FALSE),
    (7, '2023-07-30 14:00:00', '2023-08-02 12:00:00', 3, 7, FALSE),
    (8, '2023-08-05 12:00:00', '2023-08-07 10:00:00', 2, 8, FALSE),
    (9, '2023-09-10 10:00:00', '2023-09-13 08:00:00', 1, 9, FALSE),
    (10, '2023-07-20 16:00:00', '2023-07-23 14:00:00', 2, 10, FALSE);
    
    
    
-- Chèn dữ liệu vào bảng BinhLuan
INSERT INTO BinhLuan (ngay_binh_luan, noi_dung, sao_binh_luan, ma_phong, ma_nguoi_binh_luan, isDeleted)
VALUES
    ('2023-07-15 09:30:00', 'Phòng rất đẹp và sạch sẽ.', 4, 1, 1, FALSE),
    ('2023-08-22 16:45:00', 'Dịch vụ tuyệt vời, nhân viên thân thiện.', 5, 2, 2, FALSE),
    ('2023-09-06 11:20:00', 'Giá cả hợp lý, phòng tiện nghi.', 4, 3, 3, FALSE),
    ('2023-07-27 14:10:00', 'Không gian phòng thoáng đãng, view đẹp.', 5, 4, 4, FALSE),
    ('2023-08-12 07:50:00', 'Phòng sạch sẽ và rất thoải mái.', 4, 5, 5, FALSE),
    ('2023-09-20 19:30:00', 'Dịch vụ chuyên nghiệp, đáng giá tiền.', 5, 6, 6, FALSE),
    ('2023-08-01 13:15:00', 'Phòng rất ấm cúng và tiện nghi.', 4, 7, 7, FALSE),
    ('2023-08-07 10:40:00', 'Nhân viên nhiệt tình và chu đáo.', 5, 8, 8, FALSE),
    ('2023-09-12 08:25:00', 'Phòng thoải mái và có đầy đủ tiện nghi.', 4, 9, 9, FALSE),
    ('2023-07-23 17:55:00', 'Không gian phòng sang trọng và đẹp mắt.', 5, 10, 10, FALSE);

    
    
    
    
    
