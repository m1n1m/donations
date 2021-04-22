import CurrencyDto from "../common/dto/Currency";
import currencyModel from "../models/CurrencyModel";


export default {

    initDemoData: async () => {
        let allCurrencies = await currencyModel.find()
        if (allCurrencies.length > 0) {
            return;
        }

        console.log('Заполняем демо данные валют')

        const currencies: CurrencyDto[] = [
            {
                name: "US Dollar", code: "USD", symbol: "$", rates: [
                    {code: 'USD', rate: 1},
                    {code: 'EUR', rate: 1.20},
                    {code: 'GBP', rate: 1.39},
                    {code: 'RUB', rate: 0.013},
                ]
            },
            {
                name: "Euro", code: "EUR", symbol: "€", rates: [
                    {code: 'USD', rate: 0.83},
                    {code: 'EUR', rate: 1},
                    {code: 'GBP', rate: 1.16},
                    {code: 'RUB', rate: 0.011},
                ]
            },
            {
                name: "British Pound", code: "GBP", symbol: "£", rates: [
                    {code: 'USD', rate: 0.72},
                    {code: 'EUR', rate: 0.86},
                    {code: 'GBP', rate: 1},
                    {code: 'RUB', rate: 0.0094},
                ]
            },
            {
                name: "Russian Ruble", code: "RUB", symbol: "₽", rates: [
                    {code: 'EUR', rate: 92.21},
                    {code: 'GBP', rate: 106.79},
                    {code: 'USD', rate: 76.66},
                    {code: 'RUB', rate: 1},
                ]
            }
        ];

        await currencyModel.insertMany(currencies)
    },

    getWithLastRates: async (): Promise<CurrencyDto[]> => {
        const currencies = await currencyModel.find()
        return new Promise(resolve =>
            resolve(currencies.map(cur => cur.mapToRest()))
        )
    }

}
