let addCardBtn = document.getElementById("add-card-btn")

let cardsContainer = document.getElementById("card-cont")
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

// CONFIRMATION MODAL
let confirmationModal = document.getElementById("confirmation-modal")
let confirmDeleteBtn = document.getElementById("confirm-delete-btn")
let cancelDeleteBtn = document.getElementById("cancel-delete-btn")

// FILTER/SEARCH
let searchInput = document.getElementById("search-input")
let filterSelect = document.getElementById("filter-select")


let cards = []


// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------



//EVENT LISTENER
document.addEventListener('DOMContentLoaded', filterCards);

addCardBtn.addEventListener("click", () => openModal());
cancelCardBtn.addEventListener("click", closeModal)

modal.addEventListener("click", e => {
    if (e.target === modal) {
        closeModal()
    }
})

cardForm.addEventListener("submit", e => {
    e.preventDefault()

    // Get form values
    let title = cardTitle.value.trim()
    let desc = cardDesc.value.trim()
    let date = cardDate.value
    let selectedCategories = Array.from(categoryCheckBoxCont.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value)


    if(editingCardIndex !== null){
        cards[editingCardIndex] = {
            ...cards[editingCardIndex],
            title,
            desc,
            date,
            categories:selectedCategories
        }
    }else{
        newCard = {
            title,
            desc,
            date,
            categories:selectedCategories,
            createdAt: new Date().toISOString()
        }
        cards.unshift(newCard)
    }
    
    // renderCards()
    filterCards()
    closeModal()

})




// DELETE CONFIRMATION MODAL
confirmationModal.addEventListener("click", e => {
    if (e.target === confirmationModal) {
        closeConfirmationModal()
    }
})

cancelDeleteBtn.addEventListener("click", closeConfirmationModal)

confirmDeleteBtn.addEventListener("click", () => {
    if (cardToDeleteIndex !== null) {
        deleteCard(cardToDeleteIndex)
    }
})




searchInput.addEventListener("input", filterCards)
filterSelect.addEventListener("change", filterCards)

/**
 * RENDER ALL CARDS FROM "CARDS" ARRAY ON TO MAIN DISPLAY
 */

function renderCards(cardToRender = cards){
    cardsContainer.innerHTML = "";

    if (cards.length === 0) {
        noCardMsg.classList.remove("hidden");
    } else {
        noCardMsg.classList.add("hidden");
    }

    cardToRender.forEach((card, index) => {
        let cardElement = document.createElement("div");
        cardElement.classList.add("card-element");
        cardElement.dataset.index = cards.indexOf(card);

        let formattedDate = card.date
            ? new Date(card.date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            })
            : "No date Set";

        let badgeColors = {
            Work: 'work-badge',
            Personal: 'personal-badge',
            Urgent: 'urgent-badge',
            Ideas: 'ideas-badge',
            Fun: 'fun-badge'
        };

        let categoryBadges = card.categories.map(cat => {
            let badgeClass = badgeColors[cat] || "default-badge";
            return `<span class="${badgeClass}">${cat}</span>`;
        }).join("");

        cardElement.innerHTML = `
            <div class="card-content">
                <h2>${card.title}</h2>
                <p>${card.desc}</p>
                <div class="category-badge">${categoryBadges}</div>
                <p class="date"><i class="far fa-calendar-alt mr-1"></i>${formattedDate}</p>
                <div class="card-element-btns-cont">
                    <button class="edit-btn"><i class="fas fa-edit"></i>Edit</button>
                    <button class="delete-btn"><i class="fas fa-trash-alt"></i>Delete</button>
                </div>
            </div>
        `;

    cardElement.querySelector(".edit-btn").addEventListener("click", () => openModal(cards.indexOf(card)));
    cardElement.querySelector(".delete-btn").addEventListener("click", () => openConfirmationModal(cards.indexOf(card)));

    cardsContainer.appendChild(cardElement);
    });


}


function deleteCard(index){
    let cardElement = cardsContainer.querySelector(`[data-index="${index}"]`)

    if(cardElement){
        // APPLY FADE-OUT ANIMATION BEFORE REMOVE
        cardElement.classList.remove("fade-in")
        cardElement.classList.add("fade-out")

        setTimeout(() => {
            cards.splice(index, 1)
            filterCards()
            closeConfirmationModal()
        }, 300)
    }else{
        cards.splice(index, 1)
        filterCards()
        closeConfirmationModal()
    }
}




// MODAL CONTROLS
/**
 * OPEN MODAL FOR ADDING NEW CARD OR EDITING EXISTING CARD
*/

function openModal(cardIndex = null){
    cardForm.reset();

    // UNCHECK ALL CATEGORIES FIRST
    categoryCheckBoxCont.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
        checkbox.checked = false;
    });

    if (cardIndex !== null) {
        editingCardIndex = cardIndex;
        let cardData = cards[cardIndex];
        modalTitle.textContent = "Edit Card";

        cardTitle.value = cardData.title;
        cardDesc.value = cardData.desc;
        cardDate.value = cardData.date || "";

        // Check the checkboxes that match the categories
        cardData.categories.forEach(cat => {
            let checkbox = categoryCheckBoxCont.querySelector(`input[type=checkbox][value='${cat}']`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    } else {
        editingCardIndex = null;
        modalTitle.textContent = "Add New Card";
    }

    modal.classList.remove("hidden");
    setTimeout(() => {
        modal.classList.add("modal-active");
    }, 10);
}




function closeModal(){
    modal.classList.remove("modal-active")
    setTimeout(() => {
        modal.classList.add("hidden")
        editingCardIndex = null
        cardForm.reset()
    }, 300)
}







// CONFIRMATION FOR DELETING THE CARD
function openConfirmationModal(index){
    cardToDeleteIndex = index
    confirmationModal.classList.remove("hidden")

    setTimeout(() => {
        confirmationModal.classList.add("modal-active")
    }, 10)
}



function closeConfirmationModal(){
    confirmationModal.classList.remove("modal-active")

    setTimeout(() => {
        confirmationModal.classList.add("hidden")
        cardToDeleteIndex = null
    }, 10)
}





// FILER/SEARCH
function filterCards(){
    let searchQuery = searchInput.value.toLowerCase()
    let selectedCategoryForFilter = filterSelect.value


    let filteredCards = cards.filter(card => {
        let matchedSearch = card.title.toLowerCase().includes(searchQuery)

        let matchedCategory = selectedCategoryForFilter === "All" || card.categories.includes(selectedCategoryForFilter)

        return matchedSearch && matchedCategory
    })

    renderCards(filteredCards)
}













