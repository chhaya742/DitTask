const demoRoute=require("../ctrl/productListing")
module.exports = (router)=>{
router.get('/products', demoRoute);
}