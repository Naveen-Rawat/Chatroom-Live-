// DOM query

const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// Add a new chat
newChatForm.addEventListener('submit', e => {
	e.preventDefault();
	const message = newChatForm.message.value.trim();
	chatroom.addChat(message)
	.then(() => {
		newChatForm.reset();
	})
	.catch(err => {
		console.log(err);
	});
	// console.log(message);
});


// Update Username
newNameForm.addEventListener('submit', e => {
	e.preventDefault();
	const newName = newNameForm.name.value.trim();
	chatroom.updateName(newName);
	newNameForm.reset();

	// Show then hide the update message
	updateMssg.innerText = `
		Your name was updated to ${newName}.
	`;


	setTimeout(() => updateMssg.innerText = "", 3000);
});

//Update the chat rooms
rooms.addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON')
	{
		chatUI.clear();
		chatroom.updateRoom(e.target.getAttribute('id'));
		// console.log(e.target.getAttribute('id'));
		chatroom.getChats(chat => {
			chatUI.render(chat);
		});
	}
});


// Check localStorage for previously saved name
const username = localStorage.username ? localStorage.username : 'Anonymous';

// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);	// Default


// Get chat and render
chatroom.getChats(data => chatUI.render(data));