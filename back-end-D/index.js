const express= require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const multer= require('multer');
const helmet= require('helmet');
const morgan= require('morgan');
const path= require('path');
const xlsx= require('xlsx');
const socketio = require('socket.io');




const authMiddleware= require('./middleware/authMiddleware.js');

const userController= require('./controllers/userController.js');
const chamcongController= require('./controllers/chamcongController.js');
const phancongController = require('./controllers/phancongController.js')
const checkinoutController = require('./controllers/checkinoutController.js')
const congtyController= require('./controllers/congtyController.js');

const thongbaoController = require('./controllers/thongbaoController.js')
const insuranceController = require('./controllers/insuranceController.js')
const hopdongController = require('./controllers/hopdongController.js')
const chucvuController = require('./controllers/chucvuController.js')
const phongbanController = require('./controllers/phongbanController.js')
const duanController = require('./controllers/duanController.js')

const authRoutes = require('./routes/authRoutes');
const duanRoutes = require('./routes/duanRoutes');

const phancongRoutes = require('./routes/phancongRoutes');
const userRoutes = require('./routes/userRoutes');
const chucvuRoutes = require('./routes/chucvuRoutes');
const bangcapRoutes = require('./routes/bangcapRouters.js')
const phongbanRoutes = require('./routes/phongbanRoutes');
const bonusRoutes= require('./routes/khenthuongRoutes.js');
const kyluatRoutes= require('./routes/kyluatRoutes.jsx');
const baohiemRoutes= require('./routes/baohiemRoutes.js');
const chamcongRoutes= require('./routes/chamcongRoutes.js');
const lichsuchucvuRoutes= require('./routes/lichsuchucvuRoutes.js');
const hopdongRoutes = require('./routes/hopdongRoutes');
const checkinoutRoutes = require('./routes/checkinoutRoutes.js');
const thongbaoRoutes = require('./routes/thongbaoRoutes.js')
const bangluongRoutes = require('./routes/bangluongRoutes.js');
const insuranceRoutes = require('./routes/insuranceRoutes.js')
const congtyRoutes= require('./routes/congtyRoutes.js')
const thietlapRoutes= require('./routes/thietlapRoutes.js')
const tonghopRoutes= require('./routes/tonghopRoutes.js')
const thaydoiluongRoutes= require('./routes/thaydoiluongRoutes.js')
const connectDatabase = require('./config/connect_database.js');


dotenv.config();




const app= express();

//middleware
app.use(express.json()); //middleware phan tich va xu ly yeu cau http
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extends: true }));// ngan chan post qua 30mb
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname,"public/assets")));

// File Storage
const storage= multer.diskStorage({
    destination: function( req, file, cb){
        cb(null,'public/assets')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
});

const upload= multer({ storage: storage});
//CONNECT DATABASE
connectDatabase();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:9001",
        methods: ["GET", "POST","PUT"]
      }
});
io.on('connection', (socket) => {   
    // Xử lý các sự kiện của máy khách tại đây    
    socket.on('disconnect', () => {      
    });
  });
  app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use((req, res, next) => {
  req.io = io; // Gắn phiên bản io vào đối tượng request
  next();
});
//middleware
app.use(express.json()); //middleware phan tich va xu ly yeu cau http
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extends: true }));// ngan chan post qua 30mb
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname,"public/assets")));

// ...

