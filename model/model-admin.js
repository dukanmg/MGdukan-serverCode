const dbutil=require('../dbUtills')




module.exports.getadmindatabyid=async(adminid)=>{
    let sqlQuery=`SELECT * FROM public.admin where admin_id='${adminid}'`;
    let data=[]
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            await dbutil.commit(client);
            return result;
        }
        return {rowCount:-1};
    }
    catch(error)
    {
        console.log("model-user --> getadmindatabyid()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}




module.exports.createadmin=async(colname,coldata)=>{
    let sqlQuery=`INSERT INTO public.admin ${colname} VALUES ${coldata}`;
    let data=[]
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            await dbutil.commit(client);

        }
        return result;
    }
    catch(error)
    {
        console.log("model-user --> createadmin()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}




module.exports.updateadmin=async(adminid,newstr)=>{
    let sqlQuery=`UPDATE public.admin SET ${newstr} WHERE admin_id='${adminid}'`;
    let data=[]
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            await dbutil.commit(client);

        }
        return result;
    }
    catch(error)
    {
        console.log("model-user --> updateadmin()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}



module.exports.deleteadmin=async(adminid,newstr)=>{
    let sqlQuery=`DELETE FROM public.admin WHERE admin_id='${adminid}'`;
    console.log(sqlQuery)
    let data=[]
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            await dbutil.commit(client);

        }
        return result;
    }
    catch(error)
    {
        console.log("model-user --> deleteadmin()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}