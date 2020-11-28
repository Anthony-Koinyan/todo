import {form} from './models/form.js';
import {elements, resetPanel, getVal, clearVal} from './views/base.js';
import {renderPanel, renderActivity, editRenderName, clearUIELement} from './views/formView.js';

const state = {};
resetPanel(elements.listPanel ,elements.activitiesPanel);
let cache, previousTitle, activity;

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
    
    if (cache.title in state && !test) {
        alert('A list with this title already exit.')
        return
    };

    if (!test) {
        renderActivity(elements.createList, cache.title, 'List');
    } else {
        editRenderName(test.firstChild, getVal(elements.listTitle).toUpperCase());
        delete state[previousTitle];
        activity = null;
    };

    state[cache.title] = cache;
    clearVal(elements.listTitle);
    clearUIELement(elements.activities);
    resetPanel(elements.listPanel, elements.activitiesPanel);
};

function accessNestedBtn(event) {
    
    let eventParentClass = event.target.parentNode.className;
    activity = document.getElementById(event.target.parentNode.parentNode.parentNode.id);

    if (eventParentClass == 'remove-btn') {
        
        if (activity.parentNode.id === 'set-activity') {
            cache.deleteActivity(activity.innerText)
        }

        if (activity.parentNode.id === 'edit-list') {
            delete state[activity.innerText];
        }

        activity.parentNode.removeChild(activity);
    };
    
    if (eventParentClass == 'edit-btn') {
        clearVal(elements.listTitle);
        clearUIELement(elements.activities);
        newForm();
        previousTitle = activity.innerText;
        elements.listTitle.value = activity.innerText;
        state[activity.innerText].activities.forEach(element => {
            cache.addActivity(element);
            renderActivity(elements.activities, element, 'Activity');
        });
    };
};

elements.newList.addEventListener('click', newForm);

elements.newActivity.addEventListener('keypress', e => {
    if (e.keyCode === 13) newActivity();
})

elements.addActivityBtn.addEventListener('click', newActivity);

elements.saveList.addEventListener('click', e => {
    if (getVal(elements.listTitle) != '') {
        saveForm(activity);
    } else alert('Add a title to your todo list')
});

elements.createList.addEventListener('click', accessNestedBtn);

elements.activities.addEventListener('click', accessNestedBtn)
