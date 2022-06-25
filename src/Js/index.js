const fieldValues = {
    name:undefined,
    times:[],
    day:undefined,
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
    state = 0;
    table = null;
    addBtn = null;
    delBtn = null;
    menu = null;
    addPage = null;
    closeBtn = null;
    darkBackground = null;
    constructor(table_name, add_btn_name, del_btn_name, menu_name,add_page_name,cls_btn_name,background_name) {
        this.table = document.getElementById(table_name);
        this.addBtn = document.getElementById(add_btn_name);
        this.delBtn = document.getElementById(del_btn_name);
        this.menu = document.getElementById(menu_name);
        this.addPage = document.getElementById(add_page_name)
        this.closeBtn = document.getElementById(cls_btn_name);
        this.darkBackground = document.getElementById(background_name);
    };
    loadTableFromLocalStorage() {
        let data = tableobj;
        let text = "";
        for (let i = 0; i < data.length; ++i) {
            text += `<tr class="table__times">`
            text += this.addToTable(data[i]);
            text += `</tr>`;
        }
        this.table.innerHTML += text;
    }
    addToTable(par) {
        let days = par.days;
        let text = `<td style="background-color: transparent;color: black;">${par.name}</td>`;
        for (let i = 0; i < days.length; ++i) {
            text += `<td class ="day${i}">`;
            for (let j = 0; j < days[i].length; ++j) {
                text += `<p>${days[i][j]}</p>`
            }
            text += `</td>`;
        }
        return text;
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
            if(e.target.getAttribute("id") === "addBtn1"){
                this.openAddPage();
            }else if(e.target.getAttribute("id") === "closeBtn"){
                this.closeAddPage();
            }
        })
    }
    openAddPage() {
        this.addPage.classList.remove("displaynone");
        this.darkBackground.classList.remove("displaynone");
    }
    closeAddPage() {
        this.addPage.classList.add("displaynone");
        this.darkBackground.classList.add("displaynone");
    }
    resetValues(){

    }
    getValues(par){
        let name = par.parentNode.children[0].textContent;
        let day = par.getAttribute('class').slice(3,4);
        fieldValues.day = day;
        fieldValues.name = name;
    }
    setValues(){
        this.addPage.children[1].children[1].textContent = fieldValues.name;
        this.addPage.children[2].children[1].textContent = Number(fieldValues.day)+1;
    }
    addNewTime(par){
        
    }
}
const tableControl = new TableControl("full-table", "addBtn1", "delBtn1","menu","addpage","closeBtn","background");
tableControl.loadTableFromLocalStorage();
tableControl.addEvents();