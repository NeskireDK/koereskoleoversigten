import application from '../model/application';
import * as middleware from '../middleware';
import v from "../validate";

export default class applicationRoute {
    static Initialize(route) {
        // Get All applications
        route.get("/api/application", async (req, res) => {
            let a = await application.getAll()
            res.json(a)
            console.log("Hello getting all applications!")
        });
        // Get single application per id
        route.get("/api/application/:id", async (req, res) => {
            let a = await application.get(req.params.id)
            res.json(a)
            console.error(`Specific application was fetched: ${req.params.id}!`)
        });
        // Insert application via Post
        route.post("/api/application/", middleware.validatePost(v.validations.application.insert), async (req, res) => {
            // validate all properties
            const obj = new application({
                comment: req.body.comment,
                customer_id: req.body.customer_id,
                course_id: req.body.course_id
            })
            res.json(await obj.insert())
        });

        // Update application via Put
        route.put("/api/application/:id", middleware.validatePost(v.validations.application.update), async (req, res) => {
            // Get by id
            var obj = await application.get(req.params.id)
            // Update
            if (obj) {
                Object.assign(obj, req.body)
                res.json(await obj.update())
            } else {
                res.sendStatus(404)
            }

        });
    }
}