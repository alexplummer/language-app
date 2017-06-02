
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
			let listCategory = uploadedLists[val].category;
			let listURL = uploadedLists[val].sheetURL;

			tinyTerms.customListChoices[listName] = {
				name: listName,
				category: listCategory,
				sheetURL: listURL
			}
		}
		categoryHandler();
	});

	// Show home screen
	let homeWrapper = document.querySelector('.m-menu');
	homeWrapper.classList.remove('hidden');
	document.getElementsByTagName('body')[0].classList.add('modal-active');
	document.getElementsByTagName('body')[0].classList.add('home');

	let homeHeader = document.querySelector('.home-bg').getElementsByTagName('h2')[0];
	let chooseList = homeWrapper.querySelector('.choose-list');
	let categories = chooseList.getElementsByTagName('nav')[0].innerHTML;
	let navBack = document.querySelector('.nav-back');
	let scrollArrow = document.querySelector('.scroll-arrow');
	let scrollCheck;
	let lists;

	// Sets initial listeners on categories
	function categoryHandler() {
		let categoryBtn = document.querySelectorAll('.category');

		// Show custom list category if user uploaded
		if (Object.keys(tinyTerms.customListChoices).length > 0) {
			document.querySelector('.custom').style.display = "inline-block";
		}

		for (let i = 0; i < categoryBtn.length; i++) {
			categoryBtn[i].addEventListener('click', (e) => {
				e.preventDefault();

				// Build coresponding list
				buildList(categoryBtn[i].innerHTML);

				setTimeout(() => {
					// Show the list
					showList();
					// Listener to go back to categories
					navBack.addEventListener('click', (e) => {
						e.preventDefault();
						showCategoriesAgain();
					});
					// Set listeners for nav
					navListeners();
				}, 500);
			});
		}
	};

	function buildList(category) {
		chooseList.classList.add('animated', 'slideOutLeft');
		homeHeader.classList.add('animated', 'fadeOutUp');
		lists = "";
		for (let val in tinyTerms.listChoices) {

			if (tinyTerms.listChoices[val].category === category) {
				lists += '<a href="#">' + tinyTerms.listChoices[val].name + '</a>';
			}
		}
		for (let val in tinyTerms.customListChoices) {
			
			if (tinyTerms.customListChoices[val].category === category) {
				lists += '<div class="' + makeSafeClass(tinyTerms.customListChoices[val].name) + '"><span class="custom-list"></span><a href="#">' + tinyTerms.customListChoices[val].name + '</a></div>';
			}
		}
	}

	function showList() {
		homeHeader.innerHTML = "Choose a list:";
		homeHeader.classList.remove('fadeOutUp');
		homeHeader.classList.add('fadeInDown');
		navBack.classList.remove('hidden');
		chooseList.getElementsByTagName('nav')[0].innerHTML = lists;
		chooseList.classList.remove('slideOutLeft');
		chooseList.classList.add('slideInRight');

		if (chooseList.getElementsByTagName('a').length > 3) {
			chooseList.classList.add('slideInRight', 'scroll');

			scrollCheck = setInterval(() => {
				if (chooseList.clientHeight === (chooseList.scrollHeight - chooseList.scrollTop)) {
					scrollArrow.classList.add('hidden');
				}
				else {
					scrollArrow.classList.remove('hidden');
				}
			}, 500);
		}
	}

	function showCategoriesAgain() {
		homeHeader.classList.add('fadeOutUp');
		homeHeader.classList.remove('fadeInDown');
		chooseList.classList.remove('slideInRight');
		chooseList.classList.add('slideOutRight');

		setTimeout(() => {
			homeHeader.innerHTML = "Choose a category:";
			homeHeader.classList.remove('fadeOutUp');
			homeHeader.classList.add('fadeInDown');
			navBack.classList.add('hidden');
			chooseList.getElementsByTagName('nav')[0].innerHTML = categories;
			chooseList.classList.add('slideInLeft');
			chooseList.classList.remove('slideOutRight', 'scroll');
			categoryHandler();
		}, 500);
	}

	function navListeners() {
		// Add listener to nav
		let listItem = document.querySelector('.choose-list').querySelectorAll('a');

		for (var i = 0; i < listItem.length; i++) {
			listItem[i].addEventListener('click', function (e) {
				e.preventDefault();
				tinyTerms.pickedList = this.innerHTML;
				localforage.getItem('tinyTermsAllPicked', function (err, value) {
					tinyTerms.AllPicked = value || [];

					if (tinyTerms.AllPicked.includes(tinyTerms.pickedList) === false) {
						tinyTerms.AllPicked.push(tinyTerms.pickedList);
					}
					localforage.setItem('tinyTermsAllPicked', tinyTerms.AllPicked, () => {
						localforage.setItem('tinyTermsDefault', tinyTerms.pickedList, () => {
							location.reload();
						});
					});
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

					localforage.getItem('tinyTerms.uploadedLists', function (err, uploadedLists) {
						tinyTerms.uploadedLists = uploadedLists || {};
						delete tinyTerms.uploadedLists[listName];
						localforage.setItem('tinyTerms.uploadedLists', tinyTerms.uploadedLists, () => {
							location.reload();
						});
					});

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
		
		let unlockedView = `<header>
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
		
		let lockedView = `<header>
                        	<h2 class="">Upload a list</h2>
						</header>
						<p>Create your very own list of Tiny Terms! For more info please visit:</p>
						<a target="_blank" href="http://www.tiny-terms.com">http://www.tiny-terms.com</a>
						
						<div class="list-uploader">
							<p>Unlock this feature for just 59p</p>
							<button class="unlock-uploadlist">Unlock</button>
						</div>`;
		
		let webView = `<header>
                        	<h2 class="">Upload a list</h2>
						</header>
						<p>Create your very own list of Tiny Terms! For more info please visit:</p>
						<a target="_blank" href="http://www.tiny-terms.com">http://www.tiny-terms.com</a>
						
						<div class="list-uploader">
							<p>This feature is only available in the App version.</p>
						</div>`;

		if (typeof store !== 'undefined') {
			store.refresh();
			let product = store.get("custom list");
			
			if (product.owned) {
				modal.querySelector('.content').innerHTML += unlockedView;
				unlockedListeners();
			}
			else {
				modal.querySelector('.content').innerHTML += lockedView;

				document.querySelector('.unlock-uploadlist').addEventListener('click', (e) => {
					e.preventDefault();
					store.order('custom list');

					store.when("custom list").approved(function (order) {
						order.finish();
						modal.querySelector('.content').innerHTML = unlockedView;
						unlockedListeners();
					});
				});
			}
		}
		else {
			modal.querySelector('.content').innerHTML += webView;
		}

		function unlockedListeners() {
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
		}	
	});

	function uploadList(inputName, inputSheet) {
		inputName = inputName.substring(0, 25);

		if (inputName.length === 0) {
			document.querySelector('.upload-name').style.border = "1px solid #ff0000";
			document.querySelector('.upload-name').placeholder = "Please enter a name";
		}
		if (inputName.length > 0 && inputSheet.length > 0) {

			// Check valid URL
			if (checkURL(inputSheet) === true) {
				localforage.getItem('tinyTerms.uploadedLists', function (err, uploadedLists) {
					tinyTerms.uploadedLists = uploadedLists || {};
					tinyTerms.uploadedLists[inputName] = {
						name: inputName,
						category: 'Your lists',
						sheetURL: inputSheet
					};
					localforage.setItem('tinyTerms.uploadedLists', tinyTerms.uploadedLists, () => {
						tinyTerms.customListChoices = tinyTerms.customListChoices || {};
						tinyTerms.customListChoices[inputName] = {
							name: inputName,
							category: 'Your lists',
							sheetURL: inputSheet
						};
						document.querySelector('.custom').style.display = "inline-block";
						buildList('Your lists');
						setTimeout(() => {
							// Show the list
							showList();
							// Listener to go back to categories
							navBack.addEventListener('click', (e) => {
								e.preventDefault();
								showCategoriesAgain();
							});
							// Set listeners for nav
							navListeners();
						}, 500);
						hideModal(true);
					});
				});
			}
			else {
				document.querySelector('.upload-sheet').style.border = "1px solid #ff0000";
				document.querySelector('.upload-sheet').value = "";
				document.querySelector('.upload-sheet').placeholder = "Please enter a valid Sheets URL";
			}
		}
	}
}
