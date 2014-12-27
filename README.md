Typewriter
==========

Typewriter provides an easy way to print out text on the web. It comes with a
few different configuration options that are all documented below.

See some examples [here](http://connoratherton/typewriter).

### Letter by letter, fixed interval.

``` js
var tw = new Typewriter('.example-1-output', {
    text: 'I love printing text! Pity my intervals are the same each time.',
    interval: 100
});

tw.type();
```

### Letter by letter, random natural human interval.

``` js
var tw = new Typewriter('.example-2-output', {
    text: 'My intervals are randomised to look like a human is typing.',
    interval: 'human'
});

tw.type();
```

### Word by work, fixed interval

``` js
var tw = new Typewriter('.example-3-output', {
    text: 'I LOVE PRINTING THE MOST!',
    interval: 500,
    words: true
});

tw.type();
```

### Letter by letter, random natural human interval with bounds specified and a callback on completion.

``` js
var tw = new Typewriter('.example-4-output', {
    text: 'Woah! So glad this is the last example I have to sit through.',
    interval: 'human',
    lowerBound: 30,
    upperBound: 130
});

tw.type(function() {
    console.log('Finished typing now');
});
```

### All options

``` js
var tw = new Typewriter('selector', {
    text: 'The text to write into the selector',
    words: false, // Optional. Defaults to false.
    interval: 'human' || 300, // Optional. Defaults to human.
    lowerBound: 30 || null, // Optional. Defaults to 30ms
    upperBound: 200 || null // Optional. Defaults to 200ms
});

tw.type(callback)
```
