/**
 * Created by kiirpi on 12.07.15.
 */
 var colors = require('colors');

 module.exports = function (app, passport, LocalStrategy) {
     var User = require('../models/user');
     var log = require('../models/log');
     var enums = require('../models/enum');
 
     passport.use(new LocalStrategy({usernameField: 'user', passwordField: 'passport'},
         function (username, password, done) {
 
             User.findOne({
                 email: username.toLowerCase(),isDeleted:false}).populate({path:"customerId",select:"active isDemo type"}).exec(function (err, retUser) {
                 if (err) return done(err);
 
                 if (!retUser) {
                     return done(null, false, {message: 'Email adresi bulunamadı',err:1});
                 }
                 if (!retUser.authenticate(password)) {
                     return done(null, false, {message: 'Şifre hatalı',err:2});
                 }
 
                 if(!retUser.access.web){
                     return done(null, false, {message: 'Web erişimi yok',err:3});
                 }
 
                 if(!retUser.active){
                     return done(null, false, {message: 'Kullanıcı Aktif Değil!',err:3});
                 }
 
                 if(!retUser.customerId.active) return done(null,false,{message: 'Müşteri aktif değil!',err:1})
 
                 retUser.time.lastLoginDate = Date.now();
                 retUser.save(function(){
                     return done(null,retUser);
                 });
             });
         }
     ));
 
     passport.serializeUser(function (user, done) {
       //  console.log('Serializing: '.red, user);
         done(null, user._id);
     });
 
     passport.deserializeUser(function (id, done) {
       //  console.log('Deserializing: '.red, id);
 
         User.findOne({_id: id}, function (err, user) {
             return done(err, user)
         });
     });
 };
 
 