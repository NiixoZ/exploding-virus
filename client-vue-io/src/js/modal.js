class Modal {

    constructor(addModal) {
        if(addModal) {
            this.addModalToDom();
        }
        this.modal = document.querySelector(".modal");
        this.modal.style.display = "none";
        this.content = document.querySelector(".modal-content");
        this.title = document.querySelector(".modal-title");
        this.description = document.querySelector(".modal-description");
        this.closeButton = document.querySelector(".modal-close");
        this.body = document.querySelector(".modal-body");
        this.events();
    }

    addModalToDom() {
        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-body">
                <h1 class="modal-title"></h1>
                <h3 class="modal-description alert info"></h3>
                <span class="modal-content"></span>
                <button class="button modal-close"></button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    setContent(content) {
        this.content.innerHTML = content;
    }

    addContent(content) {
        this.content.innerHTML += content;
    }

    addContentElement(element) {
        this.content.appendChild(element);
    }

    setTitle(title) {
        this.title.innerHTML = title;
    }

    setCloseText(text) {
        this.closeButton.innerHTML = text;
    }

    setDescription(description) {
        this.description.innerHTML = description;
    }

    clear() {
        this.title.innerHTML = "";
        this.description.innerHTML = "";
        this.content.innerHTML = "";
        this.closeButton.innerHTML = "";
    }

    events() {
        // listen for close click
        this.closeButton.addEventListener("click", () => this.close());
        // pushes any key
        document.addEventListener("keyup", (e) => this.keyPressHandler(e));
    }
    
    keyPressHandler(e) {
        if(this.modal.style.display == "none") return;
        
        if (e.keyCode == 27) {
            this.close();
        }
    }
    
    show() {
        this.modal.style.display = "flex";
        return false;
    }
    
    close() {
        this.modal.style.display = "none";
    }
}

export default Modal;