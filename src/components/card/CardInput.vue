<script setup lang="ts">
    import Input from '../common/Input.vue';
    import WrapperInput from '../common/WrapperInput.vue';
    import Label from '../common/Label.vue';
    import { Card } from '../../Card';
    import {onMounted, ref} from 'vue'
    const props = defineProps<Card>()
    const emit = defineEmits([
        'update:card_number',
        'update:card_holder',
        'update:card_year_exp',
        'update:card_month_exp',
        'update:card_cvv',
        'focusin_cvv',
        'focusout_cvv',
        'updateDefaultValue'
    ])

    const cvv_div = ref<null | { addEventListener: (event_name: String, callback: Function) => null}>(null)

    onMounted(() => {
        if(cvv_div.value){
            cvv_div.value.addEventListener('focusin',(e: Event) => {
                emit('focusin_cvv')
            })
            cvv_div.value.addEventListener('focusout',(e: Event) => {
                emit('focusout_cvv')
            })
        }
    })
    
</script>

<template>
    <div class="wrapper">
        <form>
            <Input 
                placehoder="1234 5678 9012 3456" 
                mask="#### #### #### ####" 
                label="Card Number"
                :defaultValue="props.card_number"
                @updateDefaultValue="(e: Event)=> $emit('update:card_number', e)"
                />
            <Input type="text" 
                label="Card Holder"
                placelhoder="Mario Rossi" 
                :defaultValue="props.card_holder"
                @updateDefaultValue="(e: Event) => $emit('update:card_holder', e)"
                />
            <div class="flex-form">
                <WrapperInput>
                    <Label label="Month"/>
                    <select 
                        name="exp_month"
                        :value="props.card_month_exp"
                        @change="$emit('update:card_month_exp',($event.target as HTMLInputElement).value)"
                    >
                        <option v-for="month in 12" :value="month" :key="month">
                            {{month}}
                        </option>
                    </select>
                </WrapperInput>
                <WrapperInput>
                    <Label label="Year"/>
                    <select 
                        :value="props.card_year_exp"
                        @change="$emit('update:card_year_exp', ($event.target as HTMLInputElement).value)"
                        name="exp_year" 
                        >
                        <option v-for="month in 12" :value="2022 + month" :key="2022 + month">
                            {{ 2022 + month }}
                        </option>
                    </select>
                </WrapperInput>
                <div class="cvv-wrapper" ref="cvv_div" style="max-width: 33%;">
                    <Input
                        :defaultValue="props.card_cvv"
                        mask="####"
                        @updateDefaultValue="(e: Event) => $emit('update:card_cvv', e)"
                        type="text" 
                        label="CVV" placelhoder="cvv" />
                </div>
            </div>
            <button>SUBMIT</button>

        </form>
    </div>
</template>

<style scoped>
    button{
        width: 100%;
        padding:12px;
        color:white;
        text-decoration: none;
        background-color: hsla(160, 100%, 37%, 1);
        transition: 0.2s;
        border-radius: 8px;
        border: none;
        -webkit-box-shadow: 0px 10px 26px 0px rgba(0,0,0,0.34); 
        box-shadow: 0px 10px 26px 0px rgba(0,0,0,0.34);
    }

    @media (hover: hover) {
        button:hover {
            background-color: hsla(160, 100%, 37%, 0.6);
        }
    }
    form{
        width:100%;
        padding:30px;
        margin-top:100px;
    }
    .wrapper{
        width:100%;
        height:400px;
        background-color: white;
        border-radius: 4px;
        color:black;
    }
    select{
        width: 100%;
        padding:8px;
        border-radius:4px;
        background-color: white;
        border: 1px solid #ced6e0;
    }
    .flex-form{
        display:flex;
        justify-content: center;
        gap: 8px;
    }
    .cvv-wrapper:focus-within{
        color:red;
    }
</style>