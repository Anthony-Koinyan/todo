export function renderPanel(mainID, panelID) {
    mainID.style.width = "29.7rem";
    panelID.style.display = "block";
};

export function renderActivity(parent, activity, type){
    let markup;
    if (type == 'Activity') {
        markup = `
            <div class="item clearfix" id="${activity}">
                <div class="description">${activity}</div>
                <div class="right edit-item">
                    <button class="remove-btn">
                        <i class="ion-ios-close-outline"></i>
                    </button>
                </div>
            </div>`;
    } else if (type == 'List') {
        markup = `
        <div class="item clearfix" id="${activity}">
            <div class="list-name">${activity}</div>
            <div class="right edit-item">
                <button class="edit-btn">
                    <i class="ion-edit"></i>
                </button>
                <button class="remove-btn">
                    <i class="ion-ios-close-outline"></i>
                </button>
            </div>
        </div> `;
    }
    
    parent.insertAdjacentHTML('beforeend', markup);
};

export function editRenderName(parent, value) {
    parent.innerText = value;
}

export function clearUIELement(node) {
    node.innerHTML = '';
};