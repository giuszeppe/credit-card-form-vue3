<script setup lang="ts">
const props = defineProps<{
    label: string,
}>()
</script>


<template>
    <label>{{label}}</label>
</template>

<style scoped>
    label{
        font-size: .8em;
        margin-bottom: 2px;
    }
</style>