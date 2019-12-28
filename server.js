
const path = __dirname+'\\app\\environments\\'+process.env.NODE_ENV.trim()+'.env';
const dotenv = require('dotenv').config({path : path});
const app = require('./app/app');
const mongoose = require('mongoose');
const PORT = dotenv.parsed.PORT || 3000;
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
console.log("process env",process.env.NODE_ENV);
/* if(process.env.NODE_ENV === 'test'){ */
    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://localhost:27017/postdb',{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false}, (err)=>{
            if(err) console.log(err);
        });
    }); 
/* } else {
    mongoose.connect(dotenv.parsed.DBURL,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false}, (err)=>{
        if(err) console.log(err);
    });
} */


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

