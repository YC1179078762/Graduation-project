<template>
  <div>
   <form action="">
     <input type="text">
   </form>
    <button @click="ceshi">测试</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      file:''
    }
  },
methods:{
  // getFile: function (event) {
  //      this.file = event.target.files[0];
  //  },
 async ceshi(){
    const data =  this.$axios.post('http://localhost:3000/m',{
      params:{
        img:123455
      }
    
    })
    console.log(data)
  }
}
}
</script>

<style>

</style>