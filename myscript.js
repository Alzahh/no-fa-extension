const textView = document.getElementById('id_response')


chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var currentTab = tabs[0];
    var host = new URL(currentTab.url).hostname


    textView.value = `Looking for TOTP for domain ${host}\n`
    fetch("http:localhost:2104", {
        method: 'POST',
        body: host,
        mode: 'cors'
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Response was not ok.');
        })
        .then(data => {
            parseResponse(data)
        })
        .catch(error => {
            textView.value =  `${textView.value}\n ${error}`;
        })

});


function parseResponse(data) {
    textView.value = `${textView.value}\nResponse: ${data}\n`
    if (data === "Password cannot be found") {
        textView.value = `${textView.value}\nPlease check if domain name is correct and fix it in the app if needed`
    } else {
        navigator.clipboard.writeText(data)
        close()
    }
}


