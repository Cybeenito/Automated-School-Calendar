
var classTimes = [ [8, 35], [10, 15], [12, 10], [13, 40] ];
var classDuration = [1, 20];
function time2num(time) {
  return time[0] * 1000 * 60 * 60 + time[1] * 1000 * 60;
}


function main(CalendarName, classes, startDate, endDate) {
  if (CalendarApp.getCalendarsByName('HS Days').length < 1) {
    CalendarApp.subscribeToCalendar('sas.edu.sg_59677quvvugr43j58tm4r23ang@group.calendar.google.com');
  }
  
  if (CalendarApp.getCalendarsByName(CalendarName).length < 1) {
    CalendarApp.createCalendar(CalendarName);
  }
  
  var schoolCalendar = CalendarApp.getCalendarsByName(CalendarName)[0];
  var HSDays = CalendarApp.getCalendarsByName("HS Days")[0];
  
  var start = new Date(startDate);
  var end = new Date(endDate);
  
  var events = HSDays.getEvents(start, end);
  
  events.forEach(function (e) {
    var title = e.getTitle().trim();
    if (!e.isAllDayEvent()) {
      return;
    }
    var date = e.getAllDayStartDate();
    if (classes[title] == undefined) {
      Logger.log(classes);
      Logger.log(title);
      return;
    }
    for (var i = 0; i < classes[title].length; i++) {
      var e = classes[title][i];
      if (e) {
        var startTime = new Date(date.getTime() + time2num(classTimes[i]));
        var endTime = new Date(startTime.getTime() + time2num(classDuration));
        schoolCalendar.createEvent(e, startTime, endTime);
        Utilities.sleep(200); // have to be more than 50
      }
    }
  });
  
}
 function doGet() {
   return HtmlService.createHtmlOutputFromFile('index.html');
 }

