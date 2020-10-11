export const form = class Form {
    constructor(title){
        this.title = title,
        this.activities = [],
        this.done = false
    };

    addActivity(activity) {
        this.activities.push(activity)
    };

    deleteActivity(activity) {
        this.activities = this.activities.filter(el => el != activity)
    }
} ;