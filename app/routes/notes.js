const { notesCtrl } = require('../ctrl/notes');
// const isValid=require("../../Middleware/validation")

module.exports = (router) => {
    router.post('/notes/create', notesCtrl.createNote);
    router.post('/notes/update/', notesCtrl.updateNote);
    router.post('/notes/get/', notesCtrl.noteGetById);
    router.get('/notes/getNotes',notesCtrl.getNoteList);
    router.post('/user/notes/', notesCtrl.getUserNotes);
    router.post('/notes/delete', notesCtrl.deleteNote);
}
