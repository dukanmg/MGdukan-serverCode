const admin=require('../model/model-admin')
const helper=require('../helper')


module.exports.getadmindatabyid=async(req,res)=>{
    let adminid=req.body.admin_id;
    try
    {
        let result=await admin.getadmindatabyid(adminid);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"admin details",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"details not found",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("admin controller --> getadmindatabyid()  error : ",error)
    }
}







module.exports.createadmin=async(req,res)=>{
        let key=Object.keys(req.body);
        let value=Object.values(req.body);
        let adminid=helper.generateUUID();

        let colname='',coldata='';
        for(let i=0;i<key.length;i++)
        {
            if(key[i]=='roletocheck'){}
            else
            {
                colname=colname+`${key[i]},`;
                coldata=coldata+`'${value[i]}',`
            }
        }
        colname=`(${colname}admin_id)`;
        coldata=`(${coldata}'${adminid}')`;


    try
    {
        let result=await admin.createadmin(colname,coldata);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"admin created",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"admin not created",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("admin controller --> createadmin()  error : ",error)
    }
}






module.exports.updateadmin=async(req,res)=>{
    try
    {
        let key=Object.keys(req.body);
        let value=Object.values(req.body);
        let adminid=req.body.admin_id;
        let str='';

        for(let i=0;i<key.length;i++)
        {
            if(key[i]!='admin_id' && key[i]!='created_at' && key[i]!='updated_at')
            {
                str=str+`${key[i]}='${value[i]}',`
            }
        }
        let newstr=str.substring(0,str.length-1)

        const currentDate = new Date();
        const customFormat = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
        newstr = newstr+`,updated_at='${customFormat}'`
        
        let result=await admin.updateadmin(adminid,newstr)
        if(result.rowCount>0)
        {
            return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    message:"admin updated",
                    data:result
                })
        }
        else
        {
            return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"admin not updated",
                    data:[]
                })
        }
    }
    catch(error)
    {
        console.log("user controller --> updateadmin() : ",error);
    }
}



module.exports.deleteadmin=async(req,res)=>{
    let adminid=req.body.admin_id;
    try
    {
        let result=await admin.deleteadmin(adminid);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"admin deleted",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"admin not deleted",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("admin controller --> deleteadmin()  error : ",error)
    }
}
