module.exports = {
	mlab: {
		dbURI: process.env.MLAB_DB_URI
	},
	cookieKey: process.env.COOKIE_KEY,
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	},
	sendgrid: {
		key: process.env.SENDGRID_KEY,
		redirectDomain: process.env.SENDGRID_REDIRECT_DOMAIN
	}
};
