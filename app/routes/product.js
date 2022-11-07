// const {getProduct,getDataFromAPi,createProduct, getProductById,deleteProduct,updateProduct} = require('../ctrl/student');
const { bigCProductCtrl,local}=require('../ctrl/product');
const isValid=require("../../Middleware/validation")
module.exports = (router)=>{

router.get('/product/getAll', local.getProductsLocal);
router.delete('/product/deleteLocal', local.deleteProductLocal);
router.post('/product/createLocal', local.createProductLocal);
router.put('/product/updateLocal', local.updateProductLocal);
router.get('/product/getByIdLo', local.getProductByIdLocal);

router.post('/product/create', bigCProductCtrl.createProductLive);
router.get('/product/list', bigCProductCtrl.getDataFromAPi);
router.delete('/product/delete', bigCProductCtrl.deleteProductLive);
router.get('/product/getById/:id', bigCProductCtrl.getProductByIdLive);
router.put('/product/update/:id', bigCProductCtrl.updateProductLive);
}