<template>
  <SimpleDataWithVariation
    :title="title"
    :item-id="itemId"
    :value="value"
    :variation="variation"
    :request-status="requestStatus"
    :comparation-value="comparationValue"
    @reload="getData"
  />
</template>

<script>
import SimpleDataWithVariation from "@/components/cards/models/SimpleDataWithVariation";
import { mapActions } from "vuex";
import EventBus from "@/utils/event-bus";
import { POST_FIELDS, DATE_PORTION } from "@/services/charts-service";
import sentimentModel from "@/mixins/sentiment-model";
import axios from "axios";

export default {
  name: "ProductivityCard",
  components: {
    SimpleDataWithVariation,
  },
  mixins: [sentimentModel],
  props: {
    title: {
      type: String,
      required: true,
    },
    itemId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      requestStatus: "loading",
      valueUrl: undefined,
      url: "",
      variation: "0",
      rawVariation: "0",
    };
  },
  mounted() {
    this.url =
      "https://secure-backend-api.stilingue.com.br/call-exports/prod/calls/5506006157361152/6123674900103168/productivity/overall?passkey=bGVzc2lzbW9yZWxlc3Npc21vcmVsZXNzaXNtb3Jl&accountId=5506006157361152&universeId=6123674900103168&startDate=01/02/2023 23:59&endDate=05/02/2023 00:00";

    axios.get(this.url).then((response) => {
      this.valueUrl = response.data.overallProductivity.toFixed();
      console.log("response", this.valueUrl);
    });
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions("cards", ["getChartsService"]),
    getData(options) {
      if (!options?.silentRefresh) {
        this.requestStatus = "loading";
      }
      this.getChartsService({
        itemId: this.itemId,
        method: "getTimeSeries",
        params: {
          datePortion: DATE_PORTION.BY_YEAR,
          grouping: [POST_FIELDS.POLARITY],
        },
      })
        .then((response) => {
          const normalizedResponse =
            this.normalizeSentimentResponseFromChartService(response);
          const totalPosts = normalizedResponse.points
            .map((res) => res.data[0])
            .reduce((sum, value) => {
              return sum + value;
            });
          console.log(normalizedResponse);
          const percentPos =
            (normalizedResponse.points[0].data[0] / totalPosts) * 100;
          const percentNeu =
            (normalizedResponse.points[1].data[0] / totalPosts) * 100;

          // this.variation = '0';
          // this.rawVariation = '0';
          // this.value = `${(percentPos + percentNeu).toFixed(0)}%`;
          this.value = `${this.valueUrl}%`;
          console.log("value", this.value);
          this.requestStatus = "success";

          if (options?.silentRefresh) {
            EventBus.$emit("updated", { itemId: this.itemId });
          }
          return percentPos + percentNeu;
        })
        .catch((error) => {
          console.error(error);
          this.requestStatus = "error";
        });
    },
  },
};
</script>

<style scoped lang="scss"></style>
