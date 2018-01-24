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
        let [data, metadata] = await database.execute(`
            SELECT
                c.id,
                c.title title,
                c.description description,
                c.created,
                c.school_id,
                s.name school,
                s.description schoolInfo,
                s.street,
                s.zip,
                s.media_id,
                s.id schoolId
            FROM course c
            LEFT JOIN school s ON c.school_id=s.id
            WHERE c.id = ?`, [id])
        if (data[0]) {
            return new Course(data[0])
        }
        console.info("No such course by id: " + id)
        return null
    }

    static async getAll() {
        console.log("Break??")
        let [data, metadata] = await database.execute(`
            SELECT
                c.id,
                c.title title,
                c.description description,
                c.created,
                c.school_id,
                s.name school,
                s.description schoolInfo,
                s.street,
                s.zip,
                s.media_id,
                s.id schoolId
            FROM course c
            JOIN school s ON c.school_id=s.id`)
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
            this.id = data.insertId;
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
            return {error: err}
        }
    }
}
