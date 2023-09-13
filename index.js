// API paths for CRUD operations
const apiPathList = "https://bz0kdpg077.execute-api.us-east-1.amazonaws.com/items";
const apiPathSearch = "https://bz0kdpg077.execute-api.us-east-1.amazonaws.com/items";

var selectedInput;
var valueGenerated;  // input selected from user

function buttonClicked( val){
    // console.log(val);
    selectedInput = val;
    Submit.style.backgroundColor = "#008CBA";
    switch(val){
        case 1:
            button1.style.backgroundColor="#FF0000";
            button2.style.backgroundColor="#008CBA";
            button3.style.backgroundColor="#008CBA";
            button4.style.backgroundColor="#008CBA";
            button5.style.backgroundColor="#008CBA";
            button6.style.backgroundColor="#008CBA";
            
        break;
        case 2:
            button1.style.backgroundColor="#008CBA";
            button2.style.backgroundColor="#FF0000";
            button3.style.backgroundColor="#008CBA";
            button4.style.backgroundColor="#008CBA";
            button5.style.backgroundColor="#008CBA";
            button6.style.backgroundColor="#008CBA";
        break;
        case 3:
            button1.style.backgroundColor="#008CBA";
            button2.style.backgroundColor="#008CBA";
            button3.style.backgroundColor="#FF0000";
            button4.style.backgroundColor="#008CBA";
            button5.style.backgroundColor="#008CBA";
            button6.style.backgroundColor="#008CBA";
        break;
        case 4:
            button1.style.backgroundColor="#008CBA";
            button2.style.backgroundColor="#008CBA";
            button3.style.backgroundColor="#008CBA";
            button4.style.backgroundColor="#FF0000";
            button5.style.backgroundColor="#008CBA";
            button6.style.backgroundColor="#008CBA";
        break;
        case 5:
            button1.style.backgroundColor="#008CBA";
            button2.style.backgroundColor="#008CBA";
            button3.style.backgroundColor="#008CBA";
            button4.style.backgroundColor="#008CBA";
            button5.style.backgroundColor="#FF0000";
            button6.style.backgroundColor="#008CBA";
        break;
        case 6:
            button1.style.backgroundColor="#008CBA";
            button2.style.backgroundColor="#008CBA";
            button3.style.backgroundColor="#008CBA";
            button4.style.backgroundColor="#008CBA";
            button5.style.backgroundColor="#008CBA";
            button6.style.backgroundColor="#FF0000";
        break;
    }
     
}

function onSubmitButtonClick(){
    Submit.style.backgroundColor = "#008000";
    
    button1.style.backgroundColor="#008CBA";
    button2.style.backgroundColor="#008CBA";
    button3.style.backgroundColor="#008CBA";
    button4.style.backgroundColor="#008CBA";
    button5.style.backgroundColor="#008CBA";
    button6.style.backgroundColor="#008CBA";
    
    showUserSelectedInput();
    
    valueGenerated = Math.floor((Math.random() * 6) + 1);
    // console.log(valueGenerated);
    
    showGeneratedInput(valueGenerated);
    
    sendInputData();
}

function showGeneratedInput(valueGenerated){
    
    switch(valueGenerated){
        case 1:
            document.getElementById("gen_first").style.display ='block';
            document.getElementById("gen_second").style.display ='none';
            document.getElementById("gen_third").style.display ='none';
            document.getElementById("gen_fourth").style.display ='none';
            document.getElementById("gen_fifth").style.display ='none';
            document.getElementById("gen_sixth").style.display ='none';
        break;
        case 2:
            document.getElementById("gen_first").style.display ='none';
            document.getElementById("gen_second").style.display ='block';
            document.getElementById("gen_third").style.display ='none';
            document.getElementById("gen_fourth").style.display ='none';
            document.getElementById("gen_fifth").style.display ='none';
            document.getElementById("gen_sixth").style.display ='none';
        break;
        case 3:
            document.getElementById("gen_first").style.display ='none';
            document.getElementById("gen_second").style.display ='none';
            document.getElementById("gen_third").style.display ='block';
            document.getElementById("gen_fourth").style.display ='none';
            document.getElementById("gen_fifth").style.display ='none';
            document.getElementById("gen_sixth").style.display ='none';
        break;
        case 4:
            document.getElementById("gen_first").style.display ='none';
            document.getElementById("gen_second").style.display ='none';
            document.getElementById("gen_third").style.display ='none';
            document.getElementById("gen_fourth").style.display ='block';
            document.getElementById("gen_fifth").style.display ='none';
            document.getElementById("gen_sixth").style.display ='none';
        break;
        case 5:
            document.getElementById("gen_first").style.display ='none';
            document.getElementById("gen_second").style.display ='none';
            document.getElementById("gen_third").style.display ='none';
            document.getElementById("gen_fourth").style.display ='none';
            document.getElementById("gen_fifth").style.display ='block';
            document.getElementById("gen_sixth").style.display ='none';
        break;
        case 6:
            document.getElementById("gen_first").style.display ='none';
            document.getElementById("gen_second").style.display ='none';
            document.getElementById("gen_third").style.display ='none';
            document.getElementById("gen_fourth").style.display ='none';
            document.getElementById("gen_fifth").style.display ='none';
            document.getElementById("gen_sixth").style.display ='block';
        break;
    }
}

