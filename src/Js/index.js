const fieldValues = {
    name: undefined,
    times: [],
    day: undefined,
};
const menu = document.getElementById("menu");
const tableobj = [{
    name: "Ali",
    surname: "Aghayev",
    phone: "0553953610",
    days: [
        [
            "11:30-14:50",
            "14:30-14:50",
        ],
        [

        ],
        [

        ],
        [

        ],
        [

        ],
        [
            "00:00-12:00",
        ],
        [

        ]
    ]
}, {
    name: "Ali",
    surname: "Aghayev",
    phone: "0553953610",
    days: [
        [
            "11:30-14:50",
            "14:30-14:50",
        ],
        [

        ],
        [

        ],
        [

        ],
        [

        ],
        [
            "00:00-12:00",
        ],
        [

        ]
    ]
}];


class TableControl {
    BUTTON = {
        table_add: undefined,
        table_delete: undefined,
        page_add: undefined,
        page_close: undefined,
    };
    STATE = 0;
    TABLE = null;
    MENU = null;
    ADD_PAGE = null;
    ADD_PAGE_INPUT = null;
    darkBackground = null;
    constructor(table_id, table_add_btn_id, del_btn_name, menu_name, add_page_name, cls_btn_name, background_name, add_page_time_id, add_page_button_id) {
        this.table = document.getElementById(table_id);
        this.addBtn = document.getElementById(table_add_btn_id);
        this.delBtn = document.getElementById(del_btn_name);
        this.menu = document.getElementById(menu_name);
        this.addPage = document.getElementById(add_page_name)
        this.closeBtn = document.getElementById(cls_btn_name);
        this.darkBackground = document.getElementById(background_name);
        this.addPageButton = document.getElementById(add_page_button_id);
        this.addPageInput = document.getElementById(add_page_time_id);
    };
    loadTableFromLocalStorage() {
        let temp = "";
        for (let index in tableobj) {
            temp += `<tr id = "${index}" class="table__times">`
            temp += this.addToTable(tableobj[index]);
            temp += `</tr>`;

        }
        this.table.innerHTML += temp;
    }
    addToTable(par) {
        let temp = `<td style="background-color: transparent;color: black;">${par.name}</td>`;
        for(let i in par.days){
            temp += `<td class ="day${i}">`;
            for (let j in par.days[i]) {
                temp += `<p>${par.days[i][j]}</p>`
            }
            temp += `</td>`;
        }
        return temp;
    }
    addEvents() {
        document.addEventListener('click', (e) => {
            if (!this.state) {
                if (e.target.tagName === "TD") {
                    menu.classList.toggle("menu-not");
                    menu.style.left = e.clientX + 10 + "px";
                    menu.style.top = e.clientY + 10 + "px";
                    this.state = 1;
                    this.getValues(e.target);
                    this.setValues();
                }
            } else if (this.state == 1) {
                menu.classList.toggle("menu-not");
                this.state = 0;
            }
            if (e.target.getAttribute("id") === "addBtn1") {
                this.openAddPage();
            } else if (e.target.getAttribute("id") === "closeBtn") {
                this.closeAddPage();
            } else if (e.target.getAttribute("id") === "addpage__btn") {
                if (this.addPageInput.value) {
                    this.closeAddPage();
                    this.addNewTime(fieldValues.name, this.addPageInput.value);
                }
            }
        })
    }
    getName(name) {
        for (let item in tableobj) {
            if (tableobj[item].name === name)
                return item;
        }
    }
    openAddPage() {
        this.addPage.classList.remove("displaynone");
        this.darkBackground.classList.remove("displaynone");
    }
    closeAddPage() {
        this.addPage.classList.add("displaynone");
        this.darkBackground.classList.add("displaynone");
    }
    resetValues() {

    }
    getValues(par) {
        fieldValues.day = par.getAttribute('class').slice(3, 4);
        fieldValues.name = par.parentNode.children[0].textContent;
    }
    setValues() {
        this.addPage.children[1].children[1].textContent = fieldValues.name;
        this.addPage.children[2].children[1].textContent = Number(fieldValues.day) + 1;
    }
    addNewTime(par, value) {
        console.log(this.table.children[1].children[getName(par)])
        console.log(this.table.children[1].children[getName(par) + 1].children[Number(fieldValues.day) + 1].innerHTML += `<p>${value}</p>`);
    }
    updateMenu(){
        
    }
}
const tableControl = new TableControl("full-table", "addBtn1", "delBtn1", "menu", "addpage", "closeBtn", "background", "addpage__time", "addpage__btn");
tableControl.loadTableFromLocalStorage();
tableControl.addEvents();