async function listarPolinizadores(req, res){
        req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM polinizador', (err, userdata)=>
        {
            console.log(userdata)
            if (userdata.length>0){                                              
                res.render('./homeAdmin', {userdata})
            } else{
                console.log("Error")
                res.render('./homeAdmin',{
                    error:'Error al obtener polinizadores'
                })
            }
        });
    });
}

async function registrarPolinizador(req, res){
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO polinizador SET ?', [data], (err, rows=>{
            if(!err){
                res.redirect('./homeAdmin')
            }else{
                console.log("Error")
            }
        }))
    })
}

module.exports = {
    listarPolinizadores,
    registrarPolinizador
}