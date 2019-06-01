
class App {
    constructor() {
        this.Submit = this.Submit.bind(this);


        var menuElement = document.querySelector('#menu');
        menuElement.addEventListener('submit', this.Submit);

        var addBElement = document.querySelector('#main');
        this.addB = new AddressBook(addBElement);
        this.MenuScreen = new MenuScreen(menuElement);

        var editElement = document.querySelector('#editmenu');
        this.EditScreen = new EditMenu(editElement);

        this.to_Edit = this.to_Edit.bind(this);
        this.to_AddBook = this.to_AddBook.bind(this);
        document.addEventListener('edit_open', this.to_Edit);
        document.addEventListener('add_open', this.to_AddBook);
    }
    Submit(event) {
        event.preventDefault();
        this.MenuScreen.hide();
        this.addB.show();
    }
    to_Edit(event) {
        this.addB.hide();
        this.EditScreen.show(event.detail);
    }
    to_AddBook(event) {
        this.EditScreen.hide();
        this.addB.show();
    }

}
