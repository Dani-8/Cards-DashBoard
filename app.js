let addCardBtn = document.getElementById("add-card-btn")

let cardContainer = document.getElementById("card-cont")
let noCardMsg = document.getElementById("no-cards-msg")
let cardForm = document.getElementById("card-form")
let cardTitle = document.getElementById("card-title")
let cardDesc = document.getElementById("card-description")
let cardDate = document.getElementById("card-date")
let categoryCheckBoxCont = document.getElementById("category-chkbox-cont")
let cancelCardBtn = document.getElementById("cancel-card-btn")
let saveCardBtn = document.getElementById("save-card-btn")


// MODAL
let modal = document.getElementById("modal-cont")
let modalTitle = document.getElementById("modal-title")
let cards =[]
// let addCardBtn = document.getElementById("add-card-btn")


// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------



//EVENT LISTENER

// addCardBtn.addEventListener("click", 

saveCardBtn.addEventListener("click", e => {

    let name = cardTitle.value.trim()
    let desc = cardDesc.value.trim()
    let date = cardDate.value
    let selectedCategories = Array.from(categoryCheckBoxCont.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value)

    let newCard = {
        id: index,
        name,
        desc,
        date,
        categories:selectedCategories 
    }

    cards.unshift(newCard)

})








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
    cards.forEach((card, index) => {
        let cardElement = document.createElement("div")
        cardElement.classList.add("card-element")
        cardElement.dataset.index = index


        // Date Format For Display
        let formattedDate = card.DateTime
        ? new Date(card.dateTime).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        })
        : "No date Set"


        /**
         * Badge Colors for Categories
         */
        // Classes for Categories in Object
        let badgeColors = {
            Work: 'work-badge',
            Personal: 'personal-badge',
            Urgent: 'urgent-badge',
            Ideas: 'ideas-badge'
        }

        // THOSE SELECTED CATEGORIES GET THEIR CLASS HERE!!!
        let categoryBadges = card.categories.map(cat => {
            let badgeClass = badgeColors[cat] || "default-badge"

            return `<span class="${badgeClass}">${cat}</span>`
        }).join("")



        // BUILD THE CARD ELEMENT
        cardElement.innerHTML = `
            <div class="card-element">
            <h2>${card.name}</h2>
            <p>${card.desc}</p>
            <div class="category-badge">${categoryBadges}</div>
            <p><i class="far fa-calendar-alt mr-1"></i>${formattedDate}</p>
            <div class="card-element-btns-cont">
                <button class="edit-btn"><i class="fas fa-edit"></i>Edit</button>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i>Delete</button>
            </div>
        </div>
        `


        cardElement.querySelector(".edit-btn").addEventListener("click", () => openModal(card))
        cardElement.querySelector(".delete-btn").addEventListener("click", () => openConfirmationModal(card))


        cardContainer.appendChild(cardElement)
    })

}


function deleteCard(index){
    let cardElement = cardContainer.querySelector(`[data-index="${index}"]`)

    if(cardElement){
        // APPLY FADE-OUT ANIMATION BEFORE REMOVE
        cardElement.classList.remove("fade-in")
        cardElement.classList.add("fade-out")

        setTimeout(() => {
            cards.splice(index, 1)
            renderCards()

        }, 300)
    }else{
        cards.splice(index, 1)
        renderCards()
    }
}




// MODAL CONTROLS
/**
 * OPEN MODAL FOR ADDING NEW CARD OR EDITING EXISTING CARD
*/

function openModal(cardIndex = null){
    cardForm.reset()

    // UNCHECK ALL CATEGORIES FIRST
    categoryCheckBoxCont.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
        checkbox.checked = false
    })

    if(cardIndex !== null){
        editingCardIndex = cardIndex
        let cardData = cards[cardIndex]
        modalTitle.textContent = "Edit Card"

        cardTitle.value = cardData.name
        cardDesc.value = cardData.desc
        cardDate.value = cardData.date || ""

        cardData.categories.forEach(cat => {
            let checkbox = categoryCheckBoxCont.querySelectorAll(`input[type=checkbox][value="${cat}"]`)
            if(checkbox){
                checkbox.checked = true
            }
        })
    }else{
        editingCardIndex = null
        modalTitle.textContent = "Add New Card"
    }

    modal.classList.remove("hidden")
    setTimeout(() => {
        modal.classList.add("modal-active")
    }, 10)
}




function closeModal(){
    modal.classList.remove("modal-active")
    setTimeout(() => {
        modal.classList.add("hidden")
        editingCardIndex = null
        cardForm.reset()
    }, 300)
}


























