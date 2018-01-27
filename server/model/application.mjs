import * as database from '../database'
import moment from 'moment'

export default class Application {
    // Generic Contructor to accept all properties
    constructor(data) {
        for (let prop of Object.keys(data)) {
            this[prop] = data[prop]
        }
    }

    static async get(id) {
        let [data, metadata] = await database.execute(`
            SELECT *
            FROM application
            WHERE id = ?`, [id])
        if (data[0]) {
            return new Application(data[0])
        }
        console.info("No such application by id: " + id)
        return null
    }

    static async getAll() {
        console.log("Break??")
        let [data, metadata] = await database.execute(`
            SELECT id, comment, customer_id, payment_token, course_id
            FROM application
            `)
        return data
    }

    async insert() {
        try {
            let [data, metadata] = await database.query(`
                  INSERT INTO application
                  SET ?`,
                this)
            this.id = data.insertId
            console.info("application for customerID:" + this.customer_id + " Created for courseID:" + this.course_id)
            return this;
        } catch (err) {
            console.warn("Failed to create application for customerID:" + this.customer_id + " for courseID:" + this.course_id)
            return {error: err}
        }
    }

    async update() {
        try {
            let [data, metadata] = await database.query(`
                UPDATE application
                    SET comment   = ?,
                WHERE id = ?`, [
                this.application,
                this.id
            ])
            console.info("application <" + this.title + "> updated")
            return this;
        } catch (err) {
            console.warn("Failed to update application for customerID:" + this.customer_id + " for courseID:" + this.course_id)
            for (let key of Object.keys(err)) {
                console.warn(key + ' = ' + err[key])
            }
            return {error: err}
        }
    }

    async setStatus() { //TODO: Decide how to expose this in route
        try {
            let [data, metadata] = await database.query(`
                UPDATE application
                    SET status   = ?
                WHERE id = ?`, [
                this.status,
                this.id
            ])
            console.info("application <" + this.title + "> Status changed")
            return this;
        } catch (err) {
            console.warn("Failed to change status application " + this.title + " for application: " + this.course_id)
            for (let key of Object.keys(err)) {
                console.warn(key + ' = ' + err[key])
            }
            return {error: err}
        }
    }
}
