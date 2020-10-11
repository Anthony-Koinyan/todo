export const elements = {
    listPanel: document.querySelector('#lists'),
    activitiesPanel: document.querySelector('#activities'),
    newList: document.querySelector('.new-list'),
    newActivity: document.querySelector('.add-item'),
    activities: document.querySelector('#set-activity'),
    addActivityBtn: document.querySelector('.add-btn'),
    listTitle: document.querySelector('.set-title'),
    saveList: document.querySelector('#save-list'),
    createList: document.querySelector('#edit-list')
};

export function resetPanel(main, panel) {
    panel.style.display = "none";
    main.style.width = "90vw";
};

export const getVal = input => input.value;

export function clearVal(node) {
    node.value='';
}