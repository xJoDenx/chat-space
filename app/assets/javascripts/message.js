
$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var img = message.image.url ? message.image.url : `` ;
    var html = `<div class="right-main__message" data-id= "${message.id}" >
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
                    <img src='${img}' class= 'message__image'>
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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.right-main__message:last').data('id');
    var url = location.pathname
    if (url.match('messages')){
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: 'api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          //メッセージが入ったHTMLを取得
          var insertHTML = buildHTML(message);
          //メッセージを追加
          $('.right-main').append(insertHTML);
          $('.right-main').animate({ scrollTop: $('.right-main')[0].scrollHeight});
        });
      })
      .fail(function() {
        alert('error');
      });
    }
  };
    setInterval(reloadMessages, 500);
});