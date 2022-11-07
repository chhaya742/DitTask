// const {getProduct,getDataFromAPi,createProduct, getProductById,deleteProduct,updateProduct} = require('../ctrl/student');
const { bigCcustomFieldsCtrl,}=require('../ctrl/customFields');
module.exports = (router)=>{
router.get('/customFields/list/:id', bigCcustomFieldsCtrl.getcustomFieldsFromAPi);
router.post('/customFields/create/:id', bigCcustomFieldsCtrl.createcustomFieldsLive);
router.delete('/customFields/delete', bigCcustomFieldsCtrl.deletecustomFieldsLive);
router.put('/customFields/update/:productId/:customFieldId', bigCcustomFieldsCtrl.updatecustomFieldsLive);
router.get('/customFields/getById', bigCcustomFieldsCtrl.getcustomFieldsByIdLive);

}