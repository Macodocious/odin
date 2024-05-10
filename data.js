// Function to save data to GitHub
function saveToGitHub(data) {
    // GitHub repository information
    const username = 'macodocious';
    const repository = 'odin';
    const filePath = 'data/main-wrapper-data.json'; // Path to the file in the repository

    // Personal access token for authentication
    const accessToken = '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';

    // GitHub API endpoint
    const apiUrl = `https://api.github.com/repos/${username}/${repository}/contents/${filePath}`;

    // Data to be saved (convert to JSON format)
    const content = JSON.stringify(data);

    // Request headers
    const headers = new Headers({
        'Authorization': `token ${accessToken}`,
        'Content-Type': 'application/json',
    });

    // Request body
    const body = {
        message: 'Update main-wrapper data',
        content: btoa(content), // Encode content as base64
    };

    // POST request to GitHub API to create or update file
    fetch(apiUrl, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.ok) {
            console.log('Data saved successfully');
        } else {
            console.error('Failed to save data:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error saving data:', error);
    });
}

// Event listener for saveButton click
saveButton.addEventListener('click', function() {
    // Gather data to be saved (e.g., values of #main-wrapper)
    const mainWrapperData = gatherMainWrapperData();

    // Save data to GitHub
    saveToGitHub(mainWrapperData);
});