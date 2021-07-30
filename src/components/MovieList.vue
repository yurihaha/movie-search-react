<template>
  <div class="container">
    <div :class="{ 'no-result': !movies.length }" class="inner">
      <Loader v-if="loading" />
      <div v-if="message" class="message">
        {{ message }}
      </div>
      <div v-else class="movies">
        <MovieItem v-for="item in movies" :key="item.imdbID" :movie="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "~/components/Loader";
import MovieItem from "~/components/MovieItem";

export default {
  components: {
    Loader,
    MovieItem
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies;
    }
    // ...mapState('movie', [
    //   'movies',
    //   'loading',
    //   'message'
    // ])
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
