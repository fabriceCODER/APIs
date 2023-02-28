const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const app = express();

//JWT token is set
const secretKey = 'mysecretKey';

app.use(express.json());

let contacts = [
     {
          id: "1",
          username:"Fabrice",
          email: "fabrice@gmail.com",
          password:""
     },
     {
          id: "2",
          username: "Elissa",
          email:"elissa@gmail.com",
          password:""
     },
     {
          id: "3",
          username: "Kalisa",
          email:"kalisa@gmail.com",
          password:""

     },
     {
          id:"4",
          username:"Divin",
          email: "divin@gmail.com",
          password:""
     },
     {
          id:"5",
          name:"Hugues",
          email:"hugues@gmail.com",
          password:""
     },
     {
          id:"6",
          name:"Tresor",
          email:"tresor@gmail.com",
          password:""

     }
];

app.get("/contact", (req, res)=>{
 res.send({
     success : true,
     message : 'data fetched successfully',
     data : contacts
 });
});
//post token to allow user enter and continue to our services
app.post('/contact', (req, res) => {
     const { name, password } = req.body;
   
     // Check if the name and password are correct
     if (name === 'admin' && password === 'password') {
       


         //generate JWT token
       const token = jwt.sign({ name }, secretKey, { expiresIn: '1h' });
       res.json({
         success: true,
         message: 'Authentication successful!',
         token
       });
     } else {
       // Return an error message if authentication fails



       res.status(401).json({
         success: false,
         message: 'Incorrect name or password'
       });
     }
   });
  //get token
   app.get('/contact', (req, res) => {
     res.json({
       success: true,
       message: 'Data fetched successfully',
       data: contacts
     });
   });
   

   
   //Updating the data
   app.put('/contact/:id', (req, res) => {

     let id = req.params.id
     let name = req.body.name
     
     if(name){
          let index = contacts.findIndex(el => el.id == id)

          contacts[index] = {
               ...contacts[index],
               name:name
          } 
          res.send({
               success:true,
               message:"data updated successfully"
          })
     }
     else{
          res.send({
               success:false,
               message:"validation error",
               errors:[
                    {
                         field:"name",
                         message:"cannot be null"
                    }
               ]
              }) ;
     }
   });
   

   //Deleting data
   
   app.delete('/contact/:id', (req, res) => {
   let id = req.params.id
   let newContacts = contacts.filter(el => el.id !== id )
   contacts = newContacts

   res.send({
           success:true,
           message:"data deleted successfully"
   });
   });
  
app.listen(7000, ()=>{
     console.log('server is running on port 7000');
});



