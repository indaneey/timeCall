timeCall.js
====

timeCall.js is a simple library that used to get a human readable form of date object.


Installation
------------------

```bash
# Basic Node.JS installation
npm install @indaneey/timecall --save
```

Syntax
------

### Import `timecall()` as component

```js
import { timeCall } from '@indaneey/timecall';
```

Examples
--------

### Calling timecall using `require()`

```js
var timeCall = require('timecall');
var timenow = new timeCall();
```

### Import the minified version of `timeCall.min.js` JavaScript library

```html
<head>
<script src="timecall.min.js"></script>
</head>
```

and then in `script tag` create timeCall() instance

```js
var timenow = new timeCall();
```

## Initialize the timeCall with date parameter
---

```js
  var timenow = new timeCall('2021/05/02 5:45:25') // or JavaScript Date object
```


## timeCall methods

<ul>
  <li>format( )</li>
  <li>ago( )</li>
  <li>left( )</li>
</ul>


### format() method 

  use this method to easly formatted Date object, this method takes two parameters the first one is Date and Time format pattern and second is some properties
  
Example
```js
  var timenow = new timeCall(Date.now())
  timenow.format("DD MM YYYY hh mm a") // returns 03/11/2021 05:02AM
  timenow.format("EEEE DD MMMM YYYY HH mm") // returns Wednesday, 03 November 2021 15:02
```

You have to seperate each pattern by space.

This method has two properties
- datedivider
- timedivider


Example

```js
    var timenow = new timeCall(Date.now())
    timenow.format("DD MM YYYY hh mm a", {
      datedivider: "-", // returns 03-11-2021 - this property will change the date divider sign
      timedivider: ":"  // returns 05:02AM - this property will change the time divider sign
    })
```

## List of all Date and Time Pattern

| Pattern | Description |
|---------|-------------|
| EEEE | Day of the week |
| MM | Month of the year in a two-digit format |
| MMM | Abbreviated month of the year |
| MMMM | Month of the year |
| DD | Day of the month with leading zero |
| d | Day of the month |
| yy | Year in two-digit format |
| yyyy | Year in four-digit format |
| YYYY | Week-based year |
| HH | Hour of the day (0-23) |
| hh | Clock hour in AM/PM (1-12) format with leading zero 02:15 |
| h | Clock hour in AM/PM (1-12) format without leading zero 2:15 |
| mm | Minute with leading zero |
| m | Minute without leading zero |
| ss | Second |
| a | AM/PM marker |



### ago() method 

  use this method to get how long the date is passed, like <i> 1 day ago <i> and it will returns either string or object with date details.
  
Example
```js
var ago = new timeCall('2022/05/02 12:20').ago() // returns 2 days 5 hours 26 minutes 47 seconds ago
```

This method has some properties

- withtime
- timeformat
- json


Example of withtime and timeformat

```js
  var timecall = new timeCall('2022/05/02 12:20').ago({
      withtime: true, // this will enable time or unable it
      timeformat:  "hh:mm", // this property will change the time format. "hh", "hh:mm" and "hh:mm:ss"
  }) // returns 2 days 5 hours 40 minutes ago
```

Example of json property
this will return an object with the date and time details.

```js
  var timecall = new timeCall('2022/05/02 12:20').ago({
    json: true // this will return json type date with the Date and Time details
  }) // returns { success: true, action: "ago", data: { days: 2, hours: 5, minutes: 42 }}
```


### left() method 

  use this method to get how long the date is left, like <i> 1 day 6 hours 34 minutes left <i> and it will returns either string or object with date details.
  
Example
```js
var left = new timeCall('2024/05/03 12:50').left() // returns 2 years 18 hours 38 minutes 12 seconds left
```

This method has some properties the same with ago() above

- withtime
- timeformat
- json


# timeCall.js

_Developed by Indaneey_design. for any support contact me [here](mailto:indaneeey@gmail.com)_