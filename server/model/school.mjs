import * as database from '../database'
import moment from 'moment'

export default class School {
    // Generic Contructor to accept all properties
    constructor(data) {
        for (let prop of Object.keys(data)) {
            this[prop] = data[prop]
        }
    }

    static async get(id) {
        console.log("Break??")
        let [data, metadata] = await database.execute(`
            SELECT *
            FROM school
            WHERE id = ?`, [id])
        if (data[0]) {
            return new School(data[0])
        }
        console.info("No such school by id: " + id)
        return null
    }

    static async getAll() {
        console.log("Break??")
        let [data, metadata] = await database.execute(`
            SELECT id, name, description, phone, zip, email, media_id
            FROM school
            `)
        return data
    }

    async insert() {
        try {
            moment.locale('da')
            this.created = moment().format("YYYY-MM-DD HH:mm:ss")
            let [data, metadata] = await database.query(`
                  INSERT INTO school
                  SET ?`,
                this)
            console.info("School " + this.title + " Created for school: " + this.school_id)
            return this;
        } catch (err) {
            console.warn("Failed to create School " + this.title + " Created for school: " + this.school_id)
            return {error: err}
        }
    }

    async update() {
        try {
            moment.locale('da')
            let [data, metadata] = await database.query(`
                UPDATE school
                    SET name   = ?,
                    description = ?,
                    phone     = ?,
                    street     = ?,
                    zip     = ?,
                    email     = ?,
                    password     = ?,
                    media_id     = ?
                WHERE id = ?`, [
                this.name,
                this.description,
                this.phone,
                this.street,
                this.zip,
                this.email,
                this.password,
                this.media_id,
                this.id
            ])
            console.info("School <" + this.name + "> updated")
            return this;
        } catch (err) {
            console.warn("Failed to Update School " + this.name + " for school_Id: " + this.id)
            for (let key of Object.keys(err)) {
                console.warn(key + ' = ' + err[key])
            }
            return {error: err}
        }
    }
}
