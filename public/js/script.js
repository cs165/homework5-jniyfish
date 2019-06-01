//
// You should NOT have to modify this file for the assignment!
//

(() => {
    async function onSubmit(event) {
        event.preventDefault();
        const resultsDiv = document.querySelector('#results');
        const nameListDiv = document.querySelector('#NameList');
        const uName = document.querySelector('#userName');
        resultsDiv.innerHTML = '';

        const info = getParameters();

        const response = await fetch(info.path, info.options);
        const json = await response.json();
        var obj = document.getElementById("LIST");
        var obj2 = document.getElementById("NLIST");
        if (obj2 != null) {
            var par = obj2.parentNode;
            var fc = par.firstChild;
        }
        while (fc) {
            par.removeChild(fc);
            fc = par.firstChild;
        }

        console.log(json);
        for (let i of Object.keys(json)) {

            let node = document.createElement("div");
            let node2 = document.createElement("div");
            let text1 = document.createTextNode(json[i].name + "/" + json[i].email + "/" + json[i].number);
            let text2 = document.createTextNode(json[i].name);
            console.log(i);
            if (json[i].owner == uName.value) {
                node.setAttribute("id", "LIST");
                node2.setAttribute("id", "NLIST");
                node.appendChild(text1);
                node2.appendChild(text2);
                resultsDiv.appendChild(node);
                nameListDiv.appendChild(node2);
            }
        }

        // const resultsContainer = document.querySelector('#results-container');
    }


    function addKeyValueInput() {
        const container = document.createElement('div');
        container.className = 'body-row';

        const key = document.createElement('input');
        key.type = 'text';
        key.className = 'key';
        key.placeholder = 'key';

        const value = document.createElement('input');
        value.type = 'text';
        value.className = 'value';
        value.placeholder = 'value';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            container.remove();
            createRequestPreview();
        });

        container.append(key);
        container.append(' : ');
        container.append(value);
        container.append(removeButton);
        const keysContainer = document.querySelector('#key-values');
        keysContainer.append(container);
    }

    function getParameters() {
        const path = pathInput.value.trim();

        const index = methodInput.selectedIndex;
        const method = methodInput.options[index].value;
        const options = {
            method: method
        };

        const bodyDataContainer = document.querySelector('#key-values');
        const allRows = bodyDataContainer.querySelectorAll('.body-row');
        const bodyObj = {};
        for (let i = 0; i < allRows.length; i++) {
            const row = allRows[i];
            const keyInput = row.querySelector('.key').value.trim();
            const valueInput = row.querySelector('.value').value.trim();
            if (keyInput && valueInput) {
                bodyObj[keyInput] = valueInput;
            }
        }
        const bodySize = Object.keys(bodyObj).length;
        if (bodySize > 0) {
            options.body = JSON.stringify(bodyObj);
            options.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
        }
        return { path, options };
    }


    const pathInput = document.querySelector('#path-input');
    const methodInput = document.querySelector('#method-input');

    const addButton = document.querySelector('#add-button');
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        addKeyValueInput();
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', onSubmit);
    const form2 = document.querySelectorAll('form')[1];
    form2.addEventListener('submit', onSubmit);

})();

function getText() {

    var text = document.getElementById('fake').value; 
    let uName = document.querySelector('#userName');
    document.getElementById('path-input').value ="/api/"+uName.value+"/"+text;

}
