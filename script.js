document.addEventListener('DOMContentLoaded', function() {
    function toggleExpand(element) {
        var expandable = element;
        var expandedText = element.nextElementSibling;
        expandable.classList.toggle('expanded');
        expandedText.classList.toggle('show');
    }

    document.querySelectorAll('.expandable').forEach(item => {
        item.addEventListener('click', function() {
            toggleExpand(this);
        });
    });

    // Maintain chat history across page navigations
    if (localStorage.getItem('chatHistory')) {
        document.querySelector('.messages').innerHTML = localStorage.getItem('chatHistory');
    }

    // Update chat history on page load
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('chatHistory', document.querySelector('.messages').innerHTML);
    });
});