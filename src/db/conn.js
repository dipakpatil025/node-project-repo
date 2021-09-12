const mongoose = require('mongoose');
// mongodb+srv://dipak:7070@dipak.gwsw3.mongodb.net/Forum?retryWrites=true&w=majority
// mongoose.connect("mongodb://localhost:27017/Forum",  {
mongoose.connect("mongodb+srv://dipak:dipak02501@dipak.gwsw3.mongodb.net/Forum?retryWrites=true&w=majority",  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex:true
  }).then(()=>{
      console.log('Connection Successfull');
  }).catch((e)=>{
      console.log(e);
  });