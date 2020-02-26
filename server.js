const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

// 引入路由 

const users = require('./routers/swimming/users')
const skill = require('./routers/swimming/skill')

// 使用中间件实现允许跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    next();
  });



// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  



// 连接数据库

// 连接数据库 

const mongodbUrl = 'mongodb://127.0.0.1:27017/swimApp'
mongoose.set('useFindAndModify', false)
mongoose
.connect(mongodbUrl, { useNewUrlParser: true,useUnifiedTopology: true  })
.then(() => console.log('MongoDB Connected server ... '))
.catch(err => console.log(err));

// 使用外部路由 

app.use('/swimmimg/users',users);
app.use('/swimmimg/skill',skill)
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});





