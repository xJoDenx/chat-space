
$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var img = message.image.url ? message.image.url : `` ;
    var html = `<div class="right-main__message">
                  <div class="right-main__message__user">
                    ${message.user_name}
                  </div>
                  <div class="right-main__message__date">
                    ${message.created_at}
                  </div>
                  <div class="right-main__message__text">
                    ${message.content}
                  </div>
                  <div class= "right-main__message__image">
                    <img src='${img}'>
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.right-main').append(html)
      $('#new_message')[0].reset();
      $('.right-main').animate({ scrollTop: $('.right-main')[0].scrollHeight});
      $('.post-message__btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
      $('.post-message__btn').prop('disabled', false);
    })
  })
});