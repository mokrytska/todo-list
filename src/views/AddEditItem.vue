<template>
  <div class="wrapper" v-if="!isVisible">
    <Hearder></Hearder>
    <div>
      <input
        type="text"
        class="inner_field"
        v-model="titleInput"
        v-on:keydown.enter="addTodoLIst()"
      />
    </div>
    <div>
      <textarea type="text" class="modal_field" v-model="descriptionInput" />
    </div>
    <div>
      <input
        type="date"
        class="inner_field"
        v-model="dateInput"
        v-on:keydown.enter="addTodoLIst()"
      />
    </div>
    <UsersSelect v-model="userInput"></UsersSelect>
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
</template>

<script>
import UsersSelect from '@/components/UsersSelect.vue';
import Hearder from '@/components/Hearder.vue';
import { postItem } from '@/api/items.api';
import { getItemDetails } from '@/api/items.api';
import { putItem } from '@/api/items.api';
export default {
  components: {
    UsersSelect,
    Hearder,
  },
  data() {
    return {
      descriptionInput: '',
      titleInput: '',
      dateInput: '',
      userInput: '',
      item: null,
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
        userId: this.userInput,
      };
      this.isLoading = true;
      let json = await postItem(item);
      console.log(json);
      this.$router.push('/');
    },
    async getItemDetails() {
      let id = this.$route.params.id;
      let json = await getItemDetails(id);
      this.item = json;
      this.descriptionInput = this.item.description;
      this.titleInput = this.item.title;
      this.dateInput = new Date(this.item.createdAt).getTime();
      this.userInput = this.item.userId;
    },
    async addEditedItem() {
      let item = {
        description: this.descriptionInput,
        title: this.titleInput,
        completeTill: new Date(this.dateInput).getTime(),
        userId: this.userInput,
      };
      let id = this.$route.params.id;
      this.isLoading = true;
      let json = await putItem(id, item);
      console.log(json);
      this.$router.push('/');
    },
    setUser(user) {
      this.userInput = user;
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.getItemDetails();
      console.log(this.$route.params.id);
    }
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
.wrapper {
  width: 100%;
  max-width: 312px;
  background: #f2f9ff;
  border-radius: 5px;
  margin: auto;
  padding: 10px;
}

.inner_field {
  height: 35px;
  width: 100%;
  border-radius: 5px;
  margin-top: 35px;
  background-color: rgb(187, 245, 240);
  text-align: center;
  border: none;
}

.modal_field {
  margin-top: 25px;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  background-color: #e1f0fc;
  border: none;
}

.button_add {
  background-color: #a066c5;
  border-radius: 25px;
  width: 144px;
  height: 37px;
  color: white;
  display: block;
  margin: 35px auto auto;
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
</style>