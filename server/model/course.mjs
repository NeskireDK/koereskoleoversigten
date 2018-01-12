import * as database from '../database'
import moment from 'moment'

export default class Course {
    // Generic Contructor to accept all properties
    constructor(data) {
        for (let prop of Object.keys(data)) {
            this[prop] = data[prop]
        }
    }

    static async get(id) {
        let [data, metadata] = await database.execute("SELECT * FROM `course` WHERE ID = ?", [id])
        if (!data[0]) {
            console.info("No such course by id: " + id)
            return null
        }
        return new Course(data[0])
    }

    static async getAll(id) {
        let [data, metadata] = await database.execute("SELECT * FROM course")
        return data
    }

    async insert() {
        try {
            moment.locale('da')
            this.created = moment().format("YYYY-MM-DD HH:mm:ss")
            let [data, metadata] = await database.query(`
                  INSERT INTO course
                  SET ?`,
                this)
            console.info("Course " + this.title + " Created for school: " + this.school_id)
            return this;
        } catch (err) {
            console.warn("Failed to create Course " + this.title + " Created for school: " + this.school_id)
            return {error: err}
        }
    }

    async update() {
        try {
            moment.locale('da')
            this.updated = moment().format("YYYY-MM-DD HH:mm:ss")
            let [data, metadata] = await database.query(`
                UPDATE course
                    SET title   = ?,
                    description = ?,
                    updated     = ?
                WHERE id = ?`, [
                this.title,
                this.description,
                this.updated,
                this.id
            ])
            console.info("Course " + this.title + " updated for school: " + this.school_id)
            return this;
        } catch (err) {
            console.warn("Failed to Update Course " + this.title + " for school_Id: " + this.school_id)
            for (let key of Object.keys(err)) {
                console.warn(key + ' = ' + err[key])
            }
            return {error: err.toJSON()}
        }
    }
}
