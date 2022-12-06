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
        gift.opened = true

        const res = await giftApi.put(gift.id, id)

        let index = AppState.gifts.findIndex(g => g.id == id)
        AppState.gifts.splice(index, 2, new Gift(res.data))


    }


}


export const giftsService = new GiftsService()