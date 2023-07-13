CREATE TABLE ingredient(
   idIngredient INT AUTO_INCREMENT,
   label VARCHAR(50)  NOT NULL,
   PRIMARY KEY(idIngredient)
);

CREATE TABLE profil(
   idProfil INT AUTO_INCREMENT,
   label VARCHAR(50)  NOT NULL,
   PRIMARY KEY(idProfil),
   UNIQUE(label)
);

CREATE TABLE rightCategory(
   idCategory INT AUTO_INCREMENT,
   label VARCHAR(50) ,
   PRIMARY KEY(idCategory)
);

CREATE TABLE userAccount(
   idUser INT AUTO_INCREMENT,
   email VARCHAR(100)  NOT NULL,
   firstName VARCHAR(50) ,
   lastName VARCHAR(50),
   username VARCHAR(50)  NOT NULL,
   passhash VARCHAR(255)  NOT NULL,
   salt VARCHAR(50)  NOT NULL,
   avatar VARCHAR(255),
   PRIMARY KEY(idUser),
   UNIQUE(email),
   UNIQUE(username)
);

CREATE TABLE recipe(
   idRecipe INT AUTO_INCREMENT,
   label VARCHAR(255)  NOT NULL,
   idUser INT NOT NULL,
   PRIMARY KEY(idRecipe),
   FOREIGN KEY(idUser) REFERENCES userAccount(idUser)
);

CREATE TABLE comment(
   idComment INT AUTO_INCREMENT,
   content VARCHAR(255)  NOT NULL,
   idUser INT NOT NULL,
   idRecipe INT NOT NULL,
   idCommentParent INT NOT NULL,
   PRIMARY KEY(idComment),
   FOREIGN KEY(idUser) REFERENCES userAccount(idUser),
   FOREIGN KEY(idRecipe) REFERENCES recipe(idRecipe),
   FOREIGN KEY(idCommentParent) REFERENCES comment(idComment)
);

CREATE TABLE instruction(
   idInstruction INT AUTO_INCREMENT,
   content TEXT,
   idRecipe INT NOT NULL,
   PRIMARY KEY(idInstruction),
   FOREIGN KEY(idRecipe) REFERENCES recipe(idRecipe)
);

CREATE TABLE rights(
   idRight INT AUTO_INCREMENT,
   label VARCHAR(255) ,
   idCategory INT NOT NULL,
   PRIMARY KEY(idRight),
   FOREIGN KEY(idCategory) REFERENCES rightCategory(idCategory)
);

CREATE TABLE planning(
   idPlanning INT AUTO_INCREMENT,
   idUser INT NOT NULL,
   PRIMARY KEY(idPlanning),
   FOREIGN KEY(idUser) REFERENCES userAccount(idUser)
);

CREATE TABLE have(
   idRecipe INT,
   idIngredient INT,
   quantity INT,
   unit VARCHAR(50),
   PRIMARY KEY(idRecipe, idIngredient),
   FOREIGN KEY(idRecipe) REFERENCES recipe(idRecipe),
   FOREIGN KEY(idIngredient) REFERENCES ingredient(idIngredient)
);

CREATE TABLE userProfil(
   idUser INT,
   idProfil INT,
   PRIMARY KEY(idUser, idProfil),
   FOREIGN KEY(idUser) REFERENCES userAccount(idUser),
   FOREIGN KEY(idProfil) REFERENCES profil(idProfil)
);

CREATE TABLE profilRights(
   idProfil INT,
   idRight INT,
   PRIMARY KEY(idProfil, idRight),
   FOREIGN KEY(idProfil) REFERENCES profil(idProfil),
   FOREIGN KEY(idRight) REFERENCES Rights(idRight)
);

CREATE TABLE canSee(
   idUser INT,
   idPlanning INT,
   PRIMARY KEY(idUser, idPlanning),
   FOREIGN KEY(idUser) REFERENCES userAccount(idUser),
   FOREIGN KEY(idPlanning) REFERENCES planning(idPlanning)
);

CREATE TABLE contain(
   idRecipe INT,
   idPlanning INT,
   planDate DATE NOT NULL,
   lunch BOOLEAN NOT NULL,
   PRIMARY KEY(idRecipe, idPlanning),
   FOREIGN KEY(idRecipe) REFERENCES recipe(idRecipe),
   FOREIGN KEY(idPlanning) REFERENCES planning(idPlanning)
);
