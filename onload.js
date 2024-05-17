// For current page active-state
// "DOMContentLoaded" is an event that indicates the page has been loaded and is ready to be manipulated.
// "addEventListener" is an event listener attached to the "document" object waiting/listening for "DOMContentLoaded" event.
document.addEventListener("DOMContentLoaded", function() {
    // Function starts here
    // Get the current page URL
    let currentPageURL = new URL(window.location.href);
    let currentPath = currentPageURL.pathname;
    console.log("Current Page Path:", currentPath);

    // Get all anchor elements with the class "nav-link"
    let navLinks = document.querySelectorAll(".nav-link");
    console.log("Nav Links Found:", navLinks.length);

    // Loop through each anchor element
    navLinks.forEach(function(navLink) {
        // Create a full URL object for the href attribute
        let linkURL = new URL(navLink.href);
        let linkPath = linkURL.pathname;
        console.log("Nav Link Path:", linkPath);

        // Check if the path matches the current page URL path
        if (linkPath === currentPath) {
            console.log("Match Found:", linkPath);
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
        createNavLink("Foundations", "index.html")
    ]);

    // Create second block
    let block2 = createBlock("Section", [
        createNavLink("Variables & Operators", "variables_operators.html"),
        createNavLink("Data Types & Conditionals", "datatypes_conditionals.html"),
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

// Checks for divs inside of main-wrapper
let mainWrapper = document.getElementById('main-wrapper');
if (mainWrapper.querySelector('div')) {
    mainWrapper.style.display = "flex";
} else {
    mainWrapper.style.display = "none";
}