class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for specific_channel
  end

  def receive(data)
    ActionCable.server.broadcast(specific_channel, format_response(data))
  end

  private
  def specific_channel
    "chat_#{params[:room]}"
  end

  def format_response data
    {
      message: data["message"],
      email: current_user.email
    }
  end
end
