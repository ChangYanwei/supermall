<template>
  <div class="toast"v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    // props: {
    //   message: {
    //     type: String,
    //     default: ""
    //   },
    //   show:{
    //     type:Boolean,
    //     default:false
    //   }
    // },
    data(){
      return {
        message:"",
        isShow:false
      }
    },
    methods:{
      show(message,delay = 1500){
        this.isShow = true;
        this.message = message;

        setTimeout(() => {
          this.isShow = false;
        },delay)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;

    z-index: 100;
  }
</style>
