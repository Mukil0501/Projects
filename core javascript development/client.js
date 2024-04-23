const socket = new WebSocket('ws://localhost:3000');
const editor = document.getElementById('editor');
let userId = null;

editor.addEventListener('input', () => {
    socket.send(JSON.stringify({ type: 'text-update', content: editor.innerHTML }));
});

editor.addEventListener('keyup', () => {
    socket.send(JSON.stringify({ type: 'cursor-update', position: getCaretPosition(editor) }));
});

editor.addEventListener('mouseup', () => {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
        const start = getCaretPosition(editor, selection.anchorNode, selection.anchorOffset);
        const end = getCaretPosition(editor, selection.focusNode, selection.focusOffset);
        socket.send(JSON.stringify({ type: 'highlight-update', start, end }));
    }
});

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
        case 'text-update':
            editor.innerHTML = data.content;
            break;
        case 'user-list':
            updateUserList(data.userList);
            break;
        case 'highlight-update':
            highlightText(data.userId, data.start, data.end);
            break;
    }
};

function getCaretPosition(element, node = window.getSelection().focusNode, offset = window.getSelection().focusOffset) {
    const range = document.createRange();
    range.setStart(element, 0);
    range.setEnd(node, offset);
    return range.toString().length;
}

function updateUserList(userList) {
    // Update UI to display user list
}

function highlightText(userId, start, end) {
    // Update UI to highlight text
}
