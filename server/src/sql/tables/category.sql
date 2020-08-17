CREATE TABLE IF NOT EXISTS "category" (
    "id"  SERIAL , 
    "name" VARCHAR(255) NOT NULL, 
    "isActive" BOOLEAN NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id"));

INSERT INTO category VALUES (
    1,
    'Flores',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

