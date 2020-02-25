const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const jsonParser = bodyParser.json()


let addresses=[];
let responses =[];

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded())


app.get('/', (request, response) => {
    response.render('home');
});

app.post('/form', (request, response) => {
    var q=request.body.q;
    var a=request.body.a;


    response.render('form',{q:q,a:a});

});

app.post('/result', jsonParser,(request, response) => {
    var url=request.body.url;
    var a=request.body.ans;
    var all = {
        r: responses,
        add:addresses,
    };


    if (addresses.includes(url)){
        console.log("Duplicate found");
        response.send(all);
        // response.render('form',{responses:responses});{responses:responses,addresses:addresses}
    }else{
        addresses.push(url);
        responses.push(a);
        response.send(all);

    }

});
app.post('/refresh', jsonParser,(request, response) => {
    var url=request.body.url;
    var all = {
        r: responses,
        refresh:true,
    };


    if (addresses.includes(url)){
        console.log("Duplicate found");
        response.send(all);
        // response.render('form',{responses:responses});{responses:responses,addresses:addresses}
    }else{
        all.refresh=false;
        response.send(all);

    }

});



app.listen(port);
console.log('server listening on port 3000');
