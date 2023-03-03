<template>
  <header class="mb-8 d-flex align-center flex-column header-container">
    <v-img class="header-img" src="../../public/heroes-panoramic.png"></v-img>
    <v-container class="d-flex align-center flex-column title-container">
      <h1 class="d-flex align-center head-title">HERO DEX</h1>
      <h2 class="d-flex align-center head-subtitle">
        The 'Pokedex' of Heroes!
      </h2>
    </v-container>
    <v-container class="d-flex flex-row search-container">
      <v-text-field
        v-model="search"
        label="Search"
        placeholder="Ex: Iron Man"
        single-line
        outlined
        dark
        class="search-field"
        @input="handleInput"
        sm="5"
      >
      </v-text-field>
      <v-col sm="5" class="pt-0">
        <v-select
          class="publisher"
          v-model="e7"
          :items="items"
          label="Select a Publisher"
          multiple
          chips
          dark
          persistent-hint
        ></v-select>
      </v-col>
    </v-container>
  </header>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "HeroHeader",

  data() {
    return {
      search: "",
      e7: [],
      items: [
        "Dark Horse Comics",
        "DC Comics",
        "Marvel Comics",
        "Star Trek",
        "Random",
        "Star Wars",
        "NBC",
        "IDW Publishing",
      ],
    };
  },

  methods: {
    handleInput() {
      eventBus.$emit("search", this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-img {
  width: 100vw !important;
  height: 100% !important;
}

.head-title {
  font-family: BatKnightRegular;
  font-size: 8rem;
  font-weight: 300;
  height: 55%;
  padding: 0 0.5% 0.5% 0.5%;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 5px 5px 0 0;
}

.head-subtitle {
  font-family: BatKnightRegular;
  font-size: 4rem;
  font-weight: 300;
  background: rgba(255, 255, 255, 0.25);
  height: 30%;
  border-radius: 5px;
}

.title-container {
  position: absolute;
  color: #fff;
}

.header-container {
  z-index: 10;
  height: 45vh;
}

.search-container {
  width: 50%;
}

.search-field {
  color: #fff !important;
  width: 50% !important;
  display: flex;
  align-items: center;
}
.publisher {
  color: #fff !important;
}
</style>
