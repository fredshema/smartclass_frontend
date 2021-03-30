<template>
  <b-sidebar id="units-sidebar" header-class="px-3 py-4" backdrop right shadow>
    <template #title>
      <h4 class="font-weight-bold mb-0">Course units</h4>
    </template>
    <ul class="p-0 pb-4 units" v-if="units">
      <li
        v-for="(unit, i) in units"
        :key="i"
        v-b-toggle.units-sidebar
        @click="setUnit(unit)"
      >
        {{ unit.title }}
      </li>
    </ul>
  </b-sidebar>
</template>

<script>
export default {
  name: "units-sidebar",
  props: ["units"],
  data() {
    return {
      selectedUnit: null,
      state: { loading: true },
    };
  },

  methods: {
    setUnit(unit) {
      this.selectedUnit = unit;
      this.$emit("unit-selected", unit);
    },
  },
};
</script>

<style lang="scss" scoped>
.units {
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: flex-start;
  li {
    width: 100%;
    padding: 0.85rem 1.25rem;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #85898c;
    transition: all 250ms linear;
    cursor: pointer;

    &:first-child {
      border-top: 1px solid #85898c;
    }

    &:hover {
      background: #0000001c;
    }
  }
}
</style>