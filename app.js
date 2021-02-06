require('dotenv').config();

const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app = express();
app.set('view engine', 'ejs');
const db = require('./models')

app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));
app.use(methodOverride('_method'));
const cloudinary = require('cloudinary');

const multer = require('multer');
const path = require('path'); // path for cut the file extension
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, Date.now() + ext);
    }
  })
const upload = multer({ storage: storage });

app.post('/', upload.single('myFile'), function(req, res){
    cloudinary.uploader.upload(req.file.path, function(result){
        db.img.create({
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            url: result.url,
            secure_url: result.secure_url
        })
    })
    .then (()=>{
        res.redirect("/images")
    })
    
    
})

app.get('/', (req, res) => {
    res.render('pics/index', {data:{"demoText": "CLOUDPICS"}}); 
});

app.get('/upload', (req, res) => {
    res.render('pics/upload', {data:{"demoText": "CLOUDPICS"}}); 
});

app.get('/images', (req, res) => {
    db.img.findAll()
    .then ((imgs)=>{
        console.log(imgs)
        res.render('pics/list', {data:{"demoText": "CLOUDPICS", "data": imgs}}); 
      })
    
});

const PORT = process.env.LISTEN_PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});




// public_id:text, width:int, height:int, url:text,secure_url:text