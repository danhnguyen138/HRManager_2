const Sequelize= require('sequelize');



const sequelize= new Sequelize('hrm_database','root','',{
    host:'localhost',
    dialect:"mysql",
    port:3306,
    logging: false
})

const connectDatabase= async()=>{
    sequelize.authenticate().then(()=>{
        console.log("Database has been connected")
    }).catch((err)=>console.log("Has some wrong :"+err))
};
module.exports= connectDatabase;