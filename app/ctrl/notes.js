
const notesService = require('../service/notes')

//  notes CRUD on local

const createNote = (req, res) => {
    console.log(req.body);
    notesService.createnotes(req.body).then((data) => {
        if(data){
            res.json({ status: true, statusCode: 200, messages: "Created successfully", data: data });
        }
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    });
};

const updateNote = (req, res) => {
    console.log(req.body);
    notesService.updatenote(req.body).then((data) => {
        if (data != undefined && data.data) {
             res.json( data )
        } else {
            res.send(data);
        }
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    });
};

const getNoteList = (req, res) => {
    let page_q = req.query.page
    let limit_q = req.query.limit
    let query_string = req.query.query_string
    term = "%" + query_string + "%";
    // console.log(term);
    if (page_q && limit_q) {
        page_q = parseInt(page_q)
        limit_q = parseInt(limit_q)
        page_q = (page_q * limit_q - limit_q)
    }
    else {
        page_q = 0
        limit_q = 50
    }
    notesService.getnoteList(page_q, limit_q, term).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    });
};

const deleteNote = (req, res) => {
    console.log(req.body.id);
    notesService.deletenote(req.body.id).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "delete successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const getUserNotes = (req, res) => {
    let page_q = req.body.page
    let limit_q = req.body.limit
    let query_string = req.body.query_string
    term = "%" + query_string + "%";
    // console.log(term);
    if (page_q && limit_q) {
        page_q = parseInt(page_q)
        limit_q = parseInt(limit_q)
        page_q = (page_q * limit_q - limit_q)
    }
    else {
        page_q = 0
        limit_q = 50
    }
    notesService.getUsernotes(req.body.user_id,page_q, limit_q, term).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        console.log(err);
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
};

const noteGetById=(req,res)=>{
    console.log(req.body.id);
    notesService.getById(req.body.id).then((data) => {
        res.json({ status: true, statusCode: 200, messages: "get successfully", data: data })
    }).catch((err) => {
        res.json({ status: false, statusCode: 404, messages: err.sqlMessage, data: [] })
    })
}

const notesCtrl = {
    createNote,
    updateNote,
    getNoteList,
    deleteNote,
    getUserNotes,
    noteGetById
}
module.exports = { notesCtrl };
