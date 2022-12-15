const { notesCtrl } = require('../ctrl/notes');
// const isValid=require("../../Middleware/validation")

module.exports = (router) => {
    router.post('/notes/create', notesCtrl.createNote);
    router.post('/notes/update/:id', notesCtrl.updateNote);
    router.get('/notes/getNotes',notesCtrl.getNoteList);
    router.post('/user/notes/', notesCtrl.getUserNotes);

}
