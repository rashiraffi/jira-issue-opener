document.addEventListener("DOMContentLoaded", function () {
  const hostInput = document.getElementById("hostInput");
  const hostSuggestions = document.getElementById("hostSuggestions");
  const projectInput = document.getElementById("projectInput");
  const projectSuggestions = document.getElementById("projectSuggestions");
  const issueInput = document.getElementById("issueInput");
  const openButton = document.getElementById("openButton");
  const closeButton = document.getElementById("closeButton");

  // Global arrays to hold previously entered values
  let hostsList = [];
  let projectsList = [];

  // Load stored values from chrome.storage.sync
  chrome.storage.sync.get(
    ["jiraHost", "jiraProject", "hostsList", "projectsList"],
    function (data) {
      hostsList = data.hostsList || [];
      projectsList = data.projectsList || [];
      if (data.jiraHost) {
        hostInput.value = data.jiraHost;
      }
      if (data.jiraProject) {
        projectInput.value = data.jiraProject;
      }
    }
  );

  // Utility function: Filter suggestions based on input (case-insensitive)
  function filterSuggestions(list, query) {
    query = query.toLowerCase();
    return list.filter((item) => item.toLowerCase().includes(query));
  }

  // Utility function: Render suggestions in a container element
  function showSuggestions(inputElem, suggestionsElem, list) {
    const query = inputElem.value.trim();
    const matches = filterSuggestions(list, query);
    // Clear previous suggestions
    suggestionsElem.innerHTML = "";
    if (matches.length === 0) {
      suggestionsElem.classList.add("hidden");
      return;
    }
    matches.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = item;
      div.className = "suggestion-item";
      // Use mousedown to capture selection before the input loses focus
      div.addEventListener("mousedown", function () {
        inputElem.value = item;
        suggestionsElem.classList.add("hidden");
      });
      suggestionsElem.appendChild(div);
    });
    suggestionsElem.classList.remove("hidden");
  }

  // Hide suggestions when clicking outside the input
  document.addEventListener("click", function (e) {
    if (!hostInput.contains(e.target)) {
      hostSuggestions.classList.add("hidden");
    }
    if (!projectInput.contains(e.target)) {
      projectSuggestions.classList.add("hidden");
    }
  });

  // Event listeners for the Host input
  hostInput.addEventListener("input", function () {
    showSuggestions(hostInput, hostSuggestions, hostsList);
  });
  hostInput.addEventListener("focus", function () {
    showSuggestions(hostInput, hostSuggestions, hostsList);
  });

  // Event listeners for the Project input
  projectInput.addEventListener("input", function () {
    showSuggestions(projectInput, projectSuggestions, projectsList);
  });
  projectInput.addEventListener("focus", function () {
    showSuggestions(projectInput, projectSuggestions, projectsList);
  });

  // Function to update storage with new host and project values, if not already present
  function updateStorage(newHost, newProject) {
    chrome.storage.sync.get(["hostsList", "projectsList"], function (data) {
      let storedHosts = data.hostsList || [];
      let storedProjects = data.projectsList || [];

      if (newHost && !storedHosts.includes(newHost)) {
        storedHosts.push(newHost);
        hostsList.push(newHost);
      }
      if (newProject && !storedProjects.includes(newProject)) {
        storedProjects.push(newProject);
        projectsList.push(newProject);
      }

      chrome.storage.sync.set({
        jiraHost: newHost,
        jiraProject: newProject,
        hostsList: storedHosts,
        projectsList: storedProjects,
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

    // Update storage with the new host and project values
    updateStorage(host, project);

    // Construct the JIRA URL (e.g., https://your-domain.atlassian.net/browse/ABC-1234)
    const url = `https://${host}/browse/${project}-${issue}`;
    chrome.tabs.create({ url: url });
  }

  // Event listeners for the Open Issue button and pressing Enter in the Issue input
  openButton.addEventListener("click", openIssue);
  issueInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      openIssue();
    }
  });

  // Close button event listener: Close the popup when clicked
  closeButton.addEventListener("click", function () {
    window.close();
  });

  // Auto-focus the issue number input when the popup opens
  issueInput.focus();
});
