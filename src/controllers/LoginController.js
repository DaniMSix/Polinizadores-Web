const bcrypt =require('bcrypt');

function login(req, res) {
    res.render('login/index');
}

function register(req, res) {
    res.render('login/register');
}

function auth(req, res){
    
    const data = req.body;

    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM users where  email=?', [data.email], (err, userdata)=>
        {
            if (userdata.length>0){
                userdata.forEach(element => {
                bcrypt.compare(data.password, element.password, (err, isMatch)=>{
                        if (!isMatch){
                            res.render('login/index',{error:'Error password!'});
                        } else{
                            req.session.loggedin =true;
                            req.session.name=element.name;
                            res.redirect('/');
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
        conn.query('SELECT * FROM users where  email=?', [data.email], (err, userdata)=>
        {
            if (userdata.length>0){
                res.render('login/register',{
                    error:'User already exists!'
                })
            } else{
                bcrypt.hash(data.password,12).then(hash => {

                    data.password=hash;
            
                    req.getConnection((err,conn)=>{
                        conn.query('INSERT INTO users SET ?',[data], (err, rows) =>{
                            res.redirect('/');
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