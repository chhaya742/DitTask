// const {getProduct,getDataFromAPi,createProduct, getProductById,deleteProduct,updateProduct} = require('../ctrl/student');
const { bigCCategoryCtrl,}=require('../ctrl/category');
module.exports = (router)=>{
router.get('/category/list', bigCCategoryCtrl.getCategoryFromAPi);
router.post('/category/create', bigCCategoryCtrl.createCategoryLive);
router.delete('/category/delete', bigCCategoryCtrl.deleteCategoryLive);
router.put('/category/update', bigCCategoryCtrl.updateCategoryLive);
router.get('/category/getById', bigCCategoryCtrl.getCategoryByIdLive);

}