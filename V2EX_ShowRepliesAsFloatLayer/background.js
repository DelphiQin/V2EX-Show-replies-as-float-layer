regex = /<a href="\/notifications" class="\w+?">(\d+)/m;

setInterval("unreadMessageNumber", 5*60*1000);

function unreadMessageNumber() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://v2ex.com", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
	    	unreadNumber = regex.exec(xhr.responseText)[1];
	    	// console.log(unreadNumber);
	    	if (unreadNumber > 0) {
	    		chrome.browserAction.setBadgeText({text:unreadNumber});
	    	} else {
	    		chrome.browserAction.setBadgeText({text:""});
	    	}
	  	}
	}
	xhr.send();
}
