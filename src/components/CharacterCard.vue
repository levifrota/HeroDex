<template>
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
</template>

<script>
import { Chart } from "highcharts-vue";

export default {
  name: "CharacterCard",

  components: {
    // eslint-disable-next-line
    Highcharts: Chart
  },

  data() {
    return {
      selectedCharacter: null,
    };
  },
};
</script>
