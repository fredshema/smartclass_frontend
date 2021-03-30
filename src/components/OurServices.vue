<template>
  <div class="service-section">
    <b-container>
      <h1 class="text-center pt-5 pb-3">OUR SERVICES</h1>
      <b-row class="pb-5 align-items-sm-center" no-gutters align-h="around">
        <b-col sm="12" lg="3" class="m-3 flex-center">
          <article>
            <figure>
              <img alt="" :src="require('../assets/img/icons/monitor.svg')" />
            </figure>

            <div>
              <p class="flex-center">
                Your classmates are here, Learn with us!
              </p>
              <h1>E-CLASSROOM</h1>
            </div>
          </article>
        </b-col>
        <b-col sm="12" lg="3" class="m-3 flex-center">
          <article>
            <figure>
              <img alt="" :src="require('../assets/img/icons/book-open.svg')" />
            </figure>

            <div>
              <p class="flex-center">The Library for you.</p>
              <h1>LIBRARY</h1>
            </div>
          </article>
        </b-col>
        <b-col sm="12" lg="3" class="m-3 flex-center">
          <article>
            <figure>
              <img alt="" :src="require('../assets/img/icons/award.svg')" />
            </figure>

            <div>
              <p class="flex-center">
                Don't miss mentorship while mentors are here
              </p>
              <h1>E-MENTORSHIP</h1>
            </div>
          </article>
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
.service-section {
  background: $white-accent;
}
article {
  min-width: 250px;
  width: 100%;
  max-width: 450px;
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  line-height: 2;
  border-radius: 15px;
  box-shadow: 0 0 5px -2px rgba(0, 0, 0, 0.1);
  padding: 2rem 0;
  justify-content: center;
  cursor: pointer;

  &:hover figure {
    transform: scale(1.2);
  }
}
article figure {
  width: 50px;
  height: 50px;
  position: relative;
  transition: 150ms linear;
}

article figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

article div {
  text-align: center;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
article div p {
  font-weight: 400;
  font-style: italic;
  margin: 1rem 0 3rem;
  position: relative;
  z-index: 5;
  flex: 1;
}
article div h1 {
  color: hsl(260, 5%, 55%);
  font-family: inherit, sans-serif;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}
</style>