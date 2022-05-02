chrome.action.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    console.log(tab)

    console.log(tab.url)
    const url = new URL(tab.url)

    console.log(url)
    console.log(url.hostname)

    fetch("http:localhost:2104", {
        method: 'POST',
        body: url.hostname,
        mode: 'cors'
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Response was not ok.');
        })
        .then(data => {
            console.log(data);
            parse(data)
        })
        .catch(error => {
            console.log(error);
        })

}

function parse(data) {
    if (data === "Password cannot be found") {
    }
    else {

    }
}





