<template>
  <section class="row m-3">
    <i class="mdi mdi-creation fs-1 selectable text-center"></i>

    <form @submit="createGift">
      <div class="form-group">
        <label for="url">url</label>
        <input type="url" class="form-control" id="url" name="url" aria-describedby="gif-url" v-model="editable.url"
          placeholder="gif-url">
      </div>
      <div class="form-group">
        <label for="tag">Gift Note</label>
        <input type="text" class="form-control" id="tag" v-model="editable.tag" name="tag" placeholder="gift-tag">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div v-for="g in gifts" class="col-md-3 rounded elevation-2">
      <div @click="openGift(g.id)">
        <img v-if="(g.opened == true)" class="img-fluid" :src="g.img" alt="">
        <img v-else class="img-fluid"
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1680&q=80"
          alt="">
        <div>
          <h3>{{ g.tag }}</h3>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
import { onMounted, popScopeId, reactive } from 'vue';
import { logger } from '../utils/Logger.js';
import { giftsService } from '../services/GiftsService.js'
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    onMounted(() => {
      getGifts()
    })

    async function getGifts() {
      try {
        await giftsService.getGifts()

      } catch (error) {
        logger.error(error)
      }
    }

    const editable = reactive({
      tag: '',
      url: ''


    })
    return {
      gifts: computed(() => AppState.gifts),
      editable,

      async openGift(id) {
        try {
          await giftsService.openGift(id)
        } catch (error) {
          logger.log('[GETTING GIFT IN CONT]', error)
        }

      },

      async createGift() {
        try {
          window.event.preventDefault()
          // const form = window.event.target
          // let giftData = getFormData(form)
          Pop.toast('Created', 'success')
          // form.reset()
          logger.log('editable', editable)
          await giftsService.createGift(editable)

        } catch (error) {
          logger.log(error)
        }
      }


    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
