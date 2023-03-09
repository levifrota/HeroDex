<template>
  <v-card flat height="200px" tile class="mb-10">
    <v-toolbar
      prominent
      width="100%"
      height="200px"
      class="d-flex justify-center align-center header-container"
    >
      <h1>Hero Dex</h1>
    </v-toolbar>

    <v-container class="d-flex flex-row search-container">
      <v-btn icon @click="toggle_dark_mode">
        <v-icon v-if="$vuetify.theme.dark === true"
          >mdi-white-balance-sunny</v-icon
        >
        <v-icon v-if="$vuetify.theme.dark === false">mdi-weather-night</v-icon>
      </v-btn>
      <v-text-field
        v-model="search"
        label="Search"
        placeholder="Ex: Iron Man"
        single-line
        outlined
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
          persistent-hint
        ></v-select>
      </v-col>
    </v-container>
  </v-card>
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
    toggle_dark_mode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
      console.log(this.$vuetify.theme.dark);
    },
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: RaiderCrusaderExpanded;
  src: url(../assets/raider-crusader-font/RaiderCrusaderExpanded-jzyv.otf)
    format("truetype");
}

h1 {
  font-family: RaiderCrusaderExpanded;
  font-size: 5vw;
}

.v-toolbar__content {
  width: 100%;
}

.search-container {
  width: 50%;
}

.search-field {
  width: 50% !important;
  display: flex;
  align-items: center;
}
</style>
