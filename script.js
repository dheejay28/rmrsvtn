const reservedRooms = [];

document.addEventListener('DOMContentLoaded', () => {
    const timeDateElement = document.getElementById('time-date');
    const now = new Date();
    timeDateElement.innerHTML = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
});

document.getElementById('reservation-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const room = document.getElementById('room').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const course = document.getElementById('course').value;
    const yearSection = document.getElementById('year-section').value;

    const isReserved = reservedRooms.some(reservation => {
        return reservation.room === room && 
               ((startTime >= reservation.startTime && startTime < reservation.endTime) || 
                (endTime > reservation.startTime && endTime <= reservation.endTime));
    });

    if (isReserved) {
        alert('The selected time is already booked for this room.');
    } else {
        const reservationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        reservedRooms.push({ room, startTime, endTime, course, yearSection, reservationCode });

        document.getElementById('reservation-code').innerText = `Reservation Code: ${reservationCode}`;
        alert('Room reserved successfully!');
    }
});
document.getElementById('return-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const code = document.getElementById('reservation-code').value;
    
    const index = reservedRooms.findIndex(reservation => reservation.reservationCode === code);
    
    if (index > -1) {
        reservedRooms.splice(index, 1);
        alert('Room returned successfully!');
    } else {
        alert('Invalid reservation code.');
    }
});
function populateReservedRooms() {
    const reservedRoomsTable = document.getElementById('reserved-rooms');
    reservedRoomsTable.innerHTML = '';

    reservedRooms.forEach(reservation => {
        reservedRoomsTable.innerHTML += `
            <tr>
                <td>${reservation.room}</td>
                <td>${reservation.startTime}</td>
                <td>${reservation.endTime}</td>
                <td>${reservation.course}</td>
                <td>${reservation.yearSection}</td>
                <td><button onclick="removeReservation('${reservation.reservationCode}')">Remove</button></td>
            </tr>
        `;
    });
}
function removeReservation(code) {
    const index = reservedRooms.findIndex(reservation => reservation.reservationCode === code);
    
    if (index > -1) {
        reservedRooms.splice(index, 1);
        alert('Reservation removed successfully!');
        populateReservedRooms();
    } else {
        alert('Reservation not found.');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('reserved-rooms')) {
        populateReservedRooms();
    }
});
