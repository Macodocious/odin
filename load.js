// For current page active-state
// "DOMContentLoaded" is an event that indicates the page has been loaded and is ready to be manipulated.
// "addEventListener" is an event listener attached to the "document" object waiting/listening for "DOMContentLoaded" event.
document.addEventListener("DOMContentLoaded", function() {
    // Function starts here
    // Get the current page URL
    let currentPageURL = window.location.pathname;
    // Get all anchor elements with the class "nav-link"
    let navLinks = document.querySelectorAll(".nav-link");
    // Loop through each anchor element
    navLinks.forEach(function(navLink) {
        // Check if the href attribute matches the current page URL
        if (navLink.getAttribute("href") === currentPageURL) {
            // Add the 'active' class to the matching anchor element
            navLink.classList.add("active");
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Creates a "nav" for each page
// Function to create the component
function createNavigationComponent() {
    // Create container div
    let navContainer = document.createElement("div");
    navContainer.classList.add("nav");

    // Create first block
    let block1 = createBlock("Course", [ // Square brackets only used to create array literal, curly only used to create object literal.
        createNavLink("Foundations")
    ]);

    // Create second block
    let block2 = createBlock("Section", [
        createNavLink("Variables & Operators", "/variables_operators.html"),
        createNavLink("Data Types & Conditionals", "/datatypes_conditionals.html"),
        createNavLink("JavaScript Developer Tools"),
        createNavLink("Function Basics"),
        createNavLink("Problem Solving"),
        createNavLink("Understanding Errors"),
        createNavLink("Clean Code"),
        createNavLink("Installing Node.js"),
        createNavLink("Arrays and Loops"),
        createNavLink("DOM Manipulation & Events"),
        createNavLink("Object Basics")
    ]);

    // Create third block
    let block3 = createBlock("Projects", [
        createNavLink("Rock Paper Scissors"),
        createNavLink("Etch-a-Sketch"),
        createNavLink("Calculator")
    ]);

    // Create fourth block
    let block4 = createBlock("Brian Mac", [
        createNavLink("LinkedIn", "https://www.linkedin.com/in/brianmac97/"),
        createNavLink("GitHub", "https://github.com/Macodocious/")
    ]);

    // Append blocks to container
    navContainer.appendChild(block1);  // In this case, appendChild is adding block 2 after block 1, and block 3 after block 2, making block 3 the last-child 'added'.
    navContainer.appendChild(block2);  // It does not absolutely make it the "last-child" like in :last-child.
    navContainer.appendChild(block3);
    navContainer.appendChild(block4);

    return navContainer; // The "return" statement is used to specify the value a function should return when it is called. Kind of like the result so that you can use it elsewhere.    // Example, a bakery is the function, giving the order to the baker is calling the function,
}                        // In this case, When "createNavigationComponent()" is called, it will create a component represented by "navContainer".                                           baker making the cake is the function performing, and the finished cake being handed to you is the "return" statement.

// Function to create block
function createBlock(labelText, links) {
    let block = document.createElement("div");
    block.classList.add("block");
    
    let label = document.createElement("p");
    // label.classList.add("label");
    label.textContent = labelText;
    block.appendChild(label); // appendChild adds an existing node (element, text node, etc. - in this case ".label") to the last child of a specified parent node.

    links.forEach(function(link) {
        block.appendChild(link); 
    });

    return block;
}

// Function to create nav link
function createNavLink(text, href) {
    let link = document.createElement("a");
    link.classList.add("nav-link");
    link.textContent = text;
    if (href) {
        link.href = href;
    }
    return link;
}

// Get container element and insert the navigation component
let container = document.getElementById("navigationContainer");
container.appendChild(createNavigationComponent());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    // Initialize CodeMirror
    let editors = [];
    let inputComponents = [];

    // Create an "input component" for each page
    // Function to create the component
    function createInputComponent() {
        // Create the container
        let inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");

        // Create inputs
        let input1 = createInput('Question');
        let input2 = createInput('Code');
        let input3 = createInput('Result');

        // Append inputs to container;
        inputContainer.appendChild(input1);
        inputContainer.appendChild(input2);
        inputContainer.appendChild(input3);

        // Create a button to save input data
        let saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", function() {
            // Checks to see if any textarea has an characters in it
            let allTextAreas = inputContainer.querySelectorAll(".code");
            let anyTextAreaEmpty = false;
            allTextAreas.forEach(function(textarea) {
                if (textarea.value.trim().length < 1) {
                    anyTextAreaEmpty = true;
                }
            });
            if (!anyTextAreaEmpty) {
                // Hide empty textareas in cloned input component
                clonedInput.querySelectorAll(".code").forEach(function(textarea) {
                    if (textarea.value.trim().length < 1) {
                        textarea.style.display = "none";
                    }
                });
            } else {
                // alert("Please fill in all areas before saving.");
            }
                // Clone the input component and insert it above the current one
                let clonedInput = inputContainer.cloneNode(true);
                findInputContainer.insertBefore(clonedInput, inputContainer);
                // Reset the current input component
                resetInputComponent(inputContainer);
                // Remove the save button from the cloned input component
                clonedInput.removeChild(clonedInput.querySelector("button"));
                // Adjust height of CodeMirror elements in the cloned input component
                adjustCodeMirrorHeight(clonedInput);
        });
        inputContainer.appendChild(saveButton);

        // Store the input component
        inputComponents.push(inputContainer);

        return inputContainer;
    }

    // Function to create input
    function createInput(inputType) {
        let createInputSection = document.createElement("div");
        createInputSection.classList.add("input-section");

        let codeLabel = document.createElement("p");
        codeLabel.classList.add("label");
        switch (inputType) {
            case 'Question':
                codeLabel.textContent = "Question";
                break;
            case 'Code':
                codeLabel.textContent = "Code";
                break;
            case 'Result':
                codeLabel.textContent = "Result";
        }

        let code = document.createElement("textarea");
        code.classList.add("code");

        createInputSection.appendChild(codeLabel);
        createInputSection.appendChild(code);
        // Initialize CodeMirror for the newly created textarea
        let editor = CodeMirror.fromTextArea(code, {
            mode: "javascript",
            theme: "default",
            lineNumbers: true,
            indentUnit: 2,
            tabSize: 2,
            autofocus: true
        });

        editors.push(editor);
        return createInputSection;
    }

    

    // Function to reset input component
    function resetInputComponent(component) {
        let textAreas = component.querySelectorAll(".code");
        textAreas.forEach(function(textarea) {
            textarea.value = "";
            editors[inputComponents.indexOf(component)].setValue("");
        });
    }

    // Get container element and insert the input component
    let findInputContainer = document.getElementById("input-container");
    findInputContainer.appendChild(createInputComponent());

    // Function to adjust height of CodeMirror elements
    function adjustCodeMirrorHeight(component) {
        let codeMirrors = component.querySelectorAll(".CodeMirror");
        codeMirrors.forEach(function(codeMirror) {
            codeMirror.style.height = "fit-content";
        });
    }
});