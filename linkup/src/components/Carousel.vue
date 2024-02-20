<template>
  <div class="carousel">
    <div ref="carousel">
      <slot :currentSlide="currentSlide"></slot>
    </div>

    <template v-if="getSlideCount > 1">
      <!-- Navigation -->
      <div class="navigate">
        <div class="toggle-page left">
          <i @click="prevSlide" class="fas fa-chevron-left"></i>
        </div>

        <div class="toggle-page right">
          <i @click="nextSlide" class="fas fa-chevron-right"></i>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <span
          @click="goToSlide(index)"
          v-for="(slide, index) in getSlideCount"
          :key="index"
          :class="{ active: index + 1 === currentSlide }"
        >
        </span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 1,
      getSlideCount: null
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlide === this.getSlideCount) {
        this.currentSlide = 1
        return
      }

      this.currentSlide++
    },
    prevSlide() {
      if (this.currentSlide === 1) {
        this.currentSlide = this.getSlideCount
        return
      }

      this.currentSlide--
    },
    goToSlide(index) {
      this.currentSlide = index + 1
    }
  },
  mounted() {
    this.getSlideCount = this.$refs.carousel.children.length
  }
}
</script>

<style lang="scss" scoped>
.navigate {
  padding: 0 16px;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  .toggle-page {
    display: flex;
    flex: 1;
  }

  .right {
    justify-content: flex-end;
  }

  i {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: #8257e5;
    color: #fff;
  }
}

.pagination {
  position: absolute;
  bottom: 24px;
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  span {
    cursor: pointer;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active {
    background-color: #8257e5;
  }
}
</style>
