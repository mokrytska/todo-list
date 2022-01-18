<template>
    <span class="material-icons icon_delete" @click="removeItem">
        delete
    </span>
</template>

<script>
export default {
    props: [
        'element',
    ],
    data(){
        return{
            isLoading: false,
        }
    },
    methods:{
        async removeItem(){
            
            this.isLoading = true;
            let response = await fetch(`https://61db46774593510017aff868.mockapi.io/api/v1/item/${this.element.id}`,{
            method: 'DELETE',
            });
            let json = await response.json();
            console.log(json);
            this.$emit('deleted');
            this.isLoading = false;
        },
    }
}

</script>

<style>
.icon_delete {
    background: #F57474;
    border-radius: 50px;
    cursor: pointer;
  }
</style>