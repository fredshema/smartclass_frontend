<template>
  <section id="team" class="bg-light py-5">
    <header class="h1 text-center font-weight-bold pb-4">
      OUR AMAZING TEAM
    </header>
    <b-row no-gutters align-h="center" align-v="center">
      <b-col cols="10">
        <b-row no-gutters align-v="center" align-h="center">
          <b-col cols="10">
            <div class="team-list">
              <ul class="flex-center flex-wrap">
                <li
                  class="wow zoomIn cursor-pointer m-1 mb-4"
                  data-wow-duration="1s"
                  data-wow-delay=".1s"
                  :class="isSelected(i)"
                  v-for="(member, i) in teamdata"
                  :key="i"
                  @click="setImage(i)"
                >
                  <a :data-team="'team-' + (i + 1)">
                    <figure class="m-0">
                      <img :src="member.src" />
                    </figure>
                  </a>
                </li>
                <li
                  class="active wow zoomIn"
                  data-wow-duration="1s"
                  data-wow-delay=".3s"
                ></li>
              </ul>
            </div>
            <!-- END team-list-->
          </b-col>
          <b-col cols="8" sm="6" md="5" lg="8">
            <div v-for="(member, i) in teamdata" :key="i">
              <div
                :id="'team-' + (i + 1)"
                class="team-single bg-white active"
                v-if="i == selectedImage"
              >
                <div class="team-img">
                  <img :src="member.src" v />
                  <div class="team-social">
                    <ul>
                      <li>
                        <a><i class="fab fa-facebook"></i></a>
                      </li>
                      <li>
                        <a><i class="fab fa-twitter"></i></a>
                      </li>
                      <li>
                        <a><i class="fab fa-google-plus"></i></a>
                      </li>
                      <li>
                        <a><i class="fab fa-linkedin"></i></a>
                      </li>
                    </ul>
                  </div>
                  <!-- END team-social-->
                </div>
                <!-- END team-img-->
                <div class="team-info text-center">
                  <h4>{{ member.name }}</h4>
                  <p>{{ member.position }}</p>
                </div>
                <!-- END team-info-->
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  name: "team-member-component",
  props: {
    member: Object,
  },
  data() {
    return {
      teamdata: [
        {
          name: "NIYONIZEYE Abdulrahman",
          position: "Chief Executive Oficer/Founder",
          src: require("../assets/img/team/abdul.webp"),
        },
        {
          name: "KAYITARE Hussein",
          position: "Chief Communication Officer",
          src: require("../assets/img/team/hussein.webp"),
        },
        {
          name: "IHIMBAZWE N. Alain Patience",
          position: "CFO",
          src: require("../assets/img/team/patience.webp"),
        },
        {
          name: "NSHIMIYIMAN Amani",
          position: "CTO",
          src: require("../assets/img/team/amani.webp"),
        },
        {
          name: "NIYONSHUTI Fabrice Dieu Merci",
          position: "Public Relations",
          src: require("../assets/img/team/fabrice.webp"),
        },
        {
          name: "ANDREW David Herweg",
          position: "Advisor to th CEO",
          src: require("../assets/img/team/andrew.webp"),
        },
        {
          name: "UWIMAN Asmin",
          position: "Director of Academics",
          src: require("../assets/img/team/asmin.webp"),
        },
        {
          name: "GASIGWA Issa Emile",
          position: "COO",
          src: require("../assets/img/team/emile.webp"),
        },
      ],
      selectedImage: 0,
    };
  },
  methods: {
    isSelected(index) {
      if (index == this.selectedImage) {
        return "active";
      }
    },
    setImage(i) {
      if (i == this.selectedImage) return;
      this.$set(this, "selectedImage", i);
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
}
.team-img img {
  transition: 0.3s;
  height: 320px;
  object-fit: cover;
}
.team-list img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.down-arrow {
  position: absolute;
  bottom: -20px;
  right: 50%;
  transform: translateX(50%);
  width: 100%;
}
.right-arrow {
  position: absolute;
  left: 7rem;
  top: 50%;
  transform: translateY(-50%);
}
#team {
  padding: 150px 0;
}
#fun-fact,
#team {
  background: #f6f7fe;
}
#team .team-section-text {
  padding-top: 70px;
}

