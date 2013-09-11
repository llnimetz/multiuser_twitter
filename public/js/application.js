function requestIsProcessing(){
  $('#messages').html("<p>Processing your request</p>");
  $('input').prop('disabled', true);
}

function requestIsDone(){
  $('#messages').html("<p>Request Successful!</p>");
  $('input').prop('disabled', false);
}

$( document ).ajaxStart(function() {
  requestIsProcessing();
  $('#spinner').toggle();
});

$( document ).ajaxStop(function() {
  requestIsDone();
  $('#spinner').toggle();
});

// TOOK THIS OUT FOR NOW
// $(document).ready(function() {
//   $('#get_tweets').on('submit', function(e){
//     e.preventDefault();
//     var params = $(this).serialize();

//     $.ajax({
//       type: "GET",
//       url:"/",
//       data: params
//     }).done(function(server_response){
//       $('#recent_tweets').html(server_response);
//     }).fail(function(){console.log('get tweets fail');
//     });

//   });

$(document).ready(function() {
  $('#send_tweet').on('submit', function(e){
    e.preventDefault();
    var params = $(this).serialize();

    $.ajax({
      type: this.method,
      url: this.action,
      data: params
    }).done(function(){
      requestIsDone();
      $('#send_tweet input[type=text]').val('');
    }).fail(function(){console.log('send tweet fail');
    });

    // btw, you can totally put a method here that
    // will execute BEFORE the ajax call above is done.
    // since it's asynchronous, you can (for example)
    // choose to disable the form fields *here*.
    // if you disable them before the ajax call, or
    // in the done callback, your tweet won't get sent!

  });

});
