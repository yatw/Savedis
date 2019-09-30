// start here, when hot key is clicked
browser.commands.onCommand.addListener(function(command) {
  if (command == "save-hotkey") {
    browser.tabs.query({currentWindow: true, active: true}).then(logTabs, onError);
  }
});


function logTabs(tabs) {
  let current_tab = tabs[0]; // Safe to assume there will only be one result, cause you always have at least 1 tab opened to use the hot key

  insert(current_tab.url, current_tab.title);
}

function onError(err){
  notification(err);
}

// choose what happen when the icon is clicked
browser.browserAction.onClicked.addListener((tab) => {

	notification("Use hotkey Ctrl + Alt + S to save the current page");
})

function insert(url, title) {

    // First http call, send in the url to get metadata of the page

    var request = new XMLHttpRequest(); 

    // make http request to my nodejs server host on heroku
    request.open('POST', 'https://yatw-bookmark.herokuapp.com/getTitle', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {

          if (data.status === "success"){
              
              login();

              let autoTag = [];
              if (/youtube/.test(url)){
                autoTag.push("youtube");
              }else if (/reddit/.test(url)){
                autoTag.push("reddit");
              }

              addLink(url, title, data.metaDescription ? data.metaDescription.trim() : "", autoTag);
          }else if (data.status === "duplicate"){
            notification("Duplicate link");
          }else{
            notification(`Get Title Failed with status ${data.status}`);
          }

      } else {
        //console.log('HTTP request to getTitle Failed');
        notification("HTTP request to getTitle Failed");

      } 
    };

    request.send(JSON.stringify({ "url": url}));
}

function login(){

  let request = new XMLHttpRequest(); 

    // make http request to my nodejs server host on heroku
    request.open('POST', 'https://yatw-bookmark.herokuapp.com/login', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function() {
      // Begin accessing JSON data here
      let data = JSON.parse(this.response);

      if (!data.status){
        notification("Login Fail");
        //console.log("Login Fail");
      }
            
    };
    
    request.send(JSON.stringify({ "userName": "panda"}));
}

function addLink(url, title, description, autoTag){

  
  let request = new XMLHttpRequest(); 

    // make http request to my nodejs server host on heroku
    request.open('POST', 'https://yatw-bookmark.herokuapp.com/insertLink', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.onload = function() {
      // Begin accessing JSON data here
      let data = JSON.parse(this.response);

      // Send notification regardless success or fail
      notification(`Insert ${data.status}: ${title} with ${autoTag}`);
      //console.log(`Insert ${data.status}: ${title} with ${autoTag}`);
    };
    
    request.send(JSON.stringify({ "url": url, "title": title, "detail": description, "tags": autoTag}));
    
}


function notification(message){

  browser.notifications.create("Notification", {
    "type": "basic",
    "title": message,
    "message": ""
  });
}