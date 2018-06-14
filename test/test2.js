for(var j  = 0; j < NursesArray.length; j++){ //sprawdzamy czy pielegniarka ma tylko jedna zmiane w danym dniu
        NursesArray[j].consecutiveShifts = 0; 
        if (NursesArray[j].workedToday == true){
           NursesArray.consecutiveShifts++; 
        }
        else if(NursesArray[j].consecutiveShifts > 1){
                console.log('Test nr 2 not passed');
        }
        else{
            console.log('Test nr 2 passed');
        } 
    }