<template>
  <v-app>
    <HeroHeader />

    <v-container>
      <v-container>
        <v-row class="character-cols">
          <v-col
            cols="3"
            v-for="character in filteredCharacters"
            :key="character.id"
          >
            <v-card class="character-card" @click="showCharacter(character.id)">
              <v-container class="char-container">
                <v-row class="d-flex justify-center">
                  <img
                    :src="character.images.md"
                    :alt="character.name"
                    width="50%"
                  />
                </v-row>
                <h2 class="text-center mt-2">{{ character.name }}</h2>
                <p class="text-center">
                  {{ character.biography.firstAppearance }}
                </p>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-dialog v-model="dialog" width="800">
      <v-card v-if="selectedCharacter">
        <v-container class="px-4">
          <v-row class="d-flex align-center">
            <v-col cols="4" class="d-flex justify-center">
              <img
                :src="selectedCharacter.images.sm"
                :alt="selectedCharacter.name"
                width="70%"
              />
            </v-col>
            <v-col cols="8" width="100%">
              <h1>{{ selectedCharacter.name }}</h1>

              <div
                v-if="
                  selectedCharacter.biography.fullName != '' &&
                  selectedCharacter.biography.fullName != selectedCharacter.name
                "
              >
                <b>Full Name: </b>
                <v-chip> {{ selectedCharacter.biography.fullName }}</v-chip>
              </div>

              <v-divider class="my-4"> </v-divider>

              <v-spacer />
              <div v-if="selectedCharacter.biography.publisher != ''">
                <b>Publisher: </b
                ><v-chip>
                  {{ selectedCharacter.biography.publisher }}
                </v-chip>
              </div>

              <v-spacer />

              <div class="mt-2">
                <b>Alignment: </b
                ><v-chip
                  class="ml-2"
                  v-if="selectedCharacter.biography.alignment != '-'"
                >
                  {{
                    selectedCharacter.biography.alignment[0].toUpperCase() +
                    selectedCharacter.biography.alignment.substring(1)
                  }}
                </v-chip>
                <v-chip class="ml-2" v-else>Neutral</v-chip>
              </div>
            </v-col>
          </v-row>

          <h2>Powerstats</h2>

          <v-chip class="ml-2"
            >Intelligence:
            {{ selectedCharacter.powerstats.intelligence }}</v-chip
          >
          <v-chip class="ml-2"
            >Strength: {{ selectedCharacter.powerstats.strength }}</v-chip
          >
          <v-chip class="ml-2"
            >Speed: {{ selectedCharacter.powerstats.speed }}</v-chip
          >
          <v-chip class="ml-2"
            >Durability: {{ selectedCharacter.powerstats.durability }}</v-chip
          >
          <v-chip class="ml-2"
            >Combat: {{ selectedCharacter.powerstats.combat }}</v-chip
          >
          <v-chip class="ml-2"
            >Power: {{ selectedCharacter.powerstats.power }}</v-chip
          >
          <div class="container">
            <highcharts :options="chartOptions" ref="chart"></highcharts>
          </div>
        </v-container>
      </v-card>
    </v-dialog>

    <v-footer class="d-flex justify-center">
      Made with&nbsp;<font-awesome-icon
        icon="fa-solid fa-heart"
        color="red"
      />&nbsp;by&nbsp;
      <a
        href="https://www.linkedin.com/in/levifrota27/"
        target="@blank"
        class="footer-link"
      >
        Gideao Frota</a
      >
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
import HeroHeader from "./components/HeroHeader.vue";
// eslint-disable-next-line no-unused-vars
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import { eventBus } from "./main";

export default {
  name: "HeroDex",

  components: {
    // eslint-disable-next-line
    HighchartsVue,
    HeroHeader,
  },

  data() {
    return {
      characters: [],
      searchFinal: "",
      dialog: false,
      selectedCharacter: null,
      title: "",
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

  computed: {
    filteredCharacters() {
      return this.characters.filter((character) => {
        return character.name
          .toLowerCase()
          .includes(this.searchFinal.toLowerCase().trim());
      });
    },
    chartOptions() {
      return {
        chart: {
          renderTo: "container",
          polar: true,
          type: "area",
          animation: true,
        },
        title: {
          text: `${this.selectedCharacter.name} Powerstats`,
        },
        accessibility: {
          enabled: false,
        },
        plotOptions: {
          series: {
            animation: {
              duration: 1500,
            },
          },
        },
        pane: {
          startAngle: 0,
          endAngle: 360,
        },
        xAxis: {
          categories: [
            "Intelligence",
            "Strength",
            "Speed",
            "Durability",
            "Power",
            "Combat",
          ],
          tickmarkPlacement: "on",
          lineWidth: 0,
        },
        yAxis: {
          gridLineInterpolation: "polygon",
          labels: {
            overflow: "justify",
          },
          lineWidth: 0,
          min: 0,
          max: 100,
        },
        tooltip: {
          shared: true,
          pointFormat: '<span style="color:#000"><b>{point.y:,.0f}</b><br/>',
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            data: [],
          },
        ],
      };
    },
  },
  methods: {
    showCharacter(id) {
      this.selectedCharacter = this.characters.find(
        (character) => character.id === id
      );
      this.chartOptions.series[0].data = [
        this.selectedCharacter.powerstats.intelligence,
        this.selectedCharacter.powerstats.strength,
        this.selectedCharacter.powerstats.speed,
        this.selectedCharacter.powerstats.durability,
        this.selectedCharacter.powerstats.combat,
        this.selectedCharacter.powerstats.power,
      ];

      this.dialog = true;
    },

    getData() {
      axios
        .get("https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json")
        .then((response) => {
          this.characters = response.data;
        });
    },
  },

  created() {
    this.getData();
    eventBus.$on("search", (search) => {
      this.searchFinal = search;
    });
  },
};
</script>

<style scoped>
@font-face {
  font-family: BatKnightRegular;
  src: url(./assets/BatKnightRegular-51JlG.ttf) format("truetype");
}

#app {
  /* font-family: BatKnightRegular; */
  background: linear-gradient(to bottom, rgb(172, 12, 12), rgb(0, 0, 0))
    no-repeat center center fixed !important;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
  background-position: center;
  min-height: 100vh;
}

.character-cols {
  margin-top: 5%;
}

.character-card {
  height: 100%;
}

.char-container:hover {
  margin-top: -3%;
  transition: 0.3s ease-out;
}

footer {
  background: rgb(235, 218, 218);
}

.footer-link {
  text-decoration: none;
  font-weight: 500;
  color: #000;
}

v-list-item-title {
  cursor: crosshair;
}
</style>
