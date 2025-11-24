function setTimeBasedBackground() {
    // Get current hour
    const currentHour = new Date().getHours();

    // Define colors based on the time of day
    let backgroundColor;
    let textColorClass = '';

    if (currentHour >= 6 && currentHour < 12) {
        // Morning (6 AM to 12 PM) - light blue
        backgroundColor = '#87CEEB'; // Light Blue
    } else if (currentHour >= 12 && currentHour < 18) {
        // Afternoon (12 PM to 6 PM) - light yellow
        backgroundColor = '#FFD700'; // Gold
    } else if (currentHour >= 18 && currentHour < 21) {
        // Evening (6 PM to 9 PM) - orange
        backgroundColor = '#FF6347'; // Tomato
    } else {
        // Night (9 PM to 6 AM) - dark blue or black
        backgroundColor = '#2C3E50'; // Dark Blue/Black
        textColorClass = 'dark-mode';
    }
	window.addEventListener('DOMContentLoaded', function() {
		// Set the background color
		document.body.style.backgroundColor = backgroundColor;
		// Check if we need to invert text color
		if (textColorClass) {
			document.body.classList.add(textColorClass);
		} else {
			document.body.classList.remove('dark-mode');
		}
	});
}

// Call the function on page load
setTimeBasedBackground();

// Optional: Update the background color every minute, in case time changes during browsing
setInterval(setTimeBasedBackground, 60000); // Updates every minute
