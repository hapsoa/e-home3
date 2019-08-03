import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import _ from 'lodash';

export interface AlertOption {
  title: string;
  message: string;
  positive: string;
  negative?: string;
  positiveAction?: () => any;
  negativeAction?: () => any;
}

@Component({})
export default class Alert extends Vue {
  public name: string = 'alert-window';
  public use: boolean = false;
  public message: string = '안녕';
  public useNegative: boolean = false;
  public option: AlertOption = {
    title: 'Header',
    message: '테스트',
    positive: '확인',
    negative: '취소',
    positiveAction: () => {
      // Empty
    },
    negativeAction: () => {
      // Empty
    }

  };

  // private $_ = _;

  public resolve() { /** Empty */ }
  public reject() { /** Empty */ }

  public onResolve() {
    this.use = false;
    if (this.option.positiveAction !== undefined) {
      this.option.positiveAction();
    }
    this.resolve();
  }

  public onReject() {
    this.use = false;
    if (this.option.negativeAction !== undefined) {
      this.option.negativeAction();
    }
    this.reject();
  }


  public on(option: AlertOption): Promise<void> {
    this.option.positive = option.positive ? option.positive : '';
    this.option.negative = option.negative ? option.negative : '';
    this.option.positiveAction = option.positiveAction ? option.positiveAction : () => { /** empty */ };
    this.option.negativeAction = option.negativeAction ? option.negativeAction : () => { /** empty */ };
    this.option.title = option.title;
    this.option.message = option.message;
    this.use = true;
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  public off() {
    this.use = false;
    this.message = '';
  }

  private negativeExist(): boolean {
    return !_.isEmpty(this.option.negative);
  }
  private positiveExist(): boolean {
    return !_.isEmpty(this.option.positive);
  }
}
