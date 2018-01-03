import course from '../model/course.mjs';

export default class courseRoute {
    static Initialize(route) {

        // Get All courses
        route.get("/api/course", async (req, res) => {
            let a = await course.getAll()
            res.json({
                data: a[0],
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
        route.post("/api/course/", async (req, res) => {
            const obj = new course({ name: req.body.name, email: req.body.email, password: req.body.password })
            res.json({
                res: await obj.insert()
            })
        });
        // Update course via Post
        route.put("/api/course/:id", async (req, res) => {
            const obj = new course({ name: req.body.name, email: req.body.email, password: req.body.password })
            res.json({
                res: await obj.insert()
            })
        });
    }
}