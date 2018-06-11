var D_begin = '08:00';
var D_end = '17:00';
var E_begin = '07:00';
var E_end = '16:00';
var L_begin = '14:00';
var L_end = '23:00';
var N_begin = '23:00';
var N_end = '07:00';

var kara = 0;

function addEvents() {

    var l_pielegniarek = 16;
    var l_dni = 35;
    var nurse1 = new Nurse(0);
    var nurse2 = new Nurse(1);
    var nurse3 = new Nurse(2);
    var nurse4 = new Nurse(3);
    var nurse5 = new Nurse(4);
    var nurse6 = new Nurse(5);
    var nurse7 = new Nurse(6);
    var nurse8 = new Nurse(7);
    var nurse9 = new Nurse(8);
    var nurse10 = new Nurse(9);
    var nurse11 = new Nurse(10);
    var nurse12 = new Nurse(11);
    var nurse13 = new Nurse(12);
    var nurse14 = new Nurse(13);
    var nurse15 = new Nurse(14);
    var nurse16 = new Nurse(15);

    var NursesArray = new Array();
    NursesArray.push(nurse1);
    NursesArray.push(nurse2);
    NursesArray.push(nurse3);
    NursesArray.push(nurse4);
    NursesArray.push(nurse5);
    NursesArray.push(nurse6);
    NursesArray.push(nurse7);
    NursesArray.push(nurse8);
    NursesArray.push(nurse9);
    NursesArray.push(nurse10);
    NursesArray.push(nurse11);
    NursesArray.push(nurse12);
    NursesArray.push(nurse13);
    NursesArray.push(nurse14);
    NursesArray.push(nurse15);
    NursesArray.push(nurse16);



    for (var j = 0; j < NursesArray.length; j++) {

        //inicjalizacja parametrow pielegniarek
        NursesArray[j].consecutiveShifts = 0;
        NursesArray[j].consecutiveNights = 0;
        NursesArray[j].workedNights = 0;
        NursesArray[j].workedDays = 0;
        NursesArray[j].workedHours = 0;
        NursesArray[j].restHours = 0;
        NursesArray[j].workedToday = false;
        NursesArray[j].workedYesterday = false;
        NursesArray[j].weekendsOffDuty = 0;
        NursesArray[j].weaklyWorkedHours = 0;
        NursesArray[j].canWorkAtNight = true;


        //Pierwsza pielegniarka nie moze pracowac w nocy
        NursesArray[0].canWorkAtNight = false;


        //13 pielegniarka pracuje 32 godziny
        if (j == 12) {
            NursesArray[j].maxHours = 160;
            NursesArray[j].weaklyMaxHours = 32;

        }
        else if (j == 13 || j == 14 || j == 15) {
            //3 ostatnie pielegniarki pracuja 20 godzin
            NursesArray[j].maxHours = 100;
            NursesArray[j].weaklyMaxHours = 20;
        }
        else {
            NursesArray[j].maxHours = 184;
            NursesArray[j].weaklyMaxHours = 36;
        }
    }


    var today = new Date();
    var x;

    //dziwne rzeczy tu sie dzieja ale dziala
    if (today.getDay() == 0) x = today.getDay();
    else
        x = 6 - today.getDay() + 1;
    today.setDate(today.getDate() + x);

    var batch = gapi.client.newBatch();
    var batchCounter = 0;


    for (var i = 0; i < l_dni; i++) {
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + i + 1); //Iteracja po kolejnych dniach od kolejnego tygodnia
        var month = tomorrow.getMonth() + 1; //pobieramy numer miesiaca
        var dayOfWeek = tomorrow.getDay() + 1; //numer dnia tygodnia
        var dayOfMonth = tomorrow.getDate();
        var count = 0;
        var day = new WorkDay();

        if (dayOfWeek == 6 || dayOfWeek == 2 || dayOfWeek == 3 || dayOfWeek == 4 || dayOfWeek == 5) {
            day = new WorkDay();
            day.D_demand = 3;
            day.E_demand = 3;
            day.L_demand = 3;
            day.N_demand = 1;
        }
        else if (dayOfWeek == 1 || dayOfWeek == 7) {
            day = new Weekend();
            day.D_demand = 2;
            day.E_demand = 2;
            day.L_demand = 2;
            day.N_demand = 1;
        }


        //generating E shift
        for (var j = 0; j < NursesArray.length; j++) {
            if (checkNurse(NursesArray[j], dayOfWeek, 2)) {
                var event = createEventString(NursesArray[j].id, month, dayOfMonth, dayOfMonth, E_begin, E_end, 2);
                batch.add(gapi.client.calendar.events.insert({
                    'calendarId': CAL_ID,
                    'resource': event
                }));
                batchCounter++;
                updateChosenNurse(NursesArray[j], 2, dayOfWeek);
                softs(NursesArray, 2);
                count++;
                if (count >= day.E_demand) {
                    count = 0;
                    break;
                }
            }
            else NursesArray[j].restHours = NursesArray[j].restHours + 9;
        }

        //generating D shift
        for (var j = 0; j < NursesArray.length; j++) {
            if (checkNurse(NursesArray[j], dayOfWeek, 1)) {
                var event = createEventString(NursesArray[j].id, month, dayOfMonth, dayOfMonth, D_begin, D_end, 1);
                batch.add(gapi.client.calendar.events.insert({
                    'calendarId': CAL_ID,
                    'resource': event
                }));
                batchCounter++;

                updateChosenNurse(NursesArray[j], 1, dayOfWeek);
                softs(NursesArray, 1);

                count++;
                if (count >= day.D_demand) {
                    count = 0;
                    break;
                }
            }
            else NursesArray[j].restHours = NursesArray[j].restHours + 1;

        }

        //generating L shift
        for (var j = 0; j < NursesArray.length; j++) {
            if (checkNurse(NursesArray[j], dayOfWeek, 3)) {
                var event = createEventString(NursesArray[j].id, month, dayOfMonth, dayOfMonth, L_begin, L_end, 3);
                batch.add(gapi.client.calendar.events.insert({
                    'calendarId': CAL_ID,
                    'resource': event
                }));
                batchCounter++;
                updateChosenNurse(NursesArray[j], 3, dayOfWeek);
                softs(NursesArray, 3);

                count++;
                if (count >= day.L_demand) {
                    count = 0;
                    break;
                }
            }
            else NursesArray[j].restHours = NursesArray[j].restHours + 6;
        }
        //Night shift
        for (var j = 0; j < NursesArray.length; j++) {
            if (checkNurse(NursesArray[j], dayOfWeek, 4)) {
                var event = createEventString(NursesArray[j].id, month, dayOfMonth, ++dayOfMonth, N_begin, N_end, 4);
                batch.add(gapi.client.calendar.events.insert({
                    'calendarId': CAL_ID,
                    'resource': event
                }));
                batchCounter++;
                updateChosenNurse(NursesArray[j], 4, dayOfWeek);
                softs(NursesArray, 4);

                count++;
                if (count >= day.N_demand) {
                    count = 0;
                    break;
                }
            }
            else NursesArray[j].restHours = NursesArray[j].restHours + 8;
        }
        for (var j = 0; j < NursesArray.length; j++) {
            //console.log(NursesArray[j].id);
            //resetujemy na koniec dnia warunek czy dana osoba pracowala
            if (NursesArray[j].workedToday == true) {
                NursesArray[j].workedYesterday = true;
                NursesArray[j].workedToday = false;
            }
            else {
                if(NursesArray[j].consecutiveShifts == 1){
                    kara+=1000;
                }
                NursesArray[j].consecutiveShifts = 0;
                NursesArray[j].consecutiveNights = 0;
                //weekends of duty
                if (dayOfWeek == 7 && NursesArray[j].restHours >= 60) {
                    NursesArray[j].weekendsOffDuty++;
                }
            }
        }
    }

    if (batchCounter == 320) {
        console.log(kara);
        batch.then(function () {
            if (confirm("Wygenerowano grafik.")) {
                location.reload();
            }
        });
    }
    else {
        console.log(batchCounter);
        addEvents();
    }
}




