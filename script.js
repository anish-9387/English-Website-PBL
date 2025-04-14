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

    // Remove any large state from previous content.
    modal.classList.remove("large");

    resetTabs();

    modalTitle.innerText = teamName;

    const studentList = studentNames.map(name => `<li>${name}</li>`).join('');
    modalText.innerHTML = `
        <p>Members of ${teamName}:</p>
        <ul>
          ${studentList}
        </ul>
    `;

    const pdfTab = document.getElementById("pdfTab");
    const pptTab = document.getElementById("pptTab");
    const youtubeTab = document.getElementById("youtubeTab");

    pdfTab.innerHTML = "";
    pptTab.innerHTML = "";
    youtubeTab.innerHTML = "";

    pdfTab.dataset.fileLink = fileLink1;
    pptTab.dataset.fileLink = fileLink2;
    youtubeTab.dataset.fileLink = fileLink3;

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
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].innerHTML = "";
    }
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
}

/*
/*
 * Open the specified tab and load its content if not already loaded.
 * This is only triggered when the corresponding button (REPORT, PPT, or YouTube) is clicked.
 */
function openTab(tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");

    modal.classList.add("large");

    if (window.innerWidth >= 769 && !document.getElementById("team-info")) {
        const modalTitle = document.getElementById("modal-title");
        const modalText = document.getElementById("modal-text");
        const tabs = document.querySelector(".tabs");
        const tabContent = document.getElementById("tab-content");

        const teamInfo = document.createElement("div");
        teamInfo.id = "team-info";

        const teamName = modalTitle.textContent;
        const membersHtml = modalText.innerHTML;

        teamInfo.innerHTML = `
            <h2>${teamName}</h2>
            <div id="modal-text">
                ${membersHtml}
            </div>
        `;

        const rightPanel = document.createElement("div");
        rightPanel.id = "right-panel";
        rightPanel.style.flex = "1";
        rightPanel.style.display = "flex";
        rightPanel.style.flexDirection = "column";
        rightPanel.style.overflow = "hidden";

        const tabsClone = tabs.cloneNode(true);

        modalContent.innerHTML = '';

        const closeBtn = document.createElement("span");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "&times;";
        closeBtn.onclick = closeContent;
        modalContent.appendChild(closeBtn);

        modalContent.appendChild(teamInfo);

        rightPanel.appendChild(tabsClone);

        rightPanel.appendChild(tabContent);

        modalContent.appendChild(rightPanel);
    }

    const activeTab = document.getElementById(tabName);
    let fileLink = activeTab.dataset.fileLink;

    if (tabName === "pdfTab" || tabName === "pptTab") {
        if (fileLink) {
            let previewLink = fileLink;
            if (fileLink.includes("drive.google.com")) {
                previewLink = fileLink.replace(/\/view.*$/, "/preview");
            }
            activeTab.innerHTML = `<iframe src="${previewLink}" frameborder="0" style="display:block; width:100%; height:58vh; border:none;"></iframe>`;
        } else {
            activeTab.innerHTML = `<p>No ${tabName === "pdfTab" ? "Report" : "PPT"} available.</p>`;
        }
    } else if (tabName === "youtubeTab") {
        if (fileLink) {
            if (fileLink.includes("embed")) {
                activeTab.innerHTML = `<iframe src="${fileLink}" frameborder="0" style="display:block; width:100%; height:58vh;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            } else {
                let videoId = "";
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
                const match = fileLink.match(regExp);
                if (match && match[2].length === 11) {
                    videoId = match[2];
                    activeTab.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" style="display:block; width:100%; height:58vh;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                } else {
                    activeTab.innerHTML = "<p>Invalid video URL.</p>";
                }
            }
        } else {
            activeTab.innerHTML = "<p>No video available.</p>";
        }
    }

    activeTab.style.display = "block";

    const activeButton = document.querySelector(`button[onclick="openTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add("active");
    }

    activeTab.offsetHeight;
}

/*
 * Close the modal and overlay.
 */
function closeContent() {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");

    const teamInfo = document.getElementById("team-info");
    const title = teamInfo ? teamInfo.querySelector("h2").textContent : document.getElementById("modal-title").textContent;
    const modalText = teamInfo ? teamInfo.querySelector("#modal-text").innerHTML : document.getElementById("modal-text").innerHTML;

    const pdfTab = document.getElementById("pdfTab");
    const pptTab = document.getElementById("pptTab");
    const ytTab = document.getElementById("youtubeTab");

    const pdfLink = pdfTab.dataset.fileLink;
    const pptLink = pptTab.dataset.fileLink;
    const ytLink = ytTab.dataset.fileLink;

    modal.classList.remove("large");

    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
        <span class="close-btn" onclick="closeContent()">&times;</span>
        <h2 id="modal-title">${title}</h2>
        <div id="modal-text">${modalText}</div>
        <div class="tabs">
            <button class="tab-button" onclick="openTab('pdfTab')">REPORT</button>
            <button class="tab-button" onclick="openTab('pptTab')">PPT</button>
            <button class="tab-button" onclick="openTab('youtubeTab')">YouTube</button>
        </div>
        <div id="tab-content">
            <div id="pdfTab" class="tab-content"></div>
            <div id="pptTab" class="tab-content" style="display:none;"></div>
            <div id="youtubeTab" class="tab-content" style="display:none;"></div>
        </div>
    `;

    document.getElementById("pdfTab").dataset.fileLink = pdfLink;
    document.getElementById("pptTab").dataset.fileLink = pptLink;
    document.getElementById("youtubeTab").dataset.fileLink = ytLink;

    modal.style.display = "none";
    overlay.style.display = "none";
}

// Hide modal on clicking the overlay.
document.getElementById("overlay").addEventListener("click", closeContent);