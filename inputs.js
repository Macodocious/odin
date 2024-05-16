// Global Declarations
let inputContainer;

// Create component
function createInputComponent() {
    createInputContainer();
    
    return inputContainer;
}

// Create Input Container
function createInputContainer() {
    inputContainer = document.createElement("div");
    inputContainer.setAttribute("id", "input-container");
    inputContainer.classList.add("input-container");
    inputContainer.appendChild(createInputs());
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
    if (!inputContainer.getAttribute('clone') {
        toolbar.appendChild(toolbarButtons);
        toolbar.appendChild(saveButton);
    } else {
        toolbar.appendChild(toolbarButtons);
        toolbar.appendChild(editToolbarButtons);
    }

    return toolbar;
}

// Create Toolbar Wrapper
toolbarButtons = document.createElement("div");
toolbarButtons.classList.add("toolbar-buttons");
toolbarButtons.appendChild(headingButton);
toolbarButtons.appendChild(textButton);
toolbarButtons.appendChild(codeButton);

function cloneInputComponent() {
    // Clone Input Container
    let clonedInputComponent = inputContainer.cloneNode(true);
    // Add clone attribute
    clonedInputComponent.setAttribute('clone', 'true');
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
        element.contentEditable = false;
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
            clonedInputComponent.appendChild(createToolbar());
            // Adds edit class back to elements
            let addEditElements = clonedInputComponent.querySelectorAll('div, i');
            addEditElements.forEach(element => {
                element.classList.add('edit');
            });
            // Allows content to be editable
            let contentEditable = clonedInputComponent.querySelectorAll('.heading, .code, .text');
            contentEditable.forEach(element => {
                element.contentEditable = true;
            });
        });
        inputSettings.appendChild(editInput);
        // Create button to delete component
        let deleteInput = document.createElement("i");
        deleteInput.classList.add("bi", "bi-journal-x");
        deleteInput.addEventListener("click", function() {
            clonedInputComponent.remove();
            let mainWrapper = document.getElementById('main-wrapper');
            if (mainWrapper.querySelector('div')) {
                mainWrapper.style.display = "flex";
            } else {
                mainWrapper.style.display = "none";
            }
        })
        inputSettings.appendChild(deleteInput);
    clonedInputComponent.appendChild(inputSettings);

    return clonedInputComponent;          
}

let main = document.getElementById('main');
main.appendChild(createInputComponent());