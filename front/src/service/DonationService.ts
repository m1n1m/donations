import DonationRequest from "@common/dto/DonationRequest";
import httpClient from "@/service/HttpClient";
import HttpResponse from "@/service/HttpResponse";

export default {

  donate: (donation: DonationRequest): Promise<HttpResponse> => {
    return httpClient.post('/donate', donation)
  }

}
