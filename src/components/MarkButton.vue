<template>
  <input type="radio" class="icon_checked" v-on:click="markAsDoneItem" />
</template>

<script>
export default {
  props: ['element'],
  methods: {
    async markAsDoneItem() {
      let i = this.element;
      let item = {
        isDone: true,
      };
      let response = await fetch(
        `https://61db46774593510017aff868.mockapi.io/api/v1/item/${i.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(item),
        }
      );
      let json = await response.json();
      this.$emit('marked', json);
      console.log(json);
    },
  },
};
</script>

<style>
.icon_checked {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>