    for(var j  = 0; j < NursesArray.length; j++){ //sprawdzamy, czy po nastepujacych po sobie dwoch lub wiecej zmian nocnych nastapila 42godzinna przerwa od pracy
        if (nurse.consecutiveNights >= 2 && nurse.restHours >= 42){
            console.log('Test nr 6 passed');
        }
        else if(nurse.consecutiveNights >= 2 && nurse.restHours < 42){
            console.log('Tesr nr 6 not passed');
        }
        else{
            console.log('Test nr 6 passed');
        }
    }