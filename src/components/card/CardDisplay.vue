<script setup lang="ts">
// Images import
    import FrontBGImage from '../../assets/img/card-bg.jpeg'
    import Chip from '../../assets/img/chip.png'
    import AMEX from '../../assets/img/amex.png'
    import VISA from '../../assets/img/visa.png'
    import MASTERCARD from '../../assets/img/mastercard.png'
    import DISCOVER from '../../assets/img/discover.png'
    //Function import
    import {Mask} from 'maska'
    import { computed } from 'vue'
    import { type Card} from '../../Card'

    const props = defineProps<Card>()
    const card_number_masked = computed<string>(() => {
        let maskedOne = ""
        const mask = new Mask({mask: "#### #### #### ####"})
        let card_number = mask.masked(props.card_number)
        for(let i = 0; i<card_number.length; i++){
            if(i < 4 || i >= 15) maskedOne += card_number[i];
            if(i >= 4 && i < 15) {
                maskedOne = card_number[i] === " " ? maskedOne + " " : maskedOne + "*"
            }

        }
        return maskedOne
    })
    const getCardType = computed(() => {
        let number = props.card_number;

        let re = new RegExp("^(34|37)");
        if (number.match(re) != null) return AMEX;

        re = new RegExp("^4");
        if (number.match(re) != null) return VISA;

        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) return MASTERCARD;

        re = new RegExp("^6011");
        if (number.match(re) != null) return DISCOVER;

        return VISA; // default type
})

</script>

<template>
    <div class="wrapper wrapper-img card-inner" :class="{flipped: props.cvv_focus}" :style="{backgroundImage: `url(${FrontBGImage})`}">
        <div class="card-front">
            <div class="image-container">
                <img class="chip" :src="Chip"/>
                <img class="circuit" :src="getCardType"/>
            </div>
            <div class="card-number">
                <pre>{{card_number_masked}}</pre>
            </div>
            <div class="card-infos">
                <div class="card-info-wrapper">
                    <h6>Card Holder</h6>
                    <p>{{ props.card_holder }}</p>
                </div>
                <div class="card-info-wrapper">
                    <h6>Expires</h6>
                    <p> {{props.card_month_exp }}/{{ props.card_year_exp }}</p>
                </div>
            </div>
        </div>
        <div class="card-back wrapper-img" :style="{ backgroundImage: `url(${FrontBGImage})` }">
            <div class="card-info-wrapper card_cvv">
                    <h6>CVV</h6>
                    <p>{{props.card_cvv}}</p>
            </div>
            <img class="circuit" :src="getCardType" />
        </div>
    </div>
</template>

<style scoped>
    .wrapper{
        width: 80%;
        height:200px;
        background-color: brown;
        margin-bottom: -100px;
        z-index: 1000;
        border-radius: 5%;
        -webkit-box-shadow: 0px 10px 26px 0px rgba(0,0,0,0.34); 
        box-shadow: 0px 10px 26px 0px rgba(0,0,0,0.34);
        padding:20px;
    }
    .card-inner{
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }
    .card-inner:hover, .flipped {
        transform: rotateY(180deg);
    }
    .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        padding: 20px;
        border-radius: 5%;
    }
    .card-back {
        color: white;
        transform: rotateY(180deg);
        img{
            float:right;
            margin-top:20px;
        }
    }
    .card-front{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
    }
    .wrapper-img {
        background-position: center;
        background-size: cover;
    }
    .chip{
        height:30px;
        width: 40px;
    }
    .circuit{
        width:32px;
        height:32px;
    }
    .image-container{
        width: 100%;
        display:flex;
        justify-content: space-between;
    }
    .card-number{
        min-height: 24px;
        text-align: left;
        width:100%;
        pre {
            font-size: larger;
            font-weight: 400;
            color:white;
        }
    }
    .card-infos{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .card-info-wrapper{
        display:flex;
        flex-direction: column;
        color:white;

        h6 {
            font-weight: 400;
            font-size: 0.7em;
        }
        p{
            font-weight: 400;
            font-size: 0.9em;
            text-transform: uppercase;
        }
    }
    .card_cvv{
        text-align: right;
        p{
            background-color: white;
            color:black;
            width:100%;
            padding:5px;
            border-radius: 5px;
            margin-top:2px;
        }
    }

</style>