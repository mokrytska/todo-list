<template>
  <div class="wrapper">
    <div>
      <hr />
      <template v-for="(item, index) in todoList" :key="index">
        <div class="form">
          <div class="nav_items_position">
            <div>{{ item.title }}</div>
            <div v-if="loaders[item.id]">Loading...</div>
            <div v-else>
              <MarkButton
                :element="item"
                v-on:marked="todoList.splice(index, 1, $event)"
              ></MarkButton>
              <router-link :to="'/edit/' + item.id"
                ><span class="material-icons button_edit buttons_color">
                  mode_edit
                </span></router-link
              >

              <DeleteButton
                v-if="!item.isDone"
                v-on:deleted="todoList.splice(index, 1)"
                :element="item"
              >
              </DeleteButton>
              <router-link :to="'/detail/' + item.id">
                <span class="material-icons buttons_color"> more_vert </span></router-link
              >
            </div>
          </div>
          <div class="form_field">{{ item.description }}</div>
          <div class="pos_items_inrow">
            <div class="complete_till_field">Complete till: {{ parseDate(item.completeTill) }}</div>
            <img :src="getAvatarById(item.userId)" alt="" class="users_photo" />
          </div>
        </div>
      </template>

      <div>
        <router-link to="/add">
          <span class="material-icons button_add" v-on:click="isVisible = !isVisible"> add </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteButton from '@/components/DeleteButton.vue';
import MarkButton from '@/components/MarkButton.vue';
import { getUsers } from '@/api/users.api';
import { getItems } from '@/api/items.api';
export default {
  components: {
    DeleteButton,
    MarkButton,
  },
  data() {
    return {
      isVisible: false,
      currentIndex: null,
      isloading: false,
      loaders: {},
      todoList: [],
      users: [],
    };
  },
  methods: {
    editItem(i) {
      this.isVisible = true;
      this.currentIndex = i;
    },

    async getItems() {
      let json = await getItems();
      this.todoList = json;
      console.log(json);
    },
    async getUsers() {
      let json = await getUsers();
      this.users = json;
    },
    getAvatarById(userId) {
      for (let i = 0; i < this.users.length; i++) {
        if (+this.users[i].id === +userId) {
          return this.users[i].avatar;
        }
      }
    },
    parseDate(seconds) {
      return new Date(seconds).toLocaleDateString();
    },
  },
  mounted() {
    this.getItems();
    this.getUsers();
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
  width: 700px;
}

.form {
  width: 100%;
  max-width: 350px;
  background-color: #f2f9ff;
  border-radius: 5px;
  padding: 20px;
  margin-top: 5px;
}

.form_field {
  width: 272px;
  min-height: 25px;
  background-color: #e1f0fc;
  border-radius: 5px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  word-break: break-all;
}
.nav_items_position {
  display: flex;
  justify-content: space-between;
}

.button_edit {
  background: #bcf3ed;
  border-radius: 50px;
  cursor: pointer;
}
.buttons_color {
  color: black;
}

.complete_till_field {
  margin-top: 15px;
}
.users_photo {
  width: 50px;
  height: 50px;
  border-radius: 40px;
  background-color: brown;
}
.pos_items_inrow {
  display: flex;
  justify-content: space-between;
}
.button_add {
  background: #a066c5;
  border-radius: 50px;
  margin-left: 300px;
  cursor: pointer;
  font-size: 50px;
  color: white;
}
</style>