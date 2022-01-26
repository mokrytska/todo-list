<template>
  <div class="back"></div>
  <div class="modal_form">
    <div class="icons_position">
      <router-link to="/">
        <div><span class="material-icons icons_color"> home </span></div>
      </router-link>
      <router-link to="/users">
        <div><span class="material-icons icons_color"> group </span></div>
      </router-link>
      <router-link to="/">
        <div><span class="material-icons"> close </span></div>
      </router-link>
    </div>
    <hr style="width: 300px" />
    <div>
      <input
        type="text"
        class="modal_date"
        v-model="titleInput"
        v-on:keydown.enter="addTodoLIst()"
      />
    </div>
    <div>
      <textarea type="text" class="modal_text" v-model="descriptionInput" />
    </div>
    <div>
      <input
        type="date"
        class="modal_date"
        v-model="dateInput"
        v-on:keydown.enter="addTodoLIst()"
      />
    </div>
    <div class="modal_date icons_position">
      <div>user</div>
      <div><span class="material-icons"> expand_more </span></div>
    </div>
    <div>
      <button
        class="button_add"
        v-on:click="item ? addEditedItem() : addTodoLIst()"
        :disabled="!isValid || isLoading"
      >
        <template v-if="isLoading"
          ><span class="material-icons sync_icon_anomation"> sync </span>
        </template>
        <template v-else>{{ item ? 'Edit' : 'Add' }}</template>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['element'],
  data() {
    return {
      descriptionInput: '',
      titleInput: '',
      dateInput: '',
      item: [],
      isLoading: false,
    };
  },
  methods: {
    async addTodoLIst() {
      let item = {
        createdAt: new Date().getTime(),
        description: this.descriptionInput,
        title: this.titleInput,
        updatedAt: new Date().getTime(),
        status: null,
        isDone: false,
        isInProcess: false,
        completeTill: new Date(this.dateInput).getTime(),
      };
      this.isLoading = true;
      let response = await fetch(`https://61db46774593510017aff868.mockapi.io/api/v1/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(item),
      });
      let json = await response.json();
      console.log(json);
      this.$router.push('/');
    },
    async getItemDetails() {
      // let id = this.$route.params.id;
      let response = await fetch(
        `https://61db46774593510017aff868.mockapi.io/api/v1/item/${this.$route.params.id}`
      );
      let json = await response.json();
      this.item = json;
      this.descriptionInput = this.item.description;
      this.titleInput = this.item.title;
      this.dateInput = new Date(this.item.createdAt).toISOString().substring(0, 10);
      console.log(this.item);
    },
    async addEditedItem() {
      let item = {
        description: this.descriptionInput,
        title: this.titleInput,
        completeTill: new Date(this.dateInput).getTime(),
      };
      this.isLoading = true;
      let response = await fetch(
        `https://61db46774593510017aff868.mockapi.io/api/v1/item/${this.$route.params.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(item),
        }
      );
      let json = await response.json();
      console.log(json);
      this.$router.push('/');
    },
  },
  mounted() {
    this.getItemDetails();
    console.log(this.$route.params.id);
  },
  computed: {
    isValid() {
      return this.descriptionInput && this.titleInput && this.dateInput;
    },
    isDisabled() {
      return !!(!this.descriptionInput || !this.titleInput || !this.dateInput);

      // return !!(this.descriptionInput === '' || this.titleInput === '' || this.dateInput === '');
      // if (this.descriptionInput === '' || this.titleInput === '' || this.dateInput === '') {
      //   return true;
      // } else {
      //   return false;
      // }
    },
  },
};
</script>
<style scoped>
.modal_form {
  width: 100%;
  max-width: 312px;
  height: 500px;
  background: #f2f9ff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
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
.sync_icon_anomation {
  animation-name: rotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.modal_text {
  margin-top: 25px;
  width: 250px;
  height: 100px;
  border-radius: 5px;
  background-color: #e1f0fc;
  border: none;
}

.modal_date {
  width: 250px;
  height: 35px;
  border-radius: 5px;
  margin: 25px;
  background-color: rgb(187, 245, 240);
  text-align: center;
  border: none;
}

.button_add {
  background-color: #a066c5;
  border-radius: 25px;
  width: 144px;
  height: 37px;
  color: white;
}
.back {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>