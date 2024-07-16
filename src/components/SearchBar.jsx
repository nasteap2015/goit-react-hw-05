const SearchBar = ({ onSearch }) => {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.target;
        const query = form.elements.query.value;
        if (form.elements.query.value.trim() === "") {
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
        <form onSubmit={handleSubmit}>
            <input type="text" name="query"/>
            <button type="submit">Search</button>
        </form>
    )
};

export default SearchBar;