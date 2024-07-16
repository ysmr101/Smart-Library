## How to create  the postgresql database :

1-

     CREATE DATABASE Smart_Library_Database;
2-

       \c smart_library_database
3- 

     CREATE TABLE Users (
         User_ID VARCHAR(50) PRIMARY KEY NOT NULL,
         UserName VARCHAR(50) UNIQUE NOT NULL,
         password_hash VARCHAR(255) NOT NULL, 
         Role VARCHAR(50) NOT NULL,
         CONSTRAINT check_role CHECK (Role IN ('User', 'admin'))
     );
     
     CREATE TABLE Authors (
         Author_ID VARCHAR(50) PRIMARY KEY NOT NULL,
         First_Name VARCHAR(50) NOT NULL,
          Last_Name VARCHAR(50) NOT NULL,
         Biography VARCHAR(300) NOT NULL
     );
     
     CREATE TABLE Books (
         Book_ID VARCHAR(50) PRIMARY KEY NOT NULL,
         Title VARCHAR(80) NOT NULL,
         Author_ID VARCHAR(50) NOT NULL,
         Genre VARCHAR(50) NOT NULL,
         Description VARCHAR(250) NOT NULL,
         CONSTRAINT key_author FOREIGN KEY (Author_ID) REFERENCES Authors(Author_ID),
         CONSTRAINT check_genre CHECK (genre IN ('fiction', 'nonfiction', 'biography', 'history', 'science fiction'))
     );
     
     CREATE TABLE UserPreferences (
         Preference_ID VARCHAR(50) PRIMARY KEY NOT NULL, 
         User_ID VARCHAR(50) NOT NULL,
         Preferences VARCHAR(200) NOT NULL,
         CONSTRAINT key_user FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
     );


4- Insert data

          INSERT INTO Authors (Author_ID, First_Name , Last_Name , Biography) 
          VALUES ('1', 'Jane Austen', 'English novelist known primarily for her six major novels which interpret, critique and comment upon the British landed gentry at the end of the 18th century.');
          
          INSERT INTO Books (Book_ID, Title, Author_ID, Genre, Description) 
          VALUES ('1', 'Pride and Prejudice', '1', 'fiction', 'The novel follows the character development of Elizabeth Bennet, the dynamic protagonist, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.');
          
          INSERT INTO Users (User_ID, UserName, password_hash, Role) 
          VALUES ('1', 'Monerah', 'password123', 'User');
          
          INSERT INTO UserPreferences (Preference_ID, User_ID, Preferences) 
          VALUES ('1', '1', 'biographies');
