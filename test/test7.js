for(var j  = 0; j < NursesArray.length; j++){ //sprawdzamy, czy w okresie 24 godzinnym pielegniarka ma chociaz 11 godzin przerwy od pracy 
    if(NursesArray[j].consecutiveShifts > 0 && NursesArray[j].restHours <= 11){
        console.log('Test nr 7 not passed');
    }
    else if(NursesArray[j].consecutiveShifts = 0 && NursesArray[j].restHours <= 11){
        conesole.log('Test nr 7 passed');
    }
}