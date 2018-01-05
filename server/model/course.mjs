import * as database from '../database'
import moment from 'moment'
export default class Course {
    // Generic Contructor to accept all properties
    constructor(data){
        for(let prop of Object.keys(data)){
            this[prop]=data[prop]
        }
    }

    
    static async get(id){
        let [data, metadata] = await database.execute("SELECT * FROM `course` where id = ?", [id])
        return data
    }
    static async getAll(id){
        let [data, metadata] = await database.execute("SELECT * FROM `course`")
        return data
    }
    async insert(){
        try {
            
            moment.locale('da')
            this.created = moment().format("YYYY-MM-DD HH:mm:ss")
            let [data, metadata] = await database.query(`
            INSERT INTO course 
            SET ?`,
                this)
            console.info("Course "+this.title+" Created for school: " + this.school_id)
            return this;
        }catch(err) {
            console.warn("Failed to create Course "+this.title+" Created for school: " + this.school_id)
            return {error : err}
        }
    }
}
