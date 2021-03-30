<template>
  <div class="bg-light py-5">
    <header
      class="h1 pb-3 text-dark text-center text-uppercase font-weight-bold"
    >
      Our Gallery
    </header>
    <b-row no-gutters class="flex-center flex-nowrap mb-4">
      <b-button
        v-for="(category, i) in categories"
        :key="i"
        size="lg"
        variant="white"
        :class="isSelected(category)"
        class="custom-button mx-1 mx-md-2 px-2 py-2 px-md-3"
        @click="setCategory(category)"
      >
        {{ category }}
      </b-button>
    </b-row>
    <b-container>
      <transition-group
        name="gallery-animation"
        class="row justify-content-center gallery-animation justify-content-lg-center"
      >
        <article
          no-gutters
          class="mx-0 my-2 mx-md-2 gallery-item"
          v-for="(image, i) in images"
          :key="'image-' + i"
          v-if="selectedCategory == image.category || selectedCategory == 'all'"
        >
          <GalleryItem :image="image" />
        </article>
      </transition-group>
    </b-container>
  </div>
</template>

<script>
import GalleryItem from "./GalleryItem.vue";
export default {
  name: "gallery-component",
  components: {
    GalleryItem,
  },
  data() {
    return {
      images: [
        {
          location: require("../assets/img/portfolio/im.jpeg"),
          category: "schools",
        },
        {
          location: require("../assets/img/portfolio/image1.jpeg"),
          category: "schools",
        },
        {
          location: require("../assets/img/portfolio/image2.jpeg"),
          category: "competitions",
        },
        {
          location: require("../assets/img/portfolio/image3.jpeg"),
          category: "general",
        },
        {
          location: require("../assets/img/portfolio/image4.jpeg"),
          category: "schools",
        },
        {
          location: require("../assets/img/portfolio/image5.jpeg"),
          category: "competitions",
        },
        {
          location: require("../assets/img/portfolio/image7.jpeg"),
          category: "competitions",
        },
        {
          location: require("../assets/img/portfolio/image8.jpeg"),
          category: "general",
        },
        {
          location: require("../assets/img/portfolio/image9.jpeg"),
          category: "competitions",
        },
        {
          location: require("../assets/img/portfolio/image10.jpeg"),
          category: "schools",
        },
      ],
      selectedCategory: "all",
    };
  },
  computed: {
    categories() {
      return this.images
        .reduce(
          (unique, img) => {
            return unique.includes(img.category)
              ? unique
              : [...unique, String(img.category).toLowerCase()];
          },
          ["all"]
        )
        .sort();
    },
    shownImages() {
      if (this.selectedCategory == "all") {
        return this.images;
      } else {
        return this.images.filter(
          (img) =>
            String(img.category).toLowerCase() === String(this.selectedCategory)
        );
      }
    },
  },
  methods: {
    isSelected(category) {
      return category == this.selectedCategory
        ? "bg-primary text-white"
        : " bg-white";
    },
    setCategory(category) {
      this.$set(this, "selectedCategory", category);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-button {
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  line-height: 20px;
  border-radius: 4px;
  text-transform: uppercase;
  background: #fff;
  margin-bottom: 5px;
  transition: all 0.3s ease-in-out;
}

.gallery-animation-enter {
  transform: translatey(50px);
  opacity: 0;
}

.gallery-animation-leave-to {
  transform: translatey(30px);
  opacity: 0;
}

.gallery-animation-leave-active {
  position: absolute;
  z-index: -1;
}

.gallery-item {
  transition: all 0.35s;
}
</style>