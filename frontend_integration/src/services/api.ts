import axios from 'axios';

interface Book {
    book_id: number
    thumbnail: string;
    title: string;
    published_year: number;
    genre: string;
    description: string;
    average_rating: string;
    author: string;
}

interface Users {
    password_hash: string;
    user_id: string;
    username: string;
    role: string;
}

interface Author {
    author_id: number;
    name: string;
    biography: string;
}

interface Token {
    access_token: string
    token_type: string 
}

interface User {
    user_name: string
    password: string
}

export const fetchBotRecommendation = async (query: string): Promise<string> => {
    const response = await api.get<string>(`/query?query=${query}`);
    return response.data
}

export const fetchBotRecommendationsStream = async (
    query: string,
    onData: (chunk: string) => void,
    onError: (error: any) => void
  ): Promise<void> => {
    try {
        console.log(query)
      const response = await fetch(`http://localhost:8000/query?query=${query}`);
      
      if (!response.body) {
        throw new Error('ReadableStream not supported.');
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
  
      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value);
          onData(chunk);
        }
      }
    } catch (error) {
      onError(error);
    }
  };
  
export const postUser = async (user_name: string, password: string): Promise<User> => {
    const response = await api.post<User>('/users/register', {
        user_name,
        password
    });
    return response.data;
};

export const fetchToken = async (username: string, password: string): Promise<Token> => {
    const response = await axios.post<Token>(`http://localhost:8000/users/login`,
        new URLSearchParams({
        username,
        password
        })
    );
    return response.data;
};

export const fetchUsers = async (): Promise<Users[]> => {
    const response = await api.get<Users[]>(`/users`);
    return response.data;
};

export const fetchBooks = async (sort: string = '', genre: string = ''): Promise<Book[]> => {
    const response = await api.get<Book[]>(`/books/?start=${0}&limit=${100}&sort=${sort}&genre=${genre}`);
    return response.data;
};

export const fetchAuthor = async (author_id: number): Promise<Author> => {
    const response = await api.get<Author>(`/authors/${author_id}`);
    return response.data;
};

export const fetchBookRecommendation =  async (user_id: string): Promise<string> => {
    const response = await api.get<string>(`/recommnedations/${user_id}`);
    return response.data
}

export const deleteBook = async (book_id: number): Promise<Book> => {
    const response = await api.delete<Book>(`/books/${book_id}`)
    return response.data
}

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  
  export default api;