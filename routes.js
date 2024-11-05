const router=require('express').Router();
const admin = require('./controller/controller-admin')

//check
router.get('/check',(req,res)=>{
    res.send('server ready and running')
})

// Admin Table

router.post('/getadmindatabyid', admin.getadmindatabyid)
router.post('/createadmin',admin.createadmin)
router.post('/updateadmin',admin.updateadmin)
router.post('/deleteadmin',admin.deleteadmin)

module.exports=router;