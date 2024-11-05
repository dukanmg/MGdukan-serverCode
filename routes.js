const router=require('express').Router();
// const user=require('./controller/controller-user')
// const spreadsheet=require('./controller/controller-spreadsheet')

//check
router.get('/check',(req,res)=>{
    res.send('server ready and running')
})

module.exports=router;