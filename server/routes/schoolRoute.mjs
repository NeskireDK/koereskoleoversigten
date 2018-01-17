import school from '../model/school';
import * as middleware from '../middleware';
import v from "../validate";

export default class schoolRoute {
    static Initialize(route) {
        console.debug("initializing schoolRoute")
          // Get All schools
        route.get("/api/school", async (req, res) => {
            let a = await school.getAll()
            res.json({
                data: a,
            })
            console.log("Hello getting all schools!")
        });
        // Get single school per id
        route.get("/api/school/:id", async (req, res) => {
            let a = await school.get(req.params.id)
            res.json({
                data: a,
            })
            console.error(`Specific school was fetched: ${req.params.id}!`)
        });
        // Insert school via Post
        route.post("/api/school/", middleware.validatePost(v.validations.school.insert), async (req, res) => {
            // validate all properties
            const obj = new school({ title: req.body.title, description: req.body.description, school_id: req.body.school_id })
            res.json({
                res: await obj.insert()
            })
        });

        // Update school via Put
        route.put("/api/school/:id", middleware.validatePost(v.validations.school.update), async (req, res) => {
            // Get by id
            var obj = await school.get(req.params.id)
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