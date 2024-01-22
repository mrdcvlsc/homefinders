# Database Tables

### Registration Code Table

- **`reg_code`** - 10 character unique code

```sql
CREATE TABLE IF NOT EXISTS RegCodes (
    reg_code VARCHAR(10) UNIQUE NOT NULL
)
```

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
```

### Property Table

```sql
CREATE TABLE IF NOT EXISTS Properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    region VARCHAR(60) NOT NULL,
    province VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    barangay VARCHAR(60) NOT NULL,
    street_address VARCHAR(255) UNIQUE NOT NULL,

    property_description VARCHAR(400),
    property_name VARCHAR(25) NOT NULL,
    property_type VARCHAR(25) NOT NULL,
    property_price FLOAT NOT NULL,
    storeys INT(2) NOT NULL,

    livable_area_sqm FLOAT NOT NULL,
    gross_area_sqm FLOAT NOT NULL,
    lot_length_m FLOAT NOT NULL,
    lot_width_m FLOAT NOT NULL,

    living_room INT(2),
    kitchen INT(2),
    dining_room INT(2),
    bath_room INT(2),
    bedroom INT(2),
    masters_bedroom INT(2),
    maid_room INT(2),
    toilet INT(2),
    walk_in_closet INT(2),
    balcony INT(2),
    lanai INT(2),
    car_port INT(2)
);
```

### Image Table

```sql
CREATE TABLE IF NOT EXISTS Images (
    id INT NOT NULL,
    image_url VARCHAR(255) UNIQUE NOT NULL,
    image_public_id VARCHAR(255) UNIQUE NOT NULL
);
```