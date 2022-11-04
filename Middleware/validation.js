const yup = require("yup");

let schema = yup.object().shape({
    Name: yup.string().required(),
    Age: yup.string().required(),
    Email: yup.string().required().email(),
});


// check validity
const isValid = (req, res, next) => {
    schema
    .validate(req.body)
        .then((valid) => {
            next();
        }).catch((err)=>{
            console.log(err.errors);
            res.send(err.errors)
        })
}

module.exports=isValid