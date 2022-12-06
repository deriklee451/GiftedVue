import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import { giftApi } from "./AxiosService.js"

class GiftsService {

    async getGifts() {
        const res = await giftApi.get()
        logger.log('got gifts', res.data)
        AppState.gifts = res.data.map(g => new Gift(g))
        // logger.log(AppState.gifts)
    }

    async openGift(id) {
        let gift = AppState.gifts.find(g => g.id == id)
        console.log("found a gift with ID", gift)
        gift.opened = true

        let index = AppState.gifts.indexOf(gift)

        const res = await giftApi.put(`/${id}`, gift)

        let openedGift = new Gift(res.data)
        AppState.gifts.splice(index, 1, openedGift)
    }

    async createGift(giftData) {
        const res = await giftApi.post('', giftData)
        AppState.gifts = [new Gift(res.data), ...AppState.gifts]
    }


}


export const giftsService = new GiftsService()