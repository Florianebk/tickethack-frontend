document.querySelector('#searchButton').addEventListener('click', function() {

    let departure = document.querySelector('#departure').value
    departure = departure.charAt(0).toUpperCase() + departure.slice(1)
    let arrival = document.querySelector('#arrival').value
    arrival = arrival.charAt(0).toUpperCase() + arrival.slice(1)
    let date = document.querySelector('#dateSearch').value


if()

        fetch(`http://localhost:3000/trip/list?departure=${departure}&arrival=${arrival}&date=${date}`)
        .then(response => response.json())
        .then(trip =>{

            document.querySelector('.card-right').innerHTML = ''
             
            for(let el of trip.trips){
                document.querySelector('.card-right').innerHTML += `<div class='line-trip'>
                ${el.departure} to ${el.arrival} - ${el.price}
                <button id="addBooking" class=""> Book </button>
                </div>  `;
            
            }         

        })

})



function addBooking(){
    document.querySelector('#addBooking').addEventListener('click', function(){
        const newBasket = new Basket({
            departure: departure,
            arrival: arrival,
            date: date,
            price : price
        })
    
         newBasket.save()

        })

    }
    
            
            // fetch('http://localhost:3000/save', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // }) 
            // .then(response => response.json()) .then(data => {console.log(data);});
 




