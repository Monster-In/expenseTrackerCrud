document.addEventListener('submit', (e) => {
    e.preventDefault();

    var money = e.target.money.value;
    var description = e.target.description.value;
    var category = e.target.category.value;

    var obj = {
        money: `${money}`,
        description: `${description}`,
        category: `${category}`
    }
    axios.post(`https://crudcrud.com/api/d042f2684a04412e8eb9b71591513b7e/expenses`,{obj})
    .then((response) => {
        showDetailsOnDisplay(response.data)
    })

})

window.addEventListener('DOMContentLoaded',(e) => {
    e.preventDefault()

    axios.get(`https://crudcrud.com/api/d042f2684a04412e8eb9b71591513b7e/expenses`)
    .then((response) => {
        console.log(response)
        let data = response.data;
        for(let i=0;i<data.length;i++){
            showDetailsOnDisplay(response.data[i])
        }
    })
})

function showDetailsOnDisplay(data) {
    axios.get(`https://crudcrud.com/api/d042f2684a04412e8eb9b71591513b7e/expenses/${data._id}`)
    .then((response) => {
        console.log(response)
        var parentNode = document.getElementById('resultContainer');
        var childNode = `<li id=${data._id}>${data.obj.money} Rupees for ${data.obj.description}-${data.obj.category}
                        <button id="editBtn" onclick="editData('${data._id}')">Edit</button>
                        <button id="deleteBtn" onclick="deleteData('${data._id}')">X</button>
                        </li>`
        parentNode.innerHTML += childNode;
        document.getElementById('money').value = ""
        document.getElementById("description").value = ""
    })
}

function deleteData(userId){
    axios.delete(`https://crudcrud.com/api/d042f2684a04412e8eb9b71591513b7e/expenses/${userId}`)
    .then(() => {
        deleteDataFromDisplay(userId)
    })
    .catch((err)=>{
        console.log(err)
    })
}

function deleteDataFromDisplay(userId){
    let parentNode  = document.getElementById("resultContainer")
    let childNode = document.getElementById(userId)
    parentNode.removeChild(childNode)
}

function editData(userId){
    axios.get(`https://crudcrud.com/api/d042f2684a04412e8eb9b71591513b7e/expenses/${userId}`)
    .then((response) => {
        console.log(response)
        document.getElementById('money').value = response.data.obj.money;
        document.getElementById("description").value = response.data.obj.description;
        document.getElementById('category').value = response.data.obj.category;

        deleteData(userId)
    })
    
}
