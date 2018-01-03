import * as database from "../database"
import admin from "../routes/adminRoute.mjs";

export default class Admin {
    constructor(data){
        for(let prop of Object.keys(data)){
            this[prop]=data[prop]
        }
    }
    static async getAll(){
        let [data, metadata] = await database.execute("SELECT * FROM `admin`")
        console.log("a console.log message")
        return [data, metadata]
    }
    static async get(id){
        let [data, metadata] = await database.execute("SELECT * FROM `admin` where id = ?", [id])
        return new Admin(data[0])
    }
    async insert(){
        try {
            let [data, metadata] = await database.query(`
            INSERT INTO admin 
            SET ?`,
                this)
            return this;
        }catch(err) {
            return {error : err}
        }
    }
    async update(){
        try {
            let [data, metadata] = await database.query(`
            UPDATE admin 
            SET ? WHERE id = ?`,
                [this, this.id])
            return data;
        }catch(err) {
            return {error : err}
        }
    }
}

