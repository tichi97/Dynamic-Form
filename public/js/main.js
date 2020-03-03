

var count=0;



function addRow() {
    if (count<8){
        var form = document.getElementById("form");
        var fgroup = document.createElement("div");
        fgroup.classList.add("form-group");
        form.appendChild(fgroup);

        var inp = document.createElement("input");
        inp.type = "text";
        inp.classList.add("form-control");
        inp.id="exampleFormControlInput1";
        inp.name="a";
        inp.required=true;
        fgroup.appendChild(inp);

        var btntxt = document.createTextNode("Remove");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.classList.add("btn");
        btn.classList.add("btn-outline-secondary");
        btn.onclick = function() {remove()};
        btn.appendChild(btntxt);
        fgroup.appendChild(btn);

        count=count+1;
    }else{
        alert("too many, cannot add");
    }


}
function remove(){
    if (count>0){
        var x = document.activeElement;
        var form = document.getElementById("form");
        var child = x.parentElement;
        form.removeChild(child);
        count=count-1;
    }else{
        alert("cannot remove");
    }

}
