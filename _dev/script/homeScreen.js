
// Imports
import { cl, clv, clickListener, checkURL } from 'helperFunctions';
import tinyTerms from 'app';
import { hideModal } from 'termInteraction';

// Exports
export { showHome };

// Show home screen
const showHome = function showHome() {

    tinyTerms.uploadedLists = tinyTerms.uploadedLists || {};

    localforage.getItem('tinyTerms.uploadedLists', function (err, uploadedLists) {

        tinyTerms.customListChoices = tinyTerms.customListChoices || {};

        // Get uploaded lists
        for (let val in uploadedLists) {
            let listName = uploadedLists[val].name;
            let listURL = uploadedLists[val].sheetURL;

            tinyTerms.customListChoices[listName] = {
                name: listName,
                sheetURL: listURL
            }
        }

        // Show home screen
        let homeWrapper = document.querySelector('.m-menu');
        homeWrapper.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');
        document.getElementsByTagName('body')[0].classList.add('home');

        // Show list of stored list
        let lists = "";

        for (let val in tinyTerms.listChoices) {
            lists += '<a href="#">' + tinyTerms.listChoices[val].name + '</a>';
        }
        for (let val in tinyTerms.customListChoices) {
            lists += '<div class="' + tinyTerms.customListChoices[val].name + '"><span class="custom-list"></span><a href="#">' + tinyTerms.customListChoices[val].name + '</a></div>';
        }

        homeWrapper.querySelector('.choose-list').getElementsByTagName('nav')[0].innerHTML = lists;

        // Add listener to nav
        let listItem = document.querySelector('.choose-list').querySelectorAll('a');

        for (var i = 0; i < listItem.length; i++) {
            listItem[i].addEventListener('click', function (e) {
                e.preventDefault();
                tinyTerms.pickedList = this.innerHTML;
                localforage.setItem('tinyTermsDefault', tinyTerms.pickedList);
                location.reload();
            });
        }

        // Add listener to remove list
        let removeList = document.querySelectorAll('.custom-list');
        for (let i = 0; i < removeList.length; i++) {

            removeList[i].addEventListener('click', (e) => {
                e.preventDefault();
                let listName = removeList[i].parentNode.childNodes[1].innerHTML;

                delete tinyTerms.uploadedLists[listName];

                localforage.setItem('tinyTerms.uploadedLists', tinyTerms.uploadedLists, () => {
                    removeList[i].parentNode.parentNode.removeChild(document.querySelector('.'+listName));
                });
            });
        }

    });

    // Upload list button
    document.querySelector('.upload-info').addEventListener('click', (e) => {
        e.preventDefault();

        let modal = document.querySelector('.m-modal');

        // Bring up modal
        modal.classList.remove('hidden');
        modal.style.zIndex = "101";
        modal.querySelector('.close').addEventListener('click', (e) => {
            e.preventDefault();
            hideModal(true);
        });

        let view = `<header>
                        <h2 class="">Upload a list</h2>
                    </header>
                    <p>Create your very own list of Tiny Terms! For more info please visit:</p>
                    <a target="_blank" href="http://www.tiny-terms.com">http://www.tiny-terms.com</a>
                    
                    <div class="list-uploader">
                        <label>List Name (max 25 characters)</label>
                        <input class="upload-name" type="text" placeholder="Enter list name">
                        <label>List URL</label>
                        <input class="upload-sheet" type="text" placeholder="Paste list URL">
                        <button class="upload-list">Upload</button>
                    </div>`;

        // Add view
        modal.querySelector('.content').innerHTML += view;

        window.addEventListener("keypress", function (e) {
            let inputName = document.querySelector('.upload-name').value;
            let inputSheet = document.querySelector('.upload-sheet').value;

            if (e.keyCode === 13) {
                uploadList(inputName, inputSheet);
            }
        });

        document.querySelector('.upload-list').addEventListener('click', (e) => {
            e.preventDefault();
            let inputName = document.querySelector('.upload-name').value;
            let inputSheet = document.querySelector('.upload-sheet').value;

            uploadList(inputName, inputSheet);
        });
    });
    function uploadList(inputName, inputSheet) {
        inputName = inputName.substring(0, 25);

        if (inputName.length > 0 && inputSheet.length > 0) {

            // Check valid URL
            if (checkURL(inputSheet) === true) {
                localforage.getItem('tinyTerms.uploadedLists', function (err, uploadedLists) {
                    // Get uploaded lists
                    for (let val in uploadedLists) {
                        let listName = uploadedLists[val].name;
                        let listURL = uploadedLists[val].sheetURL;

                        tinyTerms.listChoices[listName] = {
                            name: listName,
                            sheetURL: listURL
                        }
                    }
                    tinyTerms.uploadedLists[inputName] = {
                        name: inputName,
                        sheetURL: inputSheet
                    };
                    localforage.setItem('tinyTerms.uploadedLists', tinyTerms.uploadedLists, () => {
                        hideModal(true);
                        let customlist = '<div class="' + inputName + '"><span class="custom-list"></span><a href="#">' + inputName + '</a></div>';
                        let homeWrapper = document.querySelector('.m-menu');
                        homeWrapper.querySelector('.choose-list').getElementsByTagName('nav')[0].innerHTML += customlist;
                    });
                });
            }
            else {
                cl('no valid url');
            }
        }
        else {
            cl('no text');
        }
    }
}