/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function createEventString(nourseId, month, startingDate, endingDate, shiftBegin, shiftEnd, colorId) {

    var endingMonth = month;
    if (endingDate == 32) {
        endingDate = 1;
        endingMonth = month + 1;
    }
    var event = {
        'summary': 'Pielęgniarka ' + nourseId,
        'location': 'Szpital',
        'description': '//TODO',
        'colorId': colorId,
        'start': {
            'dateTime': '2018-' + month + '-' + startingDate + 'T' + shiftBegin + ':00+02:00'
        },
        'end': {
            'dateTime': '2018-' + endingMonth + '-' + endingDate + 'T' + shiftEnd + ':00+02:00'
        }
    };
    return event;
}


function clearEvents() {
    gapi.client.calendar.events.list({
        'calendarId': CAL_ID,
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 2000,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        var batch2 = gapi.client.newBatch();
        console.log(events.length);

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                console.log(i);
                batch2.add(gapi.client.calendar.events.delete({
                    'calendarId': CAL_ID,
                    'eventId': event.id
                }));
            }
            batch2.then(function () {
                console.log('Usunieto wszystko');
                if (confirm("Usunięto wszystko")) {
                    location.reload();
                }
            });
        }
    });
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': CAL_ID,
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 2000,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;
        appendPre('Grafik:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(event.summary + ' (' + when + ')')
            }
        } else {
            appendPre('Nie znaleziono grafiku.');
        }
    });
}





