document.addEventListener("DOMContentLoaded", function(event){


let createCategory = document.querySelector('#createCategory')
let categoryTitleTextBox = document.querySelector('#categoryTitleTextBox')
let groceryList = document.querySelector('#groceryList')
let database = firebase.database()
let categoryItemsRef = database.ref('categories')
let categories = []

function displayStores(stores) {

  let liItems = categories.map(function(store) {
    return `<li>${store.name}</li>`
  })

  createCategory.innerHTML = liItems.join('')

}

configureObservers()
groceryList
function configureObservers() {

  database.ref("categories").on("value",function(snapshot){
    let categories = []

    for(let key in snapshot.val()) {
      let category = snapshot.val()[key]
      category.id = key
      categories.push(category)
    }
    console.log(categories)

    renderCategories(categories)
})

}

createCategory.addEventListener('click', function() {

  createAList()

})

function createAList() {
  let title = categoryTitleTextBox.value

  database.ref('categories/' + title).set({
    title : title
  })
}

function deleteCategory(categoryId) {
  categoryItemsRef.child(categoryId).remove()
}

})


function renderCategories(categories) {
    var i = 0
    groceryList.innerHTML = ''
    categories.forEach(function(category){

      let liitems = `<div>
                      <form class="categoryForm" id="form_${i}">
                      <input name="description" type="text" id="itemDescription" placeholder="e.g. milk, eggs"/>
                      <input name="quantity" type="text" id="itemQuantity" placeholder="e.g. 2"/>
                      <button onclick= "addGroceryItem('${category.title}')" id="addItem">Sumbit</button>
                      </form>
                    </div>`
      groceryList.innerHTML += liitems




      i += 1
    })

    $(".categoryForm").submit(function(e){
      e.preventDefault()
      var quantity = e.target.quantity.value
      var description = e.target.description.value

    })


  }

  function addGroceryItem(title) {
    let description = document.querySelector("#itemDescription").value
    let quantity = document.querySelector("#itemQuantity").value
    let individualItems = document.querySelector(".individualItems")

    database.ref('categories/'+title).push({
        description : description,
        quantity : quantity
    })

  }
