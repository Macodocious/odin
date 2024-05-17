// Global Declarations
let isClone = false;
let clonedInputComponent;
let inputSettings;
let clonedToolbar;

function cloneInputComponent() {
    // Clone Input Container
    clonedInputComponent = inputContainer.cloneNode(true);
    // Add flag for clone
    isClone = true;
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
    inputSettings = document.createElement("div");
    inputSettings.classList.add("input-settings");
        let editInput = document.createElement("i");
        editInput.classList.add("bi", "bi-pencil-square");
        editInput.addEventListener("click", function() {
            // Hides Cloned Input Component Settings
            inputSettings.style.display = "none";
            // Add Label Wrapper
            clonedInputComponent.querySelectorAll('.label-wrapper:not(.code-wrapper .label-wrapper)').forEach(labelWrapper => labelWrapper.style.display = "block");
            // Add Toolbar
            clonedToolbar = toolbar.cloneNode(true);
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