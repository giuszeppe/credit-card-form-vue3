<script setup lang="ts">
  import { reactive } from 'vue';
import CardDisplay from './components/card/CardDisplay.vue'
  import CardInput from './components/card/CardInput.vue'
  import {Card} from './Card'

  const props: Card = reactive({
      card_number: '000000000000000000',
      card_holder: 'Mario Rossi',
      card_month_exp: 12,
      card_year_exp: 2023,
      card_cvv: 1234,
      cvv_focus: false
  })
  const handle_focusin = (e: Event) => {
    props.cvv_focus = true;
  }
    const handle_focusout = (e: Event) => {
    props.cvv_focus = false;
  }

</script>

<template>
  <main>
    <div class="wrapper">
      <CardDisplay 
        :card_number="props.card_number"
        :card_holder="props.card_holder"
        :card_month_exp="props.card_month_exp"
        :card_year_exp="props.card_year_exp"
        :card_cvv="props.card_cvv"
        :cvv_focus="props.cvv_focus"
        />
      <CardInput 
        v-model:card_number="props.card_number"
        v-model:card_holder="props.card_holder"
        v-model:card_month_exp="props.card_month_exp"
        v-model:card_year_exp="props.card_year_exp"
        v-model:card_cvv="props.card_cvv"
        @focusin_cvv="handle_focusin"
        @focusout_cvv="handle_focusout"
      />
    </div>
  </main>
</template>

<style scoped>

main{
  height: 100vh;
  width: 100vw;
  padding:50px;
}
div{
  margin: 0 auto;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
}
</style>
