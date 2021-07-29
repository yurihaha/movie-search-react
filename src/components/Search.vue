<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply"
    />
    <div class="selects">
      <!-- $data.type (같음) $data["type"] -->
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select"
      >
        <option v-if="filter.name === 'year'" value="">년도</option>
        <option v-for="item in filter.items" :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button class="btn btn-primary" @click="apply">검색하기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      type: "movie",
      number: 10,
      year: "",
      filters: [
        {
          name: "type",
          items: ["movie", "series", "episode"]
        },
        {
          name: "number",
          items: [10, 20, 30]
        },
        {
          name: "year",
          items: (() => {
            const years = [];
            const thisYear = new Date().getFullYear(); //2021
            for (let i = thisYear; i >= 1900; i -= 1) {
              years.push(i);
            }
            return years;
          })() //즉시실행함수를 쓸수도 있음
        }
      ]
    };
  },
  methods: {
    // input 요소에서 enter 키를 누르면 가능하게 해야함 @keyup.enter
    async apply() {
      const OMDB_API_KEY = "2f874730";
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type${this.type}&y=${this.year}&page=1`
      );
      //async 요청하는 내용은 비동기로 동작해야함 실제 주소로 처리되고 처리될때까지 기다리기 위해
      //await 반환된 결과다 응답이라는 결과를 알려주기 위해 res 는 명시적으로 정한 변수
      console.log(res);
    }
    // apply() {
    //   this.$store.dispatch("movie/searchMovies", {
    //     title: this.title,
    //     type: this.type,
    //     number: this.number,
    //     year: this.year
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    flex-shrink: 0; // 줄어들지않게 방지하는것
    font-weight: 700;
  }

  @include media-breakpoint-down(lg) {
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
