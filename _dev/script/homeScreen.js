
// Imports
import { cl, clv, clickListener, checkURL, makeSafeClass } from 'helperFunctions';
import tinyTerms from 'app';
import { hideModal } from 'termInteraction';

// Exports
export { showHome };

// Show home screen
const showHome = function showHome() {

	// Once loaded
	setTimeout(() => {
		document.getElementsByTagName("body")[0].classList.remove("loading");
		document
			.querySelector(".m-query")
			.classList.add("animated", "slideInDown");
	},
		2500
	);

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

		let categoryBtn = document.querySelectorAll('.category');

		for (let i = 0; i < categoryBtn.length; i++) {
			categoryBtn[i].addEventListener('click', (e) => {
				e.preventDefault();
				homeWrapper.querySelector('.choose-list').classList.add('animated', 'slideOutLeft');
				let categoryType = categoryBtn[i].innerHTML;
				let lists = "";
				for (let val in tinyTerms.listChoices) {

					if (tinyTerms.listChoices[val].category === categoryType) {
						lists += '<a href="#">' + tinyTerms.listChoices[val].name + '</a>';
					}
				}
				for (let val in tinyTerms.customListChoices) {

					if (tinyTerms.listChoices[val].category === categoryType) {
						lists += '<div class="' + makeSafeClass(tinyTerms.customListChoices[val].name) + '"><span class="custom-list"></span><a href="#">' + tinyTerms.customListChoices[val].name + '</a></div>';
					}
				}
				
				setTimeout(() => {
					homeWrapper.querySelector('.choose-list').getElementsByTagName('nav')[0].innerHTML = lists;
					homeWrapper.querySelector('.choose-list').classList.remove('slideOutLeft');
					homeWrapper.querySelector('.choose-list').classList.add('slideInRight');
				}, 500);

				// Set listeners for nav
				navListeners();
			});
		}
	});

	function navListeners() {
		// Add listener to nav
		let listItem = document.querySelector('.choose-list').querySelectorAll('a');

		for (var i = 0; i < listItem.length; i++) {
			listItem[i].addEventListener('click', function (e) {
				e.preventDefault();
				tinyTerms.pickedList = this.innerHTML;
				localforage.setItem('tinyTermsDefault', tinyTerms.pickedList, () => {
					location.reload();
				});
			});
		}

		// Add listener to remove list
		let removeList = document.querySelectorAll('.custom-list');
		for (let i = 0; i < removeList.length; i++) {

			removeList[i].addEventListener('click', (e) => {
				e.preventDefault();
				let insertPoint = removeList[i].nextSibling;
				document.querySelector('.create-list').classList.add('hidden');
				removeList[i].classList.add('hidden');
				removeList[i].parentNode.insertBefore(document.createElement("div"), insertPoint.nextSibling);
				insertPoint.nextSibling.innerHTML = '<p>Are you sure you want to delete your list? (Can\'t undo)</p><button class="delete-cancel">Cancel</button><button class="delete-confirm">Confim</button>';

				document.querySelector('.delete-confirm').addEventListener('click', () => {
					let listName = removeList[i].parentNode.childNodes[1].innerHTML;

					delete tinyTerms.uploadedLists[listName];

					// Delete list from nav
					localforage.setItem('tinyTerms.uploadedLists', tinyTerms.uploadedLists, () => {
						removeList[i].parentNode.removeChild(insertPoint.nextSibling);
						removeList[i].parentNode.parentNode.removeChild(document.querySelector('.' + makeSafeClass(listName)));

						// Delete list references
						localforage.removeItem(tinyTerms.storedName).then(function () {
							localforage.removeItem(tinyTerms[tinyTerms.pickedList]).then(function () {
								localforage.removeItem("tinyTermsDefault");
								location.reload();
							});
						});
					});
				});
				document.querySelector('.delete-cancel').addEventListener('click', () => {
					removeList[i].parentNode.removeChild(insertPoint.nextSibling);
					removeList[i].classList.remove('hidden');
					document.querySelector('.create-list').classList.remove('hidden');
				});
			});
		}
	}

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
					tinyTerms.uploadedLists[inputName] = {
						name: inputName,
						category: 'custom',
						sheetURL: inputSheet
					};
					localforage.setItem('tinyTerms.uploadedLists', tinyTerms.uploadedLists, () => {
						hideModal(true);
						let customlist = '<div class="' + makeSafeClass(inputName) + '"><span class="custom-list"></span><a href="#">' + inputName + '</a></div>';
						let homeWrapper = document.querySelector('.m-menu');
						homeWrapper.querySelector('.choose-list').getElementsByTagName('nav')[0].innerHTML += customlist;
						navListeners();
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
