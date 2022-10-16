const pool = require('../libs/mysql');

class CategoryService {

    constructor() {
        this.pool = pool;
        this.pool.on("error", (err) => console.error(err));
    }


    find() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM category',
            (err, rows, fields) => {
                if (err) reject(err); // En caso de error, resolvemos la Promise con error
                resolve(rows); // Si no, resolvemos con el resultado
            });
        }); 
    }

    findOne(id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from category WHERE id=${id}`,
            (err, rows, fields) => {
                if (err) reject(err); // En caso de error, resolvemos la Promise con error
                resolve(rows); // Si no, resolvemos con el resultado
            });
        }); 
    }
    findByName(name){
        const search = name.replaceAll('+','%');
        return new Promise((resolve, reject) =>{
            pool.query(`SELECT * FROM category WHERE name LIKE("%${search}%")`, (err, rows, fields) => {
                if(err) reject(err);
                resolve(rows);
            })
        })
    }

}

module.exports = CategoryService;
