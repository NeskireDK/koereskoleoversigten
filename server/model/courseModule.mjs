import * as database from '../database'
import moment from 'moment'

export default class CourseModule {
    // Generic Contructor to accept all properties
    constructor(data) {
        for (let prop of Object.keys(data)) {
            this[prop] = data[prop]
        }
    }

    static async get(id) {
        let [data, metadata] = await database.execute(`
            SELECT *
            FROM course_module
            WHERE id = ?`, [id])
        if (data[0]) {
            return new CourseModule(data[0])
        }
        console.info("No such course_module by id: " + id)
        return null
    }

    static async getAll() {
        console.log("Break??")
        let [data, metadata] = await database.execute(`
            SELECT id, title, description, date, course_id
            FROM course_module
            `)
        return data
    }

    async insert() {
        try {
            let [data, metadata] = await database.query(`
                  INSERT INTO course_module
                  SET ?`,
                this)
            console.info("Course Module " + this.title + " Created for course: " + this.course_id)
            return this;
        } catch (err) {
            console.warn("Failed to create Course Module " + this.title + " for course: " + this.course_id)
            return {error: err}
        }
    }

    async update() {
        try {
            let [data, metadata] = await database.query(`
                UPDATE course_module
                    SET title   = ?,
                    description = ?,
                    date     = ?
                WHERE id = ?`, [
                this.title,
                this.description,
                this.date,
                this.id
            ])
            console.info("Course Module <" + this.title + "> updated")
            return this;
        } catch (err) {
            console.warn("Failed to Update Course Module " + this.title + " for course_module: " + this.course_id)
            for (let key of Object.keys(err)) {
                console.warn(key + ' = ' + err[key])
            }
            return {error: err}
        }
    }

    async setStatus() { //TODO: Decide how to expose this in route
        try {
            let [data, metadata] = await database.query(`
                UPDATE course_module
                    SET status   = ?
                WHERE id = ?`, [
                this.status,
                this.id
            ])
            console.info("Course Module <" + this.title + "> Status changed")
            return this;
        } catch (err) {
            console.warn("Failed to change status Course Module " + this.title + " for course_module: " + this.course_id)
            for (let key of Object.keys(err)) {
                console.warn(key + ' = ' + err[key])
            }
            return {error: err}
        }
    }
}
