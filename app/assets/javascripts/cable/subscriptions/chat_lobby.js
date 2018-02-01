App.chatChannel = App.cable.subscriptions.create({ channel: "ChatChannel", room: "Lobby"}, {
  received(data) {
    this.appendLine(data);
    return $('#chat-feed').stop().animate({ scrollTop: $('#chat-feed')[0].scrollHeight }, 800);
  },

  appendLine(data) {
    const html = this.createLine(data);
    return $("[data-chatroom='Lobby']").append(html);
  },

  createLine(data) {
    return (`\
      <article class="chat-line">
        <span class="speaker">${data["email"]} :</span>
        <span class="body">${data["message"]}</span>
      </article>\
      `
    )
  },
});
jQuery(document).ready(function($) {
  $(document).on('keypress', 'input.chat-input', function(event) {
    if (event.keyCode === 13) {
      App.chatChannel.send({
        message: event.target.value,
        room: 'Lobby'
      });

      return event.target.value = '';
    }
  });
})
