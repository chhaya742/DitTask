const { bigCcustomFieldsCtrl,customFieldslocalCtrl}=require('../ctrl/customFields');
module.exports = (router)=>{

// Local  
router.get('/customFields/getAll/:id', customFieldslocalCtrl.getcustomFieldsListLocal);
router.post('/customFields/createLocal/:id', customFieldslocalCtrl.createcustomFieldsLocal);
router.put('/customFields/updateLocal/:productId/:customFieldId', customFieldslocalCtrl.updatecustomFieldsLocal);
router.delete('/customFields/deleteLocal/:productId/:customFieldId',customFieldslocalCtrl.deletecustomFieldsLocal);
router.get('/customFields/getByIdLocal/:productId/:customFieldId', customFieldslocalCtrl.getcustomFieldsByIdLocal);


// Live
router.get('/customFields/list/:id', bigCcustomFieldsCtrl.getcustomFieldsFromAPi);
router.post('/customFields/create/:id', bigCcustomFieldsCtrl.createcustomFieldsLive);
router.delete('/customFields/delete/:productId/:customFieldId', bigCcustomFieldsCtrl.deletecustomFieldsLive);
router.put('/customFields/update/:productId/:customFieldId', bigCcustomFieldsCtrl.updatecustomFieldsLive);
router.get('/customFields/getById/:productId/:customFieldId', bigCcustomFieldsCtrl.getcustomFieldsByIdLive);

}