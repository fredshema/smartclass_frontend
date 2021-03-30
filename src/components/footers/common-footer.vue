<template functional>
  <div class="footer-copyright text-light text-center py-3">
    <b-container fluid>
      <b-row align-v="start">
        <b-col>
          <b-row
            class="align-items-start align-items-md-start justify-content-sm-between"
          >
            <b-col
              md="7"
              lg="7"
              sm="auto"
              class="text-center mb-3 mb-md-0 text-md-left"
            >
              <p class="mb-0 white-text">
                Get connected with us on social networks!
              </p>
            </b-col>
            <b-col md="5" lg="5" sm="4" class="text-center">
              <a class="ml-0 fb-icon">
                <i
                  class="fab fa-facebook white-text mr-lg-4 mr-3 cursor-pointer"
                />
              </a>
              <a class="icon">
                <i
                  class="fab fa-twitter white-text mr-lg-4 mr-3 cursor-pointer"
                />
              </a>
              <a class="icon">
                <i
                  class="fab fa-google-plus white-text mr-lg-4 mr-3 cursor-pointer"
                >
                </i>
              </a>
              <a class="icon">
                <i
                  class="fab fa-linkedin-in white-text mr-lg-4 mr-3 cursor-pointer"
                >
                </i>
              </a>
              <a class="icon">
                <i
                  class="fab fa-instagram white-text mr-lg-4 mr-3 cursor-pointer"
                >
                </i>
              </a>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          sm="12"
          lg="4"
          md="auto"
          class="text-center text-md-righ mt-3 mt-md-0"
        >
          &copy; {{ new Date().getFullYear() }}&nbsp;
          <a href="https://smartclass.rw/"> smartclass.rw </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
.footer-copyright {
  background: #1c1e20;
  font-size: 14px;
}
</style>
