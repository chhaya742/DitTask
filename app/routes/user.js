const { userCtrl}=require('../ctrl/user');
// const isValid=require("../../Middleware/validation")
const authentication=require("../../Middleware/auth")
module.exports = (router)=>{


router.post('/user/create', userCtrl.createUser);
router.post('/user/update', userCtrl.updateUser);
router.post('/user/login', userCtrl.loginUser);
router.get('/user/getById/:id',authentication, userCtrl.getUserbyId);
router.get('/user/logout', userCtrl.userLogout);

}
