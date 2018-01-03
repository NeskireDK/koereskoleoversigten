import * as database from "../database"

export default class Course {
    static async get(id){
        let [data, metadata] = await database.execute("SELECT * FROM `course` where id = ?", [id])
        return data
    }

}
