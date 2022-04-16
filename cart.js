let cart = []
const DOMcart = document.getElementById('cartList')
const DOMtotal = document.getElementById('total')
const DOMempty = document.getElementById('empty-btn')
loadLocalStorage()

function renderCart() {
    DOMcart.textContent = ''

    //filtro de duplicados para evitar renderizados innecesarios
    let cartWithoutDup = cart.filter((item, index) => {
        const _item = JSON.stringify(item)

        return index === cart.findIndex(item => {
            return JSON.stringify(item) === _item
        })
    })


    cartWithoutDup.forEach((p) => {

        const productCart = document.createElement('li')
        DOMcart.append(productCart)
        productCart.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'my-5')



        const amount = cart.reduce((acc, item) => {
            if (item.id == p.id)
                return acc += 1
            else
                return acc
        }, 0)



        let { img, name, price } = p
        productCart.innerHTML = `
        <div class="col-6 col-sm-6 d-flex align-items-center p-0 flex-wrap">
            <div class="img__container col-10 col-md-4">
                <img class="img-fluid card__img" src="./img/${img}"/>
            </div>
            <p class="col-10 col-md-8 py-3 text-center">${name}</p>  
        </div>
        `

        const containerAmount = document.createElement('div')
        containerAmount.classList.add('col-3', 'col-sm-3', 'd-flex', 'align-items-center', 'p-0', 'transition')
        productCart.append(containerAmount)
        const btnSub = document.createElement('button')
        btnSub.textContent = "-"
        btnSub.classList.add('btn', 'btn-dark', 'btn-lg')
        btnSub.setAttribute('id', p.id)
        containerAmount.append(btnSub)
        //evento para restar unidades del producto
        btnSub.addEventListener('click', (e) => {
            let ind
            //agarra la ultima unidad de un producto y va sobreescribiendo su indice en una variable hasta llegar a la ultima unidad
            cart.forEach((item, index) => {
                if (item.id == e.target.id) {
                    ind = index
                }
            })
            //con la variable ind podemos eliminar la ultima unidad de un producto de esta forma evitamos usar lastindex y findindex que causan problemas
            if(cart.findIndex(p => p.id == e.target.id) === ind) {
                console.log(true)
            }
            cart.splice(ind, 1)

            renderCart()
            saveLocalStorage()
        })
        const DOMamount = document.createElement('p')
        DOMamount.classList.add('text-center', 'col-3', 'col-sm-3')
        DOMamount.innerText = `${amount}`
        containerAmount.append(DOMamount)
        const btnSum = document.createElement('button')
        btnSum.textContent = "+"
        btnSum.classList.add('btn', 'btn-dark', 'btn-lg')
        btnSum.setAttribute('id', p.id)
        containerAmount.append(btnSum)
        //evento para agregar mas unidades del producto
        btnSum.addEventListener('click', (e) => {
            let productFound = cart.find((item) => item.id == e.target.id)
            cart.push(productFound)
            saveLocalStorage()
            renderCart()

        })

        const DOMprice = document.createElement('div')
        DOMprice.classList.add('col-3', 'col-sm-3')
        DOMprice.innerHTML = `<p class="fs-3 text-end">$${price * amount}</p>`
        productCart.append(DOMprice)
    })

    DOMtotal.textContent = calculateTotal()
    saveLocalStorage()
}


function calculateTotal() {

    return cart.reduce((acc, itemId) => acc + itemId.price, 0)
}


function saveLocalStorage() {

    localStorage.setItem('cart', JSON.stringify(cart))
}

function loadLocalStorage() {
    localStorage.getItem('cart') ? cart = JSON.parse(localStorage.getItem('cart')) : localStorage.setItem('cart', JSON.stringify(cart))

}


DOMempty.addEventListener('click', (e) => {
    cart = []
    localStorage.clear()    

    renderCart()
    //alerta sweet
    Swal.fire({
        position: 'bottom-start',
        icon: 'success',
        title: 'The cart was emptied successfully',
        showConfirmButton: false,
        timer: 1500
    })

})
renderCart()