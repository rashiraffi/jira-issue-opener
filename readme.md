# JIRA Issue Opener

A simple and modern Chrome extension that helps you quickly open JIRA issues by specifying the JIRA host, project code, and issue number. The extension saves your previously used host and project codes and presents them in a sleek autocomplete dropdown for quick selection.

## Features

- **Modern Dark‑Themed UI:** Built with [Tailwind CSS](https://tailwindcss.com/) for a clean, responsive dark interface.
- **Autocomplete Dropdowns:** The host and project code fields provide smart, searchable dropdowns based on previously entered values.
- **Persistent Storage:** Remembers your last used host and project code, along with a history of all values for quick access.
- **Quick Issue Access:** Enter the issue number and press Enter or click the button to open the corresponding JIRA issue in a new tab.
- **Borderless Design:** A clean, borderless popup with a custom close button for a seamless user experience.

## Installation

1. **Clone or Download this Repository:**

   ```bash
   git clone https://github.com/rashiraffi/jira-issue-opener.git
   ```

2. **Open Chrome and Navigate to:**  
   `chrome://extensions/`

3. **Enable Developer Mode:**  
   Toggle the "Developer mode" switch in the top-right corner.

4. **Load the Extension:**  
   Click on "Load unpacked" and select the folder where you cloned/downloaded the repository.

## Usage

1. Click the extension icon in your Chrome toolbar.
2. In the popup:
   - **JIRA Host:** Start typing or select from previously entered hosts (e.g., `your-domain.atlassian.net`).
   - **Project Code:** Start typing or select from previously entered project codes (e.g., `ABC`).
   - **Issue Number:** Enter the issue number (e.g., `1234`).
3. Press Enter or click the **"Open Issue"** button to open the corresponding JIRA issue in a new tab.
4. To close the popup, click the **close button** (`×`) in the top-right corner.
5. Your entries for the JIRA host and project code will be saved and available for future sessions.

## Contributing

Contributions, bug reports, and feature requests are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [Chrome Extensions API Documentation](https://developer.chrome.com/docs/extensions/)

---
