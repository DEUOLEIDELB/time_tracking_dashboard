
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
function getJsonData() {
    // fecthing data work only with a server. So, I made one using python
    // Using Vscode, I installed Python and typed the command : python -m http.server
    var arg = arguments;
    var arg1 = arguments[0];
    var arg2 = arguments[1];
    var argIndi = indiviSelectedPeriod(arg1);
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
        if(arg.length < 2) {
            for(var i = 0; i < activities.length; i++) {
                document.getElementById('value__shown__current'+[i]).textContent = activities[i].timeframes[arg1]['current']+'Hrs';
                document.getElementById('value__shown__previous'+[i]).textContent = getPreviousPeriod(arg1) + ' - ' + activities[i].timeframes[arg1]['previous']+'Hrs'
            }
        }else if(arg.length > 1) {
            if(arg2 == 'work') {
                document.getElementById('value__shown__current0').textContent = activities[0].timeframes[argIndi]['current']+'Hrs';
                document.getElementById('value__shown__previous0').textContent = getPreviousPeriod(arg1) + ' - ' + activities[0].timeframes[argIndi]['previous']+'Hrs'
                removeUnused();
            }else if(arg2 == 'play') {
                document.getElementById('value__shown__current1').textContent = activities[1].timeframes[argIndi]['current']+'Hrs';
                document.getElementById('value__shown__previous1').textContent = getPreviousPeriod(arg1) + ' - ' + activities[1].timeframes[argIndi]['previous']+'Hrs'
                removeUnused();
            }else if(arg2 == 'study') {
                document.getElementById('value__shown__current2').textContent = activities[2].timeframes[argIndi]['current']+'Hrs';
                document.getElementById('value__shown__previous2').textContent = getPreviousPeriod(arg1) + ' - ' + activities[2].timeframes[argIndi]['previous']+'Hrs'
                removeUnused();
            }else if(arg2 == 'exercise') {
                document.getElementById('value__shown__current3').textContent = activities[3].timeframes[argIndi]['current']+'Hrs';
                document.getElementById('value__shown__previous3').textContent = getPreviousPeriod(arg1) + ' - ' + activities[3].timeframes[argIndi]['previous']+'Hrs'
                removeUnused();
            }else if(arg2 == 'social') {
                document.getElementById('value__shown__current4').textContent = activities[4].timeframes[argIndi]['current']+'Hrs';
                document.getElementById('value__shown__previous4').textContent = getPreviousPeriod(arg1) + ' - ' + activities[4].timeframes[argIndi]['previous']+'Hrs'
                removeUnused();
            }else if(arg2 == 'selfcare') {
                document.getElementById('value__shown__current5').textContent = activities[5].timeframes[argIndi]['current']+'Hrs';
                document.getElementById('value__shown__previous5').textContent = getPreviousPeriod(arg1) + ' - ' + activities[5].timeframes[argIndi]['previous']+'Hrs'
                removeUnused();
            }
        }
         
    }
    
}
// Get the Previous Text right
function getPreviousPeriod(clickedTimeframe) {
    switch(clickedTimeframe) {
        case 'daily':
        case '0':
            return "Last Day";
            break;
        case 'weekly':
        case '1':
            return "Last Week";
            break;
        case 'monthly':
        case '2':
            return "Last Month";
            break;
        default:
            return "Last Period";
    }
}

function indiviSelectedPeriod(selection) {
    switch(selection) {
        case '0':
            return 'daily';
            break;
        case '1':
            return 'weekly';
            break; 
        case '2':
            return 'monthly';
            break; 
    }
}

// Initial page value
function defaultSelection() {
    document.getElementById("weekly").style.color = "#FFF";
    getJsonData("weekly");
    return;
}
// ========================================================================


// Generate DropDown Individual Timeframe Menu
function dropDownMenu(activityClicked) {
    // Create DropDown menu 
    createDropDownMenu(activityClicked);
    // Check if clicked outside of the container 
    document.addEventListener("click", (evt) => {
        const dropDownElement = document.getElementById(activityClicked.id);
        let clickedElement = evt.target;
    
        do {
            if(clickedElement == dropDownElement) {
                individualTimeframe(activityClicked.id);
                document.removeEventListener("click", evt);
                return;
            }
            clickedElement = clickedElement.parentNode;
        }while(clickedElement);
        
        removeUnused(activityClicked.id);
        document.removeEventListener("click", evt);
        return;
    }); 
    return;
}

function createDropDownMenu(whichOneToMake) {
    let dropDownContainer = document.createElement('div');
    let dropDownList = document.createElement('ul');
    var listSelctor = ['Daily','Weekly','Monthly'];

    whichOneToMake.appendChild(dropDownContainer);
    dropDownContainer.appendChild(dropDownList);
    dropDownContainer.classList.add('dropDown__container');
    dropDownList.setAttribute('id','dropDownMenu');
    // Create Selector List 
    for(var i = 0; i < 3; i++) {
        let dropDownChoice = document.createElement('li');
        dropDownChoice.textContent = listSelctor[i];
        dropDownChoice.setAttribute('id',i);
        dropDownList.appendChild(dropDownChoice);
    }
    return;
}

function removeUnused(ClickedOutside){
    let idFocus = document.getElementById(ClickedOutside);
    //remove DropMenu Div
    idFocus.removeChild(idFocus.children[2]);
    return;
}

function individualTimeframe(individualActivity) {
    var  items = document.querySelectorAll("#dropDownMenu li");
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
            var smallerIndiActi = individualActivity.substr(0,individualActivity.length-6);
            getJsonData(selected_timeframe, smallerIndiActi);
            removeUnused(individualActivity);
        };
    }
}










