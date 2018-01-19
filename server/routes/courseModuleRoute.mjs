import courseModule from '../model/courseModule';
import * as middleware from '../middleware';
import v from "../validate";

export default class CourseModuleRoute {
    static Initialize(route) {
        // Get All courseModules
        route.get("/api/courseModule", async (req, res) => {
            let a = await courseModule.getAll()
            res.json({
                data: a,
            })
            console.log("Hello getting all courseModules!")
        });
        // Get single courseModule per id
        route.get("/api/courseModule/:id", async (req, res) => {
            let a = await courseModule.get(req.params.id)
            res.json({
                data: a,
            })
            console.error(`Specific courseModule was fetched: ${req.params.id}!`)
        });
        // Insert courseModule via Post
        route.post("/api/courseModule/", middleware.validatePost(v.validations.courseModule.insert), async (req, res) => {
            // validate all properties
            const obj = new courseModule({
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                course_id: req.body.course_id
            })
            res.json({
                res: await obj.insert()
            })
        });

        // Update courseModule via Put
        route.put("/api/courseModule/:id", middleware.validatePost(v.validations.courseModule.update), async (req, res) => {
            // Get by id
            var obj = await courseModule.get(req.params.id)
            // Update
            if (obj) {
                Object.assign(obj, req.body)
                res.json({
                    res: await obj.update()
                })
            } else {
                res.sendStatus(404)
            }

        });
    }
}