<template>
  <div class="bg-primary">
    <b-container class="py-5">
      <header class="w-100 text-left h1 pb-5 text-white text-center">
        FEW WORDS ABOUT US
      </header>
      <b-row no-gutters cols-md="2" align-h="between">
        <b-col md="5" class="mb-4 mb-md-0">
          <article class="p-4">
            Smart Class Rwanda, established in 2018, is a private company
            operating in Rwanda. It operates and manages
            <a href="www.smartclass.rw">www.smartclass.rw</a>, an online
            learning platform which aims to connect all Rwandan high school
            students learning similar academic subjects and provide them with
            access to valuable learning materials and high-quality teachers.
            Thus helping students achieve academic excellence no matter their
            location or time of day.
          </article>
        </b-col>
        <b-col md="6">
          <b-row class="p-4 mb-4 block" no-gutters>
            <b-col cols="auto">
              <img class="mr-4" src="../assets/img/icons/eye.svg" />
            </b-col>
            <b-col>
              <h4>OUR VISION</h4>
              <p class="m-0">
                Bringing opportunity to attain excellent education, anytime
                anywhere.
              </p>
            </b-col>
          </b-row>
          <b-row class="p-4 block" no-gutters>
            <b-col cols="auto">
              <img class="mr-4" src="../assets/img/icons/trending-up.svg" />
            </b-col>
            <b-col>
              <h4>OUR MISSION</h4>
              <p class="m-0">
                Easy access to learning materials and collaboration among
                students of the same class across the country we belive in team
                work.
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_variables.scss";
article {
  border-radius: 15px;
  background: $white-accent;
  font-size: 16px;
}
.block {
  background: $white-accent;
  border-radius: 15px;
}
</style>