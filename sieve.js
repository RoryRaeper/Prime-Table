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

document.write(primefind(100));
