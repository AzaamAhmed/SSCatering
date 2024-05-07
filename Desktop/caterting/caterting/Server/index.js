const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ItemModel = require('./model/Item');
const User = require('./model/User');
const ReportModel = require('./model/Report');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Azaama:catering@catering.ix1fdgm.mongodb.net/catering?retryWrites=true&w=majority');


app.post('/users', async (req, res) => {
  try {
      // Create a new User instance with data from the request body
      const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role
      });

      // Save the newUser to the database
      const savedUser = await newUser.save();

      // Respond with the saved user
      res.status(201).json(savedUser);
  } catch (error) {
      // If there's an error, respond with an error status and message
      res.status(500).json({ message: error.message });
  }
});


app.get('/get', (req, res) => {
    ItemModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/add', async(req, res) => {0.
    try{
    const newitem = new ItemModel({
        item:req.body.item,
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    });
    const savedItem = await newitem.save();
    res.status(201).json(savedItem);
}catch(error){
    res.status(500).json({ message: error.message });
}
});

app.post('/save', async (req, res) => {
    try {
        const newReport = new ReportModel({
            headCount: req.body.headCount,
            occasion: req.body.occasion,
            totalMainCourses: req.body.totalMainCourses,
            totalDesserts: req.body.totalDesserts,
            totalBeverages: req.body.totalBeverages,
            totalAppetizers: req.body.totalAppetizers,
            total: req.body.total
        });
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/reports', (req, res) => {
    ReportModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});


app.put('/update/:id',(req,res)=>{

    const {id} = req.params;
    ItemModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});



app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      if (user.password !== password) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});





app.listen(3001, () => {
    console.log("server is running!");
});
