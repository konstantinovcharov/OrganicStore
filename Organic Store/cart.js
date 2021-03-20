//Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAgxuKdE1HftlFVj7n1jzZUg1nhylzCvPU",
    authDomain: "organic-store-1d43c.firebaseapp.com",
    databaseURL: "https://organic-store-1d43c.firebaseio.com",
    projectId: "organic-store-1d43c",
    storageBucket: "",
    messagingSenderId: "637939267281",
    appId: "1:637939267281:web:e0dabe2a5da0c63ae0f7f0",
    measurementId: "G-PH2TVG5FWH"
};
firebase.initializeApp(firebaseConfig);


//global
products=JSON.parse(localStorage.getItem('cart'));
var cartItems=[];
var cart_n = document.getElementById('cart_n');
var table = document.getElementById("table");
var total=0; 

//html
function tableHTML(i){
    return`
     <tr>
     <th scope="row">${i+1}</th>
     <td><img style="width:90px;" src="${products[i].url}"></td>
     <td>${products[i].name}</td>
     <td>1</td>
     <td>${products[i].price}</td>
     </tr>
    `; 
}

//buy 

function buy() {
    var d = new Date();
    var t = d.getTime();
    var counter=t;
    counter+=1;
    let db=firebase.database().ref("order/"+counter);
    let itemdb={
        id:counter,
        order:counter-895,
        total:total
    }
    db.set(itemdb);
    swal({
        position:'center',
        type:'success',
        title:'Purchase made successfully!',
        text:`Your purchase order is: ${itemdb.order}`,
        showConfirmButton:true,
        timer:50000
    });
    clean();
}
//clean
function clean(){
    localStorage.clear();
    for (let index = 0; index < products.length; index++) {
       table.innerHTML+=tableHTML(index);
       total=total+parseInt(products[index].price);        
    }
    total=0;
    table.innerHTML=`
    <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    </tr>
    `;
    cart_n.innerHTML='';
    document.getElementById("btnBuy").style.display="none";
    document.getElementById("btnClean").style.display="none";
}

//render
function render(){
 for (let index = 0; index < products.length; index++) {
     table.innerHTML+=tableHTML(index);
     total=total+parseInt(products[index].price); 
       
 }
 table.innerHTML+=`
  <tr>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col">Total: $${total}.00</th>
  </tr>
  <tr>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col"></th>
  <th scope="col">
  <button id="btnClean" onclick="clean()" class="btn text-white btn-warning">Clean Shopping Cart</button>
  </th>
  <th scope="col"><button id="btnBuy" onclick="buy()" class="btn btn-success">Buy </button></th>
  </tr>
 `;

products=JSON.parse(localStorage.getItem("cart"));
cart_n.innerHTML=`[${products.length}]`;

}