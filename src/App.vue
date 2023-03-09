<template>
  <v-app>
    <HeroHeader />

    <v-container>
      <v-container>
        <v-row class="character-cols">
          <v-col
            :cols="responsiveCards(colsPerLine)"
            v-for="(character, index) in filteredCharacters.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            )"
            :key="index"
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
                <p
                  v-if="character.biography.firstAppearance != '-'"
                  class="text-center"
                >
                  <b>First Appearance: </b><br />{{
                    character.biography.firstAppearance
                  }}
                </p>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-pagination
          v-model="page"
          :length="Math.ceil(filteredCharacters.length / itemsPerPage)"
          :total-visible="7"
        ></v-pagination>
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

          <v-divider class="my-4"> </v-divider>

          <h2>Character Info</h2>

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header> Appearance </v-expansion-panel-header>
              <v-expansion-panel-content>
                <b>Gender:</b> {{ selectedCharacter.appearance.gender }}
              </v-expansion-panel-content>
              <v-expansion-panel-content
                v-if="selectedCharacter.appearance.race != null"
              >
                <b>Race:</b> {{ selectedCharacter.appearance.race }}
              </v-expansion-panel-content>
              <v-expansion-panel-content
                v-if="selectedCharacter.appearance.height[1] != '0 cm'"
              >
                <b>Height:</b> {{ selectedCharacter.appearance.height[1] }}
              </v-expansion-panel-content>
              <v-expansion-panel-content
                v-if="selectedCharacter.appearance.weight[1] != '0 kg'"
              >
                <b>Weight:</b> {{ selectedCharacter.appearance.weight[1] }}
              </v-expansion-panel-content>
              <v-expansion-panel-content
                v-if="selectedCharacter.appearance.hairColor != '-'"
              >
                <b>Hair Color:</b> {{ selectedCharacter.appearance.hairColor }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-divider class="my-4"> </v-divider>

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
      page: 1,
      itemsPerPage: 20,
      screenWidth: null,
      screenHeight: null,
      colsPerLine: 3,
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
      console.log(this.selectedCharacter);
    },

    getData() {
      axios
        .get("https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json")
        .then((response) => {
          this.characters = response.data;
        });
    },

    responsiveCards() {
      if (this.screenWidth <= 768 && this.screenWidth >= 376) {
        this.colsPerLine = 6;
        console.log(this.colsPerLine);
      }
      if (this.screenWidth <= 375) {
        this.colsPerLine = 10;
        console.log(this.colsPerLine);
      }
      return this.colsPerLine;
    },
  },

  created() {
    this.getData();
    eventBus.$on("search", (search) => {
      this.searchFinal = search;
      this.page = 1;
    });
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  },
};
</script>

<style lang="scss" scoped>
.character-cols {
  margin-top: 5%;
}

.character-card {
  padding-top: 5%;
  height: 100%;
}

.char-container:hover {
  margin-top: -1rem;
  transition: 0.3s ease;
}

.footer-link {
  text-decoration: none;
  font-weight: 500;
}

v-list-item-title {
  cursor: crosshair;
}
</style>
