// Global Declarations
let inputComponent;
let inputs;
let toolbar;
let toolbarButtons;
let headingButton;
let textButton;
let codeButton;
let saveButton;

function cloneInputComponent() {
    // Clone Input Container
    let clonedInputComponent = inputComponent.cloneNode(true);
    // Remove ID (#input-container)
    clonedInputComponent.removeAttribute('id');
    // Remove Label Wrapper
    clonedInputComponent.querySelectorAll('.label-wrapper:not(.code-wrapper .label-wrapper)').forEach(labelWrapper => labelWrapper.style.display = "none");
    // Remove Toolbar
    clonedInputComponent.querySelectorAll('.toolbar').forEach(toolbar => toolbar.remove());
    // Remove "edit" class
    let editElements = clonedInputComponent.querySelectorAll('.edit');
    editElements.forEach(element => {
        element.classList.remove('edit');
    });
    // Make content readOnly
    let contentEditable = clonedInputComponent.querySelectorAll('.heading, .code, .text');
    contentEditable.forEach(element => {
        element.contentEditable = false; // Make it read-only
    });
    // Clear Original Input Container
    inputs.innerHTML = '';
    // Create Cloned Input Component Settings
    let inputSettings = document.createElement("div");
    inputSettings.classList.add("input-settings");
        let editInput = document.createElement("i");
        editInput.classList.add("bi", "bi-pencil-square");
        editInput.addEventListener("click", function() {
            // Hides Cloned Input Component Settings
            inputSettings.style.display = "none";
            // Add Label Wrapper
            clonedInputComponent.querySelectorAll('.label-wrapper:not(.code-wrapper .label-wrapper)').forEach(labelWrapper => labelWrapper.style.display = "block");
            // Add Toolbar
            createToolbar();
            // Add Clone Toolbar Buttons (Line 277 of Original)
}

function createInputComponent() {
    createInputContainer();
        createInputs();
        createToolbar();
    
    return inputContainer;
}

// Create Input Container
function createInputContainer() {
    inputContainer = document.createElement("div");
    inputContainer.setAttribute("id", "input-container");
    inputContainer.classList.add("input-container");
    inputContainer.appendChild(inputs);
    inputContainer.appendChild(createToolbar());

    return inputContainer;
}

// Create Inputs
function createInputs() {
    inputs = document.createElement("div");
    inputs.classList.add("inputs", "edit");

    return inputs;
}

// Create Toolbar
function createToolbar() {
    toolbar = document.createElement("div");
    toolbar.classList.add("toolbar");
    toolbar.appendChild(toolbarButtons);
    toolbar.appendChild(saveButton);

    return toolbar;
}

// Create Toolbar Wrapper
toolbarButtons = document.createElement("div");
toolbarButtons.classList.add("toolbar-buttons");
toolbarButtons.appendChild(headingButton);
toolbarButtons.appendChild(textButton);
toolbarButtons.appendChild(codeButton);

// Create button for Headings
headingButton = document.createElement("i");
headingButton.classList.add("bi", "bi-type-h1");
headingButton.addEventListener("click", function() {
    // Create the wrapper for Heading component
    let headingWrapper = document.createElement("div");
    headingWrapper.classList.add("heading-wrapper", "edit");
        // Create the label for the component
        let headingLabelWrapper = document.createElement("div");
        headingLabelWrapper.classList.add("label-wrapper", "edit");
            let headingLabel = document.createElement("p");
            headingLabel.classList.add("label");
            headingLabel.textContent = "Heading";
            headingLabelWrapper.appendChild(headingLabel);
        headingWrapper.appendChild(headingLabelWrapper);
        // Create the textarea for the component
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
        // Remove the format when pasting text
        headingTextArea.addEventListener('paste', function(event) {
            event.preventDefault();                    
            let plainText = (event.clipboardData || window.clipboardData).getData('text/plain');                    
            document.execCommand('insertText', false, plainText);
        });
        // Create button to delete the component
        let deleteHeading = document.createElement("i");
        deleteHeading.classList.add("bi", "bi-x-lg", "delete-heading", "edit");
        deleteHeading.addEventListener("click", function() {
            this.parentNode.remove();
            event.stopPropagation();
        });
        headingWrapper.appendChild(deleteHeading);
    // Appends wrapper for Heading Component to Inputs depending on if clone or not
    if (inputs.parentElement.id === "input-container") {
        inputs.appendChild(headingWrapper);
    } else {
        clonedInputComponent.querySelector(".inputs").appendChild(headingWrapper);
    }
    
});

// Create button for Text
textButton = document.createElement("i");
textButton.classList.add("bi", "bi-type");
textButton.addEventListener("click", function() {
    // Create the wrapper for Heading component
    let textWrapper = document.createElement("div");
    textWrapper.classList.add("text-wrapper", "edit");
        // Create the label for the component
        let textLabelWrapper = document.createElement("div");
        textLabelWrapper.classList.add("label-wrapper", "edit");
            let textLabel = document.createElement("p");
            textLabel.classList.add("label");
            textLabel.textContent = "Text";
            textLabelWrapper.appendChild(textLabel);
        textWrapper.appendChild(textLabelWrapper);
        // Create the textarea for the component
        let textArea = document.createElement("div");
        textArea.contentEditable = true;
        textArea.classList.add("text", "edit");
        textArea.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                document.execCommand('insertText', false, '    ');
            }
        });
        // Remove the format when pasting text
        textArea.addEventListener('paste', function(event) {
            event.preventDefault();                    
            let plainText = (event.clipboardData || window.clipboardData).getData('text/plain');                    
            document.execCommand('insertText', false, plainText);
        });
        textWrapper.appendChild(textArea);
        // Create button to delete the component
        let deleteTextArea = document.createElement("i");
        deleteTextArea.classList.add("bi", "bi-x-lg", "delete-text", "edit");
        deleteTextArea.addEventListener("click", function() {
            this.parentNode.remove();
            event.stopPropagation();
        });
        textWrapper.appendChild(deleteTextArea);
    // Appends wrapper for Heading Component to Inputs depending on if clone or not
    if (inputs.parentElement.id === "input-container") {
        inputs.appendChild(textWrapper);
    } else {
        clonedInputComponent.querySelector(".inputs").appendChild(textWrapper);
    }    
});

