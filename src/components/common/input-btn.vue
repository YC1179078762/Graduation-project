<template>
    <div>
        <van-field 
        class="input-btn"
        label-width="1.6rem"
        v-model="text" 
        :type="type" 
        clearable
        :label="label"
        :rules="rules"
        :placeholder="placeholder"
        :maxlength="maxlength" 
        />
    </div>
</template>

<script>
export default {
    props:['type','label','rules','placeholder','maxlength'],
    data(){
        return{
            text:''
        }
    }
}
</script>

<style lang="less" scoped >
.input-btn{
    background-color: #f1f4f6;
    border-radius: 40px;
    width: 90%;
    left: 5%;
    height: 50px;
    font-size: 14px;
    line-height: 30px;
    margin-top: 12px;
}
</style>