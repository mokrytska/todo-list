<template>
  <div class="modal_form">
    <div>
      <div class="icons_position">
        <router-link to="/">
          <div><span class="material-icons icons_color"> home </span></div>
        </router-link>
        <router-link to="/users">
          <div><span class="material-icons icons_color"> group </span></div>
        </router-link>
        <router-link to="/">
          <div><span class="material-icons icons_color"> close </span></div>
        </router-link>
      </div>
      <hr style="width: 300px" />
    </div>

    <template v-for="(user, index) in users" :key="index">
      <div>
        <div class="modal_date icons_position">
          <img :src="user.avatar" alt="" />
          <span>{{ user.name }}</span>
        </div>
        <hr style="width: 300px" />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      let response = await fetch(`https://61db46774593510017aff868.mockapi.io/api/v1/user`);
      let json = await response.json();
      this.users = json;
      console.log(this.users);
    },
  },
  mounted() {
    this.getUsers();
    // console.log(this.$route.params.id);
  },
};
</script>
<style scoped>
.modal_form {
  width: 100%;
  max-width: 312px;
  background: #f2f9ff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  padding-bottom: 35px;
  /* display: none; */
}
.icons_position {
  width: 300px;
  margin: 10px 10px 0px 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 0px 10px;
}
.icons_color {
  color: black;
}
.modal_date {
  width: 275px;
  height: 35px;
  border-radius: 5px;
  margin: 5px;
  background-color: #f2f9ff;
  text-align: center;
  border: none;
}
</style>