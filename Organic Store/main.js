
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
// Global
var products = [];
var cartItems = [];
var cart_n = document.getElementById('cart_n');
// Divs
var fruitDiv = document.getElementById("fruitDiv");
var juiceDiv = document.getElementById("juiceDiv");
var saladDiv = document.getElementById("saladDiv");
//info
var FRUIT = [{ name: 'Apple', price: 1 }, { name: 'Orange', price: 2 }, { name: 'Cherry', price: 3 }, { name: 'Strawberry', price: 4 }, { name: 'Kiwi', price: 5 }, { name: 'Banana', price: 2 }];
var JUICE = [{ name: 'Orange Juice', price: 10 }, { name: 'Green Apple Juice', price: 11 }, { name: 'Tomato Juice', price: 12 }]
var SALAD = [{ name: 'Salad #1', price: 11 }, { name: 'Salad #2', price: 12 }, { name: 'Salad #3', price: 15 }]
//html
function HTMLfruitProduct(con) {
    let URL = `img/fruits/fruit${con}.jpg`;
    let btn = `btnFruit${con}`;
    return `
        <div class="col-md-4">
         <div class="card mb-4 shadow-sm">
              <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card Image cap">
              <div class="card-body">
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <p class="card-text">${FRUIT[con - 1].name}</p>
              <p class="card-text">Price: ${FRUIT[con - 1].price}.00</p>  
              <div class="d-flex justify-content-between align-items-center">
               <div class="btn-group">
                    <button type="button" onclick="cart2('${FRUIT[con-1].name}','${FRUIT[con - 1].price}','${URL}',${con}','${btn}')" class="btn btn-sm btn-outline-secondary"><a href="cart.html" style="color:inherit;">Buy</a></button>
                    <button id="${btn}"type="button" onclick="cart('${FRUIT[con-1].name}','${FRUIT[con - 1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
                  </div>
                   <small class="text-muted"> Free Shipping </small>
                </div>
               </div>
         </div>
        </div>
               `
}

function HTMLjuiceProduct(con) {
    let URL = `img/juices/juice${con}.jpg`;
    let btn = `btnJuice${con}`;
    return `
        <div class="col-md-4">
         <div class="card mb-4 shadow-sm">
              <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card Image cap">
              <div class="card-body">
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <p class="card-text">${JUICE[con - 1].name}</p>
              <p class="card-text">Price: ${JUICE[con - 1].price}.00</p>  
              <div class="d-flex justify-content-between align-items-center">
               <div class="btn-group">
                    <button type="button" onclick="cart2('${JUICE[con-1].name}','${JUICE[con - 1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary"><a href="cart.html" style="color:inherit;">Buy</a></button>
                    <button id="${btn}"type="button" onclick="cart('${JUICE[con-1].name}','${JUICE[con - 1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
                  </div>
                   <small class="text-muted"> Free Shipping </small>
                </div>
               </div>
         </div>
        </div>
               `
}

function HTMLsaladProduct(con) {
    let URL = `img/salads/salad${con}.jpg`;
    let btn = `btnSalad${con}`;
    return `
        <div class="col-md-4">
         <div class="card mb-4 shadow-sm">
              <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card Image cap">
              <div class="card-body">
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <i style="color:orange;" class="fa fa-star"></i>
              <p class="card-text">${SALAD[con - 1].name}</p>
              <p class="card-text">Price: ${SALAD[con - 1].price}.00</p>  
              <div class="d-flex justify-content-between align-items-center">
               <div class="btn-group">
                    <button type="button" onclick="cart2('${SALAD[con-1].name}','${SALAD[con - 1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary"><a href="cart.html" style="color:inherit;">Buy</a></button>
                    <button id="${btn}"type="button" onclick="cart('${SALAD[con-1].name}','${SALAD[con - 1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
                  </div>
                   <small class="text-muted"> Free Shipping </small>
                </div>
               </div>
         </div>
        </div>
               `
}
// animation
function animation(){
    const toast=swal.mixin({
        toast:true,
        position:'top-end',
        showConfirmButton:false,
        timer:1000
    });
    toast({
        type:'success',
        title: 'Added to shopping cart'
    });
}
// cart funtions
function cart(name,price,url,con,btncart) {
    var item={
        name:name,
        price:price,
        url:url
    }
    cartItems.push(item);
    let storage= JSON.parse(localStorage.getItem("cart"));
    if (storage==null){
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    } else {
        products= JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products=JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML=`[${products.length}]`;
        document.getElementById(btncart).style.display="none";
        animation();

} 

function cart2(name,price,url,con,btncart){
    var item={
        name:name,
        price:price,
        url:url
    } 
    cartItems.push(item);
    let storage=JSON.parse(localStorage.getItem("cart"));
    if (storage==null){
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    } else {
        products= JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products=JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML=`[${products.length}]`;
        document.getElementById(btncart).style.display="none";
}

//render
function render() {
 for (let index = 1; index <= 6; index++) {
     fruitDiv.innerHTML+= `${HTMLfruitProduct(index)}`;     
 }
 for (let index = 1; index <= 3; index++) {
    juiceDiv.innerHTML+= `${HTMLjuiceProduct(index)}`;    
}
for (let index = 1; index <= 3; index++) {
    saladDiv.innerHTML+= `${HTMLsaladProduct(index)}`;
}
if (localStorage.getItem("cart")==null) {
    
} else{
    products=JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`[${products.length}]`;
}
}