
function purchaseButton() {
    document.querySelectorAll('.purchase').forEach(button => {
        button.addEventListener('click', function () {
            fetch('https://ticket-hack.vercel.app/basket/update')
                .then((response => response.json()))
                .then(data => {
                    if (data.result) {

                        window.location.assign('booking.html')

                    }
                })

        })
    })

}

function updateCount() {
    fetch('https://ticket-hack.vercel.app/basket/cart')
        .then(response => response.json())
        .then(data => {

            let newCount = 0;
            if (data.cart.length > 0) {
                for (let el of data.cart) {
                    newCount += el.price

                }
                document.querySelector('#count').textContent = newCount
            }

        })
}

function deleteButton() {
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', function () {

            const getId = this.getAttribute('data-id')
            console.log(getId)


            fetch(`https://ticket-hack.vercel.app/basket/delete/${getId}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    if (data.result) {
                        this.parentNode.remove()
                        updateCount()
                    }
                })
        })
    });
}

fetch('https://ticket-hack.vercel.app/basket/cart')
    .then(response => response.json())
    .then(data => {
        if (data.cart.length > 0) {

            let count = 0

            document.querySelector('.welcome').innerHTML = ''

            document.querySelector('.welcome').innerHTML = `
        <div class="content">
        <div class='line-cart'>
        </div>
        </div>
        <div class='separateur'></div>
        <div class='footer'>
        <p id='count'></p>
        <button class="purchase"> purchase </button>
        </div>
        </div>`

            for (let el of data.cart) {

                let newDate = new Date(el.date);
                let heure = newDate.getHours()
                let minutes = newDate.getMinutes()

                count += el.price

                document.querySelector('.line-cart').innerHTML += `
            <div class='ticket'>
            ${el.departure}>${el.arrival} ${heure}:${String(minutes).padStart(2, '0')} ${el.price}€
            <button class="delete" data-id='${el._id}'> delete </button>
            </div> `
                document.querySelector('#count').innerHTML = `${count}€`


            }

            document.querySelector('#count').innerHTML = `${count}€`


        }
    })
    .then(data => {
        deleteButton()
        purchaseButton()
    })



