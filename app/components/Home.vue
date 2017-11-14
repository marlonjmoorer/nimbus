<template>
  <div class="hello">
     <div class="row">
      <div class="col s4">
         <div class="collection">
          <a href="#!" class="collection-item">Alvin</a>
          <a href="#!" class="collection-item active">Alvin</a>
          <a href="#!" class="collection-item">Alvin</a>
          <a href="#!" class="collection-item">Alvin</a>
        </div>
      </div>
      <div class="col s8">6-columns (one-half)</div>
      <div class="col s6">6-columns (one-half)</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js "
    };
  }
};
</script>