// Khởi động máy chủ
const PORT = process.env.PORT || 9001;
server.listen(PORT, () => {
  console.log('Server PORT is', PORT);
});
//ROUTES
app.post('/api/admin/danhsachnhanvien/create', authMiddleware.verifyTokenIsAdmin,upload.single("hinhanh"), userController.createUser )
app.put('/api/admin/danhsachnhanvien/:id/update', authMiddleware.verifyTokenIsAdmin, upload.single("hinhanh"), userController.updateUser);
app.post(`/api/admin/chamcong/import`, authMiddleware.verifyTokenIsAdmin, upload.single('fileImport'), chamcongController.importFile);
app.post('/api/admin/luongtoithieu/create', authMiddleware.verifyTokenIsAdmin,upload.single('TenFile'), congtyController.createLuongToiThieu);
app.put('/api/admin/luongtoithieu/:id/update', authMiddleware.verifyTokenIsAdmin, upload.single('TenFile'), congtyController.updateLuongToiThieu)
app.get('/api/admin/download/:fileName', authMiddleware.verifyTokenIsAdmin,(req, res)=>{
    try {
        const fileName = req.params.fileName;
        const filePath = __dirname+ '/public/assets/' + fileName;
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error(err);
                res.status(404).json({
                    error: 'File not found.'
                }
                );
            }
        });
        
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})
app.use('/api', authRoutes);
app.use('/api/admin', thaydoiluongRoutes)
app.use('/api/admin', thietlapRoutes);
app.use('/api/admin', lichsuchucvuRoutes);
app.use('/api/admin',userRoutes);
app.use('/api/admin', chucvuRoutes);
app.use('/api/admin', phongbanRoutes);
app.use('/api/admin', hopdongRoutes);
app.use('/api/admin', bangcapRoutes)
app.use('/api/admin', bonusRoutes);
app.use('/api/admin', kyluatRoutes);
app.use('/api/admin', baohiemRoutes);
app.use('/api/admin', chamcongRoutes);
app.use('/api/admin', phancongRoutes);
app.use('/api/admin', thongbaoRoutes);
app.use('/api/admin', congtyRoutes);
app.use('/api/admin', bangluongRoutes);
app.use('/api/admin', tonghopRoutes);
app.use('/api/user/chamcong/:id', checkinoutRoutes, checkinoutController.getInOut);
app.use('/api/user/contract/:id', hopdongRoutes, hopdongController.getHopDongByIdHieuLuc);
app.use('/api/user', insuranceRoutes);
app.use('/api/user', congtyRoutes);
app.use('/api/user', hopdongRoutes);
app.use('/api/user', baohiemRoutes);
app.use('/api/user/notification/:id', thongbaoRoutes, thongbaoController.getNotificationByIdNhanVien);
app.use('/api/user/notificationunread/:id', thongbaoRoutes, thongbaoController.getNotificationUnReadByIdNhanVien);
app.use('/api/user/updatethongbao/:id/:tieude/:thoigiangui', thongbaoRoutes, thongbaoController.updateNotificationReaded);
app.use('/api/user/danhsachnhanvien/:id', userRoutes, userController.getUserInformation);
app.use('/api/user/nhanvienphongban/:id', userRoutes, userController.getUserbyIDPhongBan);
app.use('/api/user/changepassword/:email', userRoutes, userController.ChangePassword);
app.use('/api/user/nhanvienchucvu/:id', chucvuRoutes, chucvuController.getNhanVienChucVu);
app.use('/api/user/getidbyname/:hoten', userRoutes, userController.getIDbyName);

app.use('/api/user/updatephancong/:id', phancongRoutes,(req, res) => {
    phancongController.updatePhanCong(req, res, req.io);
  }); 
  app.use('/api/user/phancongnhanvien', phancongRoutes, (req, res) => {
    phancongController.CreatePhanCong(req, res, req.io);
  });
  app.use('/api/user/xoaphancong/:idcongviec', phancongRoutes, (req, res) => {
    phancongController.deleteCongViec(req, res, req.io);
  });
  app.use('/api/user/xoacongviec/:tencongviec/:ngayphancong', phancongRoutes, (req, res) => {
    phancongController.deleteCongViecbyName(req, res, req.io);
  });
app.use('/api/user/addphancong', phancongRoutes, phancongController.AddPhanCong);
app.use('/api/user/phancong/:emailnhanvien/:ngayPhanCong/:ngayBatDau', phancongRoutes, phancongController.getDanhSachCongViec);
app.use('/api/user/danhgianhanvien/:idcongviec', phancongRoutes,(req, res) => {
    phancongController.danhgiaCongViec(req, res, req.io);
  });app.use('/api/user/laydatachamcong/:id', chamcongRoutes, chamcongController.getHistoryById);
  app.use('/api/user/duan/:tenphongban', duanRoutes, duanController.getDanhSachDuAn);
app.use('/api/user/addproject/:tenphongban', duanRoutes, duanController.CreateDuAn);
app.use('/api/user/getduan/:idproject', duanRoutes, duanController.getDuAnbyID);
app.use('/api/user/updateproject/:idproject', duanRoutes, duanController.updateDuAnbyID);
app.use('/api/user/getphancongbyidnhanvien/:idnhanvien',phancongRoutes, phancongController.getPhanCongcByIdNhanVien)













