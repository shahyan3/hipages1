const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'database',
    user: 'root',
    password: 'hipages',
    database: 'hipages'
});

export const db = {
    query: (text: string, params: any) =>
        new Promise<any>((resolve, reject) => {
            pool.query(text, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        }),
};