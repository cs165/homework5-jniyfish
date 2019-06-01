class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

  }
  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

}


class AddressBook {
  constructor(containerElement) {
    this.containerElement = containerElement;
    var button = document.querySelector('#button');

    let node1 = document.createElement("button");
    let text1 = document.createTextNode("change user");
    let node2 = document.createElement("button");
    let text2 = document.createTextNode("delete");
    let node3 = document.createElement("button");
    let text3 = document.createTextNode("new friend");

    node1.classList.add('button');
    node2.classList.add('button');
    node3.classList.add('button');
    node1.appendChild(text1);
    button.appendChild(node1);
    node2.appendChild(text2);
    button.appendChild(node2);
    node3.appendChild(text3);
    button.appendChild(node3);

    node1.addEventListener("click", this.toEdit);
    node2.addEventListener("click", this.toEdit);
    node3.addEventListener("click", this.toEdit);

  }
  toEdit(event) {
    document.dispatchEvent(new CustomEvent('edit_open', { 'detail': this.textContent }));
  }
  show() {
    this.containerElement.classList.remove('inactive');
    let userAddB = document.querySelector('#user');
    let username = document.querySelector('input');
    userAddB.textContent = username.value + "'s Address Book ";
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
}

class EditMenu {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.Submit=this.Submit.bind(this);
    this.containerElement.addEventListener('submit', this.Submit);
    this.string="";
    this.times=0;

  }
  show(input) {
    this.containerElement.classList.remove('inactive');
    if (input == "delete") {
      let input = document.querySelector('#input');
     
      this.string="delete";
      var all_options = document.getElementById("method-input").options;
      for (var i = 0; i < all_options.length; i++) {
        if (all_options[i].id == "DELETE") {
          all_options[i].selected = true;
        }
      }
      input.textContent = "Delete name : ";
      document.getElementById('path-input').value ="/api/roweqiuriwoudfjlsa/dfadsfs";
      if(this.times==1)
        this.preDel();
    }
    else if (input == "new friend") {
      
      this.string="new friend";
      let input = document.querySelector('#path-input');
      input.value="/api"
      var all_options = document.getElementById("method-input").options;
      for (var i = 0; i < all_options.length; i++) {
        if (all_options[i].id == "POST") {
          all_options[i].selected = true;
        }
      }
      if(this.times==0){
      this.PostBox("owner","");
      this.PostBox("name","");
      this.PostBox("email","");
      this.PostBox("number","");
      this.times=1; 
      }     
      this.prePost();
    }
    else{
      history.go(0);
    }
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
  Submit(event) {
    event.preventDefault();
    console.log("submit");
    document.dispatchEvent(new CustomEvent('add_open'));
  }
  PostBox(input,input2)
  {
    const container = document.createElement('div');
    container.className = 'body-row';

    const key = document.createElement('input');
    key.type = 'text';
    key.className = 'key';
    key.placeholder = 'key';
    key.setAttribute("value",input);
    key.setAttribute("id",input);

    const value = document.createElement('input');
    value.type = 'text';
    value.className = 'value';
    value.placeholder = 'value';
    value.setAttribute("value",input2);
    value.setAttribute("id",input+"v");

    container.append(key);
    container.append(' : ');
    container.append(value);
    const keysContainer = document.querySelector('#key-values');
    keysContainer.append(container);
  }
  preDel()
  {
    let input = document.querySelector('#fake');
    input.classList.remove('inactive'); 
    let fake = document.querySelector('#input');
    fake.classList.remove('inactive'); 
    document.querySelector('#key-values').setAttribute("class","inactive");
    let init1 = document.querySelector('#name');
    let init2 = document.querySelector('#email');
    let init3 = document.querySelector('#number');
    let init4 = document.querySelector('#owner');

    init1.setAttribute("value","");
    init2.setAttribute("value","");
    init3.setAttribute("value","");
    init4.setAttribute("value","");

    let v1 = document.querySelector('#namev');
    let v2 = document.querySelector('#emailv');
    let v3 = document.querySelector('#numberv');
    let v4 = document.querySelector('#ownerv');
    v1.setAttribute("value","");
    v2.setAttribute("value","");
    v3.setAttribute("value","");
    v4.setAttribute("value","");
    
  }
  prePost()
  {
    document.querySelector('#key-values').classList.remove('inactive');
    let bodyrow = document.querySelector('.body-row');
    bodyrow.classList.add('inactive');

    let init1 = document.querySelector('#name');
    let init2 = document.querySelector('#email');
    let init3 = document.querySelector('#number');
    let init4 = document.querySelector('#owner');
    
    init1.setAttribute("value","name");
    init2.setAttribute("value","email");
    init3.setAttribute("value","number");
    init4.setAttribute("value","owner");

    let v1 = document.querySelector('#namev');
    let v2 = document.querySelector('#emailv');
    let v3 = document.querySelector('#numberv');
    let v4 = document.querySelector('#ownerv');
    let uName = document.querySelector('#userName');
    v1.setAttribute("value","");
    v2.setAttribute("value","");
    v3.setAttribute("value","");
    v4.setAttribute("value",uName.value);

    let input = document.querySelector('#fake');
    input.classList.add('inactive'); 
    let fake = document.querySelector('#input');
    fake.classList.add('inactive'); 

    let output = document.querySelector('#path-input');
    output.setAttribute("value", "/api");
  }

}
