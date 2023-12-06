# Database Tables


### Users Table

- **`usernames`** should only have 1 to 25 characters
- **`email`** should only have 4 to 254 characters (maximum is from RFC 2821)
- **`salted_hash_passwrd`** max character length is 72 (result of bcrypt range from 60 to 72)

```sql
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE,
    salted_hash_passwrd VARCHAR(72) NOT NULL,
    date_created DATETIME DEFAULT NOW()
);

+---------------------+--------------+------+-----+---------+----------------+
| Field               | Type         | Null | Key | Default | Extra          |
+---------------------+--------------+------+-----+---------+----------------+
| id                  | int(11)      | NO   | PRI | NULL    | auto_increment |
| username            | varchar(25)  | NO   | UNI | NULL    |                |
| email               | varchar(254) | YES  | UNI | NULL    |                |
| salted_hash_passwrd | varchar(72)  | NO   |     | NULL    |                |
| date_created        | datetime     | NO   |     | NULL    |                |
+---------------------+--------------+------+-----+---------+----------------+
```

