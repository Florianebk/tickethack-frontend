function addBooking() {
    document.querySelectorAll('#addBooking').forEach(button => {
        button.addEventListener('click', function () {
            let ids = document.querySelector('.none').textContent

            const data = {
                id: ids
            }


            fetch('https://ticket-hack.vercel.app/basket/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => { console.log(data) })
                .then(() => window.location.assign('cart.html'))



        })

    });

}


document.querySelector('#searchButton').addEventListener('click', function () {

    let departure = document.querySelector('#departure').value
    departure = departure.charAt(0).toUpperCase() + departure.slice(1)
    let arrival = document.querySelector('#arrival').value
    arrival = arrival.charAt(0).toUpperCase() + arrival.slice(1)
    let date = document.querySelector('#dateSearch').value


    if (!departure || !arrival || !date) {

        document.querySelector('.card-right').innerHTML =
            `
                <div id="getTrip" class="getTrip">
                    <img src="./images/notfound.png" alt="">
                    <p> No trip found !</p>
                </div>`
    } else {
        fetch(`https://ticket-hack.vercel.app/trip/list?departure=${departure}&arrival=${arrival}&date=${date}`)
            .then(response => response.json())
            .then(trip => {

                let newDate = new Date(el.date);
                let heure = newDate.getHours()
                let minutes = newDate.getMinutes()

                document.querySelector('.card-right').innerHTML = ''

                for (let el of trip.trips) {
                    document.querySelector('.card-right').innerHTML += `<div trips= '${el}' class='line-trip'>
                ${el.departure} to ${el.arrival} ${heure}:${minutes} - ${el.price}
                <p class='none'>${el._id}</p>
                <button id="addBooking" class=""> Book </button>
                </div>`;

                    addBooking()
                }

            })
    }

})




