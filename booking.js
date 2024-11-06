async function getBooking(){
    const booking = await fetch(`http://localhost:3000/basket/booking`)
    const bookingJs = await booking.json()
    if(bookingJs.booking.length > 0){
        document.querySelector('.welcome').innerHTML = await `
        <div class='content'>
            <h3>My bookings</h3>
            <div class='line-cart'>
            </div>
            <div class='separateur'></div>
            <div class='footer'>Enjoy your travels with TicketHack!</div>
        </div>
            `
        for (let element of bookingJs.booking){
            const newDate = new Date(element.date).getHours()
            const nowDate = new Date().getHours()
            let restHour = (nowDate-newDate)*(-1)
            if(restHour<0){
                restHour+=24
            }
            document.querySelector('.line-cart').innerHTML += await `
            <div class='ticket'>
                <p>${element.departure}-->${element.arrival}</p>
                <p>${newDate}h</p>
                <p>${element.price}€</p>
                <p>Departure in ${restHour} hours</p>
            </div>
            `
        }
    }
}

getBooking()