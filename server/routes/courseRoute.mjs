import course from '../model/course';
import * as middleware from '../middleware';
import v from "../validate";

export default class courseRoute {
    static Initialize(route) {

          // Get All courses
        route.get("/api/course", async (req, res) => {
            let a = await course.getAll()
            res.json({
                data: a,
            })
            console.log("Hello getting all courses!")
        });
        // Get single course per id
        route.get("/api/course/:id", async (req, res) => {
            let a = await course.get(req.params.id)
            res.json({
                data: a,
            })
            console.error(`Specific course was fetched: ${req.params.id}!`)
        });
        // Insert course via Post
        route.post("/api/course/", middleware.validatePost(v.validations.course.insert), async (req, res) => {
            // validate all properties
            const obj = new course({ title: req.body.title, description: req.body.description, school_id: req.body.school_id })
            res.json({
                res: await obj.insert()
            }) 
        });

        // Update course via Put
        route.put("/api/course/:id", middleware.validatePost(v.validations.course.update), async (req, res) => {
            // Get by id
            var obj = await course.get(req.params.id)
            // Update
            if(obj){
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