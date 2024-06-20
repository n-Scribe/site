function includeHTML() {
    let elements = document.querySelectorAll('[data-include]');
    elements.forEach(el => {
        let file = el.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                el.outerHTML = data;
            })
            .catch(error => console.error('Error including HTML:', error));
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);