function showUserSelectedInput(){
    switch(selectedInput){
        case 1:
            document.getElementById("first").style.display ='block';
            document.getElementById("second").style.display ='none';
            document.getElementById("third").style.display ='none';
            document.getElementById("fourth").style.display ='none';
            document.getElementById("fifth").style.display ='none';
            document.getElementById("sixth").style.display ='none';
        break;
        case 2:
            document.getElementById("first").style.display ='none';
            document.getElementById("second").style.display ='block';
            document.getElementById("third").style.display ='none';
            document.getElementById("fourth").style.display ='none';
            document.getElementById("fifth").style.display ='none';
            document.getElementById("sixth").style.display ='none';
        break;
        case 3:
            document.getElementById("first").style.display ='none';
            document.getElementById("second").style.display ='none';
            document.getElementById("third").style.display ='block';
            document.getElementById("fourth").style.display ='none';
            document.getElementById("fifth").style.display ='none';
            document.getElementById("sixth").style.display ='none';
        break;
        case 4:
            document.getElementById("first").style.display ='none';
            document.getElementById("second").style.display ='none';
            document.getElementById("third").style.display ='none';
            document.getElementById("fourth").style.display ='block';
            document.getElementById("fifth").style.display ='none';
            document.getElementById("sixth").style.display ='none';
        break;
        case 5:
            document.getElementById("first").style.display ='none';
            document.getElementById("second").style.display ='none';
            document.getElementById("third").style.display ='none';
            document.getElementById("fourth").style.display ='none';
            document.getElementById("fifth").style.display ='block';
            document.getElementById("sixth").style.display ='none';
        break;
        case 6:
            document.getElementById("first").style.display ='none';
            document.getElementById("second").style.display ='none';
            document.getElementById("third").style.display ='none';
            document.getElementById("fourth").style.display ='none';
            document.getElementById("fifth").style.display ='none';
            document.getElementById("sixth").style.display ='block';
        break;
    }
}

  
function listData() {
    // console.log("API call for listing data");
    // console.log(response);
    
    // writeData("Test Result");
    
    fetch(apiPathList)
        .then(response => response.json())
        .then(json => {
            console.log(json);
			writeData(json);
            // writeData(json.Items || [])
        })
        .catch(error => {console.log(error);})
}

function writeData(data) {
    // console.log("writeData : " + data);
    writeOutput(JSON.stringify(data, null, 4))
}

// Function to write output to the page
function writeOutput(innerHTML) {
    var txt = document.getElementById("textResult");
    txt.innerHTML = innerHTML;
    txt.hidden = false;
	// console.log(txt);
}

// Functions for CRUD operations with async/await
async function postScore(score) {
    // console.log("post score method");
    const response = await fetch(apiPathList, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(score)
    });
    console.log(response.json);
    
    const newTask = await response.json();
    // console.log(newTask);
    
    return newTask;
}

function sendInputData() {
    console.log("API call for create data");
    try {
        const userInput = selectedInput;
        const generatedInput = valueGenerated ;
        const score = { "userInput" : userInput, "generatedValue": generatedInput };
            
            postScore(score).then(response => {
                // writeOutput("Item created!");
                writeOutput(response.message);
            }).catch(error => {
                console.error(error)
                writeOutput("Something went wrong!");
            })
        
    } catch (error) {
        console.error(error)
        writeOutput("Something went wrong!");
    }
}