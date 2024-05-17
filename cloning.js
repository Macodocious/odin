// Global Declarations
let clonedInputComponent;
let inputSettings;
let originalInputComponent = document.querySelectorAll('.input-container#input-container');

function cloneInputComponent() {
    // Clone Input Container
    clonedInputComponent = inputContainer.cloneNode(true);
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
            let clonedToolbar = document.createElement("div");
            clonedToolbar.classList.add("toolbar");
                toolbarButtons = document.createElement("div");
                toolbarButtons.classList.add("toolbar-buttons");
                    headingButton = document.createElement("i");
                    headingButton.classList.add("bi", "bi-type-h1");
                    headingButton.addEventListener("click", function() {
                        let headingWrapper = createHeadingComponent();
                        clonedInputComponent.querySelector(".inputs").appendChild(headingWrapper);  
                    });
                    textButton = document.createElement("i");
                    textButton.classList.add("bi", "bi-type");
                    textButton.addEventListener("click", function() {
                        let textWrapper = createTextComponent();
                        clonedInputComponent.querySelector(".inputs").appendChild(textWrapper); 
                    });
                    codeButton = document.createElement("i");
                    codeButton.classList.add("bi", "bi-code-slash");
                    codeButton.addEventListener("click", function() {
                        let codeWrapper = createCodeComponent();
                        clonedInputComponent.querySelector(".inputs").appendChild(codeWrapper);
                    });
                toolbarButtons.appendChild(headingButton);
                toolbarButtons.appendChild(textButton);
                toolbarButtons.appendChild(codeButton);
            clonedToolbar.appendChild(toolbarButtons);
            clonedToolbar.appendChild(editToolbarButtons);
            clonedInputComponent.appendChild(clonedToolbar)
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

