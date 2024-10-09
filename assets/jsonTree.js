class JSONTreeViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    createTreeView(data) {
        this.container.innerHTML = '';
        const tree = document.createElement('ul');
        tree.className = 'json-tree';
        this.createNode(data, tree, 'root');
        this.container.appendChild(tree);
    }

    createNode(data, parentEl, key) {
        const li = document.createElement('li');
        const keyElement = document.createElement('span');
        keyElement.className = 'json-key';
        keyElement.textContent = key;
        li.appendChild(keyElement);

        if (this.isExpandable(data)) {
            const toggleBtn = document.createElement('span');
            toggleBtn.className = 'toggle-btn';
            toggleBtn.textContent = '▶';
            li.insertBefore(toggleBtn, keyElement);

            const childrenContainer = document.createElement('ul');
            childrenContainer.className = 'json-children collapsed';

            if (Array.isArray(data)) {
                keyElement.textContent += ` [${data.length}]`;
                data.forEach((item, index) => {
                    this.createNode(item, childrenContainer, index);
                });
            } else {
                keyElement.textContent += ' {';
                for (let prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        this.createNode(data[prop], childrenContainer, prop);
                    }
                }
                const closingBrace = document.createElement('li');
                closingBrace.textContent = '}';
                childrenContainer.appendChild(closingBrace);
            }

            li.appendChild(childrenContainer);

            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                childrenContainer.classList.toggle('collapsed');
                toggleBtn.textContent = childrenContainer.classList.contains('collapsed') ? '▶' : '▼';
            });
        } else {
            const valueElement = document.createElement('span');
            valueElement.className = 'json-value';
            valueElement.textContent = JSON.stringify(data);
            li.appendChild(document.createTextNode(': '));
            li.appendChild(valueElement);
        }

        parentEl.appendChild(li);
    }

    isExpandable(data) {
        return (typeof data === 'object' && data !== null && Object.keys(data).length > 0) || 
               (Array.isArray(data) && data.length > 0);
    }

    loadJSONFromFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                this.createTreeView(jsonData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                this.container.innerHTML = '<p class="error">Error parsing JSON file. Please ensure it\'s a valid JSON.</p>';
            }
        };
        reader.readAsText(file);
    }
}