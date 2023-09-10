const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./modals/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtScret = 'safsffsfsasdsd';
const cookieParser = require('cookie-parser')
const imageDownloader  = require('image-downloader')
const multer  = require('multer')
const fs = require('fs')
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname+'/uploads'));


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const userDoc = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    }
    catch(e){
        res.status(422).json(e);
    }
});
 
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const UserDoc = await UserModel.findOne({ email });
        if (UserDoc) {
            const passOk = bcrypt.compareSync(password, UserDoc.password);
            if (passOk) {
                jwt.sign({ email: UserDoc.email,
                     id: UserDoc._id,
                         
                    }, jwtScret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(UserDoc);
                });
            } else {
                res.status(422).json('pass not ok');
            }
        } else {
            res.json('not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('server error');
    }
});

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtScret,{},async (err,userData)=>{
            if(err){
             throw err;
            }
            const  {name,email,_id} = await UserModel.findById(userData.id);
            res.json({name,email,_id});
        });
    }
    else{
        res.json(null);

    }
    
})

app.post('/logout',(req,res)=>{
    res.clearCookie('token','').json(true);
});

app.post('/upload-by-link', async (req,res)=>{
    const {link} =req.body;
    const newName = 'photo'+Date.now() +'.jpg';

    await imageDownloader.image({
        url:link,
        dest: __dirname+'/uploads/' +newName, 
    })

    res.json(newName)

})
const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload',photosMiddleware.array('photos', 100),(req,res)=>{
    const uploadedFiles = [];
    for(let i=0;i<req.files.length;i++){
        const  {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path + '.'+ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    
    res.json(uploadedFiles);
})
 

// const photosMiddleware = multer({dest:'/uploads'});
// app.post('/api/upload', photosMiddleware.array('photos', 100), async (req,res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const {path,originalname,mimetype} = req.files[i];
//     const url = await uploadToS3(path, originalname, mimetype);
//     uploadedFiles.push(url);
//   }
//   res.json(uploadedFiles);
// });

    

app.listen(8080);