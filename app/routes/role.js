const { roleCtrl } = require('../ctrl/role');
// const isValid=require("../../Middleware/validation")

module.exports = (router) => {
    router.post('/role/add', roleCtrl.addRole);
    // router.post('/notes/update/', notesCtrl.updateNote);
    // router.post('/notes/get/', notesCtrl.noteGetById);
    router.post('/role/getById',roleCtrl.getRole);
    // router.post('/user/notes/', notesCtrl.getUserNotes);
    // router.post('/notes/delete', notesCtrl.deleteNote);
}
