import * as angular from 'angular';
import 'angular-formly';

export default angular
  .module('eg-angular-formly-cleavejs', [ 'formly', 'cleave.js' ])
  .run(['formlyConfig', (formlyConfig) => {
    formlyConfig.setType({
      name: 'angular-cleavejs',
      defaultOptions: {
        defaultValue: '',
      },
      template: `<input class="form-control" ng-model="model[options.key]" cleave="to.cleavejs">`,
      wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    });
  }])
  .name;