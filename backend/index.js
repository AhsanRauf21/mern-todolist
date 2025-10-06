import app from "./src/app.js";
import { ConnectDB } from "./src/db.config.js";
import { configDotenv } from "dotenv";


configDotenv({
    path:'./.env'
})

const port  = process.env.PORT || 4500
ConnectDB()


const Data = [
{
    name:"Ahsan",
    age:20
},
{
    name:"john",
    age:23
},
{
    name:"doe",
    age:23
},
{
    name:"Asira",
    age:45
},
]

app.post('/post', (req,res) => {
try {
    console.log(req.body);

res.send({message:"Data Received"})

} catch (error) {
console.log(error);
    
}
})

app.get('/getData',(req,res) => {
res.send({Data})
})


app.listen(port ,() => {
console.log(`App is listening at http://localhost${port}`);

})