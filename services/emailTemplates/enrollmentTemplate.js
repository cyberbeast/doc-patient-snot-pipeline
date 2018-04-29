const keys = require('../../config/keys');

module.exports = enrollment => {
	return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3> Greetings from HealthApp </h3>
                    <p> ${enrollment.title} </p>
                    <div>
                        <a href="${keys.sendgrid.redirectDomain}">Respond</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};
