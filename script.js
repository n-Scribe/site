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
    let chatHistory = localStorage.getItem('chatHistory');
    if (chatHistory) {
        document.querySelector('.messages').innerHTML = chatHistory;
    }

    // Append new messages based on the current page
    const currentPage = document.body.id;
    const messagesContainer = document.querySelector('.messages');

    const appendMessage = (userText, botText) => {
        messagesContainer.innerHTML += `
            <div class="message user">${userText}</div>
            <div class="message bot">${botText}</div>
        `;
        animateReply(botText);
    };

    const animateReply = (text) => {
        const lastMessage = document.querySelector('.message.bot:last-child');
        if (lastMessage) {
            lastMessage.innerHTML = '';
            const words = text.split(' ');
            words.forEach((word, index) => {
                setTimeout(() => {
                    lastMessage.innerHTML += word + ' ';
                    scrollToBottom();
                }, (1000 / words.length) * index);
            });
        }
    };

    const scrollToBottom = () => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    if (currentPage === 'index') {
        appendMessage('Summarise this page', 'We help you realise the economic potential of artificial intelligence in a way which is transparent, trustworthy, and secure.');
    } else if (currentPage === 'understanding-page') {
        appendMessage('Summarise this page', 'At nScribe, we believe that the key to successful AI integration is a deep understanding of your unique organisational needs and workflows.');
    }

    // Scroll to the bottom of the chat
    scrollToBottom();

    // Update chat history on page unload
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('chatHistory', messagesContainer.innerHTML);
    });

    // Scroll to bottom after new message is added
    new MutationObserver(scrollToBottom).observe(messagesContainer, { childList: true });

    // Collapsible chat box
    const chatBox = document.querySelector('.chat-box');
    const toggleButton = document.querySelector('.toggle-button');
    toggleButton.addEventListener('click', function() {
        chatBox.classList.toggle('collapsed');
        toggleButton.classList.toggle('collapsed');
        toggleButton.innerHTML = chatBox.classList.contains('collapsed') ? '&#9654;' : '&#9664;';
    });
});