    for(var j  = 0; j < NursesArray.length; j++){ //sprawdzamy, czy liczba nastepujacych po sobie zmian nocnych nie jest wieksza niz 3 
        if(nurse.consecutiveNights > 2){
            console.log('Test nr 9 not passed');
        }
        else{
            console.log('Test nr 9 passed');
        }
    }