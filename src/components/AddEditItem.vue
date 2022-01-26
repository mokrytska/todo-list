<template>
  <div class="back"></div>
  <div class="modal_form">
    <div class="icons_position">
      <div><span class="material-icons"> home </span></div>
      <div><span class="material-icons"> group </span></div>
      <div><span class="material-icons"> close </span></div>
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
    <div>
      <button
        class="button_add"
        v-on:click="element ? addEditedItem() : addTodoLIst()"
        :disabled="!isValid"
      >
        {{ element ? 'Edit' : 'Add' }}
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
      let response = await fetch(`https://61db46774593510017aff868.mockapi.io/api/v1/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(item),
      });
      let json = await response.json();
      console.log(json);
      this.$emit('addItem', json);
      this.descriptionInput = '';
      this.titleInput = '';
      this.dateInput = '';
    },
    async addEditedItem() {
      let item = {
        description: this.descriptionInput,
        title: this.titleInput,
        completeTill: new Date(this.dateInput).getTime(),
      };
      let response = await fetch(
        `https://61db46774593510017aff868.mockapi.io/api/v1/item/${this.element.id}`,
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
      this.$emit('editedItem', json);

      this.descriptionInput = '';
      this.dateInput = '';
      this.titleInput = '';
    },
  },
  mounted() {
    if (this.element) {
      this.descriptionInput = this.element.description;
      this.titleInput = this.element.title;
      this.dateInput = this.element.completeTill;
      console.log(this.element);
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
.modal_form {
  width: 100%;
  max-width: 312px;
  height: 250px;
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
  /* display: none; */
}
.icons_position {
  width: 300px;
  margin: 10px 10px 0px 10px;
  display: flex;
  justify-content: space-between;
}

.modal_text {
  margin-top: 5px;
  width: 272px;
  height: 50px;
  border-radius: 5px;
  background-color: #e1f0fc;
  border: none;
}

.modal_date {
  width: 150px;
  height: 25px;
  border-radius: 5px;
  margin: 2px;
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