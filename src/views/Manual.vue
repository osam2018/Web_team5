<template>
    <el-main class="data-page">
        <el-aside width="280px" class="aside">

            <side-menu></side-menu>
        </el-aside>

        <router-view></router-view>
        <ul v-for="item in list">
            <li>{{item}}</li>
        </ul>
    </el-main>

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({

    })
    export default class DataPage extends Vue {
        public $http:any;
        private list:string[]=[];
        async mounted(){
            let result  = await this.$http.get("../mockup_data/data1.json");
            console.log(result.data.list);
            this.list = result.data.list;
        }

    }
</script>

<style scoped>
    .about{
        line-height: 30px;
    }
</style>