const DOMProducts = document.getElementById('wrapper')

let cart = []

//funcion asincronica para pedir informacion a la "api"
async function requestProductos() {
    try {
        //espera a que se cargue la informacion
        const res = await fetch('./json/products.json')
        //espera a que se pase a formato json
        return await res.json()
    } catch (error) {
        console.log(error)
    }
}
//manejo de respuesta imprimiendo listado de productos con la informacion cargada
requestProductos().then(products => {
    products.forEach(product => {

        //card del producto
        let card = document.createElement('div')
        card.classList.add('card', 'col-12', 'col-sm-4', 'col-md-3', 'col-lg-2')
        card.innerHTML = `
            <div class="img__container">
                <img class="card-img-top card__img img-fluid" src="./img/${product.img}"/>
            </div>
            <div class="card-body">
                    <h3>${product.name}</h3>
                    <p class="card-text"><strong>${product.price}$</strong></p>
            </div>
        `
        DOMProducts.append(card)

        //boton add to cart
        const button = document.createElement('button')
        button.classList.add('btn', 'border-dark', 'btn-lg', 'ProductBTN')
        button.setAttribute('id', product.id)
        button.textContent = "Add to cart"
        card.append(button)
        //evento agregar producto al carrito
        button.addEventListener('click', (e) => {
            clicked(e);
            //compara id del boton add to cart si coincide con el id del producto lo agrega al array cart
            let productFound = products.find((p) => p.id == e.target.id)
            cart.push(productFound)

            Toastify({
                text: "Added product",
                duration: 1000,
                destination: "cart.html",
                newWindow: true,
                close: false,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "black",
                },
                onClick: function () { }
            }).showToast();

            saveLocalStorage()           
            renderCartCounter()
        })
    })
    
    loadLocalStorage()
})




function renderCartCounter() {
    let counter = document.getElementById("cartCounter")
    counter.innerText = `${cart.length}`
}
//evento para deshabilitar botones del listado de productos si es que se presionan
function clicked(e) {
    e.target.setAttribute('disabled', true)
    e.target.innerHTML = "Added"
}
function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}
function loadLocalStorage() {

    //si existe un item cart seleccionar los productos del mismo y deshabilitar los botones 
    if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart')) 
        const butt = DOMProducts.querySelectorAll('.btn')

        butt.forEach(b => {
            if(cart.some(p => p.id == b.id)){
                document.getElementById(b.id).disabled = true
                document.getElementById(b.id).innerHTML = "Added"
            }
        })
    } 
    else {
        localStorage.setItem('cart', JSON.stringify(cart))
    }


}

loadLocalStorage()
renderCartCounter()


