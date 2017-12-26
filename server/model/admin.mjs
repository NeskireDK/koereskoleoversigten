import * as database from "../database"

export default class Admin {


    constructor(name, email, password, ) {
        this.name = name
        this.email = email
        this.password = password
    }

    static async getAll(){
        let [data, metadata] = await database.execute("SELECT * FROM `admin`")
        console.log("Message normal log")
        return [data, metadata]
    }
    static async get(id){
        let [data, metadata] = await database.execute("SELECT * FROM `admin` where id = ?", [id])
        return data
    }
    static async insert(name, email, password){
        try {
            let [data, metadata] = await database.execute(`
            INSERT INTO admin 
            SET name=?, email=?, password=?`,
                [name, email, password])
            return new Admin(name, email, password);
        }catch(err) {
            return {error : err}
        }

    }

}

