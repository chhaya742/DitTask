const { bigCCategoryCtrl,CategorylocalCtrl}=require('../ctrl/category');
module.exports = (router)=>{

// Local  
router.get('/category/getAll', CategorylocalCtrl.getCategoryListLocal);
router.post('/category/createLocal', CategorylocalCtrl.createCategoryLocal);
router.put('/category/updateLocal/:id', CategorylocalCtrl.updateCategoryLocal);
router.delete('/category/deleteLocal/:id',CategorylocalCtrl.deleteCategoryLocal);
router.get('/category/getByIdLocal/:id', CategorylocalCtrl.getCategoryByIdLocal);

// Local
router.get('/category/list', bigCCategoryCtrl.getCategoryFromAPi);
router.post('/category/create', bigCCategoryCtrl.createCategoryLive);
router.delete('/category/delete/:id', bigCCategoryCtrl.deleteCategoryLive);
router.put('/category/update/:id', bigCCategoryCtrl.updateCategoryLive);
router.get('/category/getById/:id', bigCCategoryCtrl.getCategoryByIdLive);

}