// Create button for Code
codeButton = document.createElement("i");
codeButton.classList.add("bi", "bi-code-slash");
codeButton.addEventListener("click", function() {
    // Create the wrapper for Code component
    let codeWrapper = document.createElement("div");
    codeWrapper.classList.add("code-wrapper", "edit");
        // Create the label for the component
        let codeLabelWrapper = document.createElement("div");
        codeLabelWrapper.classList.add("label-wrapper", "edit");
            let codeLabel = document.createElement("p");
            codeLabel.classList.add("label");
            codeLabel.textContent = "Code";
            codeLabelWrapper.appendChild(codeLabel)
        codeWrapper.appendChild(codeLabelWrapper);
        // Create the textarea for the component
        let codeArea = document.createElement("div");
        codeArea.contentEditable = true;
        codeArea.classList.add("code", "edit");
        codeArea.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                document.execCommand('insertText', false, '    ');
            }
        });
        // Remove the format when pasting text
        codeArea.addEventListener('paste', function(event) {
            event.preventDefault();                  
            let plainText = (event.clipboardData || window.clipboardData).getData('text/plain');          
            document.execCommand('insertText', false, plainText);
        });
        codeWrapper.appendChild(codeArea);
        // Create button to delete the component
        let deleteCodeArea = document.createElement("i");
        deleteCodeArea.classList.add("bi", "bi-x-lg", "delete-code", "edit");
        deleteCodeArea.addEventListener("click", function() {
            this.parentNode.remove();
            event.stopPropagation();
        });
        codeWrapper.appendChild(deleteCodeArea);
    // Appends wrapper for Heading Component to Inputs depending on if clone or not
    if (inputs.parentElement.id === "input-container") {
        inputs.appendChild(codeWrapper);
    } else {
        clonedInputComponent.querySelector(".inputs").appendChild(codeWrapper);
    }
});

// Create button for saving
saveButton = document.createElement("i");
saveButton.classList.add("bi", "bi-journal-arrow-up");
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
        // Changes style based on div check of main-wrapper
        let mainWrapper = document.getElementById('main-wrapper')
        mainWrapper.appendChild(clonedInputComponent);
        if (mainWrapper.querySelector('div')) {
            mainWrapper.style.display = "flex";
        } else {
            mainWrapper.style.display = "none";
        }
    } else {
        alert("You need to fill all added fields to save.")
    }    
});

let main = document.getElementById('main');
main.appendChild(createInputComponent());