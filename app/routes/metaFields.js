
const {ctls}=require('../ctrl/metaFields');
module.exports = (router)=>{

router.post('/metaFields/:product_id/:variant_id', ctls.addMetaFields);
router.get('/productVariant/list/:id', ctls.productVarient);
router.get('/getMetaFields/:product_id/:variant_id', ctls.getMetaFields);
router.put('/updateMF', ctls.updateMf);
}