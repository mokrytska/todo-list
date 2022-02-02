<template>
  <div class="nav_items">
    <router-link to="/">
      <div><span class="material-icons nav_items_color"> home </span></div>
    </router-link>
    <router-link to="/users">
      <div><span class="material-icons nav_items_color"> group </span></div>
    </router-link>
    <router-link to="/">
      <div><span class="material-icons nav_items_color"> close </span></div>
    </router-link>
  </div>
</template>
<script>
</script>
<style scoped>
.nav_items {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px;
  margin-bottom: 10px;
}
.nav_items_color {
  color: black;
}
</style>