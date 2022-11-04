// const {getProduct,getDataFromAPi,createProduct, getProductById,deleteProduct,updateProduct} = require('../ctrl/student');
const { bigCommerceCtrl,local}=require('../ctrl/student');
const isValid=require("../../Middleware/validation")
module.exports = (router)=>{

router.get('/product/getAll', local.getProductsLocal);
router.delete('/product/deleteLocal', local.deleteProductLocal);
router.post('/product/createLocal', local.createProductLocal);
router.put('/product/updateLocal', local.updateProductLocal);
router.get('/product/getByIdLo', local.getProductByIdLocal);

router.post('/product/create', bigCommerceCtrl.createProductLive);
router.get('/product/list', bigCommerceCtrl.getDataFromAPi);
router.delete('/product/delete', bigCommerceCtrl.deleteProductLive);
router.get('/product/getById', bigCommerceCtrl.getProductByIdLive);
router.put('/product/update', bigCommerceCtrl.updateProductLive);
}