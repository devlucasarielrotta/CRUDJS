import usersStore from '../../store/user-store.js';
import { deleteUser } from '../../use-cases/delete-user-by.js';
import { showModal } from '../render-modal/render-modal.js';
import './render-table.css';

let table; 

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders,tableBody);
    return table;
}
const tableSelectListener = event => {
    const element = event.target.closest('.select-user');
    if(!element) return;
    const id = element.getAttribute('data-id');
    
    showModal(id);
}

const tableDeleteListener = async event => {
    const element = event.target.closest('.delete-user');
    if(!element) return;
    const id = element.getAttribute('data-id');
    await deleteUser(id);
    await usersStore.reloadPage();
    document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
    renderTable();
}
/**
 * @param{HTMLDivElement}element
 */
export const renderTable = (element) => {
    const users = usersStore.getUsers();

    if( !table ){
        table = createTable();
        element.append(table);

        // TODO listeners a la table
        table.addEventListener('click', tableSelectListener)
        table.addEventListener('click', tableDeleteListener)
    }

    let tableHTML = '';
    users.forEach( usuario => {
        tableHTML += `
            <tr>
                <td> ${ usuario.id }</td>
                <td> ${ usuario.balance }</td>
                <td> ${ usuario.firstName }</td>
                <td> ${ usuario.lastName }</td>
                <td> ${ usuario.isActive }</td>
                <td>
                    <a hreg="*/" class="select-user" data-id=${usuario.id}>Select</a>
                    |
                    <a hreg="*/" class="delete-user" data-id=${usuario.id}>Delete</a>
                </td>
            </tr>
        `
    });

    table.querySelector('tbody').innerHTML = tableHTML;

}