.section-title {
  color: var(--primary);
  font-size: 48px;
  font-weight: 300;
  text-transform: capitalize;
  margin-bottom: 20px;
}
.section-text > p {
  margin-bottom: 15px;
}

#team {
  padding: 150px 0;
}

#team .team-section-text {
  padding-top: 70px;
}

#team .team-single {
  border: 8px solid #e6e9f4;
  margin: 0 auto;
  padding: 15px;
  width: 320px;
  display: none;
}

#team .team-single.active {
  display: block;
}

#team .team-list > ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#team .team-list > ul > li {
  position: relative;
  margin: 15px 0;
  user-select: none;
}

#team .team-list > ul > li:first-child {
  margin-top: 0;
}

#team .team-list > ul > li:last-child {
  margin-bottom: 0;
}

#team .team-list > ul > li.active > a > figure {
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(162, 177, 218, 0.582);
  }
}

#team .team-list > ul > li > a > figure {
  border-radius: 50%;
  overflow: hidden;
  height: 65px;
  position: relative;
  width: 65px;
}

#team .team-info > h4 {
  color: #3a3a3a;
  font-size: 16px;
  margin-bottom: 5px;
  margin-top: 20px;
  text-align: center;
}

#team .team-img {
  position: relative;
}

#team .team-img > img {
  width: 100%;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}

#team .team-social > ul {
  bottom: 0;
  list-style: none;
  margin: 0 0 0 20px;
  padding: 0;
  position: absolute;
  right: 30px;
  opacity: 0;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
}

#team .team-social > ul > li > a {
  border-radius: 50%;
  color: var(--primary);
  display: block;
  font-size: 18px;
  height: 40px;
  margin: 15px 5px;
  padding: 8px;
  position: relative;
  text-align: center;
  width: 40px;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
}
#team .team-social > ul > li > a:hover {
  background: var(--primary);
  color: #fff;
}

#team .team-social > ul > li > a::after {
  border: 1px solid #dee3f4;
  border-radius: 50%;
  content: "";
  height: 50px;
  left: -5px;
  position: absolute;
  top: -5px;
  width: 50px;
}

#team .team-single:hover .team-img > img {
  margin-left: -70px;
}

#team .team-single:hover .team-social > ul {
  opacity: 1;
  right: 0;
}

@media screen and (max-width: 1200px) {
  #team {
    padding: 120px 0;
  }
}

@media screen and (max-width: 991px) {
  #team {
    padding: 90px 0;
  }
  #team .col-md-5.col-sm-12.pull-right {
    float: none !important;
  }
  #team .team-section-text {
    padding-bottom: 50px;
    padding-top: 0;
  }
}
@media screen and (max-width: 575px) {
  .right-arrow {
    display: none;
  }
}
@media screen and (min-width: 576px) {
  .down-arrow {
    display: none;
  }
}
@media screen and (max-width: 767px) {
  #team {
    padding: 60px 0;
  }
  #team .team-section-text {
    padding-bottom: 30px;
    padding-top: 0;
  }
  #team .team-single {
    margin: 30px auto 0;
    overflow: hidden;
    padding: 10px;
    width: 100%;
  }
  #team .team-list {
    text-align: center;
  }
  #team .team-list > ul > li {
    position: relative;
  }

  #team .team-list > ul > li {
    display: inline-block;
    margin: 15px 0;
  }
}

@media screen and (max-width: 1200px) {
  #team {
    padding: 120px 0;
  }
}
@media screen and (max-width: 991px) {
  #team {
    padding: 90px 0;
  }
  #team .team-section-text {
    padding-bottom: 50px;
    padding-top: 0;
  }
}
</style>