<template>
  <div class="form_field">
    <img :src="selectedUser.avatar" alt="" v-if="selectedUser" />
    <div v-if="selectedUser">{{ selectedUser.name }}</div>

    <div v-on:click="isVisible = true" class="arrow">
      <span class="material-icons"> expand_more </span>
    </div>
  </div>
  <div class="backdrop" v-if="isVisible"></div>
  <div class="form" v-if="isVisible">
    <div class="modal_form">
      <div class="material-icons close" v-on:click="isVisible = false">close</div>
    </div>

    <template v-for="(user, index) in users" :key="index">
      <div
        class="modal_form"
        @click="
          isVisible = false;
          $emit('update:modelValue', user.id);
        "
      >
        <img :src="user.avatar" alt="" />
        <span>{{ user.name }}</span>
      </div>
    </template>
  </div>
</template>
<script>
import { getUsers } from '@/api/users.api.js';
export default {
  props: ['modelValue'],
  data() {
    return {
      users: [],
      isVisible: false,
    };
  },
  computed: {
    selectedUser() {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === this.modelValue) {
          return this.users[i];
        }
      }
      return null;
    },
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
    console.log('getUsers', getUsers);
  },
};
</script>
<style scoped>
.form {
  width: 100%;
  max-width: 312px;
  background: #f2f9ff;
  padding: 5px;
  border-radius: 5px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -10%);
}
.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}
.form_field {
  width: 100%;
  min-height: 36px;
  border-radius: 5px;
  margin-top: 25px;
  background-color: rgb(187, 245, 240);
  text-align: center;
  border: none;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 50px 4px 10px;
}

.modal_form {
  padding: 6px 0px;
  height: 35px;
  border-bottom: solid 1px;
  display: flex;
  align-items: center;
  position: relative;
}
img {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-right: 16px;
}
.arrow {
  cursor: pointer;
  margin: 5px;
  position: absolute;
  right: 5px;
}
.close {
  cursor: pointer;
  margin: 5px;
  position: absolute;
  right: 5px;
  color: black;
}
</style>