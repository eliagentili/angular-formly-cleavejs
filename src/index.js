import * as angular from 'angular';
import 'angular-formly';

import { AngularCleavejsController } from './controllers/angular-cleavejs.controller';
import { AngularCleavejsService } from './services/angular-cleavejs.service';

export default angular
  .module('eg-angular-formly-cleavejs', [ 'formly' ])
  .component('angularCleavejs', {
    bindings: {
      id: '<',
      ngModel: '=',
      to: '<',
    },
    controller: AngularCleavejsController,
    template: `<input class="form-control"
                      id="{{ $ctrl.id }}"
                      name="{{ $ctrl.id }}"
                      placeholder="{{ $ctrl.to.placeholder }}"
                      formly-focus="{{ $ctrl.to.focus }}"
                      ng-disabled="$ctrl.to.disabled"
                      ng-model="$ctrl.ngModel"
                      ng-required="$ctrl.to.required"
                      ng-change="$ctrl.onChange($ctrl.ngModel)"
                      ng-keydown="$ctrl.onKeyDown($event)">`
  })
  .run(['formlyConfig', (formlyConfig) => {
    formlyConfig.setType({
      name: 'angular-cleavejs',
      extends: 'input',
      template: `
      <angular-cleavejs id="id"
                        ng-model="model[options.key]"
                        to="to">
      </angular-cleavejs>`,
    });
  }])
  .service('angularCleavejsService', AngularCleavejsService)
  .name;