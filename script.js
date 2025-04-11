/*
 * Display the modal with dynamic team details and three tabs:
 * PDF, PPT, and YouTube.
 * @param {string} teamName - The name of the team.
 * @param {Array<string>} studentNames - An array of student names.
 * @param {string} logoImage - The URL of the team's logo image.
 * @param {string} fileLink1 - The URL for the PDF file.
 * @param {string} fileLink2 - The URL for the PPT file.
 * @param {string} fileLink3 - The URL for the YouTube video.
*/
function showContent(teamName, studentNames, logoImage = "", fileLink1 = "", fileLink2 = "", fileLink3 = "") {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");

    // Set the team name as the modal title
    modalTitle.innerText = teamName;

    // Build the list of student names dynamically
    const studentList = studentNames.map(name => `<li>${name}</li>`).join('');

    // Update modal content with logo and group details
    modalText.innerHTML = `
        ${logoImage ? `<img src="${logoImage}" alt="${teamName} Logo" style="max-width: 100px; margin-bottom: 20px;">` : ''}
        <p>Members of ${teamName}:</p>
        <ul>
          ${studentList}
        </ul>
    `;

    // Set up the tab content containers
    const pdfTab = document.getElementById("pdfTab");
    const pptTab = document.getElementById("pptTab");
    const youtubeTab = document.getElementById("youtubeTab");

    // For PDF tab: use Google Docs viewer to embed the PDF
    if (fileLink1) {
        pdfTab.innerHTML = `<iframe src="https://docs.google.com/gview?url=${encodeURIComponent(fileLink1)}&embedded=true" frameborder="0" style="width:100%; height:400px;"></iframe>`;
    } else {
        pdfTab.innerHTML = "<p>No PDF available.</p>";
    }

    // For PPT tab: use Google Docs viewer to embed the PPT
    if (fileLink2) {
        pptTab.innerHTML = `<iframe src="https://docs.google.com/gview?url=${encodeURIComponent(fileLink2)}&embedded=true" frameborder="0" style="width:100%; height:400px;"></iframe>`;
    } else {
        pptTab.innerHTML = "<p>No PPT available.</p>";
    }

    // For YouTube tab: extract video ID and embed video
    if (fileLink3) {
        let videoId = "";
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        const match = fileLink3.match(regExp);
        if (match && match[2].length === 11) {
            videoId = match[2];
        }
        if (videoId) {
            youtubeTab.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" style="width:100%; height:400px;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            youtubeTab.innerHTML = `<p>Invalid YouTube URL.</p>`;
        }
    } else {
        youtubeTab.innerHTML = "<p>No YouTube video available.</p>";
    }

    openTab('pdfTab');

    overlay.style.display = "block";
    overlay.classList.add("active");

    modal.style.display = "flex";
    modal.classList.add("fade-in");
}

function openTab(tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    
    document.getElementById(tabName).style.display = "block";
    
    const activeButton = document.querySelector(`button[onclick="openTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }
}

function closeContent() {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    
    modal.style.display = "none";
    overlay.style.display = "none";
}

document.getElementById("overlay").addEventListener("click", closeContent);  