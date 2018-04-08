var $ = require('jquery')

require('jquery.nicescroll')

global.jQuery = global.$ = $

botResponse = function(msg) {
	$message = $('.message.template').clone().removeClass('template').addClass('bot')
	$message.text(msg)
	window.setTimeout(function() {
		$message.appendTo($messages)
	}, 1000)
}

addMessage = function($message) {
	$message.appendTo($messages)
	$messages.scrollTop($('.messages')[0].scrollHeight)
}

renderMessage = function(msg, sender) {
	$message = $('.message.template').clone().removeClass('template')
	$message.text(msg)

	if(sender == 'bot') {
		$message.addClass('bot')
		window.setTimeout(function() {
			addMessage($message)
		}, 1000)
	}

	else {
		addMessage($message)
	}
}

$(document).ready(function() {

	$messages = $('.messages')
	$messages.niceScroll()

	$('form.chat').on('submit', function(e) {
		e.preventDefault()

		$form = $(this)
		$textbox = $form.find('input.box')
		var message_text = $textbox.val()

		// Responses here

		if(message_text == '') 
			return

		$textbox.val('')

		renderMessage(message_text)

		if(message_text.includes('need'))
			renderMessage('Sure! Please let me know your name', 'bot')

	})

})

