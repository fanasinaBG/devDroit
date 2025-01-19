-- Active: 1728498475504@@127.0.0.1@5432@tovo
 --Table: user
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55),
    email VARCHAR(55),
    mdp VARCHAR(255)
);

SELECT * FROM users;

INSERT into users (name,email,mdp)VALUES('fanasina','fansina@gmail.com','bandyBg');
SELECT * FROM users WHERE mdp = 'bandyBg';
select * from users;
-- Table: Categories
CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

select * from Categories

drop table Categories;

insert into Categories(name) values ('Brevets');
insert into Categories(name) values ('droits dauteur');
insert into Categories(name) values ('marques');
insert into Categories(name) values ('dessins industriels');

-- Table: Pays
CREATE TABLE Pays (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Table: Art
CREATE TABLE Art (
    id SERIAL PRIMARY KEY,
    idUser INT ,
    nom VARCHAR(255) ,
    dateDebut DATE,
    dateFin DATE,
    idCategories int,
     FOREIGN KEY (idCategories) REFERENCES Categories(id),
     FOREIGN KEY (idUser) REFERENCES users(id)
);


select * from Art;

CREATE VIEW ArtCategoriesView AS
SELECT 
    Art.id AS ArtID,
    Art.nom AS ArtName,
    Art.dateDebut AS StartDate,
    Art.dateFin AS EndDate,
    Categories.name AS CategoryName,
    Art.idUser AS UserID
FROM 
    Art
INNER JOIN 
    Categories ON Art.idCategories = Categories.id;



select * from ArtCategoriesView;

drop table Art;
insert into Art(idUser,nom,dateDebut,dateFin)values(1,'song','2025-01-11','2025-01-21');

insert into Art(idUser,nom,dateDebut,dateFin,idCategories)values(1,'film','2025-01-11','2025-01-21',1);

select * from Art;


-- Table: Chanson
CREATE TABLE artPays (
    id INT PRIMARY KEY,
    idPays INT NOT NULL,
    idArt INT NOT NULL,
    FOREIGN KEY (idPays) REFERENCES Pays(id),
    FOREIGN KEY (idArt) REFERENCES Art(id)
);


-- Table: echeances(Renouvellement,Annuité)
CREATE TABLE echeances (
    id INT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

-- Table: Notification
CREATE TABLE NotificationSame (
    id SERIAL PRIMARY KEY,
    idUserOriginal INT ,
    idUserCopie INT,
    idArtorg INT,
    idArtcopie INT,
    objet TEXT,
    FOREIGN KEY (idArtorg) REFERENCES Art(id),
    FOREIGN KEY (idArtcopie) REFERENCES Art(id),
    FOREIGN KEY (idUser) REFERENCES users(id)
);

drop table NotificationSame;

select * from NotificationSame;
drop table Notification;

insert into Notification(idUser,objet,description) VALUES(1,'blabla','test');
drop table Notification;

-- Table: RaisonArtPays
CREATE TABLE DemandePays (
    id INT PRIMARY KEY,
    idPays INT NOT NULL,
    idDmd INT NOT NULL,
    FOREIGN KEY (idPays) REFERENCES Pays(id),
    FOREIGN KEY (idDmd) REFERENCES Demande(id)
);

-- Table: ArtCategories
CREATE TABLE ArtCategories (
    id INT PRIMARY KEY,
    idArt INT NOT NULL,
    idCategorie INT NOT NULL,
    FOREIGN KEY (idArt) REFERENCES Art(id),
    FOREIGN KEY (idCategorie) REFERENCES Categories(id)
);

-- Table: MethodePayer
CREATE TABLE MethodePayer (
    id INT PRIMARY KEY,
    methodeName VARCHAR(255) NOT NULL
);

CREATE TABLE Litige (
    id INT PRIMARY KEY,
    idArt1 INT NOT NULL,
    idArt2 INT NOT NULL,
    description TEXT,
    dateDebut DATE,
    statut VARCHAR(255),
    FOREIGN KEY (idArt1) REFERENCES Art(id),
    FOREIGN KEY (idArt2) REFERENCES Art(id)
);

CREATE TABLE Demande (
    id INT PRIMARY KEY,
    idArt INT NOT NULL,
    idUserDM INT NOT NULL,
    statut VARCHAR(55),
    idMethodePayer INT NOT NULL,
    dateDebut DATE,
    dateFin DATE,
    idContrat int,
    FOREIGN KEY (idContrat) REFERENCES Contrats(id),
    FOREIGN KEY (idArt1) REFERENCES Art(id),
    FOREIGN KEY (idUserDM) REFERENCES users(id),
    FOREIGN KEY (idMethodePayer) REFERENCES MethodePayer(id)
);

CREATE TABLE EcheancesCategories (
    id INT PRIMARY KEY,
    idEcheances INT NOT NULL,
    idCategorie INT NOT NULL,
    FOREIGN KEY (idEcheances) REFERENCES echeances(id),
    FOREIGN KEY (idCategorie) REFERENCES Categories(id)
);



-- Table des contrats
CREATE TABLE Contrats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    objet TEXT NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE,
    territoire VARCHAR(255),
    type_licence ENUM('Exclusive', 'Non-Exclusive') NOT NULL,
    iduserProp INT NOT NULL,
    idUserDM INT NOT NULL,
    FOREIGN KEY (iduserProp) REFERENCES users(id),
    FOREIGN KEY (idUserDM) REFERENCES users(id)
);