import {form} from './models/form.js';
import {elements, resetPanel, getVal, clearVal} from './views/base.js';
import {renderPanel, renderActivity, editRenderName, clearUIELement} from './views/formView.js';

const state = {};
resetPanel(elements.listPanel ,elements.activitiesPanel);
let cache, titleBeforeEdit, titleAfterEdit,wasEditButttonClicked = false;

function newForm() {
    cache = new form('test');
    renderPanel(elements.listPanel, elements.activitiesPanel);
};

function newActivity() {
    let val = getVal(elements.newActivity);
    if (val) {
        cache.addActivity(val);
        renderActivity(elements.activities, val, 'Activity');
        clearVal(elements.newActivity);
    };
};

function saveForm(test) {
    cache.title = getVal(elements.listTitle).toUpperCase();
    
    if (cache.title in state && test == false) {
        alert('A list with this title already exit.')
        return
    };

    if (test == false) {
        renderActivity(elements.createList, cache.title, 'List');
    } else {
        editRenderName(titleAfterEdit, getVal(elements.listTitle).toUpperCase());
        delete state[titleBeforeEdit]
    };

    state[cache.title] = cache;
    clearVal(elements.listTitle);
    clearUIELement(elements.activities);
    resetPanel(elements.listPanel, elements.activitiesPanel);
};

function accessNestedBtn(event) {
    let parentClass, containerID, rootID, containerText;
    parentClass = event.target.parentNode.className;
    rootID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    containerID = document.getElementById(event.target.parentNode.parentNode.parentNode.id);
    containerText = containerID.innerText;

    if (parentClass == 'remove-btn') {
        containerID.parentNode.removeChild(containerID);

        if (rootID == 'set-activity') {
            cache.deleteActivity(containerText);
        } else if (rootID == 'edit-list') {
            delete state[containerText];
        };
    } else if (parentClass == 'edit-btn') {
        newForm();
        elements.listTitle.value = containerText;
        titleBeforeEdit = elements.listTitle.value;
        for (let el in state[containerText].activities) {
            cache.addActivity(state[containerText].activities[el]);
            renderActivity(elements.activities, state[containerText].activities[el], 'Activity');
        };
        wasEditButttonClicked = true;
        titleAfterEdit = containerID.children[0];
    };
};

elements.newList.addEventListener('click', e => {
    newForm();
});

elements.addActivityBtn.addEventListener('click', e => {
    newActivity();
});

elements.saveList.addEventListener('click', e => {
    if (getVal(elements.listTitle) != '') {
        saveForm(wasEditButttonClicked);
    } else alert('Add a title to your todo list')
});

elements.createList.addEventListener('click', accessNestedBtn);

elements.activities.addEventListener('click', accessNestedBtn)
