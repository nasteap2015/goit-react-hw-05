import {toast, Toaster} from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.target;
        const query = form.elements.query.value;
        if (query.trim() === "") {
            toast('Please enter a search query!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            return;
        }
        onSearch(query);
        form.reset();
    };
    
    return (
        <form onSubmit={handleSubmit} className={css.searchForm}>
            <input type="text" name="query" className={css.searchInput}/>
            <button type="submit" className={css.searchButton}>Search</button>
            <Toaster />
        </form>
    )
};

export default SearchBar;