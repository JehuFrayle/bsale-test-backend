const pool = require('../libs/mysql');

class ProductsService {

    constructor() {
        this.products = [];

        this.pool = pool;
        this.pool.on( "error", (err) => console.error(err));
    }

    find() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM product',
            (err, rows, fields) => {
                if (err) reject(err); // En caso de error, resolvemos la Promise con error
                resolve(rows); // Si no, resolvemos con el resultado
            });
        });    
    }

    findOne(id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM product WHERE id = ${id}`, (err, rows, fields) =>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    }

}

module.exports = ProductsService;
