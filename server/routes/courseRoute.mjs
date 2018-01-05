import course from '../model/course.mjs';
import validate from 'validate.js'
export default class courseRoute {
    static Initialize(route) {
        validate.validators.presence.options = {message: "må ikke være tomt"};
        validate.validators.length.options = {tooShort: "skal være mindst %{count} karakterer langt"};
        var courseConstraints = {
            school_id: {
              presence: true,
              numericality: {
                onlyInteger: true,
                greaterThan: 0,
              },
              
            },
            title: {
              presence: true,
              length: {
                minimum: 6,
              }
            }
          };          

        
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
            // validate all properties
            let val;
            if(val = validate({school_id: req.body.school_id, title: req.body.title}, courseConstraints)){
                console.log("Validation: "+JSON.stringify(val))
                res.status(400).json(val)
            }else {
                const obj = new course({ title: req.body.title, description: req.body.description, school_id: req.body.school_id })
                res.json({
                    res: await obj.insert()
                }) 
            }
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