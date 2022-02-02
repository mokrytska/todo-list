<template>
  <div class="wrapper">
    <Hearder></Hearder>
    <template v-for="(user, index) in users" :key="index">
      <div class="user_infor_field items_position_inrow">
        <img :src="user.avatar" alt="" />
        <span>{{ user.name }}</span>
      </div>
    </template>
  </div>
</template>
<script>
import { getUsers } from '@/api/users.api';
import Hearder from '@/components/Hearder.vue';
export default {
  components: {
    Hearder,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      let json = await getUsers();
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
.wrapper {
  width: 100%;
  max-width: 312px;
  background: #f2f9ff;
  border-radius: 5px;
  margin: auto;
  padding: 15px;
}

.items_position_inrow {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px;
  margin: 15px 0px;
}
img {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-bottom: 5px;
}
</style>