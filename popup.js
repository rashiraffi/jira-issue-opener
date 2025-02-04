document.addEventListener("DOMContentLoaded", function () {
  const hostInput = document.getElementById("hostInput");
  const hostDatalist = document.getElementById("hostDatalist");
  const projectInput = document.getElementById("projectInput");
  const projectDatalist = document.getElementById("projectDatalist");
  const issueInput = document.getElementById("issueInput");
  const openButton = document.getElementById("openButton");

  // Load stored values from chrome.storage.sync
  chrome.storage.sync.get(
    ["jiraHost", "jiraProject", "hostsList", "projectsList"],
    function (data) {
      if (data.jiraHost) {
        hostInput.value = data.jiraHost;
      }
      if (data.jiraProject) {
        projectInput.value = data.jiraProject;
      }
      // Populate host drop-down options
      if (data.hostsList && Array.isArray(data.hostsList)) {
        data.hostsList.forEach(function (host) {
          let option = document.createElement("option");
          option.value = host;
          hostDatalist.appendChild(option);
        });
      }
      // Populate project drop-down options
      if (data.projectsList && Array.isArray(data.projectsList)) {
        data.projectsList.forEach(function (project) {
          let option = document.createElement("option");
          option.value = project;
          projectDatalist.appendChild(option);
        });
      }
      // Set focus to the Issue Number input
      issueInput.focus();
    }
  );

  // Function to update storage and datalists with any new values
  function updateStorage(newHost, newProject) {
    chrome.storage.sync.get(["hostsList", "projectsList"], function (data) {
      let hostsList = data.hostsList || [];
      let projectsList = data.projectsList || [];

      if (newHost && !hostsList.includes(newHost)) {
        hostsList.push(newHost);
        let option = document.createElement("option");
        option.value = newHost;
        hostDatalist.appendChild(option);
      }
      if (newProject && !projectsList.includes(newProject)) {
        projectsList.push(newProject);
        let option = document.createElement("option");
        option.value = newProject;
        projectDatalist.appendChild(option);
      }

      chrome.storage.sync.set({
        jiraHost: newHost,
        jiraProject: newProject,
        hostsList: hostsList,
        projectsList: projectsList,
      });
    });
  }

  // Function to construct the URL and open the JIRA issue in a new tab
  function openIssue() {
    const host = hostInput.value.trim();
    const project = projectInput.value.trim();
    const issue = issueInput.value.trim();

    if (!host || !project || !issue) {
      alert("Please enter host, project code, and issue number.");
      return;
    }

    // Save host and project as last used and add to the drop-down options if new
    updateStorage(host, project);

    // Build the URL (e.g., https://npkexchange.atlassian.net/browse/EPP-1304)
    const url = `https://${host}/browse/${project}-${issue}`;
    chrome.tabs.create({ url: url });
  }

  // Event listeners for button click and pressing Enter in the issue number input
  openButton.addEventListener("click", openIssue);
  issueInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      openIssue();
    }
  });
});
