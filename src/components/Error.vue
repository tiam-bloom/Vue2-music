<template>
    <div class="error">
        <center>
            <span>好像出错了呢</span>
        </center>
        <center>
            <img src="../assets/MEnk3.gif" alt="" />
        </center>
    </div>
</template>

<script>
export default {
    name: "Error",
};
</script>

<style scoped>
.error img {
    width: 500px;
    height: 500px;
}
.error span {
    font-size: 30px;
    font-weight: bold;
    color: #f5587b;
}
</style>