<template>
  <div class="forms_position">
    <div>
      <div class="form_todoLIst">
        <hr />
        <template v-for="(item, index) in todoList" :key="index">
          <div class="form">
            <div class="butons_position">
              <div class="title">{{ item.title }}</div>
              <div v-if="loaders[item.id]">Loading...</div>
              <div v-else>
                <MarkButton
                  :element="item"
                  v-on:marked="todoList.splice(index, 1, $event)"
                ></MarkButton>
                <router-link :to="'/edit/' + item.id"
                  ><span class="material-icons icon_edit"> mode_edit </span></router-link
                >

                <DeleteButton
                  v-if="!item.isDone"
                  v-on:deleted="todoList.splice(index, 1)"
                  :element="item"
                >
                </DeleteButton>
                <router-link :to="'/detail/' + item.id">
                  <span class="material-icons icon_more_vert"> more_vert </span></router-link
                >
              </div>
            </div>
            <div class="text">{{ item.description }}</div>
            <div class="pos_icons_inrow">
              <div class="complete_till_field">
                Complete till: {{ parseDate(item.completeTill) }}
              </div>
              <div class="users_photo">foto</div>
            </div>
          </div>
        </template>

        <div>
          <router-link to="/add">
            <span class="material-icons icon_add" v-on:click="isVisible = !isVisible"> add </span>
          </router-link>
        </div>
      </div>
    </div>

    <AddEditItem
      v-on:addItem="
        todoList.push($event);
        isVisible = false;
      "
      v-on:editedItem="
        todoList.splice(currentIndex, 1, $event);
        isVisible = false;
      "
      :element="todoList[currentIndex]"
      v-if="isVisible"
    />
  </div>
</template>

<script>
import DeleteButton from '@/components/DeleteButton.vue';
import MarkButton from '@/components/MarkButton.vue';
import AddEditItem from '@/components/AddEditItem.vue';
export default {
  components: {
    DeleteButton,
    MarkButton,
    AddEditItem,
  },
  data() {
    return {
      isVisible: false,
      currentIndex: null,
      isloading: false,
      loaders: {},
      todoList: [],
    };
  },
  methods: {
    editItem(i) {
      this.isVisible = true;
      this.currentIndex = i;
    },

    async getItems() {
      let response = await fetch('https://61db46774593510017aff868.mockapi.io/api/v1/item');
      let json = await response.json();
      this.todoList = json;
      console.log(json);
    },
    parseDate(seconds) {
      return new Date(seconds).toLocaleDateString();
    },
  },
  mounted() {
    this.getItems();
  },
};
</script>

<style scoped>
.forms_position {
  display: flex;
  justify-content: space-around;
  margin: 20px;
  width: 700px;
}

.form_todoList {
  width: 100%;
  max-width: 350px;
}

.form {
  width: 100%;
  max-width: 350px;
  background-color: #f2f9ff;
  border-radius: 5px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: 5px;
}

.text {
  width: 272px;
  background-color: #e1f0fc;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 2px;
  word-break: break-all;
}

.icon_edit {
  background: #bcf3ed;
  border-radius: 50px;
  cursor: pointer;
}

.icon_add {
  background: #a066c5;
  border-radius: 50px;
  margin-left: 300px;
  cursor: pointer;
  font-size: 50px;
  color: white;
}
.icon_more_vert {
  color: black;
}

.butons_position {
  display: flex;
  justify-content: space-between;
  margin: 10px 10px;
}
.complete_till_field {
  margin-left: 40px;
  margin-top: 15px;
}
.users_photo {
  width: 50px;
  height: 50px;
  border-radius: 40px;
  background-color: brown;
}
.pos_icons_inrow {
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
}
</style>