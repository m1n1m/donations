import {Context} from "koa";
import CurrencyService from "../service/CurrencyService";


/**
 * Loads all currencies with last rates from the database.
 */
export async function getCurrenciesWithLastRates(context: Context) {

    // return loaded currencies
    context.body = await CurrencyService.getWithLastRates();
}
