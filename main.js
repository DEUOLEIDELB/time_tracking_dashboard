
// Having this error after sometimes don't know why
// Error: Promised response from onMessage listener went out of scope

// Select the timeframes list 

var  items = document.querySelectorAll("#timeframes li");

// First visit and when reload ( I don't know how to keep value)
defaultSelection();

for(var i = 0; i < items.length; i++) {
    items[i].onclick = function() {
        // Get Item Id when selected
        var selected_timeframe = this.id;
        // Loop all the selector list      
        for(var j = 0; j < items.length; j++) {
            // Reset List Color
            document.getElementById(items[j].id).style.color = "hsl(236, 100%, 87%)";
            // Change Selected item color
            document.getElementById(selected_timeframe).style.color = "#FFF";
        };
        // Function created below to sync value with choice
        getJsonData(selected_timeframe);
    };
}

//Function Read and print text on the html
function getJsonData(clickedTimeframe) {
    // fecthing data work only with a server. So, I made one using python
    // Using Vscode, I installed Python and typed the command : python -m http.server

    // The JSON file path
    var requestURL = 'data.json';

    // Creating Object [request] from XMLHttpRequest constructor 
    var request = new XMLHttpRequest();

    // Open the JSON file
    request.open('GET',requestURL, true);

    // Specify The response Type we waiting 
    request.responseType = 'json';

    // Send The request 
    request.send();

    // Server Response 
    request.onload = function() {
        var activities = request.response;
        // Loop Sync value with current choice
         for(var i = 0; i < activities.length; i++) {
             document.getElementById('value__shown__current'+[i]).textContent = activities[i].timeframes[clickedTimeframe]['current']+'Hrs';
             document.getElementById('value__shown__previous'+[i]).textContent = getPreviousPeriod(clickedTimeframe) + ' - ' + activities[i].timeframes[clickedTimeframe]['previous']+'Hrs'
         }
    }
    
}
// Get the Previous Text right
function getPreviousPeriod(clickedTimeframe) {
    switch(clickedTimeframe) {
        case 'daily':
            return "Last Day";
            break;
        case 'weekly':
            return "Last Week";
            break;
        case 'monthly':
            return "Last Month";
            break;
        default:
            return "Last Period";
    }
}

// Initial page value
function defaultSelection() {
    document.getElementById("weekly").style.color = "#FFF";
    getJsonData("weekly");
}