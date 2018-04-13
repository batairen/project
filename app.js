//server
const http = require('http');
const express = require('express');
const user = require('./user');
const uc=require('./uc');
const index=require('./index');
var app = express();
http.createServer(app).listen(8080);
app.use(express.static('public'));
app.get('/index',index.getProducts);
app.post('/addCart',index.addCart);
app.post('/user/register',user.register);
app.post('/user/login',user.login);
app.get('/uc/myorder',uc.myOrders);
app.get('/uc/shoppingCart',uc.shoppingCart);
app.post('/uc/cartDel',uc.delCart);
app.get('/',(req,res)=>{
    res.redirect('login.html');
});
app.get('/detail',index.getDetail);

