import Vue from "vue";

import Model from '@/model/Model';


declare module '*.vue' {
    import Vue from 'vue'
    export default Vue;


}

export default class Model {

    public static _instance:Model;

    public static getInstance(){
        if(Model._instance==null) {
            Model._instance = new Model();
        }

        return Model._instance;
    }


    constructor(){
    }

    async getInsuinge(){
        let result  = await Vue.$http.get("./mockup_data/insuinge.json");
        console.log("result ", result)
        return result.data.list;
    }

    async getJangyae(){
        let result  = await Vue.$http.get("./mockup_data/jangyae.json");
        console.log("result ", result)
        return result.data.list2;
    }

}