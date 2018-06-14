
function updateChosenNurse(nurse, shiftCode, dayOfWeek) {
    nurse.workedHours = nurse.workedHours + 8;
    nurse.weaklyWorkedHours = nurse.weaklyWorkedHours + 8;
    nurse.consecutiveShifts = nurse.consecutiveShifts + 1;
    nurse.workedToday = true;
    nurse.restHours = 0;

    //consecutive nights
    if (shiftCode == 4) {
        nurse.consecutiveNights++;
        nurse.workedNights++;
    }
    else if(shiftCode == 3){
        nurse.consecutiveLates++;
    }

    else {
        nurse.workedDays++;
    }
}


function checkNurse(nurse, dayOfWeek, shiftCode) {

    if (nurse.consecutiveShifts > 5) {
        return false;
    }
    else if (nurse.consecutiveNights > 2) {
        return false;
    }
    else if (nurse.restHours < 8 && shiftCode == 4 && nurse.workedYesterday == true) {
        return false;
    }
    //11 hours breaks--
    else if (nurse.consecutiveNights > 0 && shiftCode != 4) {
        return false;
    }
    else if (nurse.consecutiveLates > 0 && shiftCode < 3) {
        return false;
    }
    //--
    else if (nurse.consecutiveNights >= 2 && nurse.restHours >= 42) {
        return false;
    }
    else if (nurse.workedToday == true) {
        return false;
    }
    else if (nurse.workedNights >= 3 && shiftCode == 4) {
        return false;
    }
    else if (nurse.workedHours >= nurse.maxHours) {
        return false;
    }
    else if (nurse.canWorkAtNight == false && shiftCode == 4) {
        return false;
    }
    //weekends of duty
    
    else if(dayOfWeek == 7){
        if(nurse.weekendsOffDuty < 4){
            return true;
        }
        else return false;
    }
    else if(nurse.workedYesterday == false && dayOfWeek == 1){
        if(nurse.weekendsOffDuty > 0){
            return true;
        }
        else {        
            return false;
        }
    }
    else return true;
}
function swap(array, index) {
    var temp = array[index];
    array.splice(index, 1); //usuwamy element stamtad gdzie byl
    array.splice(0, 0, temp); //dodajemy na pierwsze miejsce element
    return array;
}

function softs(NursesArray){

    var temparray;
    for (var j = 0; j < NursesArray.length; j++) {
        if(NursesArray[j].weekendsOffDuty < 2){
            //temparray = swap(NursesArray, j);
           
        }
    
        //soft nr 2
        if(NursesArray[j].workedYesterday){
            //temparray = swap(NursesArray, j);
            NursesArray[j].weight+=1000;
        }
        
        //soft nr 4
        if(NursesArray[j].maxHours<=30 && NursesArray[j].consecutiveNights>1){
            //temparray = swap(NursesArray, j);
            NursesArray[j].weight+=1000;
        }
        
        //soft 6
        if(NursesArray[j].maxHours>=30 && NursesArray[j].maxHours<=48 && NursesArray[j].workedDays >3){
            NursesArray[j].weight+=10;
        }
        //soft  8
        if(NursesArray[j].maxHours>=30 && NursesArray[j].maxHours<=48 && NursesArray[j].consecutiveShifts >3){
            NursesArray[j].weight+=10;
        }

        //soft  10
        if(NursesArray[j].consecutiveEarlies < 2) {
            //temparray = swap(NursesArray, j);
            NursesArray[j].weight+=10;
        }
        //soft  12 //to jest zle ale to niwazne bo i tak ma wage 10 wiec olewamy
        if(NursesArray[j].consecutiveDays > 0 && NursesArray[j].consecutiveEarlies > 0) {
            //temparray = swap(NursesArray, j);
            NursesArray[j].weight+=5;
        }
        

    }
    if(temparray != null){
        return temparray;
    }
    else return NursesArray;
    
}
//sumowanie wag softow dla kazdej iteracji
function weightSum (NursesArray)
{
var total_weight=0;
for (var j = 0; j < NursesArray.length; j++)
{
    total_weight+=NursesArray[j].weight;
}
return total_weight;
}

//funkcja do mieszania tablicy
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
