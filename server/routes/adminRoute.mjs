import Admin from '../model/admin';

export default class AdminRoute {
    static Initialize(route) {
        
        // Get All admins
        route.get("/api/admin", async (req, res) => {
            let a = await Admin.getAll()
            res.json({
                data: a[0],
            })
            console.log("Hello getting all admins!")
        });
        // Get single admin per id
        route.get("/api/admin/:id", async (req, res) => {
            let a = await Admin.get(req.params.id)
            if(a){
                res.json({
                    data: a,
                })
            }else{
                res.sendStatus(404)
            }
            console.info(`Specific Admin was fetched: ${req.params.id}!`)
        });
        // Insert admin via Post
        route.post("/api/admin/", async (req, res) => {
            const obj = new Admin({ name: req.body.name, email: req.body.email, password: req.body.password })
            res.json({
                res: await obj.insert()
            })
        });
        // Update admin via Put
        route.put("/api/admin/:id", async (req, res) => {
            let obj = await Admin.get(req.params.id)
                
            if(obj){
                Object.assign(obj, req.body)
                res.json({
                    res: await obj.update()
                })
            }else{
                res.sendStatus(404)
            }
        });
    }
}