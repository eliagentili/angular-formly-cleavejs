import Cleave from 'cleave.js';
import NumeralFormatter from 'cleave.js/src/shortcuts/NumeralFormatter';
import DateFormatter from 'cleave.js/src/shortcuts/DateFormatter';
import PhoneFormatter from 'cleave.js/src/shortcuts/PhoneFormatter';
import Util from 'cleave.js/src/utils/Util';

export class AngularCleavejsService {
  initPhoneFormatter(pps) {
    if (!pps.phone) {
      return;
    }

    // Cleave.AsYouTypeFormatter should be provided by
    // external google closure lib
    try {
      pps.phoneFormatter = new PhoneFormatter(
        new Cleave.AsYouTypeFormatter(pps.phoneRegionCode),
        pps.delimiter
      );
    } catch (ex) {
      throw new Error('Please include phone-type-formatter.' + pps.phoneRegionCode + '.js lib');
    }
  }

  initDateFormatter(pps) {
    if (!pps.date) {
      return;
    }

    pps.dateFormatter = new DateFormatter(pps.datePattern);
    pps.blocks = pps.dateFormatter.getBlocks();
    pps.blocksLength = pps.blocks.length;
    pps.maxLength = Util.getMaxLength(pps.blocks);
  }

  initNumeralFormatter(pps) {
    if (!pps.numeral) {
      return;
    }

    pps.numeralFormatter = new NumeralFormatter(
      pps.numeralDecimalMark,
      pps.numeralDecimalScale,
      pps.numeralThousandsGroupStyle,
      pps.delimiter
    );
  }
}

AngularCleavejsService.$inject = [];
