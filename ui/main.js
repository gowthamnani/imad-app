
var button = dociment.getElementById('counter');
var counter = 0;
button.onclick = function () {
    
    // make a request to the counter endpoint
    
    //capture the response and store it in a variable
    
    // render the variable in the correct span
    couter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.tostring();
};