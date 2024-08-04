import React, { useState, useEffect } from 'react';
import { fetchAuthor } from '../../services/api';

interface Author {
    author_id: number;
    name: string;
    biography: string;
}

interface AuthorProps {
    author_id: number;
}

const Authors: React.FC<AuthorProps> = ({author_id}) => {
    const [author, setAuthor] = useState<Author>();

    useEffect(() => {
        const getAuthor = async () => {
            try {
                const data = await fetchAuthor(author_id);
                setAuthor(data);
            } catch (error) {
                console.error('Error fetching author:', error);
            }
        };
        getAuthor();
    }, [author_id]);

    return (
        <div>
            <div>
                {author?.name}
            </div>
        </div>
    );
};

export default Authors;
