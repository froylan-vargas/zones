CREATE TABLE IF NOT EXISTS "product" (
    "id"  SERIAL , 
    "categoryId" INTEGER NOT NULL REFERENCES 
    "category" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, 
    "name" VARCHAR(255) NOT NULL UNIQUE, 
    "description" VARCHAR(255) NOT NULL, 
    "priority" INTEGER NOT NULL DEFAULT 0, 
    "price" FLOAT NOT NULL, 
    "images" VARCHAR(255), 
    "isActive" BOOLEAN NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id"));