# angular-formly-cleavejs

This custom type for Angular Formly is based on [Cleave.js](https://github.com/nosir/cleave.js) and translate it's own React component in an Angular one.

---

## Installation

#### npm

```bash
npm install --save cleave.js angular-formly-cleavejs
```

## Usage

First import the library in your project.

```
import 'cleave.js';
import 'angular-formly-cleavejs';

// or

require('cleave.js);
require('angular-formly-cleavejs);
```

Include the module in your angular app.

```
angular.module('app', ['eg-angular-formly-cleavejs'])
```

Then define a simple formly's fields array like this one.

```
this.fields = [
  {
    key: 'birth',
    type: 'angular-cleavejs',
    templateOptions: {
    label: 'Birth',
    cleavejs: {
      date: true,
      datePattern: ['Y', 'm', 'd']
    }
  }
];
  ```

  As you can see you need to specify two things:
  
  1. the `angular-cleavejs` custom type;
  2. the `cleavejs` object that contains the input configuration;

  ---

  ## Input configuration

  You can refer to main cleave.js page for learning how to configure the input.

  You can find the it's documentation and some examples here:

  [https://github.com/nosir/cleave.js/](https://github.com/nosir/cleave.js)

  [https://nosir.github.io/cleave.js/](https://nosir.github.io/cleave.js/) 

  ---

  ## Known issues

Right now the phone region code, and thus the phone mask, doesn't work, i hope to fix it asap.

## Todo
- [ ] Fix phone mask
- [ ] Add some tests

## Get in touch
- Bugs / Suggestions: [open an issue](https://github.com/eliagentili/angular-formly-cleavejs/issues)
- Twitter: [@gentilielia](https://twitter.com/gentilielia)

## References

- Cleave.js library https://github.com/nosir/cleave.js

## License

angular-formly-cleavejs is licensed under the [MIT License (MIT)](https://opensource.org/licenses/MIT)