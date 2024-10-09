class XMLTreeViewer {
  constructor(containerId) {
      this.container = document.getElementById(containerId);
  }

  parseXML(xmlString) {
      const parser = new DOMParser();
      return parser.parseFromString(xmlString, "text/xml");
  }

  createTreeView(xmlDoc) {
      this.container.innerHTML = '';
      const tree = document.createElement('ul');
      tree.className = 'xml-tree';
      this.createNode(xmlDoc.documentElement, tree);
      this.container.appendChild(tree);
  }

  createNode(element, parentEl) {
      const li = document.createElement('li');
      const keyElement = document.createElement('span');
      keyElement.className = 'xml-tag';
      keyElement.textContent = element.nodeName;
      li.appendChild(keyElement);

      if (element.attributes.length > 0 || element.childNodes.length > 0) {
          const toggleBtn = document.createElement('span');
          toggleBtn.className = 'toggle-btn';
          toggleBtn.textContent = '▶';
          li.insertBefore(toggleBtn, keyElement);

          const childrenContainer = document.createElement('ul');
          childrenContainer.className = 'xml-children collapsed';

          // Add attributes
          Array.from(element.attributes).forEach(attr => {
              const attrLi = document.createElement('li');
              attrLi.innerHTML = `<span class="xml-attr">@${attr.name}</span>="<span class="xml-attr-value">${attr.value}</span>"`;
              childrenContainer.appendChild(attrLi);
          });

          // Add child nodes
          element.childNodes.forEach(child => {
              if (child.nodeType === 1) { // Element node
                  this.createNode(child, childrenContainer);
              } else if (child.nodeType === 3 && child.nodeValue.trim()) { // Text node
                  const textLi = document.createElement('li');
                  textLi.className = 'xml-text';
                  textLi.textContent = child.nodeValue.trim();
                  childrenContainer.appendChild(textLi);
              }
          });

          li.appendChild(childrenContainer);

          toggleBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              childrenContainer.classList.toggle('collapsed');
              toggleBtn.textContent = childrenContainer.classList.contains('collapsed') ? '▶' : '▼';
          });
      }

      parentEl.appendChild(li);
  }

  loadXMLFromFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const xmlDoc = this.parseXML(e.target.result);
              this.createTreeView(xmlDoc);
          } catch (error) {
              console.error('Error parsing XML:', error);
              this.container.innerHTML = '<p class="error">Error parsing XML file. Please ensure it\'s a valid XML.</p>';
          }
      };
      reader.readAsText(file);
  }
}