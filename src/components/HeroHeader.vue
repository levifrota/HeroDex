<template>
  <header class="d-flex align-center flex-column search-container">
    <v-container class="mb-5 d-flex align-center flex-column img-container">
      <h1 class="head-title">HERO DEX</h1>
      <h2 class="head-subtitle">The 'Pokedex' of Heroes!</h2>
    </v-container>
    <v-container class="d-flex flex-row">
      <v-text-field
        v-model="search"
        label="Search"
        placeholder="Ex: Iron Man"
        solo
        class="search-field"
        @input="handleInput"
        sm="5"
      >
      </v-text-field>
      <v-col sm="5">
        <v-select
          class="publisher"
          v-model="e7"
          :items="items"
          label="Select a Publisher"
          multiple
          chips
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

<style scoped>
.head-title {
  font-family: BatKnightRegular;
  font-size: 8rem;
  font-weight: 300;
}

.head-subtitle {
  font-family: BatKnightRegular;
  font-size: 4rem;
  font-weight: 300;
}

.publisher {
  background: #fff;
}

.search-container {
  z-index: 10;
  height: 30vh;
}

.search-field {
  width: 50% !important;
}
</style>
