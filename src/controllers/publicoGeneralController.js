
function enviarPropuesta(req, res) {
    res.render('./enviarPropuesta');
}

function registrarPropuesta(req, res){
    const data = req.body;
    req.getConnection((err, conn)=>{
        conn.query('INSERT INTO solicitudregistro (estadoAvistamiento,lugarAvistamiento,descripcion, horaavistamiento, fechaavistamiento, estatussolicitud) VALUES (?,?,?,?,?,?)', ['Veracruz', 'Xalapa',data.descripcion, data.horaavistamiento, data.fechaavistamiento, 'En revisión'], (err, rows=>{

            res.redirect('./enviarPropuesta');
            
        }))
    })
}

module.exports = {
    enviarPropuesta,
    registrarPropuesta
}