function toggleMenu() {
  var menu = document.getElementById("menu");
  var layout = document.getElementById("layout");
  if (window.getComputedStyle(menu).display === "none") {
	showMenuMobile(menu, layout)
  } else {
	hideMenu(menu, layout)
  }
  updateBar("menu")
}

function showMenuMobile(menu, layout) {
	menu.style.display = "block";
	menu.style.left = "170px";
}

function hideMenu(menu, layout) {
	menu.style.display = "none";
	menu.style.left = "0px";
	layout.style.paddingLeft = "0px";
	layout.style.left = "0px";
}

function updateBar(activeLink) {
	var menuDiv = document.querySelector("#menu-div");
	var menuButton = document.querySelector("#menu-div a");
	if (menuButton.innerText === "Hide") {
		menuButton.innerText = "Menu";
		menuButton.style.color = "#999";
		menuDiv.style.backgroundColor = "#191818";
	} else {
		menuButton.innerText = "Hide";
		menuButton.style.color = "#999900";
		menuDiv.style.backgroundColor = "#333";
	} 
}

// The toggle buttons make use of inline styles. We want the CSS
// in our CSS media queries to take priority once the window
// is larger than when the mobile bar shows, but we can't
// just use !important since then the toggles wouldn't work.
// So we cleanup the inline styles once going larger again.
function cleanupMobileInlineStyles(trigger) {
  // Once we grow larger than the width at which the
  // mobile bar is displayed = media query matches
  if (trigger.matches) {
    document.getElementById("menu").removeAttribute("style");
	document.getElementById("layout").removeAttribute("style");
	document.querySelector("#menu-div").removeAttribute("style");
	
	var menuButton = document.querySelector("#menu-div a");
	menuButton.innerText = "Menu";
	menuButton.removeAttribute("style");
  }
}

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function displayAppropriateLists() {
	var level=getCookie("level");
	if(level == "higher")
	{
		var list = document.getElementById("higherLevelPages");
		list.style.display = "block";
	}
	else if(level == "lower")
	{
		var list = document.getElementById("lowerLevelPages");
		list.style.display = "block";
	}
	// if user hasn't set cookie, display higher level version
	else { // level = ""
		var list = document.getElementById("higherLevelPages");
		list.style.display = "block";
	}
}


var trigger = window.matchMedia("(min-width: 48em)")
// Call listener function at run time
cleanupMobileInlineStyles(trigger)
// Attach listener function on state changes
trigger.addListener(cleanupMobileInlineStyles)