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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to create a rich text field
function createRichTextField(className, placeholderText) {
    // Create a new div element
    const div = document.createElement('div');
    div.contentEditable = true; // Set contentEditable to true to make it rich text
    div.classList.add("work");
    div.classList.add(className);
    
    // If placeholder text is provided, create and append the placeholder element
    /* if (placeholderText) {
        const placeholderDiv = document.createElement('div');
        placeholderDiv.classList.add('placeholder');
        placeholderDiv.textContent = placeholderText;
        div.appendChild(placeholderDiv);

        // Add click event listener to the placeholder div
        placeholderDiv.addEventListener('click', function() {
            // Clear the content of the placeholder div when clicked
            placeholderDiv.textContent = '';
        });
    } */

    // Add event listener for keydown event
    div.addEventListener('keydown', function(event) {
      // Check if the pressed key is the Tab key
      if (event.key === 'Tab') {
        // Prevent the default behavior of switching focus
        event.preventDefault();
        // Insert a tab character (or spaces) at the current cursor position
        document.execCommand('insertText', false, '\t'); // Insert a tab character
        // You can use spaces instead by replacing '\t' with '    ' (four spaces)
      }
    });

    // Return the created div
    return div;
}

// Function to initialize and append three rich text fields to the container
function initializeRichTextFields() {
    // Select the container where rich text fields will be appended
    const container = document.getElementById('input-container');

    // Array of class names for the rich text fields
    const classNames = ['question', 'code', 'result'];

    // Array of labels for the rich text fields
    const labels = ['Question', 'Code', 'Result'];

    // Array of placeholder text for the rich text fields
    // const placeholders = ['Question', 'Code', 'Result'];

    // Loop to create and append three rich text fields with different classes
    classNames.forEach((className, index) => {
        if (labels[index] !== null) {
            // Create a new p element for the label
            const textFieldLabel = document.createElement('p');
            textFieldLabel.classList.add('label');
            textFieldLabel.textContent = labels[index];

            // Append the label to the container
            container.appendChild(textFieldLabel);
        }
        
        // Create a new rich text field with the current class name and placeholder text
        const richTextField = createRichTextField(className);
        // Append the rich text field to the container
        container.appendChild(richTextField);
    });

    // Add div for buttons
    let footer = document.createElement("div");
    footer.classList.add("footer");

    container.appendChild(footer);
}

// Call the function to initialize rich text fields when the page loads
window.onload = initializeRichTextFields;

////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved////Shelved///

/*
// Create an "input component" for each page
document.addEventListener("DOMContentLoaded", function() {
    // Initialize CodeMirror
    let editors = [];
    let inputComponents = [];

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

        // Button Wrapper
        let componentButtons = document.createElement("div");
        componentButtons.classList.add("component-buttons");

        inputContainer.appendChild(componentButtons);

        // Create a button to save input data
        let saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", function() {
            // Check if any CodeMirror instance has more than one word
            let anyEmpty = editors.some(editor => editor.getValue().trim().split(/\s+/).length < 1);
            if (!anyEmpty) {          
                // Clone the input component and insert it above the current one
                let clonedInput = inputContainer.cloneNode(true);
                clonedInput.classList.add("clone");
                findInputContainer.insertBefore(clonedInput, inputContainer);
                // Reset the current input component
                resetInputComponent(inputContainer);
                // Remove the save button from the cloned input component
                clonedInput.removeChild(clonedInput.querySelector(".component-buttons"));
                // Adjust height of CodeMirror elements in the cloned input component
                adjustCodeMirrorHeight(clonedInput);
                // Add event listeners to the cloned CodeMirror instances
                addEventListenersToClonedCodeMirrors(clonedInput);
            }  
        });
        componentButtons.appendChild(saveButton);

        // Create a button to delete the current component
        let deleteButton = document.createElement("i");
        deleteButton.classList.add("ph", "ph-trash");
        deleteButton.addEventListener("click", function() {
            // Removes the current input component
            inputContainer.remove();
        });

        componentButtons.appendChild(deleteButton);

        // Store the input component
        inputComponents.push(inputContainer);

        // Function to add event listeners to CodeMirror instances in cloned input components
        function addEventListenersToClonedCodeMirrors(clonedInput) {
            let clonedEditors = clonedInput.querySelectorAll(".CodeMirror");
            clonedEditors.forEach(function(clonedEditor) {
                clonedEditor.addEventListener("click", function() {
                    let editorInstance = clonedEditor.CodeMirror;
                    editorInstance.setOption("readOnly", false); // Make it editable when clicked
                });
                clonedEditor.addEventListener("blur", function() {
                    let editorInstance = clonedEditor.CodeMirror;
                    editorInstance.setOption("readOnly", true); // Make it read-only when blurred
                });
            });
        }

        return inputContainer;
    }

    // Function to create input
    function createInput(inputType) {
        let createInputSection = document.createElement("div");
        createInputSection.classList.add("input-section");

        let labelWrapper = document.createElement("div");
        labelWrapper.classList.add("label-wrapper");

        let labelIcons = document.createElement("div");
        labelIcons.classList.add("label-icons");

        let iconEdit = document.createElement("i");
        iconEdit.classList.add("ph", "ph-note-pencil");

        let iconDelete = document.createElement("i");
        iconDelete.classList.add("ph", "ph-trash");

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

        labelIcons.appendChild(iconEdit); // This is to add iconEdit to the icon-wrapper
        labelIcons.appendChild(iconDelete);
        labelWrapper.appendChild(codeLabel);
        labelWrapper.appendChild(labelIcons);

        let code = document.createElement("textarea");
        code.classList.add("code");

        createInputSection.appendChild(labelWrapper);
        createInputSection.appendChild(code);
        // Initialize CodeMirror for the newly created textarea
        let editor = CodeMirror.fromTextArea(code, {
            mode: "javascript",
            theme: "default",
            lineNumbers: true,
            indentUnit: 2,
            tabSize: 2,
            autofocus: true,
            readOnly: false
        });

        // Add event listener to toggle readOnly option
        editor.on("focus", function() {
            editor.setOption("readOnly", false);
        });

        editor.on("blur", function() {
            editor.setOption("readOnly", true); // Make it read-only when blurred
        });

        // Store the editor
        editors.push(editor);
        return createInputSection;
    }

    // Function to reset input component
    function resetInputComponent(component) {
        // Find all "original" input sections within the current input component
        let originalInputSections = component.querySelectorAll('.input-section:not(.clone)');

        originalInputSections.forEach(function(inputSection) {
            // Reset value in the textarea within the input section
            let textarea = inputSection.querySelector(".code");
            textarea.value = "";
    
            // Find the CodeMirror instance associated with the input section
            let editor = inputSection.querySelector('.CodeMirror').CodeMirror;
    
            // If a CodeMirror instance exists, reset its value
            if (editor) {
                editor.setValue("");
            }
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
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
