const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { type } = require('os');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
 useNewUrlParser: true,
 useUnifiedTopology: true
});

// Define mongoose schema and model
const formDataSchema = new mongoose.Schema({
    numberOfPassengers:Number,
    selectedMovie:String,
    imgsrc:String,
    amount:Number,
    passengers:[{
        name:String,
        email:String,
    }]
});
const FormData = mongoose.model('BookTicket', formDataSchema);
const FormData2 = mongoose.model('AllBookedDetails', formDataSchema);
// Route to handle form data submission
app.post('/api/formdata', async (req, res) => {
 try {
   const formData = new FormData(req.body);
   const formdata2= new FormData2(req.body);
   await formData.save();
   await formdata2.save();
   const userId=formData._id;
   res.status(200).json({userId});
 } catch (error) {
   res.status(500).json({ error: 'Internal server error' });
 }
});
app.get('/api/formdata', async (req, res) => {
    try {
      
      const allTickets=await FormData2.find();
      res.json(allTickets);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching books' });
    }
});

app.get('/getUser/:id', async (req, res) => {
  try {
    const id=req.params.id;
    const filtter= {_id:id};
    const tickets = await FormData.findById(filtter);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

app.delete('/api/formdata/deletedById/:id',async (req,res)=>{
  try{
    const id=req.params.id;
    const filtter= {_id:id};
    const deleted=await FormData.findByIdAndDelete(filtter);
    if(!deleted){
      return res.status(404).json({message:"Form data Not dound"})
    }
    res.status(200).json({message:"form deleted done"})
  }
  catch(error){
    res.status(500).json({error:"internal problem"});
  }
});

app.delete('/deleteUser/:id/:name', async (req, res) => {
  console.log("enter delete");
  try{
    const id=req.params.id;
    console.log(id,"id");
    const id2=req.params.name;
    console.log(id2,"Id2");
    const updatedDocument =await FormData.findOneAndUpdate(
      { _id: id },
      {$pull:{}},
      { $pull: { passengers: { _id: id2 } } },
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    console.log('Passenger deleted successfully:', updatedDocument);
    res.status(200).json({ message: 'Passenger deleted successfully' });
  } catch (error) {
    console.error('Error deleting passenger:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});  
const userScema=mongoose.Schema({
  email:{type:String,required:true, unique:true},
  password:{type:String,required:true}
})

app.post("/signup",(req,res,next)=>{

});

// Start the server
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});