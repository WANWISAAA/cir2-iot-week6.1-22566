const express = require('express')
const app = express()
const logger =require('morgan')
const cors = require('cors')
const products = require('./data');
require('dotenv').config()
const port =process.env.PORT ||5000;

//Middleware
app.use(cors()) //croos platform
app.use(logger('dev'))//Logger
app.use(express.json())//req.body

//Get:http://localhost:3000
app.get('/',  (req,res) => {
    return res.status(200).json({message: "Home page"});
});

//Get:http://localhost:3000/user
app.get('/user' , (req,res) => {
    const user = [
        {
            name: "Mark Zuckerberg",
            age: 55,
            gender:"Male"
        }
    ]
    return res.status(200).json({
        data:true,
        user:user,
    });
});

//post:http://localhost:3000/user
app.post('/user' , (req,res) => {
    const data = req.body
    console.log("id", data.id);
    console.log("Name", data.name);
    console.log("Age", data.age);
    console.log("Gender", data.gender);
    return res.status(200).json({
        data:true,
        user:data,  
    });
});

//put:http://localhost:3000/user
app.put('/user' , (req,res) => {
    const data = req.body
    console.log("id", data.id);
    console.log("Name", data.name);
    console.log("Age", data.age);
    console.log("Gender", data.gender);
    return res.status(200).json({
        data:true,
        user:data, 
        message:"Update user successfully!",
    });
});

//Delete:http://localhost:3000/user
app.delete('/user' , (req,res) => {
    const data = req.body
    return res.status(200).json({
        data:true, 
        message:"Delete user successfully!",
    });
});

//Get All:http://localhost:3000/api/products
app.get('/api/products', (req,res) => {
    const partial_products = products.map((products)=>{
        return {id:products.id, name:products.name}; 
    })
    res.status(200).json(partial_products);
});

//Gat Products:http://localhost:3000/api/products/1
app.get('/api/products/:productID', (req,res) => {
    const id = Number(req.params.productID)
    const product = products.find((product)=>product.id === id)
    if (!product) {
        return res.status(404).json({Message:"Product not found"})
    }
    return res.status(200).json(product);
});

//Query String GET: http://localhost:3000/api/query/?name=phone
app.get('/api/query', (req ,res) => {
    const name = req.query.name.toLowerCase()
    const product_result = products.filter(
        (product)=> product.name.toLowerCase().includes(name)
    )
    if (product_result.length < 1) {
        return res.status(404).send("No product matched your search")
    }
    return res.json(product_result);
});

app.listen(port,() =>{
    console.log(`Server running at http://localhost:${port}`);
});