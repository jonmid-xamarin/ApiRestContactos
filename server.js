const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// *************************************************************
// *************************************************************

let users = [
    {id: 0, username: 'admin', password: '123456', name: 'Jonathan Mideros', email: 'jamideros@hotmail.com', image: 'xxx.png'}
];

let contacts = [
    {id: 0, name: 'Carlos', phone: '1111111111', email: 'aaaaa@gmail.com', image: 'xxx.png'},
    {id: 1, name: 'Sara', phone: '2222222222', email: 'bbbbb@hotmail.com', image: 'xxx.png'},
    {id: 2, name: 'Dario', phone: '3333333333', email: 'ccccc@gmail.com', image: 'xxx.png'},
    {id: 3, name: 'Erika', phone: '4444444444', email: 'ddddd@hotmail.com', image: 'xxx.png'},
    {id: 4, name: 'Juan', phone: '5555555555', email: 'eeeee@gmail.com', image: 'xxx.png'}
];

// *************************************************************
// *************************************************************

// Validar usuarios al momento de hacer login
app.post('/validateUser', (req, res) => {
    let data = req.body;
    let success = [{id: 0, username: '', password: '', name: '', email: '', image: ''}];

    users.some(function (value, index, _arr) {
        if( (value.username == data.Username) && (value.password == data.Password) ){
            success[0]['success'] = true;
            return true;
        }else{
            return false;
        }
    });

    res.send(success)
})



 
app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
})

// Listar usuarios
app.get('/users', (req, res) => {
    let pos = 0;
    users.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(users)
})

// Crear usuarios
app.post('/users', (req, res) => {
    let data = req.body;
    let consecutive = users.length;
    let itemUser = {id: consecutive, name: data.Name};
    users.push(itemUser)
    res.send("New user add")
})

// Actualizar usuarios
app.put('/users/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    users[params.id]['name'] = data.Name;
    res.send("User update")
})

// Eliminar usuarios
app.delete('/users/:id',(req, res) => {
    let params = req.params;
    users.splice(params.id, 1);
    res.send('User delete')
})

// *************************************************************
// *************************************************************
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})