<template>
  <nav class="header">
    <h1>Linkup</h1>
  </nav>

  <div class="container">
    <aside class="profile card">
      <img :src="profile.avatar" />
      <span class="name">{{ profile.name }}</span>
      <span class="email">{{ profile.email }}</span>
    </aside>

    <main>
      <div class="post-area card">
        <textarea
          name="post"
          id="post"
          cols="30"
          rows="10"
          placeholder="Escreva algo aqui..."
        ></textarea>

        <div class="upload" v-if="medias.length > 0">
          <div v-for="(media, index) in medias" :key="media" class="media">
            <span @click="handleRemoveMedia(index)" class="close">x</span>
            <img :src="media" />
          </div>
        </div>

        <div>
          <label for="medias">
            <font-awesome-icon icon="fa-regular fa-image" />
          </label>
          <input
            type="file"
            name="medias"
            id="medias"
            @change="handleFileUpload"
            ref="file"
            multiple
          />
          <button>Enviar</button>
        </div>
      </div>

      <div class="feed card">
        <template v-if="posts.length > 0">
          <template v-for="post in posts" :key="post.id">
            <div class="post">
              <img class="avatar" :src="post.author.avatar" />
              <div class="content">
                <p class="name">{{ post.author.name }}</p>
                <p class="text">{{ post.text }}</p>

                <template v-if="post.medias">
                  <Carousel class="carousel" v-slot="{ currentSlide }">
                    <Slide v-for="(media, index) in post.medias" :key="index">
                      <div v-show="currentSlide === index + 1" class="slide-info">
                        <img class="media" :src="media" />
                      </div>
                    </Slide>
                  </Carousel>
                </template>
              </div>
            </div>
          </template>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import Carousel from '../components/Carousel.vue'
import Slide from '../components/Slide.vue'

export default {
  name: 'home-page',
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      medias: [],
      profile: {
        name: 'José Maria',
        email: 'jose.maria@outlook.com',
        avatar:
          'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
      },
      posts: []
    }
  },
  methods: {
    handleFileUpload() {
      const files = this.$refs.file.files

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.medias.push(e.target.result)
        }

        reader.readAsDataURL(files.item(i))
      }
    },
    handleRemoveMedia(index) {
      this.medias.splice(index, 1)
    },
    fetchPosts() {
      fetch('https://skyler.free.beeceptor.com/posts')
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          this.posts = json
        })
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>

<style lang="scss">
.header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: #8257e5;
  font-size: 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  color: #fff;

  main {
    flex: 1;
    margin-left: 1.5rem;
  }
}

.card {
  background-color: #202024;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.post-area {
  textarea {
    width: 100%;
    height: 100px;
    border: none;
    resize: none;
    outline: none;
    background-color: transparent;
    color: #fff;
    font-size: 1rem;
  }

  input {
    display: none;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;

    label {
      margin-right: 1rem;
      font-size: 1.25rem;
      cursor: pointer;
    }

    button {
      background-color: #8257e5;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      color: #fff;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:hover {
      background-color: #774dd6;
    }
  }

  .upload {
    max-height: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    .media {
      position: relative;
      width: 100px;
      height: 100px;

      .close {
        position: absolute;
        top: 0;
        right: 0;

        width: 20px;
        height: 20px;
        padding: 0.5rem;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #8257e5;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #774dd6;
        }
      }

      img {
        width: 90%;
        height: 90%;
        border-radius: 8px;
        object-fit: cover;
      }
    }
  }
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 200px;

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .name {
    font-weight: 500;
    font-size: 1.2rem;
  }

  .email {
    font-size: 0.8rem;
  }
}

.feed {
  margin-top: 1rem;
}

.content {
  width: 100%;
}

.post {
  display: flex;
  align-items: flex-start;
  padding: 2rem 0;

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
  }

  .name {
    font-size: 1rem;
    font-weight: 500;
  }

  .text {
    margin-top: 1rem;
  }

  .carousel {
    margin-top: 1rem;
    position: relative;
    width: 100%;
    height: 400px;

    .slide-info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      max-height: 100%;
      height: 100%;

      img {
        border-radius: 8px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.post:not(:last-child) {
  border-bottom: 1px solid #505050;
}
</style>
