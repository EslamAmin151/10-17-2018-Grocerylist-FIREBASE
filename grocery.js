let createCategory = document.querySelector('#createCategory')
let categoryTitleTextBox = document.querySelector('#categoryTitleTextBox')
let groceryList = document.querySelector('.groceryList')
let database = firebase.database()
let categoryItemsRef = database.ref('categories')


// setup observers //
function setupObservers() {

  database.ref("categories").on("value",function(snapshot){
    let categories = []

    for(let key in snapshot.val()) {
      let category = snapshot.val()[key]
      category.id = key //IMPORTAAAAAANT!//
      categories.push(category)
    }
    updateUI(categories)

})


  }

// update the UI //
function updateUI(categories) {
    groceryList.innerHTML = ''
    categories.forEach(function(category){
      let catItem = `<div id="catName">
                      <h3 id="deleteCategory">${category.title}<h3>
                      <span class="fas fa-minus-circle" onclick="deleteCategory('${category.id}')"></span>
                    </div>
                    <div id="itemsList">
                      <ul class="list">
                      <li></li>
                      </ul>
                      </div>
                      <input type="text" id="itemDescription" placeholder="e.g. milk, eggs"/>
                      <input type="text" id="itemQuantity" placeholder="e.g. 2"/>
                      <button id="addItem" onclick="addGroceryItem( '${category.title}')">Add Item</button>
                    </div>`
      groceryList.innerHTML += catItem
      console.log(category.id.title)
    })


  }

// button to create new category //
createCategory.addEventListener('click', function() {
  createCatList ()
  categoryTitleTextBox.value = ''
})

// create new category //
function createCatList() {
  let title = categoryTitleTextBox.value

  database.ref('categories/' + title).set({
    title : title
  })
}

//delete category //
function deleteCategory(categoryId) {
  categoryItemsRef.child(categoryId).remove()
}

// // add grocery items //
function addGroceryItem(title) {
  let description = document.querySelector("#itemDescription").value
  let quantity = document.querySelector("#itemQuantity").value
  let individualItems = document.querySelector(".individualItems")

  database.ref('categories/'+title).push({
      description : description,
      quantity : quantity
  })

}
description = ''
quantity = ''

setupObservers()
