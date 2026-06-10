

   const CACHE_NAME = 'my-app-v1';

   const FILES_TO_CACHE = [
     'index.html',
     'search.html',
     'activity.html',
     'profile.html',
     'styles.css',
     'manifest.json'
   ];
   
   self.addEventListener('install', event => {
     event.waitUntil(
       caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
     );
     self.skipWaiting();
   });

   self.addEventListener('activate', event => {
     event.waitUntil(
       caches.keys().then(keys =>
         Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
       )
     );
     self.clients.claim();
   });
   

   self.addEventListener('fetch', event => {
     event.respondWith(
       caches.match(event.request).then(cached => cached || fetch(event.request))
     );
   });

  
  




    const chatData = {};

    let activeChatId = null;

    const chatList = document.getElementById('chatList');
    const chatMessages = document.getElementById('chatMessages');
    const chatTitle = document.getElementById('chatTitle');
    const chatSubtitle = document.getElementById('chatSubtitle');
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const newChatBtn = document.getElementById('newChatBtn');

    function renderMessages() {
      chatMessages.innerHTML = '';
      const messages = chatData[activeChatId].messages;
      messages.forEach((message) => {
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${message.sender}`;
        messageEl.textContent = message.text;
        chatMessages.appendChild(messageEl);
      });
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function updateChatHeader() {
      chatTitle.textContent = chatData[activeChatId].title;
      chatSubtitle.textContent = chatData[activeChatId].subtitle;
    }

    function setActiveChat(chatId) {
      activeChatId = chatId;
      const items = chatList.querySelectorAll('.chat-item');
      items.forEach((item) => {
        item.classList.toggle('active', item.dataset.chatId === chatId);
      });
      updateChatHeader();
      renderMessages();
    }

    function addMessage(text) {
      chatData[activeChatId].messages.push({ sender: 'me', text });
      updateChatPreview(activeChatId, text);
      renderMessages();
      messageInput.value = '';
      messageInput.focus();
      setTimeout(() => {
        const reply = 'Thanks! I got your message.';
        chatData[activeChatId].messages.push({ sender: 'other', text: reply });
        updateChatPreview(activeChatId, reply);
        renderMessages();
      }, 800);
    }

    function updateChatPreview(chatId, text) {
      const item = chatList.querySelector(`.chat-item[data-chat-id="${chatId}"]`);
      if (item) {
        const preview = item.querySelector('.chat-item-preview');
        preview.textContent = text;
      }
    }

    chatList.addEventListener('click', (event) => {
      const item = event.target.closest('.chat-item');
      if (!item) return;
      setActiveChat(item.dataset.chatId);
    });

    chatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const text = messageInput.value.trim();
      if (!text) return;
      addMessage(text);
    });

    newChatBtn.addEventListener('click', () => {
      const name = prompt('Enter a name for the new chat contact:');
      if (!name) return;
      const nextId = String(Object.keys(chatData).length + 1);
      chatData[nextId] = {
        title: name,
        subtitle: `Send a message to ${name}.`,
        messages: []
      };
      const listItem = document.createElement('li');
      listItem.className = 'chat-item';
      listItem.dataset.chatId = nextId;
      listItem.innerHTML = `<span class="chat-item-title">${name}</span><span class="chat-item-preview">New conversation</span>`;
      chatList.appendChild(listItem);
      setActiveChat(nextId);
      listItem.scrollIntoView();
    });

    if (activeChatId) setActiveChat(activeChatId);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js');
    }


      const themeToggle = document.getElementById('toggle-dark-mode');







if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js');
    }

    document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('toggle-dark-mode');
    const STORAGE_KEY = 'theme';
    const DARK_CLASS = 'dark-mode';

    // Load saved theme
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const isDark = savedTheme === 'dark';

    document.body.classList.toggle(DARK_CLASS, isDark);

    if (themeToggle) {
        themeToggle.checked = isDark;

        themeToggle.addEventListener('change', () => {
            const darkEnabled = themeToggle.checked;

            document.body.classList.toggle(DARK_CLASS, darkEnabled);

            localStorage.setItem(
                STORAGE_KEY,
                darkEnabled ? 'dark' : 'light'
            );
        });
    }
});






  