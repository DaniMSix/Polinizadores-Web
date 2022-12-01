const bcrypt =require('bcrypt');
const { response } = require('express');

function login(req, res) {
    res.render('login/index');
}

function register(req, res) {
    res.render('login/register');
}

function auth(req, res){
    
    const data = req.body;

    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM usuario where email=?', [data.email], (err, userdata)=>
        {
            
            if (userdata.length>0){
                userdata.forEach(element => {
                bcrypt.compare(data.password, element.password, (err, isMatch)=>{
                        if (!isMatch){
                            res.render('login/index',{error:'Error password!'});
                        } else{
                            req.session.loggedin =true;
                            req.session.name=element.name;
                            if(element.rol == 'publico general'){
                                res.redirect('/');
                            }else{
                                res.redirect('./homeAdmin');
                            }
                            
                        }
                    });
                });
            } else{
                res.render('login/index',{error:'User not exists!'});
            }
        });
    });
}

function storeUser(req, res) {
    const data = req.body;

    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM usuario where email=?', [data.email], (err, userdata)=>
        {
            if (userdata.length>0){
                res.render('login/register',{
                    error:'User already exists!'
                })
            } else{
                bcrypt.hash(data.password,12).then(hash => {
                    data.password=hash;
                    req.getConnection((err,conn)=>{
                        conn.query('INSERT INTO usuario (name, email, password, rol) VALUES (?, ?, ?, ?)',[data.name, data.email, data.password, 'publico general'], (err, rows) =>{
                            res.redirect('/')
                        });
                    });
                });
            }
        });
    });
}

function logout(req, res){
    if(req.session.loggedin==true){
        req.session.destroy();
    } else{
        res.redirect('/login')
    }
}



module.exports={
    login,
    register,
    storeUser,
    auth,
    logout
}