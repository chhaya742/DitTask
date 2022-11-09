// const {getProduct,getDataFromAPi,createProduct, getProductById,deleteProduct,updateProduct} = require('../ctrl/student');
const { bigCProductCtrl,localProductCtrl}=require('../ctrl/product');
const isValid=require("../../Middleware/validation")
module.exports = (router)=>{

// Local
router.get('/product/getAll', localProductCtrl.getProductsLocal);
router.delete('/product/deleteLocal/:id', localProductCtrl.deleteProductLocal);
router.post('/product/createLocal', localProductCtrl.createProductLocal);
router.put('/product/updateLocal', localProductCtrl.updateProductLocal);
router.get('/product/getByIdLo/:id', localProductCtrl.getProductByIdLocal);

// Live
router.post('/product/create', bigCProductCtrl.createProductLive);
router.get('/product/list', bigCProductCtrl.getDataFromAPi);
router.delete('/product/delete/:id', bigCProductCtrl.deleteProductLive);
router.get('/product/getById/:id', bigCProductCtrl.getProductByIdLive);
router.put('/product/update/:id', bigCProductCtrl.updateProductLive);
}
