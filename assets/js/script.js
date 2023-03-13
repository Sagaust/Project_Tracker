// // JavaScript function that wraps everything
// $(document).ready(function() {
//   // Display current day at the top of the calendar
//   var today = moment().format("dddd, MMMM Do YYYY");
//   $("#currentDay").text(today);

// });

// Get current day using moment.js
let currentDay = moment().format("dddd, MMMM Do");

// Set each timeblock in the daily schedule using moment.js
let startTime = moment().hour(9);
let endTime = moment().hour(18);

// Generate all timeblocks and insert saved local storage data
for (let i = startTime.hour(); i <= endTime.hour(); i++) {
  let hourBlock = moment().hour(i);
  let timeBlock = i > 12 ? `${i - 12} PM` : `${i} AM`;
  let event = JSON.parse(localStorage.getItem(`hour${i}`)) || '';

  let timeBlockEl = $(`
    <div class="row">
      <div class="col-2 hour text-right">
        <span>${timeBlock}</span>
      </div>
      <div class="col-8 event-group">
        <textarea class="events col-12" id="eventblock${i}">${event}</textarea>
      </div>
      <div class="col-2 save-delete">
        <i class="fas fa-save" title="Save Event"></i> 
        <i class="fas fa-trash" title="Remove Event"></i>
      </div>
    </div>
  `);

  // Audit each time block to display past, current and future timeblocks
  if (hourBlock.isBefore(moment(), 'hour')) {
    timeBlockEl.addClass('past');
  } else if (hourBlock.isSame(moment(), 'hour')) {
    timeBlockEl.addClass('present');
  } else {
    timeBlockEl.addClass('future');
  }

  // Save event to local storage when the save button is clicked
  timeBlockEl.find('.fa-save').on('click', function() {
    let event = $(this).parent().siblings('.event-group').find('.events').val().trim();
    localStorage.setItem(`hour${i}`, JSON.stringify(event));
  });

  // Remove event from local storage when the remove button is clicked
  timeBlockEl.find('.fa-trash').on('click', function() {
    localStorage.removeItem(`hour${i}`);
    $(this).parent().siblings('.event-group').find('.events').val('');
  });

  $('.container').append(timeBlockEl);
}

// Display current day at top of planner
$("#currentDay").text(currentDay);
