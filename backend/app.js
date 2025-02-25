
const express = require('express');

const cors =require('cors');
const {dbConnection} = require('./database')
const Url =   require ('./model')
const shortid=require ('shortid');
const app = express()
const port =9000;
app.use(express.json( ));
app.use (cors({
    origin:'*',
    methods:'GET,POST,PUT,DELETE'
}));

dbConnection();
app.get('/',(req,res)=>{
    res.json({message:'welcome to URL Shortener'});
});
app.post('/api/url-shortener',async (req,res) =>{
    try{
        const {url} = req.body;
        const token = shortid.generate();


        const newUrl = new Url({url,token})
        await newUrl.save();

       res.status(200).json({message:'Url generated',token,url,status:'ok'});

    }catch(error){
        res.status(500).json({message:'Error saving Url',error});
    }   
});
app.get('/u/:token',async (req,res) =>{
    try{
        const {token} =req.params;


        // Find url in database
        const urlData = await Url.findOne ({token});
        if (!urlData) {
            return res.status(404).json({message:'Url not found'});
        }
        res.redirect(urlData.url);
    } catch(error){
        res.status(500).json({message:'error finding url ',error})
    }
});
app.listen(port,()=>{
// console.log('Server is running on port ${port}')
console.log(`Server is running on port ${port}`);

});