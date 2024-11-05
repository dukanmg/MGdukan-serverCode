const dbutil=require('../test_db');

(async() =>{
    let sqlQuery=`select * from "branch"`;
    let data=[]
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        console.log(result.rows);
        if(result.rowCount>0)
            {
                await dbutil.commit(client);
    
            }
    }
    catch(error)
    {
        console.log("model-branch --> getbranchdetails()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
})();