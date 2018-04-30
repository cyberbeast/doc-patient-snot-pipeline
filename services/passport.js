const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const SentenceCase = require('../utils/sentenceCase');

const User = mongoose.model('users');
const Doctor = mongoose.model('Doctor');
const Patient = mongoose.model('Patient');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user));
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log('User Profile: ', profile);
			const existingUser = await User.findOne({
				googleId: profile.id
			});

			if (existingUser) {
				return done(null, existingUser);
			}

			const user = await new Patient({
				googleId: profile.id,
				profileImage: profile._json.image.url,
				email: profile._json.emails[0].value,
				firstName: SentenceCase(profile._json.name.givenName),
				lastName: SentenceCase(profile._json.name.familyName),
				lastResponseDate: new Date()
			}).save();

			done(null, user);
		}
	)
);
