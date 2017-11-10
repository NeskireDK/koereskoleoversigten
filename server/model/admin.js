const database = require("./database");
function GetUsers(){
    let [data, metadata] = await database.execute("SELECT * FROM `admin`");
}
