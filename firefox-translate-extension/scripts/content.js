

for (var node of document.querySelectorAll("p, h1, h2, h3, h4")) {
    var copy = document.createElement(node.nodeName);
    copy.textContent = node.textContent;
    node.parentElement.insertBefore(copy, node.nextElementSibling);
    node.setAttribute("translate", "no");
}

for (var node of document.querySelectorAll("ol&gt;li, ul li")) {
    var copy = document.createElement("p");
    copy.textContent = node.textContent;
    node.parentElement.insertBefore(copy, node.nextElementSibling);
    node.setAttribute("translate", "no");
}