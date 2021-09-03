/**
 * Initialize localforage
 */
//  Dependencies
import localforage from 'localforage/dist/localforage'

const dbName = 'todoTracker';

// Create table todos in db todoTracker
const todos = localforage.createInstance({
    name        : dbName,
    storeName   : 'todos',
    description : 'persists todos allowing CRUD'
});

// Create table appSettings in db todoTracker
const settings = localforage.createInstance({
    name        : dbName,
    storeName   : 'appSettings',
    description : 'persists user application customizations'
});

const initForage = () => {
    return { todos, settings } 
}

export default { initForage }