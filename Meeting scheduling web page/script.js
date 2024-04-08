const meetingForm = document.getElementById('meetingForm');
const meetingsList = document.getElementById('meetingsList');

meetingForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const meetingName = document.getElementById('meetingName').value;
    const meetingDate = document.getElementById('meetingDate').value;
    const meetingTime = document.getElementById('meetingTime').value;
    const guestName = document.getElementById('guestName').value;
    const guestEmail = document.getElementById('guestEmail').value;
    const moreAbout = document.getElementById('moreAbout').value;

    const meetingItem = document.createElement('div');
    meetingItem.classList.add('meeting-item');
    meetingItem.innerHTML = `
        <strong>${meetingName}</strong><br>
        Date: ${meetingDate}<br>
        Time: ${meetingTime}<br>
        Guest: ${guestName} (${guestEmail})<br>
        More About: ${moreAbout}
    `;

    meetingsList.appendChild(meetingItem);

    meetingForm.reset();
});

function signInWithGoogle() {
    // Implement Google sign-in functionality
    alert('Signing in with Google...');
}

function signInWithMicrosoft() {
    // Implement Microsoft sign-in functionality
    alert('Signing in with Microsoft...');
}
