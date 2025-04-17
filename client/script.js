// PARTE CLIENTE
const BASE_URL = "http://localhost:5376";
const btnCreate = document.getElementById("btn-create");

const createAnimal = () => {
    const nameAnimal = document.getElementById("inputName").value;
    const strengthAnimal = parseInt(
        document.getElementById("inputStrength").value
    );
    const responseDIV = document.getElementById("responseDIV");

    if (nameAnimal && strengthAnimal) {
        document.getElementById("inputName").removeAttribute("style");
        document.getElementById("inputStrength").removeAttribute("style");
        fetch(BASE_URL + "/animals", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                name: nameAnimal,
                strength: strengthAnimal,
            })
        })
            .then(() => {
                responseDIV.innerHTML = "CREATED ANIMAL";
                document.getElementById("inputName").value = "";
                document.getElementById("inputStrength").value = "";
                getAnimals();
            })
            .catch(() => (responseDIV.innerHTML = "ERROR TO CONNECT SERVER"));
    } else {
        if (!nameAnimal) {
            document.getElementById("inputName").style.borderColor = "red";
        }
        if (!strengthAnimal) {
            document.getElementById("inputStrength").style.borderColor = "red";
        }
        responseDIV.innerHTML = "REQUIRED FIELDS";
    }
};

const getAnimals = () => {
    fetch(BASE_URL + "/animals")
        .then((res) => res.json())
        .then((animals) => {
            console.log(animals);
            const animalsContainer = document.getElementById("animalsContainer");
            animalsContainer.innerHTML = "";
            animals.forEach((animal) => {
                animalsContainer.innerHTML += `
                <div id='animal${animal.id}'>${animal.name} - <b>Strength:</b> ${animal.strength}
                <button class='btn-delete' onclick='deleteAnimal(${animal.id})'>DELETE</button>
                <button class='btn-update' onclick='updateAnimal(${JSON.stringify(animal)})'>UPDATE</button>
                </div><br>`;
            });
        });
};

const deleteAnimal = (idAnimal) => {
    fetch(BASE_URL + "/animals/" + idAnimal, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: idAnimal
        }),
    })
    .then(() => getAnimals())
    
};

const updateAnimal = (animal) => {

    const nameToUpdate = prompt("Ingrese un nuevo nombre");
    const strengthToUpdate = Number(prompt("Ingrese una nueva fuerza"));
    const idToUpdate = animal.id;

    if (nameToUpdate || strengthToUpdate) {
        fetch(BASE_URL + "/animals/" + idToUpdate, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameToUpdate,
                strength: strengthToUpdate
            }),
        })
        .then(() => {
            alert(`Animal ${animal.name} updated to ${nameToUpdate}`);
            getAnimals();
        }) 
    } else {
        alert("FIEDLS REQUIRED TO UPDATE");
    }
}

btnCreate.addEventListener("click", createAnimal);
getAnimals();
