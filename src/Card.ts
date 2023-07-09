export interface Card{
    card_number: string,
    card_holder:string,
    card_month_exp: number,
    card_year_exp: number,
    card_cvv: number,
    cvv_focus? : boolean
}