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


const getRole=(req,res)=>{
    roleService.getrole(req.body.id).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.send(err)
    })
}
const roleCtrl={addRole,getRole}
module.exports={roleCtrl}