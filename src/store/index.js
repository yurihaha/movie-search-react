import { createStore } from "vuex";
import about from "./about";
import movie from "./movie";

export default createStore({
  // 만약 movie가 hello: movie 이면 -> movies.js methods부분 dispatch('hello/searchMovies')이어야함
  modules: {
    movie, //movie(데이터): movie(속성) 이면 생략가능
    about
  }
});
