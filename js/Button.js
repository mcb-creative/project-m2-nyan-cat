class Button {

    constructor(root, xPos, yPos) {
        
        let button = document.createElement('button');

        button.style.position = 'absolute';
        button.style.left = xPos;
        button.style.top = yPos;
        button.style.color = 'white'
        button.style.backgroundColor = 'black'
        button.style.border = 'none'
        button.style.font = '72px Impact';
        button.style.zIndex = 2000;
        button.style.padding = 20+'px'
        button.style.borderStyle = 'solid white 2px'

        root.appendChild(button);

        this.domElement = button;

    }

    update(txt) {
        this.domElement.innerText = txt;
        }

    reload() {
        console.log("hey")
        this.domElement.addEventListener('click', function() {
            window.location.reload();
        })    
        }

    }
    