

function logTabs(tabs) {
  let current_tab = tabs[0]; // Safe to assume there will only be one result
  
  insert(current_tab.url, current_tab.title);
}

function onError(err){
  notifcation(err);
}


browser.commands.onCommand.addListener(function(command) {
  if (command == "save-hotkey") {

    browser.tabs.query({currentWindow: true, active: true}).then(logTabs, onError);

  }
});


browser.browserAction.onClicked.addListener((tab) => {

	// requires the "tabs" or "activeTab" permission
    //insert(tab.url, tab.title);
})

function insert(url, title) {

    var request = new XMLHttpRequest(); 

    // make http request to my nodejs server host on heroku
    request.open('POST', 'https://yatw-bookmark.herokuapp.com/getTitle', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    notifcation("Loading...");

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {

        if (data.status === "success"){
          notifcation("Extracted info");
          addLink(url, title, data.metaDescription ? data.metaDescription.trim() : "");
        }else{
          notifcation(data.status);
        }

      } else {
        console.log('error');
      } 
    };

    request.send(JSON.stringify({ "url": url}));
}

function addLink(url, title, description){

  var request = new XMLHttpRequest(); 

    // make http request to my nodejs server host on heroku
    request.open('POST', 'https://yatw-bookmark.herokuapp.com/insertLink', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function() {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
      notifcation("Insert " + data.status);
    };
    
    request.send(JSON.stringify({ "url": url, "title": title, "detail": description}));
}


function notifcation(message){

  browser.notifications.create("Notification", {
    "type": "basic",
    "title": message,
    "message": ""
  });
}