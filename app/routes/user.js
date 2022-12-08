const { userCtrl,}=require('../ctrl/user');
// const isValid=require("../../Middleware/validation")
module.exports = (router)=>{

// router.get('/product/getAll', localProductCtrl.getProductsLocal);
// router.delete('/product/deleteLocal/:id', localProductCtrl.deleteProductLocal);
router.post('/user/create', userCtrl.createUser);
router.post('/user/login', userCtrl.loginUser);
router.get('/user/getById/:id', userCtrl.getUserbyId);

// router.put('/product/updateLocal', localProductCtrl.updateProductLocal);

}
