const knex=require("../../database/config");


// module.exports=async function homeCategoriesListing(req, res, next) {
//     let { offset, limit, order, sort, search, status } = req.body;
//     // console.log(search,status);
//     let results = knex("products")
//     if (status != undefined && status != "") {
//         total = results.where("products.Status", status)
//     }
//     results = results.where(function () {
//         if (search != undefined && search != "") {
//             this.orWhereILike("products.name", `%${search}%`)
//         }
//     })
//     total = await results.count("id as total").first()
//     let rows = knex("products")
//     if (status != undefined && status != "") {
//         rows.where('products.Status', status)
//     }
//     rows = rows.where(function () {
//         if (search != undefined && search != "") {
//             this.orWhereILike("products.name", `%${search}%`)
//         }
//     })


//     rows = await rows.orderBy(sort, order).limit(limit).offset(offset)
   
//     total = (total != undefined) ? total.total : 0;
//     res.status(200).json({
//         error: false,
//         message: "Orders retrieved successfully.",
//         data: {
//             rows: rows,
//             total
//         }
//     });
// }



module.exports=async function homeCategoriesListing(req, res, next) {
    let { offset, limit, order, sort, search, status } = req.body;
    let results = knex("products")
    if (status != undefined && status != "") {
        total = results.where("products.status", status)
    }
    results = results.where(function () {
        if (search != undefined && search != "") {
            this.orWhereILike("products.name", `%${search}%`)
        }
    })
    total = await results.count("id as total").first()
    let rows = knex("products").leftJoin('bigcommercecategory', 'products.categories', 'bigcommercecategory.id')
        .select(["products.*", "bigcommercecategory.name as bigcCategoryName"])
    if (status != undefined && status != "") {
        rows.where('products.status', status)
    }
    rows = rows.where(function () {
        if (search != undefined && search != "") {
            this.orWhereILike("products.name", `%${search}%`)
        }
    })
    rows = await rows.orderBy(sort, order).limit(limit).offset(offset)
    // rows = rows.map(row => {
    //     row.image = constants.getStaticUrl(row.image)
    //     return row
    // })

    let data_rows = [];
    if (order === "desc") {
        let sr = offset + 1;
        await rows.forEach(row => {
            row.sr = sr;
            delete row.password;
            data_rows.push(row);
            sr++;
        });
    } else {
        let sr = total.total - (limit * offset)
        await rows.forEach(row => {
            row.sr = sr;
            delete row.password;
            data_rows.push(row);
            sr--;
        });
    }
    total = (total != undefined) ? total.total : 0;
    let bigcommercecategory = await knex("bigcommercecategory").where({ parent_id: 0 });
    let newCat = []
    await Promise.all(bigcommercecategory.map(async row => {
        let data = await knex("bigcommercecategory").where({ parent_id: row.id })
        data = data.map(val => {
            val.name = " - " + val.name
            return val
        })

        if (data.length != 0) {
            newCat = [...newCat, row, ...data]
            bigcommercecategory = newCat
        }
    }))

    // bigcommercecategory = [...bigcommercecategory, ...newCat]
    res.status(200).json({
        error: false,
        message: "Orders retrieved successfully.",
        data: {
            rows: data_rows,
            total,
            bigcommercecategory
        }
    });
}



