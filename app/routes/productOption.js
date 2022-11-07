
const productOptionCtrl=require('../ctrl/productOption');
module.exports = (router)=>{
router.get('/productOption/list/:id', productOptionCtrl.getProductOptionList);
router.post('/productOption/create/:id', productOptionCtrl.createProductOptionLive);
router.put('/productOption/update/:id', productOptionCtrl.updateProductOptionLive);
router.get('/productOption/getById', productOptionCtrl.getProductOptionByID);
router.delete('/productOption/delete', productOptionCtrl.deleteProductOptionLive);

}