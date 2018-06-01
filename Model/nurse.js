function Nurse(id) {
    this.id = id;

    var consecutiveShifts = 0;
    var consecutiveNights = 0;
    var nights = 0;
    var day = 0;
    var maxHours = 0;
    var weaklyMaxHours = 0;    
    var workedHours = 0;
    var weaklyWorkedHours = 0;
    var weekendsOffDuty = 0;
    var restHours = 0;
    var workedToday = false;
    var workedYesterday = false;
    var canWorkAtNight = true;

    Nurse.prototype.getid = function () {
        return this.id;
    };

    Nurse.prototype.setDay = function (day) {
        this.day = day;
    };

    Nurse.prototype.getDay = function () {
        return this.day;
    };

    Nurse.prototype.setisBusy = function (isBusy) {
        this.isBusy = isBusy;
    };

    Nurse.prototype.getisBusy = function () {
        return this.isBusy;
    };

    Nurse.prototype.setcanWorkAtNight = function (canWorkAtNight) {
        this.canWorkAtNight = canWorkAtNight;
    };

    Nurse.prototype.getcanWorkAtNight = function () {
        return this.canWorkAtNight;
    };

    Nurse.prototype.setcanWork = function (canWork) {
        this.canWork = canWork;
    };

    Nurse.prototype.getcanWork = function () {
        return this.canWork;
    };

    Nurse.prototype.setNights = function (nights) {
        this.nights = nights;
    };

    Nurse.prototype.getNights = function () {
        return this.nights;
    };

    Nurse.prototype.setstartedToday = function (startedToday) {
        this.startedToday = startedToday;
    };

    Nurse.prototype.getstartedToday = function () {
        return this.startedToday;
    };

    Nurse.prototype.getconsecutiveShifts = function () {
        return this.consecutiveShifts;
    };

    Nurse.prototype.setconsecutiveShifts = function (consecutiveShifts) {
        this.consecutiveShifts = consecutiveShifts;
    };

    Nurse.prototype.getconsecutiveNights = function () {
        return this.consecutiveNights;
    };

    Nurse.prototype.setconsecutiveNights = function (consecutiveNights) {
        this.consecutiveNights = consecutiveNights;
    };

    Nurse.prototype.checkconsecutiveShifts = function () {
        if (this.consecutiveShifts == 6)
            return true;
    };

}