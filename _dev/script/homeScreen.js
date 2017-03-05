
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
        document.querySelector('.m-query-wrapper').classList.add('animated', 'slideInDown');
    }, 1000);
    
    // Show home screen
    let homeWrapper = document.querySelector('.m-menu');
    homeWrapper.classList.remove('hidden');

    // Add listener to nav
    let listItem = document.querySelector('.choose-list').querySelectorAll('a');
    
    for (var i = 0; i < listItem.length; i++) {
        listItem[i].addEventListener('click', function(event) {
            tinyTerms.pickedList = this.innerHTML;
            localforage.setItem('tinyTermsDefault', tinyTerms.pickedList);
            location.reload();
        });
    }
}
