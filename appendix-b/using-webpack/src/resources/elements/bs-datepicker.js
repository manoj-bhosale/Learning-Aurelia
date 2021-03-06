import {bindable, bindingMode} from 'aurelia-framework';
import 'bootstrap';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.css';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.fr.min';

export class BsDatepickerCustomElement {

  static defaultOptions = { autoclose: true, zIndexOffset: 1050 };

  @bindable({ defaultBindingMode: bindingMode.twoWay }) date;
  @bindable options;

  isAttached = false;
  isUpdating = false;

  createDatepicker() {
    const options = Object.assign({}, 
      BsDatepickerCustomElement.defaultOptions, 
      this.options);
    $(this.input).datepicker(options)
      .on('clearDate', this.updateDate)
      .on('changeDate', this. updateDate);
    if (this.date) {
      this.updateDatepickerDate();
    }
  }

  destroyDatepicker() {
    $(this.input)
      .datepicker()
      .off('clearDate', this.updateDate)
      .off('changeDate', this.updateDate)
      .datepicker('destroy');
  }

  updateDate = function() {
    if (!this.isUpdating) {
      this.date = $(this.input).datepicker('getUTCDate');
    }
  }.bind(this);

  updateDatepickerDate() {
    $(this.input).datepicker('setUTCDate', this.date);
  }

  optionsChanged() {
    if (this.isAttached) {
      this.destroyDatepicker();
      this.createDatepicker();
    }
  }

  dateChanged() {
    if (this.isAttached) {
      this.isUpdating = true;
      this.updateDatepickerDate();
      this.isUpdating = false;
    }
  }

  attached() {
    this.createDatepicker();
    this.isAttached = true;
  }

  detached() {
    this.isAttached = false;
    this.destroyDatepicker();
  }
}
