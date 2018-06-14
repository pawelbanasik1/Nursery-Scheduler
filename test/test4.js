    for(var j  = 0; j < NursesArray.length; j++){//sprawdzamy, czy liczba zmian nocnych nie jest wieksza niz 3 w okresie 5 tygodniowego grafiku 
         
        if (NursesArray.workedNights > 3 && shiftCode == 4){
           console.log('Test nr 4 not passed');
        }
        else{
            console.log('Test nr 4 passed');
        }
    }
   