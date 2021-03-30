<template>
  <b-container class="metrics p-5">
    <b-row no-gutters class="mb-2" align-h="between" align-v="center">
      <h2 class="mb-0">Metrics</h2>
      <b-button @click="refresh" variant="dark" :disabled="state.loading">
        Refresh
      </b-button>
    </b-row>
    <hr class="mt-0 mb-4" />
    <b-row cols-xl="4" cols-lg="3" cols-md="2" cols-sm="1" cols="1">
      <b-col class="p-3" v-for="(metric, i) in metrics" :key="i">
        <div class="metric-card h-100 m-auto d-flex flex-column px-4 py-3">
          <div class="icon flex-center">
            <i :class="metric.icon" />
          </div>
          <div
            class="d-flex flex-column text-right align-items-end justify-content-center"
          >
            <transition name="component-fade">
              <h2 class="mb-0 mt-3 display-4" v-if="metric.total > 0">
                {{ metric.total | number }}
              </h2>
              <b-container fluid v-else class="pt-1">
                <b-row align-h="end">
                  <b-skeleton size="lg" class="w-75 py-3 mt-3" />
                </b-row>
              </b-container>
            </transition>
            <p class="font-weight-normal">{{ metric.title }}</p>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "admin-metrics",
  data() {
    return {
      state: { loading: false },
      metrics: [
        {
          title: "Total users",
          total: 0,
          icon: "fa fa-users",
        },
        {
          title: "Students",
          total: 0,
          icon: "fa fa-graduation-cap",
        },
        {
          title: "Male students",
          total: 0,
          icon: "fa fa-male",
        },
        {
          title: "Female students",
          total: 0,
          icon: "fa fa-female",
        },
        {
          title: "Teachers",
          total: 0,
          icon: "fa fa-user",
        },
        {
          title: "Challenges",
          total: 0,
          icon: "fa fa-edit",
        },
        {
          title: "Challenges Answered",
          total: 0,
          icon: "fa fa-check-square",
        },
      ],
    };
  },
  filters: {
    number: (num) => {
      if (Number.isNaN(num)) return num;
      return Number(num).toLocaleString();
    },
  },
  beforeMount() {
    this.$title("Metrics");
  },
  mounted() {
    this.refresh();
  },
  methods: {
    async fetchData() {
      const { data } = await this.axios.post("metrics", {
        action: "getMetrics",
      });
      try {
        this.$set(this.metrics[0], "total", data["total users"]);
        this.$set(this.metrics[1], "total", data["students"]);
        this.$set(this.metrics[2], "total", data["male students"]);
        this.$set(this.metrics[3], "total", data["female male students"]);
        this.$set(this.metrics[4], "total", data["teachers"]);
        this.$set(this.metrics[5], "total", data["total challenges"]);
        this.$set(this.metrics[6], "total", data["answeres given"]);
      } catch (error) {
        console.log(error);
      }
    },
    clearData() {
      this.$set(this.metrics[0], "total", 0);
      this.$set(this.metrics[1], "total", 0);
      this.$set(this.metrics[2], "total", 0);
      this.$set(this.metrics[3], "total", 0);
      this.$set(this.metrics[4], "total", 0);
      this.$set(this.metrics[5], "total", 0);
      this.$set(this.metrics[6], "total", 0);
    },
    refresh() {
      if (this.state.loading == false) {
        this.clearData();
        this.fetchData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.metric-card {
  max-width: 280px;
  border: 1px solid #6c757d26;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  background-color: var(--light);

  .icon {
    height: 50px;
    width: 80px;
    border-radius: inherit;
    background-color: var(--primary);

    i {
      font-size: 1.5rem;
      color: white;
    }
  }
}
</style>