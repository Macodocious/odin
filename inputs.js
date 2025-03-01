// Global Declarations
let inputContainer;
let inputs;
let toolbar;
let toolbarButtons;

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

let main = document.getElementById('main');
main.appendChild(createInputComponent());