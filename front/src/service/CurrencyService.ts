import Currency from "@common/dto/Currency";
import httpClient from "@/service/HttpClient";
import HttpResponse from "@/service/HttpResponse";

export default {

  getWithLastRates: (): Promise<Currency[]> => {
    return httpClient.get('/api/v1/service/currency/get-with-last-rates')
      .then((response: HttpResponse) => {
        return response.data;
      });
  }

}
