import React, {useState} from 'react';
import styles from './Search.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Auth';
import searchIcon from '../../assets/search.svg'
import sortIcon from '../../assets/sort.svg'
import favIcon from '../../assets/favorites.svg'

interface SearchProps {
  setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ setSearchQuery }) => {

  const [isSortOpen, setIsSortOpen] = useState(false);
  const { token } = useAuth()
  const isAuthenticated = !!token; 

  const handleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const navigate = useNavigate()
  const handleFav = () => {
    navigate('/login');
  };


    return (
        <div className={styles.search_and_favs_container}>
          <div className={styles.search_and_sort}>
            <button className={styles.search_button}>
              <img src={searchIcon}/>
            </button>
            <div className={styles.search_input}>
              <input 
                  type="text" 
                  className={styles.search_input}
                  placeholder="Type book title/genre/name of author"
                  onChange={handleSearchChange}
              />
            </div>
            <button className={styles.sort_button} onClick={handleSort}>
              <img src={sortIcon}/>
            </button>
            {isSortOpen && (
                <div className={styles.sort_window}>
                  <button className={styles.sort_type}>
                    Most Trending
                  </button>
                  <button className={styles.sort_type}>
                    Recently Added
                  </button>
                  <button className={styles.sort_type}>
                    Recommended
                  </button>
                  <button className={styles.sort_type}>
                    Most recent
                  </button>
                  <button className={styles.sort_type}>
                    Earliest year
                  </button>
                  <button className={styles.sort_type}>
                    Top rated
                  </button>
                  <button className={styles.sort_type}>
                    Least rated
                  </button>
                </div>
            )}
          </div>
          {isAuthenticated ? (
            <button className={styles.search_fav_button}>
            <img src={favIcon}/>
          </button>
          ): (
          <button className={styles.search_fav_button} onClick={handleFav}>
            <img src={favIcon}/>
          </button>
          )
        }
        </div>
    );
};

export default Search;
