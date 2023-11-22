const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(password)
        const user = await db.NhanVien.findOne({
            where: {
                Email: email,
            },
            include:[{
                model: db.PhongBan
            }, {model: db.ChucVu}]
        });
        if (!user) return res.status(400).json({ error: "Tài khoản không tồn tại" });

        const isMatch= await bcrypt.compare(password, user.Password);
        if (!isMatch) return res.status(400).json({error:"Mật khẩu sai "});

        const token = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET);
        delete user.Password;

       
        res.status(200).json({ user, token })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const password=async(req, res)=>{
    try{
        const {
            password
        }= req.body;
        const salt= await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password, salt);
        res.status(201).json(passwordHash);
    } catch(err){
        res.status(500).json({err: err.message});
    }
}
module.exports = { login, password }