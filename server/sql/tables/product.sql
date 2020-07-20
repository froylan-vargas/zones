CREATE TABLE product (
	id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
    categoryid INTEGER REFERENCES category(id),
	name VARCHAR(100),
    price MONEY,
    images TEXT,
    createdon TIMESTAMP NOT NULL,
    modifiedon TIMESTAMP NULL,
    isactive BOOLEAN DEFAULT TRUE,
    unique (categoryid,name)
);

/* INSERT INTO product VALUES (
1,
1,
'Flor de papantla',
22.55,
CURRENT_TIMESTAMP,
NULL,
TRUE
); */