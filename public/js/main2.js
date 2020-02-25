var a;
var question;
var allurls;
const server = 'http://localhost:3000';
var localserver ="http://localhost/";

async function addResult(final) {
    const url = server + '/result';
    const result = {url: localserver, ans: final};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(result)
    }
    const response = await fetch(url, options);
    const answers = await response.json();
    allurls = answers.add;
    populateContent(answers.r);
}

function populateContent(answers) {
    var doc = document.getElementById('results');
    var counts = {};
    var total = answers.length;
    var p = document.getElementById('number');
    var totalnum = document.createTextNode("Total number of responses: "+total);
    p.appendChild(totalnum);


    for (var i = 0; i < answers.length; i++) {
      var x = answers[i];
      counts[x] = counts[x] ? counts[x] + 1 : 1;
    }
    var data = [{
      values: Object.values(counts),
      labels: Object.keys(counts),
      type: 'pie'
    }];

    var layout = {
      height: 400,
      width: 500
    };

    Plotly.newPlot(doc, data,{showSendToCloud:true});

}

document.querySelector('form').addEventListener('submit', (e) => {
    a = document.querySelector('input[name="ans"]:checked').value;
    btn=document.getElementById('sub');
    frm=document.getElementById('finalform');
    frm.removeChild(btn);
    addResult(a);
    e.preventDefault();
});

async function checkRefresh() {
    const url = server + '/refresh';
    const result = {url: localserver};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(result)
    }
    const response = await fetch(url, options);
    const refresh = await response.json();

    if (refresh.refresh){
        alert("Cannot submit twice")
        document.getElementById('finalform').style.display = "none";
        populateContent(refresh.r);
    }else{
        document.getElementById('finalform').style.display = "block";
    }

}

window.onload = function() {
    checkRefresh();

}

