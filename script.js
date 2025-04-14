/*
 * Display the modal with dynamic team details.
 * The modal shows the team members and three buttons: REPORT, PPT, and YouTube.
 * Content is loaded only when a button is clicked.
 */
function showContent(teamName, studentNames, fileLink1 = "", fileLink2 = "", fileLink3 = "") {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");

    // Reset tab contents and active states
    resetTabs();

    // Set the team name as the modal title.
    modalTitle.innerText = teamName;

    // Build the list of student names dynamically.
    const studentList = studentNames.map(name => `<li>${name}</li>`).join('');
    modalText.innerHTML = `
        <p>Members of ${teamName}:</p>
        <ul>
          ${studentList}
        </ul>
    `;

    // Set up the tab content containers without loading any content.
    const pdfTab = document.getElementById("pdfTab");
    const pptTab = document.getElementById("pptTab");
    const youtubeTab = document.getElementById("youtubeTab");

    pdfTab.innerHTML = "";
    pptTab.innerHTML = "";
    youtubeTab.innerHTML = "";

    // Store file links as data attributes for later use.
    pdfTab.dataset.fileLink = fileLink1;
    pptTab.dataset.fileLink = fileLink2;
    youtubeTab.dataset.fileLink = fileLink3;

    // Display the modal and overlay.
    overlay.style.display = "block";
    overlay.classList.add("active");

    modal.style.display = "flex";
    modal.classList.add("fade-in");
}

/*
 * Reset tab contents and remove active classes.
 * This ensures that each time a new grid item is clicked,
 * the modal resets to only show the members list and the 3 buttons.
 */
function resetTabs() {
    // Hide all tab contents.
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].innerHTML = ""; // Clear loaded content.
    }
    // Remove active class from all tab buttons.
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
}

/*
 * Open the specified tab and load its content if not already loaded.
 * This is only triggered when the corresponding button (REPORT, PPT, or YouTube) is clicked.
 */
function openTab(tabName) {
    // First, hide all tab content and remove active state from buttons.
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Load and display content for the selected tab.
    const activeTab = document.getElementById(tabName);
    let fileLink = activeTab.dataset.fileLink;

    if (tabName === "pdfTab") {
        if (fileLink) {
            activeTab.innerHTML = `<iframe src="https://docs.google.com/gview?url=${encodeURIComponent(fileLink)}&embedded=true" frameborder="0" style="width:100%; height:400px;"></iframe>`;
        } else {
            activeTab.innerHTML = "<p>No report available.</p>";
        }
    } else if (tabName === "pptTab") {
        if (fileLink) {
            activeTab.innerHTML = `<iframe src="https://docs.google.com/gview?url=${encodeURIComponent(fileLink)}&embedded=true" frameborder="0" style="width:100%; height:400px;"></iframe>`;
        } else {
            activeTab.innerHTML = "<p>No PPT available.</p>";
        }
    } else if (tabName === "youtubeTab") {
        if (fileLink) {
            let videoId = "";
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
            const match = fileLink.match(regExp);
            if (match && match[2].length === 11) {
                videoId = match[2];
            }
            if (videoId) {
                activeTab.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" style="width:100%; height:400px;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            } else {
                activeTab.innerHTML = "<p>Invalid video URL.</p>";
            }
        } else {
            activeTab.innerHTML = "<p>No video available.</p>";
        }
    }

    activeTab.style.display = "block";

    // Add active class to the clicked button.
    const activeButton = document.querySelector(`button[onclick="openTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }
}

/*
 * Close the modal and overlay.
 */
function closeContent() {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");

    modal.style.display = "none";
    overlay.style.display = "none";
}

// Hide modal on clicking the overlay.
document.getElementById("overlay").addEventListener("click", closeContent);