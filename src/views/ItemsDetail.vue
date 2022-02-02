
<template v-model="item">
  <div class="form">
    <Hearder></Hearder>
    <div>
      <div>Date of creation</div>
      <div class="form_input">{{ parseDate(item.createdAt) }}</div>
    </div>
    <div>
      <div>Updated at</div>
      <div class="form_input">{{ parseDate(item.updatedAt) }}</div>
    </div>
    <div>
      <input type="text" class="form_input" v-model="item.title" />
    </div>
    <div>
      <input type="text" class="form_input" v-model="item.description" />
    </div>
    <div>
      <div>Complete till</div>
      <div class="form_input">{{ parseDate(item.completeTill) }}</div>
    </div>
    <div>
      <div>Status</div>
      <input type="text" class="form_input" v-model="item.isDone" />
    </div>
    <div>
      <input type="text" class="form_input" v-model="item.userId" />
    </div>
  </div>
</template>



<script>
import Hearder from '@/components/Hearder.vue';
import { getItemDetails } from '@/api/items.api';

export default {
  components: {
    Hearder,
  },
  data() {
    return {
      item: [],
    };
  },
  methods: {
    async getItemDetails() {
      let id = this.$route.params.id;
      let json = await getItemDetails(id);
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
.form {
  width: 100%;
  max-width: 312px;
  background: #f2f9ff;
  border-radius: 5px;
  margin: auto;
  padding: 10px;
}

.form_input {
  width: 100%;
  height: 35px;
  border-radius: 5px;
  margin-bottom: 25px;
  background-color: rgb(187, 245, 240);
  text-align: center;
  border: none;
}
</style>


