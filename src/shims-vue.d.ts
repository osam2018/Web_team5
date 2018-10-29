declare module '*.vue' {
  import Vue from 'vue'
  export default Vue;


}

declare global {
    interface Window {

        $globalBus;
        $model:Model;
    }

}