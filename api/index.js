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
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
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
 
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const UserDoc = await UserModel.findOne({ email });
//     if (UserDoc) {
//          const passOk = bcrypt.compareSync(password, UserDoc.password);
//          if (passOk) {
//             jwt.sign({ email: UserDoc.email, id: UserDoc._id }, jwtScret, {}, (err, token) => {
//                 if (err) throw err;
//                 res.cookie('token', token).json('pass ok');
//             });
//          } else {
//             res.status(422).json('pass not ok');
//          }
//     } else {
//         res.json('not found');
//     }
// });
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
}
)
    

app.listen(8080);
