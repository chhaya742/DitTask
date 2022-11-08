
const {productOptionCtrl,productOptionlocalCtrl}=require('../ctrl/productOption');
module.exports = (router)=>{

    
// Local  
router.get('/productOption/getAll/:productId', productOptionlocalCtrl.getProductOptionListLocal);
router.post('/productOption/createLocal/:id', productOptionlocalCtrl.createProductOptionLocal);
router.put('/productOption/updateLocal/:productId/:optionId', productOptionlocalCtrl.updateProductOptionLocal);
router.delete('/productOption/deleteLocal/:productId/:optionId',productOptionlocalCtrl.deleteProductOptionLocal);
router.get('/productOption/getByIdLocal/:productId/:optionId', productOptionlocalCtrl.getProductOptionByIdLocal);

// Live
router.get('/productOption/list/:id', productOptionCtrl.getProductOptionList);
router.post('/productOption/create/:id', productOptionCtrl.createProductOptionLive);
router.put('/productOption/update/:productId/:optionId', productOptionCtrl.updateProductOptionLive);
router.get('/productOption/getById/:productId/:optionId', productOptionCtrl.getProductOptionByID);
router.delete('/productOption/delete/:productId/:optionId', productOptionCtrl.deleteProductOptionLive);

}