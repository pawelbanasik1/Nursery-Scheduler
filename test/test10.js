    for(var j  = 0; j < NursesArray.length; j++){ //sprawdzamy, czy liczba zmian(dni pracy) z rzedu wynosi co najwyzej 6
        if(nurse.consecutiveShifts > 5){
            console.log('Test nr 10 not passed');
        }
        else{
            console.log('Test nr 10 passed');
        }
    }