const mongoose = require('mongoose')
const dburl ='mongodb://localhost:27017/url_shortener';



async function dbConnection(){
    try{
        await mongoose.connect(dburl,{
            useNewUrlParser:true,
            // useUniifiedTopology:true,
            useUnifiedTopology: true, // Correct spelling

        });
        console.log('Connected to MongDB with  Mongoose');

    }catch(err){

            console.error('Error connecting to MongoDB:',err)
            throw err;
        
    }
}
module.exports ={dbConnection}