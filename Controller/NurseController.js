
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
    else if (nurse.restHours <= 11 && nurse.restHours != 0) {
        return false;
    }
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
    else return true;
}
function swap(array, index) {
    var temp = array[index];
    array.splice(index, 1); //usuwamy element stamtad gdzie byl
    array.splice(0, 0, temp); //dodajemy na pierwsze miejsce element
}

function softs(NursesArray, shiftCode){
    for (var j = 0; j < NursesArray.length; j++) {
        //soft nr 2
        if(NursesArray[j].workedYesterday){
            swap(NursesArray, j);
        }
        //soft nr 4
        if(NursesArray[j].maxHours<=30 && NursesArray[j].consecutiveNights>1){
            swap(NursesArray, j);
        }
        //soft 6
        if(NursesArray[j].maxHours>=30 && NursesArray[j].maxHours<=48 && NursesArray[j].workedDays >3){
            swap(NursesArray, j);
        }
        //sof  8
        if(NursesArray[j].maxHours>=30 && NursesArray[j].maxHours<=48 && NursesArray[j].consecutiveShifts >3){
            swap(NursesArray, j);
        }
        //sof  10
        if(shiftCode==1) {}
        //sof  12

    }
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
