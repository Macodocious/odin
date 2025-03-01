// Global Declarations
let headingButton;
let textButton;
let codeButton;
let saveButton;
let editToolbarButtons;

// Create button for Headings
headingButton = document.createElement("i");
headingButton.classList.add("bi", "bi-type-h1");
// Create Heading component
function createHeadingComponent() {
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

    return headingWrapper;
}
headingButton.addEventListener("click", function() {
    let headingWrapper = createHeadingComponent();
    inputs.appendChild(headingWrapper); 
});

// Create button for Text
textButton = document.createElement("i");
textButton.classList.add("bi", "bi-type");
// Create Text component
function createTextComponent() {
    // Create the wrapper for Text component
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

    return textWrapper;
}
textButton.addEventListener("click", function() {
    let textWrapper = createTextComponent();
    inputs.appendChild(textWrapper); 
});

// Create button for Code
codeButton = document.createElement("i");
codeButton.classList.add("bi", "bi-code-slash");
// Create Code component
function createCodeComponent() {
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

    return codeWrapper;
}
codeButton.addEventListener("click", function() {
    let codeWrapper = createCodeComponent();
    inputs.appendChild(codeWrapper);
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

// Create edit buttons for Toolbar
editToolbarButtons = document.createElement("div");
editToolbarButtons.classList.add("toolbar-buttons");
    // Create button for deleting
    let editDeleteButton = document.createElement("i");
    editDeleteButton.classList.add("bi", "bi-journal-x");
    editDeleteButton.addEventListener("click", function() {
        clonedInputComponent.remove();
        let mainWrapper = document.getElementById('main-wrapper');
        if (mainWrapper.querySelector('div')) {
            mainWrapper.style.display = "flex";
        } else {
            mainWrapper.style.display = "none";
        }
    })
    // Create button for saving
    let editSaveButton = document.createElement("i");
    editSaveButton.classList.add("bi", "bi-journal-check");
    editSaveButton.addEventListener("click", function() {
        // Check if there are any added fields
        let addedFields = clonedInputComponent.querySelector(".inputs").querySelectorAll('.heading, .code, .text');
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
            clonedInputComponent.querySelectorAll('.label-wrapper:not(.code-wrapper .label-wrapper)').forEach(labelWrapper => labelWrapper.style.display = "none"); // Remove the label-wrapper div
            clonedInputComponent.querySelectorAll('.toolbar').forEach(toolbar => toolbar.remove()); // Remove the toolbar
            let editElements = clonedInputComponent.querySelectorAll('.edit'); // Find all elements with class "edit"
            editElements.forEach(element => {
                element.classList.remove('edit'); // Remove the "edit" class
            });
            let contentEditable = clonedInputComponent.querySelectorAll('.heading, .code, .text');
            contentEditable.forEach(element => {
                element.contentEditable = false; // Make it read-only
            });
            inputSettings.style.display = "flex";                        
        } else {
            alert("You need to fill all added fields to save.")
        }    
    });

    editToolbarButtons.appendChild(editSaveButton);
    editToolbarButtons.appendChild(editDeleteButton);