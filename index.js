const remote = require('electron').remote
const main = remote.require('./main.js')

// let button = document.createElement('button')
// button.textContent = "Open Window"
// document.body.appendChild(button)

// button.addEventListener('click', () => {
//     main.openWindow()
//     console.log('hi')
// })

const printUsernames = (rows) => {

    rows.forEach(row => {
        $("#user-list").append(`
            <li class="collection-item">${row.username}</li>
        `)
    });
}

const connectionToDb = (user, pass) => {
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: user,
        password: pass,
        database: 'laratter'
    })

    connection.connect((err) => {
        if(err){
            console.error(err.code)
            console.error(err.fatal)
        }
    })

    let query = "SELECT username FROM users"

    connection.query(query, (err, rows, fields) =>{
        if(err){
            console.error("Error al consultar")
            console.error(err)
            return
        }

        printUsernames(rows)
    })

    connection.end(() => {

    })
}

$(function(){
    const os = require('os')
    const prettyBytes = require('pretty-bytes')
    
    //$('.collapsible').collapsible();
    //var el = document.querySelector('.tabs');
    //var instance = M.Tabs.init(el,{});
    $('.stats').append('Numero de procesadores: <span>' + os.cpus().length + '</span> ')

    $('.stats').append('Memoria libre: <span>' + prettyBytes(os.freemem()) + '</span>')

    $('#connect').click(() => {
        console.log($("#username").val() + ' - ' + $("#password").val())
        connectionToDb($("#username").val(), $("#password").val())
    })

});