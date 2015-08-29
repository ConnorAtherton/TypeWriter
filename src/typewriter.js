/*
 * typewriter.js
 *
 * Copyright 2014, Connor Atherton - http://connoratherton.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/ConnorAtherton/typewriter
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    root.Typewriter = factory();
  }
}(this, function factory(exports) {
  'use strict';

   var TypeWriter = TypeWriter || function (element, opts) {
     if (!element) throw new Error('A selector or element must be specified');
     if (!opts.text) throw new Error('TypeWriter needs text to type');

     var options = {
       element: !(element instanceof Node) ? document.querySelector(selector) : element,
       text: opts.text,
       words: opts.words || false,
       interval: opts.interval || 'human',
       lowerBound: opts.lowerBound || 30,
       upperBound: opts.upperBound || 200
     },

     randomIntFromInterval = function(min, max) {
       return Math.floor(Math.random() * (max - min + 1) + min);
     },

     isNumber = function(n) {
       return !isNaN(parseFloat(n)) && isFinite(n);
     },

     getIntervalSpeed = function() {
       if (isNumber(options.interval)) return options.interval;

       return randomIntFromInterval(options.lowerBound, options.upperBound);
     },

     typeByLettersConstantInterval = function(cb) {
       var numberOfLetters = options.text.length,
           currentPosition = 0;

       var interval = window.setInterval(function() {
         if (currentPosition === numberOfLetters) {
           window.clearInterval(interval);

           cb && cb.call(window);
         } else {
           options.element.innerHTML += options.text[currentPosition];
           currentPosition++;
         }
       }, getIntervalSpeed());
     },

     typeByLettersRandomisedInterval = function(cb) {
       var numberOfLetters = options.text.length,
           currentPosition = 0;

       repeat(numberOfLetters, currentPosition, cb);
     },

     repeat = function(numberOfLetters, currentPosition, cb) {
       if (numberOfLetters === 0) return cb && cb.call(window);

       var interval = getIntervalSpeed.call(),
           timer;

       options.element.innerHTML += options.text[currentPosition];

       timer = setTimeout(function() {
         numberOfLetters--; currentPosition++;
         repeat(numberOfLetters, currentPosition, cb);
       }, interval);
     },

     typeByWords = function(cb) {
       var words = options.text.split(' '),
           numberOfWords = words.length,
           currentPosition = 0;

       var interval = window.setInterval(function() {
         if (currentPosition === numberOfWords) {
           window.clearInterval(interval);

           cb && cb.call(window);
         } else {
           options.element.innerHTML += (words[currentPosition] + ' ');
           currentPosition++;
         }
       }, getIntervalSpeed());
     };

     this.type = function(cb) {
       options.words ? typeByWords(cb) :
           isNumber(options.interval) ? typeByLettersConstantInterval(cb) :
                                        typeByLettersRandomisedInterval(cb);
     };

   };

   return TypeWriter;

}));
