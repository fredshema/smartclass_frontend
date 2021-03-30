<template>
  <div class="stats bg-primary">
    <b-row class="pt-5 pb-3" no-gutters cols-sm="1" cols-md="2" cols-lg="4">
      <b-col sm="12" md="6" lg="3" class="text-center column p-4 mb-3">
        <article class="flex-center flex-column">
          <span class="number">908</span>
          <legend>Challenges</legend>
        </article>
      </b-col>
      <b-col sm="12" md="6" lg="3" class="text-center column p-4 mb-3">
        <article class="flex-center flex-column">
          <span class="number">2614</span>
          <legend>Registered Students</legend>
        </article>
      </b-col>
      <b-col sm="12" md="6" lg="3" class="text-center column p-4 mb-3">
        <article class="flex-center flex-column">
          <span class="number">44</span>
          <legend>Registered Teachers</legend>
        </article>
      </b-col>
      <b-col sm="12" md="6" lg="3" class="text-center column p-4 mb-3">
        <article class="flex-center flex-column">
          <span class="number">15 </span>
          <legend>Mentors</legend>
        </article>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
.stats {
  padding: 3rem 0;

  .column {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    article {
      background: $white-accent;
      padding: 2rem;
      border-radius: 15px;
      position: relative;
      width: 100%;
      height: 100%;
      max-width: 300px;
      margin: auto;
    }
  }
  .number {
    font-weight: 600;
    font-size: 2.5rem;
    flex: 1;
    margin-bottom: 0.25rem;
  }
  legend {
    font-size: 0.95rem;
    width: fit-content;
    margin: 0;
    flex: 3;
  }
}
</style>