CREATE TABLE secretQuestion(
   idQuestion VARCHAR(50) ,
   question VARCHAR(255)  NOT NULL,
   PRIMARY KEY(idQuestion)
);

CREATE TABLE ingredient(
   idIngredient INT,
   label VARCHAR(50)  NOT NULL,
   PRIMARY KEY(idIngredient)
);

CREATE TABLE profil(
   idProfil INT,
   label VARCHAR(50)  NOT NULL,
   PRIMARY KEY(idProfil),
   UNIQUE(label)
);

CREATE TABLE rightCategory(
   idCategory INT,
   label VARCHAR(50) ,
   PRIMARY KEY(idCategory)
);

CREATE TABLE userAccount(
   idUser INT AUTO_INCREMENT,
   email VARCHAR(100)  NOT NULL,
   firstName VARCHAR(50) ,
   lastName VARCHAR(50) ,
   dateOfBirth DATE,
   username VARCHAR(50)  NOT NULL,
   passhash VARCHAR(255)  NOT NULL,
   salt VARCHAR(50)  NOT NULL,
   answer VARCHAR(50)  NOT NULL,
   idQuestion VARCHAR(50)  NOT NULL,
   PRIMARY KEY(idUser),
   UNIQUE(email),
   UNIQUE(username),
   FOREIGN KEY(idQuestion) REFERENCES secretQuestion(idQuestion)
);

CREATE TABLE recipe(
   idRecipe INT,
   label VARCHAR(255)  NOT NULL,
   idUser INT NOT NULL,
   PRIMARY KEY(idRecipe),
   FOREIGN KEY(idUser) REFERENCES userAccount(idUser)
);

CREATE TABLE comment(
   idComment INT,
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
   idInstruction INT,
   content TEXT,
   idRecipe INT NOT NULL,
   PRIMARY KEY(idInstruction),
   FOREIGN KEY(idRecipe) REFERENCES recipe(idRecipe)
);

CREATE TABLE rights(
   idRight INT,
   label VARCHAR(255) ,
   idCategory INT NOT NULL,
   PRIMARY KEY(idRight),
   FOREIGN KEY(idCategory) REFERENCES rightCategory(idCategory)
);

CREATE TABLE planning(
   idPlanning INT,
   idUser INT NOT NULL,
   PRIMARY KEY(idPlanning),
   FOREIGN KEY(idUser) REFERENCES userAccount(idUser)
);

CREATE TABLE have(
   idRecipe INT,
   idIngredient INT,
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
