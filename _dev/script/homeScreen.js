
// Imports
import { cl, clv, clickListener } from 'helperFunctions';
import tinyTerms from 'app';

// Exports
export { showHome };

// Show home screen
const showHome = function showHome() {

    // Once loaded
    setTimeout(() => {
        document.getElementsByTagName('body')[0].classList = "";
        document.querySelector('.query-wrapper').classList.add('animated', 'slideInDown');
    }, 1000);
    
    // Show home screen
    let homeWrapper = document.querySelector('.m-menu');
    homeWrapper.classList.remove('hidden');
    document.getElementsByTagName('body')[0].classList.add('modal-active');

    // Show list of stored list
    let lists = "";

    for (let val in tinyTerms.listChoices) {
        lists += '<a href="#">'+tinyTerms.listChoices[val].name+'</a>';
    }

    homeWrapper.querySelector('.choose-list').getElementsByTagName('nav')[0].innerHTML = lists;

    // Add listener to nav
    let listItem = document.querySelector('.choose-list').querySelectorAll('a');
    
    for (var i = 0; i < listItem.length; i++) {
        listItem[i].addEventListener('click', function(e) {
            e.preventDefault;
            tinyTerms.pickedList = this.innerHTML;
            localforage.setItem('tinyTermsDefault', tinyTerms.pickedList);
            location.reload();
        });
    }

    // Upload list button
    document.querySelector('.upload-info').addEventListener('click', (e) => {
        e.preventDefault;

        let modal = document.querySelector('.m-modal');

        // Bring up modal
        modal.classList.remove('hidden');
        modal.style.zIndex = "101";

        let view = `<header>
                        <h2 class="">Upload a list</h2>
                    </header>
                    <p>Create your very own list of Tiny Terms! For more info please visit:</p>
                    <a href="http://www.tiny-terms.com">http://www.tiny-terms.com</a>
                    <div class="list-uploader">
                        <input type="text" placeholder="Paste list URL">
                        <button class="upload-list">Upload</button>
                    </div>`;

        // Add view
        modal.querySelector('.content').innerHTML += view;
    });
}
