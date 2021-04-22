import { observable, action } from "mobx";
import Currency from "@common/dto/Currency";
import CurrencyService from "@/service/CurrencyService";

export default class CurrencyStore {

  private readonly defaultCurrencyCode = 'USD';

  @observable currencies: Currency[] = [];
  @observable currentCurrency: Currency | undefined | null = null;

  constructor() {
    this.loadLastRated()
  }

  @action.bound
  async loadLastRated() {
    this.currencies = await CurrencyService.getWithLastRates() || []
    this.setCurrencyByCode(this.defaultCurrencyCode)
  }

  @action.bound
  setCurrency (currency: Currency) {
    this.currentCurrency = currency
  }

  @action.bound
  setCurrencyByCode (currencyCode: string): Currency | undefined {
    const currency = this.currencies.find(currency => currency.code === currencyCode)
    if (currency) {
      this.setCurrency(currency)
    }
    return currency
  }

  convertCurrency(value: number, currencyFrom?: Currency | undefined | null, currencyTo?: Currency | undefined | null): number {
    if(!currencyTo || !currencyFrom) {
      return value
    }
    const rate = currencyTo.rates!.find(rate => rate.code === currencyFrom.code)
    if (rate) {
      return rate.rate * value;
    }
    return value;
  }

  formatCurrency(value: number, showCurrencySymbol = false): string {
    const formatter = new Intl.NumberFormat('en-US');
    let symbol = '';
    if (showCurrencySymbol) {
      symbol = this.currentCurrency?.symbol || '$'
    }
    return symbol + formatter.format(value);
  }

}

export const currencyStore = new CurrencyStore()
