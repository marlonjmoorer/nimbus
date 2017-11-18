<template>
    <div class="card blue main">
        <div class="row">
        <div class="col s3">
            <a class="waves-effect waves-light btn" @click="addAccount=true">
                <i class="material-icons left">library_add</i>Add
            </a>
            <div class="collection" v-for="account in accounts" :key="account">
                <a href="#!" class="collection-item">Alvin</a>
                <a href="#!" class="collection-item active">Alvin</a>
                <a href="#!" class="collection-item">Alvin</a>
                <a href="#!" class="collection-item">Alvin</a>
            </div>
        </div>
        <div class="col s9">
            <div class="card main">
                test
            </div>
        </div>
        
        </div>
    </div>
  
</template>

<script>
export default {

data:()=>({
    accounts:[]
})

};
</script>

<style>
.main{
  min-height: 100vh;

}
</style>
