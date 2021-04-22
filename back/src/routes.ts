import {getCurrenciesWithLastRates} from "./controller/GetCurrenciesWithLastRates";
import {donateAction} from "./controller/DonateAction";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/api/v1/service/currency/get-with-last-rates",
        method: "get",
        action: getCurrenciesWithLastRates
    },
    {
        path: "/donate",
        method: "post",
        action: donateAction
    }
];
