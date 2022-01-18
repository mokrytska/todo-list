<template>

  <div class="forms_position">
    <div>
      <div class="form_todoLIst">
        <template v-for="(item,index) in todoList" :key="index">
          <div class="form">
            <div class="butons_position">
              <div class="title">{{item.title}}</div>
              <div v-if="loaders[item.id]">
                Loading...
              </div>
              <div v-else>
                <input type="radio" class="icon_checked" v-on:click=" markAsDoneItem(index)">

                <span class="material-icons icon_edit" v-if="!item.isDone" v-on:click="editItem(index)">
                  mode_edit
                </span>
                <DeleteButton v-if="!item.isDone" v-on:deleted="todoList.splice(index,1)" :element="item"></DeleteButton>
                
              </div>
            </div>

            <div class="text">

              <ul>
                <li>{{item.updatedAt}} {{item.description}}</li>
              </ul>

            </div>
          </div>
        </template>

        <div>
          <span class="material-icons icon_add" v-on:click="isVisible = !isVisible">
            add_circle_outline
          </span>
        </div>
      </div>
    </div>
    <div>
      <div class="modal_form" v-if="isVisible === true">
        <div class="modal_date">
          <input type="text" class="modal_date" v-model="titleInput" v-on:keydown.enter="addTodoLIst()">
        </div>
        <div>
          <textarea type="text" class="modal_text" v-model="descriptionInput" />
          </div>
    <div>
      <input type="date" class="modal_date" v-model="dateInput" v-on:keydown.enter="addTodoLIst()">
    </div>
    <div>
      <button class="button_add" v-on:click="currentIndex != null? addEditedItem(): addTodoLIst()">{{currentIndex != null? 'Edit':'Add'}}</button>
    </div>
  </div>
  </div>
</div>
  

  

</template>

<script>
 import DeleteButton from "./components/DeleteButton.vue";
  export default {
    components:{
      DeleteButton,
    }, 
    data() {
      return {
        descriptionInput: '',
        titleInput: '',
        dateInput: '',
        isVisible: false,
        currentIndex: null,
        isloading:false,
        loaders: {},
        todoList: [
        ]
      }

    },
    methods: {
     async addTodoLIst() {
        let item = {
          "createdAt": new Date().getTime(),
          "description":this.descriptionInput,
          "title":this.titleInput,
          "updatedAt":new Date().getTime(),
          "status":null,
          "isDone":false,
          "isInProcess":false,
          "completeTill":new Date(this.dateInput).getTime(),
        }
        let response = await fetch(`https://61db46774593510017aff868.mockapi.io/api/v1/item`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(item)                                           
        });
        let json = await response.json();
        console.log(json);

        this.todoList.push(json)
        this.descriptionInput = '';
        this.titleInput = '';
        this.dateInput = '';
      },

      editItem(i) {
        this.isVisible = true;
        this.currentIndex = i;
        this.descriptionInput = this.todoList[i].description;
        this.titleInput = this.todoList[i].title;
        this.dateInput = this.todoList[i].updateAt;
      },

      async addEditedItem() {
         let item = {
          "description":this.descriptionInput,
          "title":this.titleInput,
          "completeTill":new Date(this.dateInput).getTime(),
        }
        let response = await fetch(`https://61db46774593510017aff868.mockapi.io/api/v1/item/${this.todoList[this.currentIndex].id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(item)                                           
        });
        let json = await response.json();
        console.log(json);

        this.todoList.splice(this.currentIndex, 1, json);
        this.descriptionInput = '';
        this.dateInput= '';
        this.titleInput= '';
      },

       async markAsDoneItem(i) {
         let item = {
         "isDone":true,
        }
        let response = await fetch(`https://61db46774593510017aff868.mockapi.io/api/v1/item/${this.todoList[i].id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(item)                                           
        });
        let json = await response.json();
        console.log(json);
        this.todoList.splice(i, 1, json);
      },

      async getItems(){
        let response = await fetch('https://61db46774593510017aff868.mockapi.io/api/v1/item');
        let json = await response.json();
        this.todoList = json;
        console.log(json);
      },
    

    },
    mounted(){
      this.getItems();
    }
    

  }
</script>

<style>
.forms_position{
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
    background-color: #F2F9FF;
    border-radius: 5px;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-top: 5px;
  }

  .text {
    width: 272px;
    background-color: #E1F0FC;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    padding: 2px;
    word-break: break-all;

  }

  .icon_checked {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  .icon_edit {
    background: #BCF3ED;
    border-radius: 50px;
    cursor: pointer;
  }

  

  .icon_add {
    background: #A066C5;
    border-radius: 50px;
    margin-left: 300px;
    cursor: pointer;
    font-size: 50px;
  }

  .butons_position {
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;
  }

  .modal_form {
    width: 100%;
    max-width: 312px;
    height: 250px;
    background: #F2F9FF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /* display: none; */

  }

  .modal_text {
    margin-top: 5px;
    width: 272px;
    height: 50px;
    border-radius: 5px;
    background-color: #E1F0FC;
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
    background-color: #A066C5;
    border-radius: 25px;
    width: 144px;
    height: 37px;
    color: white;
  }
</style>