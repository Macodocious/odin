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

// Declare inputs outside of the function to make it accessible globally
let inputComponent;
let inputs;

// Function to clone the input container and remove the toolbar, "edit" class, and make it read-only
function cloneInputComponent() {
    let clonedInputComponent = inputComponent.cloneNode(true); // Clone the input container
    clonedInputComponent.removeAttribute('id'); // Remove the id attribute
    clonedInputComponent.querySelectorAll('.label-wrapper:not(.code-wrapper .label-wrapper)').forEach(labelWrapper => labelWrapper.remove()); // Remove the label-wrapper div
    clonedInputComponent.querySelectorAll('.toolbar').forEach(toolbar => toolbar.remove()); // Remove the toolbar
    let editElements = clonedInputComponent.querySelectorAll('.edit'); // Find all elements with class "edit"
    editElements.forEach(element => {
        element.classList.remove('edit'); // Remove the "edit" class
    });
    let contentEditable = clonedInputComponent.querySelectorAll('.heading, .code, .text');
    contentEditable.forEach(element => {
        element.contentEditable = false; // Make it read-only
    });
    inputs.innerHTML = ''; // Clear the content of the original input container
    return clonedInputComponent;
}

function createInputComponent() {
    inputComponent = document.createElement("div");
    inputComponent.setAttribute("id", "input-container");
    inputComponent.classList.add("input-container");

    inputs = document.createElement("div");
    inputs.classList.add("inputs", "edit");

    let toolbar = document.createElement("div");
    toolbar.classList.add("toolbar");
        let toolbarButtons = document.createElement("div");
        toolbarButtons.classList.add("toolbar-buttons");
            let titleButton = document.createElement("i");
            titleButton.classList.add("bi", "bi-type-h1");
            titleButton.addEventListener("click", function() {
                let headingWrapper = document.createElement("div");
                headingWrapper.classList.add("heading-wrapper", "edit");
                    // Label
                    let headingLabelWrapper = document.createElement("div");
                    headingLabelWrapper.classList.add("label-wrapper", "edit");
                        let headingLabel = document.createElement("p");
                        headingLabel.classList.add("label");
                        headingLabel.textContent = "Heading";
                        headingLabelWrapper.appendChild(headingLabel)
                    headingWrapper.appendChild(headingLabelWrapper);
                    // Textarea
                    let headingTextArea = document.createElement("div");
                    headingTextArea.contentEditable = true;
                    headingTextArea.classList.add("heading", "edit");
                    headingTextArea.addEventListener('keydown', function(event) {
                        if (event.key === 'Tab') {
                            event.preventDefault();
                            document.execCommand('insertText', false, '    ');
                        }
                    });
                    headingWrapper.appendChild(headingTextArea);
                    // Delete
                    let deleteHeading = document.createElement("i");
                    deleteHeading.classList.add("bi", "bi-x-lg", "delete-heading", "edit");
                    deleteHeading.addEventListener("click", function() {
                        headingWrapper.remove();
                        event.stopPropagation;
                    });
                    headingWrapper.appendChild(deleteHeading);
                inputs.appendChild(headingWrapper);             
            });
            let textButton = document.createElement("i");
            textButton.classList.add("bi", "bi-type");
            textButton.addEventListener("click", function() {
                let textWrapper = document.createElement("div");
                textWrapper.classList.add("text-wrapper", "edit");
                    // Label
                    let textLabelWrapper = document.createElement("div");
                    textLabelWrapper.classList.add("label-wrapper", "edit");
                        let textLabel = document.createElement("p");
                        textLabel.classList.add("label");
                        textLabel.textContent = "Text";
                        textLabelWrapper.appendChild(textLabel)
                    textWrapper.appendChild(textLabelWrapper);
                    // Textarea
                    let textArea = document.createElement("div");
                    textArea.contentEditable = true;
                    textArea.classList.add("text", "edit");
                    textArea.addEventListener('keydown', function(event) {
                        if (event.key === 'Tab') {
                            event.preventDefault();
                            document.execCommand('insertText', false, '    ');
                        }
                    });
                    textWrapper.appendChild(textArea);
                    // Delete
                    let deleteTextArea = document.createElement("i");
                    deleteTextArea.classList.add("bi", "bi-x-lg", "delete-text", "edit");
                    deleteTextArea.addEventListener("click", function() {
                        textWrapper.remove();
                        event.stopPropagation;
                    });
                    textWrapper.appendChild(deleteTextArea);
                inputs.appendChild(textWrapper);      
            });       
            let codeButton = document.createElement("i");
            codeButton.classList.add("bi", "bi-code-slash");
            codeButton.addEventListener("click", function() {
                let codeWrapper = document.createElement("div");
                codeWrapper.classList.add("code-wrapper", "edit");
                    // Label
                    let codeLabelWrapper = document.createElement("div");
                    codeLabelWrapper.classList.add("label-wrapper", "edit");
                        let codeLabel = document.createElement("p");
                        codeLabel.classList.add("label");
                        codeLabel.textContent = "Code";
                        codeLabelWrapper.appendChild(codeLabel)
                        codeWrapper.appendChild(codeLabelWrapper);
                    // Textarea
                    let codeArea = document.createElement("div");
                    codeArea.contentEditable = true;
                    codeArea.classList.add("code", "edit");
                    codeArea.addEventListener('keydown', function(event) {
                        if (event.key === 'Tab') {
                            event.preventDefault();
                            document.execCommand('insertText', false, '    ');
                        }
                    });
                    codeWrapper.appendChild(codeArea);
                    // Delete
                    let deleteCodeArea = document.createElement("i");
                    deleteCodeArea.classList.add("bi", "bi-x-lg", "delete-text", "edit");
                    deleteCodeArea.addEventListener("click", function() {
                        codeWrapper.remove();
                        event.stopPropagation;
                    });
                    codeWrapper.appendChild(deleteCodeArea);
                inputs.appendChild(codeWrapper);  
            });
            let tagButton = document.createElement("i");
            tagButton.classList.add("bi", "bi-textarea-t");

            toolbarButtons.appendChild(titleButton);
            toolbarButtons.appendChild(textButton);
            toolbarButtons.appendChild(codeButton);
            // toolbarButtons.appendChild(tagButton); // Doesn't work

            let saveButton = document.createElement("i");
            saveButton.classList.add("bi", "bi-plus-lg");
            saveButton.addEventListener("click", function() {
                // Check if there are any added fields
                let addedFields = inputs.querySelectorAll('.heading, .code, .text');
                if (addedFields.length === 0) {
                    alert("You need to add and fill at least one field to save.");
                    return;
                }
                // Check if all added fields are filled before cloning
                let allFieldsFilled = true;
                addedFields.forEach(field => {
                    if (field.textContent.trim() === '') {
                        allFieldsFilled = false;
                    }
                });
                // Check if all added fields are filled
                if (allFieldsFilled) {
                    // Clone the current input container
                    let clonedInputComponent = cloneInputComponent();
                    mainWrapper.appendChild(clonedInputComponent);
                    mainWrapper.style.display = "flex";
                } else {
                    alert("You need to fill all added fields to save.")
                }         
            });

        toolbar.appendChild(toolbarButtons);
        toolbar.appendChild(saveButton);

    inputComponent.appendChild(inputs);
    inputComponent.appendChild(toolbar);

    return inputComponent;
}

let main = document.getElementById('main');
main.appendChild(createInputComponent());

let mainWrapper = document.getElementById('main-wrapper');
if (mainWrapper.querySelector("div")) {
    mainWrapper.style.display = "flex";
} else {
    mainWrapper.style.display = "none";
}
