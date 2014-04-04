/*
 * TypeWriter.js
 *
 * Copyright 2014, Connor Atherton - http://connoratherton.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/ConnorAtherton/TypeWriter
 */
(function(window, document) {
  'use strict';

  var TypeWriter = TypeWriter || function (selector, opts) {
    if(!selector) throw new Error('A selector must be specified');
    if(!opts.text) throw new Error('TypeWriter needs text to type');

    var options = {
      element: document.querySelector(selector),
      text: opts.text,
      words: opts.words || false,
      interval: opts.interval || 'human',
      lowerBound: 50,
      upperBound: 170
    },
    randomIntFromInterval = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    isNumber = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    getIntervalSpeed = function () {
      if(isNumber(options.interval))
        return options.interval;

      return randomIntFromInterval(options.lowerBound, options.upperBound);
    },
    typeByLetters = function (cb) {
      var numberOfLetters = opts.text.length,
          currentPosition = 0;

      var interval = window.setInterval(function () {
        if(currentPosition === numberOfLetters){
          window.clearInterval(interval);
          cb && cb.call(window);
        } else {
          options.element.innerHTML += options.text[currentPosition];
          currentPosition++;
        }
      }, getIntervalSpeed.call() )
    },
    typeByWords = function (cb) {
      var words = options.text.split(' '),
          numberOfWords = words.length,
          currentPosition = 0;

      var interval = window.setInterval(function () {
        if(currentPosition === numberOfWords){
          window.clearInterval(interval);
          cb && cb.call(window);
        } else {
          options.element.innerHTML += (words[currentPosition] + ' ');
          currentPosition++;
        }
      }, getIntervalSpeed.call() )
    }

    this.type = function (cb) {
      options.words ? typeByWords(cb) : typeByLetters(cb);
    };

  };

  this.TypeWriter = TypeWriter;

}).call(this, window, document)
