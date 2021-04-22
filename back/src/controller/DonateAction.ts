import {Context} from "koa";
import DonationRequest from "../common/dto/DonationRequest";
import DonationsService from "../service/DonationsService";

/**
 * Saves given post.
 */
export async function donateAction(context: Context) {
    const donation: DonationRequest = context.request.body;
    console.log('processing donation', donation)
    await DonationsService.commitDonation(donation)
    context.status = 200;
}
