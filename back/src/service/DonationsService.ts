import donationModel from "../models/DonationModel";
import DonationRequest from "../common/dto/DonationRequest";


export default {

    commitDonation: async (donation: DonationRequest): Promise<void> => {
        try {
            await donationModel.insertMany([donation])
            return new Promise(resolve =>
                resolve()
            )

        } catch (e) {
            return new Promise((resolve, reject) =>
                reject(e)
            )
        }
    }
}
