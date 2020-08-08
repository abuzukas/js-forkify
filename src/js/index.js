import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';


//Global State of the App
//--Search Object
//--Current Recipe Object
//--Dhopping List Object
//--Linked Reciped

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();

    console.log(query);

    if (query) {
        state.search = new Search(query);
    }

    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);


    await state.search.getResults();

    clearLoader();
    searchView.renderResults(state.search.result);
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});