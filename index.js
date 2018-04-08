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

get = function(attr) {
	return $("form.kyc [name="+attr+"]").val()

}

$(document).ready(function() {

	$messages = $('.messages')
	$messages.niceScroll({
		cursorcolor: '#ddd'
	})

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

		message_text = message_text.toLowerCase()

		if(message_text.includes('need'))
			renderMessage('Sure! Please let me know your name', 'bot')

	})



	$('form.kyc').on('submit', function(e) {
		e.preventDefault()
		$form = $(this)
		$loading = $('section.kyc .loading')
		$result = $('section.kyc .result')

		$form.hide(200)
		$loading.show(500)

		var bonus = 0

		console.log(get('salary'))

		console.log(get('degree'))

		console.log(get('marital'))

		if (get('salary') > 50000) {
			bonus+=3.33
		}
		else if (get('salary') > 30000) {
			bonus+=.5
		}
		else{
			bonus+=.25
		}

		if (get('degree') == 'phd') {
			bonus +=3.33
		}
		else if (get('degree') == 'ms') {
			bonus+=.5
		}
		else {
			bonus+=.25
		}


		if (get('marital') == 'single') {
			bonus +=3.33
		}
		else if (get('marital') == 'married') {
			bonus+=.5
		}
		else {
			bonus+=.25
		}


		if (bonus > 8 ){
			rating = 'A+'
			amount = '100,000'
			markup = '2'
		}
		else if (bonus > 5) {
			rating = 'B+'
			amount = '50,000'
			markup = '5'
		}
		else if (bonus > 3) {
			rating ='C+'
			amount = '25,000'
			markup = '10'
		}
		else {
			rating = 'F'
		}

		window.setTimeout(function() {

			$result.find('span.amount')

			if(rating == 'F') {
				$result.find('h1').text('Sorry!')
				$result.find('h2.yes').hide()
				$result.find('h2.no').show()
			}

			else {
				$result.find('h1').text('Congratulations!')
				$result.find('h2.yes').show()
				$result.find('.amount').text(amount + ' PKR')
				$result.find('.markup').text(markup + ' %')
				$result.find('h2.no').hide()
			}

			$loading.hide(500)
			$result.show(500)

		}, 2000)
	})

})

