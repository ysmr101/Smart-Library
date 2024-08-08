import React, {useState} from 'react';
import styles from './Search.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/Auth';
import searchIcon from '../../assets/search.svg'
import sortIcon from '../../assets/sort.svg'
import favIcon from '../../assets/favorites.svg'
import fullFavIcon from '../../assets/heartFull.svg'
import { fetchBookRecommendation } from '../../services/api';


interface SearchProps {
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  setGenre: (genre: string) => void;
}

const Search: React.FC<SearchProps> = ({ setSearchQuery, setSortBy, setGenre }) => {

  const [isSortOpen, setIsSortOpen] = useState(false);
  const { getUserInfo } = useAuth()
  const userInfo = getUserInfo()
  const location = useLocation();


  

  const handleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleSortChange = (sortType: string) => {
    setSortBy(sortType);
    setGenre('')
    setIsSortOpen(false);
  };

  const handleGenre = (user_id: string) => {
      const getGenre = async () => {
          try {
              const data = await fetchBookRecommendation(user_id);
              setGenre(data);    
          } catch (error) {
              console.error('Error fetching recommendation:', error);
          }
      };
      getGenre();
      setSortBy('')
      setIsSortOpen(false);
  }


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const navigate = useNavigate()
  const handleLog = () => {
    navigate('/login');
  };

  const handleFavorites = () => {
    navigate('/favorites')
  }

    if(userInfo) {
      const { user_id, username, role} = userInfo;
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
            {location.pathname !== '/favorites'? (
              <button className={styles.sort_button} onClick={handleSort}>
                <img src={sortIcon}/>
              </button>            
            ) : (
              <button className={styles.sort_button}>
              </button>
              )
            }
            {isSortOpen && (
                <div className={styles.sort_window}>
                  <button className={styles.sort_type} onClick={() => handleSortChange('default')}>
                    Default
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('most_trending')}>
                    Most Trending
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('recently_added')}>
                    Recently Added
                  </button>
                  <button className={styles.sort_type} onClick={() => handleGenre(user_id)}>
                    Recommended
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('most_recent')}>
                    Most recent
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('earliest_year')}>
                    Earliest year
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('top_rated')}>
                    Top rated
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('least_rated')}>
                    Least rated
                  </button>
                </div>
            )}
          </div>
            <button className={styles.search_fav_button} onClick={handleFavorites}>
            {location.pathname === '/favorites'? (
              <img src={fullFavIcon}/>
            ) : (
              <img src={favIcon}/>
            )
          }
            </button>
        </div>
    );
    }
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
                  <button className={styles.sort_type} onClick={() => handleSortChange('default')}>
                    Default
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('most_trending')}>
                    Most Trending
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('recently_added')}>
                    Recently Added
                  </button>
                  <button className={styles.sort_type} onClick={handleLog}>
                    Recommended
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('most_recent')}>
                    Most recent
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('earliest_year')}>
                    Earliest year
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('top_rated')}>
                    Top rated
                  </button>
                  <button className={styles.sort_type} onClick={() => handleSortChange('least_rated')}>
                    Least rated
                  </button>
                </div>
            )}
          </div>
          <button className={styles.search_fav_button} onClick={handleLog}>
            <img src={favIcon}/>
          </button>
        </div>
    );
};

export default Search;
