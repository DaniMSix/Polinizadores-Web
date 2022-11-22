
async function listarPolinizadores(req, res){
        req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM polinizador', (err, userdata)=>
        {
            if (userdata.length>0){                                              
                res.render('./homeAdmin', {userdata})
            } else{
                console.log("Error")
                res.render('./homeAdmin')
            }
        });
    });
}

async function listarFlora(req, res){
    req.getConnection((err,conn)=>{
    conn.query('SELECT * FROM florpolinizada', (err, userdata)=>
    {
        if (userdata.length>0){                                              
            res.render('./listarFlora', {userdata})
        } else{
            console.log("Error")
            res.redirect('./homeAdmin')
        }
    });
});
}



async function registrarPolinizador(req, res){
    const data = req.body;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM polinizador WHERE nombreCientifico=? AND florPolinizada=?', [data.nombreCientifico, data.florPolinizada], (err, rows)=>{
            if(rows.length>0){
                console.log("No se puede registrar la misma flor para el mismo polinizador")
            }else{
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
        })
    })
}

async function registrarFlora(req, res){
    const data = req.body;
    req.getConnection ((err, conn) => {
        conn.query('SELECT * FROM florPolinizada WHERE nombreComun = ?', [data.nombreComun, data.nombreCientifico], (err, rows) =>{
            if(rows.length>0){
                console.log('No se puede registrar la misma flor dos veces')
            }else{
                req.getConnection((err, conn) =>{
                    conn.query('INSERT INTO florPolinizada SET ?', [data], (err, rows=>{
                        if(!err){
                            res.redirect('./listarFlora')
                        }else{
                            console.log("Error al registrar")
                        }
                    }))
                })
            }
        })
    })
}

module.exports = {
    listarPolinizadores,
    registrarPolinizador,
    listarFlora,
    registrarFlora
}