$(document).on('turbolinks:load', function() {

  var add_btn = "user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn"
  function buildHTML(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  }

  function ErrMsgHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    return html;
  }

  function AddUserHTML(name, id){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html;
  }

  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();
    var input = $("#user-search-field").val();
    var url = "/users";
    if (!input){
      $('#user-search-result').empty();
      return
    }
    $.ajax({
      url: url,
      type: "GET",
      data: {keyword: input},
      dataType: 'json',
    })
    .done(function(data){
      $('#user-search-result').empty();
      if (data.length !== 0) {
        data.forEach(function(user){
          var html = buildHTML(user);
          $('#user-search-result').append(html);
        });
      }
      else {
        var html = ErrMsgHTML("一致するユーザーはいません");
        $('#user-search-result').append(html);
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  $(function(){
    $('#user-search-result').on("click", '.user-search-add', function () {
      var addUserName = $(this).attr('data-user-name')
      var addUserId =$(this).attr('data-user-id')
      var html = AddUserHTML(addUserName, addUserId);
      $('.chat-group-users').append(html);
      $(this).parent().remove();
    });
    $(document).on("click", '.user-search-remove', function () {
      $(this).parent().remove();
    });
  });
});