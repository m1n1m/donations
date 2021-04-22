import CurrencyRate from "./CurrencyRate";

export default class Currency {
  constructor(
    public name: string,
    public code: string,
    public symbol: string,
    public rates?: CurrencyRate[] | null | undefined
  ) {
  }
}
