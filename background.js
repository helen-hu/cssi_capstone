console.log('background running');

chrome.windows.onCreated.addListener(newWindow);

function newWindow(window) {
    console.log('new window');
    console.log(window);


    chrome.tabs.query({
        active: true, 
        currentWindow: true 
        },
        function (tabs) {
            console.log(tabs);
            console.log(tabs[0].id);
            
            chrome.tabs.sendMessage(tabs[0].id, {greeting: 'background'}, function(response) {
                console.log(response.msg);
            });
        });
}

// console.log(mouseX, mouseY);




