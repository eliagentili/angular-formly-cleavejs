import CreditCardDetector from 'cleave.js/src/shortcuts/CreditCardDetector';
import DefaultProperties from 'cleave.js/src/common/DefaultProperties';
import Util from 'cleave.js/src/utils/Util';

export class AngularCleavejsController {

  constructor(angularCleavejsService) {
    this.angularCleavejsService = angularCleavejsService;
  }

  $onInit() {
    this.initValue = _.clone(this.ngModel);
    this.props = DefaultProperties.assign({}, this.to.cleavejs);

    this.props.maxLength = Util.getMaxLength(this.props.blocks);

    this.angularCleavejsService.initPhoneFormatter(this.props);
    this.angularCleavejsService.initDateFormatter(this.props);
    this.angularCleavejsService.initNumeralFormatter(this.props);

    this.onInput(this.initValue);
  }

  $onChange(nextProps) {
    const phoneRegionCode = nextProps.to.cleavejs.phoneRegionCode;
    let newValue = nextProps.ngModel;

    if (newValue) {
      newValue = newValue.toString();

      if (newValue !== this.initValue) {
        this.initValue = newValue;
        this.onInput(newValue);
      }
    }

    // update phone region code
    if (phoneRegionCode && phoneRegionCode !== this.props.phoneRegionCode) {
      this.props.phoneRegionCode = phoneRegionCode;
      this.angularCleavejsService.initPhoneFormatter(this.props);
      this.onInput(this.props.result);
    }
  }

  onChange(value) {
    this.onInput(value);
  }

  onInput(value) {
    const pps = this.props;

    value = value || '';

    // case 1: delete one more character "4"
    // 1234*| -> hit backspace -> 123|
    // case 2: last character is not delimiter which is:
    // 12|34* -> hit backspace -> 1|34*

    if (!pps.numeral && pps.backspace && !Util.isDelimiter(value.slice(-1), pps.delimiter, pps.delimiters)) {
      value = Util.headStr(value, value.length - 1);
    }

    // phone formatter
    if (pps.phone) {
      pps.result = pps.phoneFormatter.format(value);
      this.updateValueState(pps.result);

      return;
    }

    // numeral formatter
    if (pps.numeral) {
      pps.result = pps.prefix + pps.numeralFormatter.format(value);
      this.updateValueState(pps.result);

      return;
    }

    // date
    if (pps.date) {
      value = pps.dateFormatter.getValidatedDate(value);
    }

    // strip delimiters
    value = Util.stripDelimiters(value, pps.delimiter, pps.delimiters);

    // strip prefix
    value = Util.getPrefixStrippedValue(value, pps.prefixLength);

    // strip non-numeric characters
    value = pps.numericOnly ? Util.strip(value, /[^\d]/g) : value;

    // convert case
    value = pps.uppercase ? value.toUpperCase() : value;
    value = pps.lowercase ? value.toLowerCase() : value;

    // prefix
    if (pps.prefix) {
      value = pps.prefix + value;

      // no blocks specified, no need to do formatting
      if (pps.blocksLength === 0) {
        pps.result = value;
        this.updateValueState(pps.result);

        return;
      }
    }

    // update credit card props
    if (pps.creditCard) {
      this.updateCreditCardPropsByValue(value);
    }

    // strip over length characters
    value = Util.headStr(value, pps.maxLength);

    // apply blocks
    pps.result = Util.getFormattedValue(value, pps.blocks, pps.blocksLength, pps.delimiter, pps.delimiters);

    this.updateValueState(pps.result);
  }

  onKeyDown($event) {
    const pps = this.props;
    const charCode = $event.which || $event.keyCode;

    // hit backspace when last character is delimiter
    if (charCode === 8 && Util.isDelimiter(pps.result.slice(-1), pps.delimiter, pps.delimiters)) {
      pps.backspace = true;
    } else {
      pps.backspace = false;
    }
  }

  updateCreditCardPropsByValue(value) {
    const pps = this.props;

    // At least one of the first 4 characters has changed
    if ( Util.headStr(pps.result, 4) === Util.headStr(value, 4)) {
      return;
    }

    const creditCardInfo = CreditCardDetector
      .getInfo(value, pps.creditCardStrictMode);

    pps.blocks = creditCardInfo.blocks;
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Util.getMaxLength(pps.blocks);

    // credit card type changed
    if (pps.creditCardType !== creditCardInfo.type) {
      pps.creditCardType = creditCardInfo.type;
      pps.onCreditCardTypeChanged.call(this, pps.creditCardType);
    }
  }

  updateValueState(result) {
    this.ngModel = result;
  }
}

AngularCleavejsController.$inject = [
  'angularCleavejsService'
];
