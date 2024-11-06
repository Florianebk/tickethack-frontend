

fetch('http://localhost:3000/basket/cart')
.then(response => response.json())
.then(data => {
    if(data.cart.length > 0){

        let count = 0 
 
        document.querySelector('.welcome').innerHTML =''

        document.querySelector('.welcome').innerHTML = `
        <div class="content">
        <div class='line-cart'>
        </div>
        </div>
        <div class='separateur'></div>
        <div class='footer'>
        <p id='count'></p>
        <button id="purchase"> purchase </button>
        </div>
        </div>`

        for(let el of data.cart){

            let newDate = new Date(el.date);
            let heure = newDate.getHours()
            let minutes = newDate.getMinutes()

            count += el.price

            document.querySelector('.line-cart').innerHTML += `
            <div class='ticket'>
            ${el.departure}>${el.arrival} ${heure}:${String(minutes).padStart(2, '0')} ${el.price}€
            <button id="delete" data-id='${el.id}'> delete </button>
            </div> `
            document.querySelector('#count').innerHTML = `${count}€`

            deleteButton()
            purchaseButton()

        }


    }
})

function deleteButton(){
    document.querySelectorAll('#delete').forEach( button => {
        button.addEventListener('click', function() {

            const getId = this.getAttribute('data-id')
                
                
                fetch(`http://localhost:3000/basket/delete/${getId}`,{
                method:'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    if(data.result){
                        this.parentNode.remove()
                    }      
                }) 
        })          
    }); 
}

function purchaseButton(){
    document.querySelectorAll('#purchase').forEach( button => {
        button.addEventListener('click', function() {
            fetch('http://localhost:3000/basket/update')
            .then((response => response.json()))
            .then(data => {
                if(data.result){

                     window.location.assign('booking.html')

                }      
            }) 

        })
    })

}

function updateCount(){

}