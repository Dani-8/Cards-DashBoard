let addCardBtn = document.getElementById("add-card-btn")

let cardContainer = document.getElementById("card-cont")
let noCardMsg = document.getElementById("no-cards-msg")
let cardTitle = document.getElementById("card-title")
let cardDesc = document.getElementById("card-description")
let cardDate = document.getElementById("card-date")
let categoryCheckBoxCont = document.getElementById("category-chkbox-cont")
let cancelCardBtn = document.getElementById("cancel-card-btn")
let saveCardBtn = document.getElementById("save-card-btn")


// MODAL
let modal = document.getElementById("modal-cont")
let cards =[]
// let addCardBtn = document.getElementById("add-card-btn")


// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------



/**
 * RENDER ALL CARDS FROM "CARDS" ARRAY ON TO MAIN DISPLAY
 */

function renderCards(){
    cardContainer.innerHTML = ""

    if(cards.lenght > 0 ){
        noCardMsg.classList.remove("hidden")
    }else{
        noCardMsg.classList.add("hidden")
    }



    // LOOP THROUGH EACH CARDS-----CREATE HTML ELEMENT FOR EACH
    cards.forEach(card => {
        let cardElement = document.createElement("div")
        cardElement.classList.add("card-element")

    })

}




































