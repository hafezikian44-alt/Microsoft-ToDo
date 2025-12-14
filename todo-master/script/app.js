document.getElementById("hideBtn").addEventListener("click", () => {
    document.getElementById("asideLeft").style.display = "none";
    document.getElementById("sunIcon").style.display = "none";
    document.getElementById("showAsideBtn").style.display = "inline-block";
    document.getElementById("date").style.display = "inline-block";
});
document.getElementById("showAsideBtn").addEventListener("click", () => {
    document.getElementById("asideLeft").style.display = "inline-block";
    document.getElementById("sunIcon").style.display = "inline-block";
    document.getElementById("showAsideBtn").style.display = "none";
});

document.getElementById("suggestoinBtn").addEventListener("click", () => {
    document.getElementById("asideRight").style.display = "inline-block";
    document.getElementById("Suggestion").style.display = "inline-block";
    document.getElementById("todoDetails").style.display = "none";
});
document.getElementById("suggestionCloseBtn").addEventListener("click", () => {
    document.getElementById("asideRight").style.display = "none";
});
document.getElementById("todoForm").addEventListener("click", () => {
    document.getElementById("todoContent").style.display = "inline-block";
});

const createTodoBtn = document.getElementById("createTodoBtn");
const taskInput = document.getElementById("taskInput");
const form = document.getElementById("todoForm");
const todoContaner = document.getElementById("todoContaner");
let todoArrey = [];

const currentUser = JSON.parse(localStorage.getItem("currentUser"));


let selectedTodoID = null;

/* =========================
   LOAD TODOS
========================= */
document.addEventListener("DOMContentLoaded", () => {
    let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

    todoArrey = allTodos.filter(todo => todo.userId === currentUser.name);

    todoArrey.forEach(todoObject => {
        addTodoToDOM(todoObject);
    });
});

taskInput.addEventListener("input", () => {
    createTodoBtn.disabled = taskInput.value === "";
});

/* =========================
   CREATE TODO
========================= */
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let todoValue = taskInput.value.trim();

    let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

    let todoObject = {
        id: Date.now(),
        todoTitle: todoValue,
        isComplete: false,
        userId: currentUser.name 
    };

    allTodos.push(todoObject);
    localStorage.setItem("todos", JSON.stringify(allTodos));

    todoArrey.push(todoObject);
    addTodoToDOM(todoObject);

    taskInput.value = "";
});

/* =========================
   CREATE TODO DOM
========================= */
function addTodoToDOM(todoObject) {
    const todoDiv = document.createElement("div");
    todoDiv.id = `todo${todoObject.id}`;
    todoDiv.className = "todo";

    todoDiv.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <label class="circle-container">
                <input type="checkbox" ${todoObject.isComplete ? 'checked' : ''}> 
                <span class="circle"></span>
            </label>
            <div>
                <p class="m-0 ${todoObject.isComplete ? 'completed' : ''}">${todoObject.todoTitle}</p> 
                <small class="m-0 text-secondary">Tasks</small>
            </div>
        </div>
        <label class="star-checkbox">
            <input type="checkbox">
            <span class="star"></span>
        </label>`;

    const checkbox = todoDiv.querySelector(".circle-container input"); 

    
    checkbox.addEventListener("change", () => {
        todoObject.isComplete = checkbox.checked;

        let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
        let index = allTodos.findIndex(t => t.id === todoObject.id);
        if (index !== -1) {
            allTodos[index].isComplete = todoObject.isComplete;
            localStorage.setItem("todos", JSON.stringify(allTodos));
        }

        const textP = todoDiv.querySelector("p");
        if (checkbox.checked) {
            textP.classList.add("completed");
        } else {
            textP.classList.remove("completed");
        }

        // update checkbox in todo details if open
        const detailCheckbox = document.getElementById("todoDetailCheckbox");
        if (detailCheckbox && selectedTodoID === todoObject.id) {
            detailCheckbox.checked = checkbox.checked;
        }
    });

    
    todoDiv.addEventListener("click", () => {
        document.getElementById("asideRight").style.display = "inline-block";
        document.getElementById("todoDetails").style.display = "inline-block";
        document.getElementById("Suggestion").style.display = "none";

        const todoTitleDetails = document.getElementById("todoTitleDetails");
        todoTitleDetails.innerText = todoObject.todoTitle;

        // set checkbox in details
        let detailCheckbox = document.getElementById("todoDetailCheckbox");
        if (!detailCheckbox) {
            
            const detailsContainer = todoTitleDetails.parentElement;
            const checkboxLabel = document.createElement("label");
            checkboxLabel.className = "circle-container me-2";

            detailCheckbox = document.createElement("input");
            detailCheckbox.type = "checkbox";
            detailCheckbox.id = "todoDetailCheckbox";
            detailCheckbox.checked = todoObject.isComplete; 

            const circleSpan = document.createElement("span");
            circleSpan.className = "circle";

            checkboxLabel.appendChild(detailCheckbox);
            checkboxLabel.appendChild(circleSpan);

            detailsContainer.insertBefore(checkboxLabel, todoTitleDetails);
        } else {
            detailCheckbox.checked = todoObject.isComplete;
        }

        selectedTodoID = todoObject.id;

        detailCheckbox.onchange = () => {
            todoObject.isComplete = detailCheckbox.checked;
            checkbox.checked = detailCheckbox.checked;

            let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
            let index = allTodos.findIndex(t => t.id === todoObject.id);
            if (index !== -1) {
                allTodos[index].isComplete = todoObject.isComplete;
                localStorage.setItem("todos", JSON.stringify(allTodos));
            }

            const textP = todoDiv.querySelector("p");
            if (detailCheckbox.checked) {
                textP.classList.add("completed");
            } else {
                textP.classList.remove("completed");
            }
        };
    });

    todoContaner.appendChild(todoDiv);
}

/* =========================
   DELETE TODO
========================= */
document.getElementById("deleteTodoBtn").addEventListener("click", () => {
    if (selectedTodoID === null) return;

    let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

    allTodos = allTodos.filter(todo => todo.id !== selectedTodoID);
    localStorage.setItem("todos", JSON.stringify(allTodos));

    todoArrey = todoArrey.filter(todo => todo.id !== selectedTodoID);

    const element = document.getElementById(`todo${selectedTodoID}`);
    if (element) element.remove();

    document.getElementById("asideRight").style.display = "none";
    selectedTodoID = null;
});

document.getElementById("todoDetailsCloseBtn").addEventListener("click", () => {
    document.getElementById("asideRight").style.display = "none";
    document.getElementById("todoDetails").style.display = "none";
});
