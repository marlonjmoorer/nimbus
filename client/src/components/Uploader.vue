<template>
   <ul class="collapsible" data-collapsible="accordion">
            <li>
            <div class="collapsible-header">
                <i class="material-icons">filter_drama</i>First
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
            </div>
            <div class="collapsible-body">
                 <ul class="collection">
                    <li v-for="file in uploadQueue" :key="file.name" class="collection-item">{{file.name}}</li>
                    
                </ul>
            </div>
            </li>
    </ul>
</template>

<script>
import { mapMutations,mapState,mapActions } from 'vuex'

export default {
    computed:{
        ...mapState(["uploadQueue"])
    },
    mounted(){
        $('.collapsible').collapsible();
        console.log(this.uploadQueue)
    }
}
</script>

<style>

</style>
