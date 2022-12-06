<template>
  <section class="row m-3">
    <div v-for="g in gifts" class="col-md-3 rounded elevation-2">
      <div>
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
import { onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import { giftsService } from '../services/GiftsService.js'
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';

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



    return {
      gifts: computed(() => AppState.gifts)


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
