<template>
  <v-app>
    <v-container>
      <v-container>
        <v-text-field
          v-model="search"
          label="Search"
          placeholder="Ex: Iron Man"
          solo
        >
        </v-text-field>
        <v-row>
          <v-col
            cols="3"
            v-for="character in filteredCharacters"
            :key="character.id"
          >
            <v-card class="character-card" @click="showCharacter(character.id)">
              <v-container>
                <v-row class="mx-0 d-flex justify-center">
                  <img
                    :src="character.images.md"
                    :alt="character.name"
                    width="70%"
                  />
                </v-row>
                <h2 class="text-center">{{ character.name }}</h2>
                <p class="text-center">
                  {{ character.biography.firstAppearance }}
                </p>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-dialog v-model="dialog" width="500">
      <v-card v-if="selectedCharacter">
        <v-row class="d-flex align-center">
          <v-col cols="4" class="d-flex justify-center">
            <img
              :src="selectedCharacter.images.sm"
              :alt="selectedCharacter.name"
              width="70%"
            />
          </v-col>
          <v-col cols="8">
            <h1>{{ selectedCharacter.name }}</h1>
            <div v-if="selectedCharacter.biography.fullName != ''">
              <b>Full Name: </b>
              <v-chip> {{ selectedCharacter.biography.fullName }}</v-chip>
            </div>
            <v-divider class="my-4"> </v-divider>
            <b>Publisher: </b
            ><v-chip>
              {{ selectedCharacter.biography.publisher }}
            </v-chip>
            <b>Alignment: </b
            ><v-chip class="ml-2">
              {{ selectedCharacter.biography.alignment }}
            </v-chip>
            <div class="chart">
              <highCharts :options="chartOptions"></highCharts>
            </div>
          </v-col>
        </v-row>

        <v-container>
          {{ selectedCharacter }}
        </v-container>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from "axios";
import { Chart } from "highcharts-vue";

export default {
  name: "MarvelDex",

  components: {
    // eslint-disable-next-line
    Highcharts: Chart
  },

  data() {
    return {
      characters: [],
      url: "",
      link: "",
      search: "",
      finalSearch: undefined,
      dialog: false,
      selectedCharacter: null,
      title: "",
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: "Spline",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      chartOptions: {
        chart: {
          polar: true,
        },
        title: {
          text: "Sin chart",
        },
        series: [
          {
            data: [10, 0, 8, 2, 6, 4, 5, 5],
            color: "#6fcd98",
          },
        ],
      },
    };
  },

  mounted() {
    this.url =
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json";

    axios.get(this.url).then((response) => {
      this.characters = response.data;
    });
  },

  methods: {
    showCharacter(id) {
      this.link =
        "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/" +
        id +
        ".json";
      axios.get(this.link).then((response) => {
        this.selectedCharacter = response.data;
        this.dialog = true;
      });
      return id;
    },
  },
  computed: {
    filteredCharacters() {
      return this.characters.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
#app {
  background: linear-gradient(
      to bottom right,
      rgba(10, 10, 10, 1),
      rgba(12, 39, 63, 1)
    )
    no-repeat center center fixed !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
  background-position: center;
  min-height: 100vh;
}

.character-card {
  height: 100%;
}
</style>
