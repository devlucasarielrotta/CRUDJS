import { renderAddButton } from './presentatios/render-add-button/render-add-button.js';
import { renderButtons } from './presentatios/render-buttons/render-buttons.js';
import { renderModal } from './presentatios/render-modal/render-modal.js';
import { renderTable } from './presentatios/render-table/render-table.js';
import usersStore from './store/user-store.js';
import { saveUser } from './use-cases/save-user.js';


export const UsersApp = async (element) => {
    element.innerHTML = 'Loading...';
    
    await usersStore.loadNextPage();
    element.innerHTML = '';

    renderTable(element);
    renderButtons(element);
    renderAddButton(element);
    renderModal(element, async(userLike) => {
       
        const user = await saveUser(userLike)
        usersStore.onUserChanged(user);
        
        renderTable();
    });
}