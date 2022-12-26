require("../../database/schema/roles");
const roleService=require("../service/role")

const addRole=(req,res)=>{
    console.log(req.body);
    roleService.creatRole(req.body).then((result)=>{
res.send(result)
    }).catch((err)=>{
console.log(err);
    })
}

const roleCtrl={addRole}
module.exports={roleCtrl}