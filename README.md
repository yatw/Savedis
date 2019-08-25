
# Savedis

Firefox browser extension to add in a keyboard command to complement with [bookmark](https://github.com/yatw/bookmark)
  
  
#### Ambition

Instead of opening up my bookmark manager every time I save a new link, I can use a keyboard command from any page.

#### How to use

 On the active page I want to save, hit keyboards commands `Ctrl + Alt + S` and the current page will be saved into bookmark.

#### Technologies


-  **Language**: JavaScript

-  **Deployment**: Mozilla Add-ons Developer Hub ([Self-distribution](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Distribution/Submitting_an_add-on#Self-distribution))

#### Status

The project is already in production running on my browser, with minor features to be add in the future.


### Tasks

- [x] Listen keyboard commands
- [x] Extract url and title
- [x] Auto insert to bookmark
- [x] Status feedback
- [ ] Create interface
  
#### Known Issue

 ---
  
  
## Instructions

  

**For development**

Temporarily load the add on to Firefox from [here](about:debugging)


Logged console messages from background script do not appear in the web page, but in the (invisible) background page. In Firefox, open the background console using `Ctrl + Shift + J`. Alert() also has no effect from background.
 
**For production**

Obtain the `savedis.zip` file and follow [instruction](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Distribution_options/Sideloading_add-ons#Using_Install_Add-on_From_File) to load add on to Firefox

