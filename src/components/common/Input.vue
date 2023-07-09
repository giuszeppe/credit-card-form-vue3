<script setup lang="ts">
    import {vMaska} from 'maska'
    import Label from './Label.vue';
import WrapperInput from './WrapperInput.vue';
    defineEmits([
        'update:defaultValue',
        'updateDefaultValue'
    ])

    const props = withDefaults(defineProps<{
        type?: string,
        label?: string,
        defaultValue?: any,
        placehoder?: string,
        mask?: string
    }>(),{
        type: "text",
        label: "",
        defaultValue: "",
        placeholder: "",
        mask: ""
    })

</script>

<template>
    <WrapperInput>
        <Label :label="label" />
        <input v-maska 
            :data-maska="mask" 
            :type="type" 
            :value="defaultValue" 
            :placeholder="placehoder"
            @input="$emit('updateDefaultValue', ($event.target as HTMLInputElement).value)"
            
            />
    </WrapperInput>
</template>

<style scoped>

    input{
        border-radius: 4px;
        padding:8px;
        border: 1px solid #ced6e0;
    }
</style>