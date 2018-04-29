const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	constructor({ title, recipient }, content) {
		super();

		this.sgApi = sendgrid(keys.sendgrid.key);
		this.from_email = new helper.Email('no-reply@healthapp.herokuapp.com');
		this.subject = title;
		this.body = new helper.Content('text/html', content);
		this.recipient = this.formatAddress(recipient);

		this.addContent(this.body);
		this.addRecipient();
	}

	formatAddress({ email }) {
		return new helper.Email(email);
	}

	addRecipient() {
		const personalize = new helper.Personalization();
		personalize.addTo(this.recipient);
		this.addPersonalization(personalize);
	}

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
