

// function ChangeModel(){

// }

function sendMessage() {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    const message = input.value.trim();

    if (message === '') return;

    // User message 
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerHTML = `
    <b>User</b>  
    <pre><code>${escapeHTML(message)}</code></pre>
    `;

    const messageText = userMsg.textContent.trim();
    console.log(messageText);
    history.appendChild(userMsg);


    // Fetching the data

    axios.post("http://localhost:5000/optimize", {
        code: messageText
    })
        .then(response => {
            console.log("Optimized:", response.data.optimized);


            // llm reply
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot-message';
            botMsg.textContent = String(response.data.optimized);
            setTimeout(() => history.appendChild(botMsg), 500);
            input.value = '';
            history.scrollTop = history.scrollHeight;


        })
        .catch(error => {
            console.error("Error:", error);

            // llm reply
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot-message';
            botMsg.textContent = String(error);
            setTimeout(() => history.appendChild(botMsg), 500);
            input.value = '';
            history.scrollTop = history.scrollHeight;
        });


}
// escape html to convert html tag to encoded form
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

