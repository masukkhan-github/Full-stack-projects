import app from "./src/app.js";
import { connectDB } from "./src/db/db.js";

 connectDB();

app.listen(3000,()=>{
    console.log(`app is running on port ${3000}` );
});

