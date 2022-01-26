
<template v-model="item">
  <div class="modal_form">
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
    <div>
      <div class="input_titles">Date of creation</div>
      <div class="modal_date">{{ parseDate(item.createdAt) }}</div>
    </div>
    <div>
      <div class="input_titles">Updated at</div>
      <div class="modal_date">{{ parseDate(item.updatedAt) }}</div>
    </div>
    <div>
      <input type="text" class="modal_date" v-model="item.title" />
    </div>
    <div>
      <input type="text" class="modal_date" v-model="item.description" />
    </div>
    <div>
      <div class="input_titles">Complete till</div>
      <div class="modal_date">{{ parseDate(item.completeTill) }}</div>
    </div>
    <div>
      <div class="input_titles">Status</div>
      <input type="text" class="modal_date" v-model="item.isDone" />
    </div>
    <div>
      <input type="text" class="modal_date" v-model="item.userId" />
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      item: [],
    };
  },
  methods: {
    async getItemDetails() {
      // let id = this.$route.params.id;
      let response = await fetch(
        `https://61db46774593510017aff868.mockapi.io/api/v1/item/${this.$route.params.id}`
      );
      let json = await response.json();
      this.item = json;
      // console.log(this.item.id);
    },
    parseDate(seconds) {
      return new Date(seconds).toLocaleDateString();
    },
  },
  mounted() {
    this.getItemDetails();
    // console.log(this.$route.params.id);
  },
};
</script>
<style scoped>
.modal_form {
  width: 100%;
  max-width: 312px;
  height: 550px;
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
.modal_date {
  width: 250px;
  height: 35px;
  border-radius: 5px;
  margin: 0px 25px 25px 25px;
  background-color: rgb(187, 245, 240);
  text-align: center;
  border: none;
  align-items: center;
}
.input_titles {
  margin: 0px 0px 0px 25px;
}
</style>


