const db = require('../models');
const xlsx = require('xlsx');
const moment = require('moment');
const importFile = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                error: 'Không có file uploaded'
            })
        }
        const {
            dateStart, dateEnd
        } = req.body;
        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const excelTime = (sheetData[1].CHECKTIME);
        if (!sheetData[0].CHECKTIME)
            return res.status(400).json({
                error: "File excel không phải file chấm công"
            })
        const dataValues = [];

        //lọc file theo ngay
        const dataCheck = []
        sheetData.forEach(item => {
            let timestamp = item.CHECKTIME;
            let getDate = new Date((timestamp - 25569) * 86400 * 1000)
            let date = getDate.toISOString().slice(0, 10);
            if (date >= dateStart && date <= dateEnd) {
                dataCheck.push({
                    user: item.USERID,
                    checktime: timestamp
                })
            }
        })
        dataCheck.forEach(item => {
            let user = item.user;
            let check = 0;
            if (dataValues.length === 0) {
                dataValues.push({
                    user: user,
                    date: new Map()
                })
            }
            let location = -1;
            for (let i = 0; i < dataValues.length; i++) {
                if (user === dataValues[i].user) {
                    location = i;
                    check = 1;
                }
            }
            if (check === 0) {
                dataValues.push({
                    user: user,
                    date: new Map()
                })
            }
            if (location == -1) {
                location = dataValues.length - 1
            }
            const timestamp = item.checktime;
            let getDate = new Date((timestamp - 25569) * 86400 * 1000)
            const dateChoice = getDate.toISOString().slice(0, 10);
            if (!dataValues[location].date.has(dateChoice)) {
                dataValues[location].date.set(dateChoice, [getDate])
            } else {
                dataValues[location].date.get(dateChoice).push(getDate)
            }
            // let timestamp = item.CHECKTIME;
            // let getDate = new Date((timestamp - 25569) * 86400 * 1000)
            // const date = getDate.toISOString().slice(0, 10);// Lay ngay thang nam
            // // if (!dateMap.has(date) && date)
            // if (date >= dateStart && date <= dateEnd && !dateMap.has(date)) {
            //     dateMap.set(date, [])
            // }

        })


        dataValues.forEach(
            (item) => {
                item.date.forEach(
                    async (item2, key) => {
                        let giayGioVao = item2[0].getTime();
                        let giayGioRa = item2[item2.length - 1].getTime();

                        let tongGiay = Math.floor((giayGioRa - giayGioVao) / 1000);
                        let soGio = tongGiay / 3600;

                        await db.ChamCong.create({
                            idNhanVien: item.user,
                            Ngay: key,
                            GioVao: item2[0].toISOString().slice(11, 19),
                            GioRa: item2[item2.length - 1].toISOString().slice(11, 19),
                            TongGio: soGio
                        }
                        )
                    }
                )
            }
        )

        db.LichSuChamCong.create({
            TenFile: file.originalname,
            NgayBatDau: dateStart,
            NgayKetThuc: dateEnd
        })
        res.status(200).json({
            msg: 'File đã được import thành công'
        })


      
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getHistory = async (req, res) => {
    try {
        const getHistory = await db.LichSuChamCong.findAll();
        res.status(200).json({
            getHistory
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getHistoryById = async (req, res) => {
    try {
        
        const { id } = req.params;
        const getHistory = await db.ChamCong.findAll({
            where: {
                idNhanVien: id
            }
        });
        res.status(200).json({
            getHistory
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const tinhTongGio = (time1, time2) => {
    const [hours1, minutes1, seconds1] = time1.split(':');
    const [hours2, minutes2, seconds2] = time2.split(':');
    let tongGioSangPhut1 = (parseFloat(minutes1) + parseFloat(seconds1) / 60) / 60;
    let hoursChange1 = parseFloat(hours1) + tongGioSangPhut1;
    let tongGioSangPhut2 = (parseFloat(minutes2) + parseFloat(seconds2) / 60) / 60;
    let hoursChange2 = parseFloat(hours2) + tongGioSangPhut2;
    return hoursChange2 - hoursChange1

}
const createChamCong = async (req, res) => {
    try {
        const {
            idNhanVien,
            Ngay,
            GioVao,
            GioRa
        } = req.body;
        const date = new Date(Ngay);
        const isoDate = date.toISOString(date);

        let TongGio = tinhTongGio(GioVao, GioRa)


        const newChamCong = await db.ChamCong.create({
            idNhanVien: idNhanVien,
            Ngay: isoDate,
            GioVao: GioVao,
            GioRa: GioRa,
            TongGio: TongGio
        });

        res.status(200).json({
            msg: 'Thông tin chấm công đã được tạo thành công',
            newChamCong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateChamCong = async (req, res) => {
    try {
        const {
            id,
            idNhanVien,
            Ngay,
            GioVao,
            GioRa,
        } = req.body;
        const date = new Date(Ngay);
        const isoDate = date.toISOString(date);
        let TongGio = tinhTongGio(GioVao, GioRa)
        await db.ChamCong.update({

            Ngay: isoDate,
            GioVao: GioVao,
            GioRa: GioRa,
            TongGio: TongGio
        }, {
            where: {
                id: id
            }
        });
        res.status(200).json({
            msg: 'Giờ đã được cập nhật thành công',
            newChamCong: {
                id: id,
                GioVao: GioVao,
                GioRa: GioRa,
                TongGio: TongGio
            }
        })
    } catch (error) {
        res.status(500).json({

        })
    }
}
module.exports = {
    importFile,
    getHistory,
    getHistoryById,
    createChamCong,
    updateChamCong
}