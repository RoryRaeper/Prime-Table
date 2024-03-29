//Main function which calls other functions.
//Takes inputs from the web page
function makePrimeTable(){
	var input = document.getElementById('userinput').value;
	if (isNaN(input)){
		alert("INPUT isn't a number.\nPlease enter only integers greater than 1");
	}
	else{
		if(input > 1){
		var sel = document.getElementById("algChoice");
		var algVersion = sel.options[sel.selectedIndex].value;
	
		var sel2 = document.getElementById("functionChoice");
		var funcVersion = sel2.options[sel2.selectedIndex].value;
	
		//Checks what algorithm the user wants to use
		if(algVersion === 'alg1'){
			//checks what function the user wants to use
			if(funcVersion === 'func1'){
				primes = primefind(input);
				document.getElementById("primehost").innerHTML=primes;
			}
			else if(funcVersion === 'func2'){
				var primes = [];
				primes = primefind(input);
				drawtable(primes);
			}
		}else if(algVersion === 'alg2'){
			//checks what function the user wants to use
			if(funcVersion === 'func1'){
				primes = primefindAlt(input);
				document.getElementById("primehost").innerHTML=primes;
			}
			else if(funcVersion === 'func2'){
				var primes = [];
				primes = primefindAlt(input);
				drawtable(primes);
			}
		}
		}
		else{
			alert("INPUT isn't greater than 0.\nPlease enter only integers greater than 1");
		}
	}
}

//Based on Eratosthenes algorithm.
//Takes input and finds all prime numbers lower than it.
function primefind(userInput){
	var start = new Date().getTime();
	var numbers = []; //Array holding all numbers from 0 to the inputted number
	var output = []
	numbers[0], numbers[1] = false; //Sets 0 and 1 as not prime
	for(var i = 2; i < userInput; i++){
		numbers[i] = true;
	}

	var sqrt = Math.sqrt(userInput); //Square roots the max value

	for(var i = 2; i < sqrt; i++){  //Searches from 2 to square root of n
		if(numbers[i]){
			for(var j = i*i; j < userInput; j=j+i){ //Removes all duplicate numbers
				numbers[j] = false;
			}
		}
	}

	var end = new Date().getTime();
	var time = end - start;
	alert('Execution time: ' + time);

	//Pushes the prime numbers to a second "int" array
	for(var i = 0; i < userInput; i++){
		if(numbers[i]){
			output.push(i); 
		}
	}
	return output; //Returns the prime number array
}


//Function to create the multiplication table
//Takes the prime array from primefind as input
function drawtable(primes){
	var numbers = [];
	//Initialising a 2d array to be 1 > than the length of the prime array
	for(var i = 0; i <= primes.length; i++){
		numbers[i] = [];
	}
	//Sets the x, and y axes to be prime numbers 
	for(var i=0; i < primes.length; i++){
		if(i===0){ //First value is set to be zero as it isn't used
			numbers[0][0] = 0;
		}
		numbers[i+1][0] = primes[i];
		numbers[0][i+1] = primes[i];
	}

	//Fills the rest of the table 
	for(var i = 0; i < primes.length; i++){
		for(var j = 0; j < primes.length; j++){
			numbers[i+1][j+1] = primes[i]*primes[j]; //multiplying the axes together
		}
	}
	
	//Starts drawing table here, iterates through the x, and y axes to print all cells
	var tableString = "<table>";
	for(var i = 0; i <= primes.length; i++){
		tableString+="<tr>";
		for(var j = 0; j <= primes.length; j++){
			//if statements for filling the heading cells
			if(j===0 && i ===0){
				tableString+="<th></th>";
			}
			else if(i === 0){
				tableString+=("<th>" + numbers[i][j] + "</th>");
			}
			else if(j === 0){
				tableString+=("<th>" + numbers[i][j] + "</th>");
			}
			else{
				tableString+=("<td>" + numbers[i][j] + "</td>");
			}
		}
		tableString+="</tr>";
	}
	tableString+="</table>";
	document.getElementById("host").innerHTML=tableString;
}


//My own algorithm for finding primes
//not as efficient as Eratosthenes algo but works
function primefindAlt(userInput){
	var start = new Date().getTime();
	var count = 0;
	var numbers = [];
	var output = [];
	//initialises boolean array for use later 
	for(var i = 2; i < userInput; i++){
		numbers.push(true);
	}
	numbers[0] = false; //sets 1 and zero to not be prime
	numbers[1] = false;

	//starts iterating through numbers from 2 to n-1
	for(var j = 2; j < userInput; j++){
		//calculates first few prime numbers for use later
		if(j<10){
			for(var k = 2; k < j; k++){
				if(j%k === 0){
					numbers[j] = false;
					break;
				}
			}
		}
		else{
			var smallFactor = Math.sqrt(j);
			if(j%smallFactor === 0){  //Checks if Square root is a factor
				numbers[j] = false;
				continue;
			}
			else if(j%2 === 0){ //Checks if common divisors, 2 and 3, are factors
				numbers[j] = false;
				continue;
			}
			else if(j%3 === 0){
				numbers[j] = false;
				continue;
			}
			else{ //Checks all primes under the square root of n 
				for(var k = 2; k < smallFactor; k++){
					if(numbers[k]){
						if(j%k === 0){
							numbers[j] = false;
							break;
						}
					}
				}
			}
		}
	}
	//Pushes to another array 
	for(var i = 0; i < userInput; i++){
		if(numbers[i] === true){
			output.push(i);          
		}
	}

	var end = new Date().getTime();
	var time = end - start;
	alert('Execution time: ' + time);
	drawtable(output);
	return output;
	}
