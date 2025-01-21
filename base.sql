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

INSERT into users (name,email,mdp)VALUES('nope','nope@gmail.com','Bg');
SELECT * FROM users WHERE mdp = 'bandyBg';
select * from users;
-- Table: Categories
CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

select * from Categories

drop table Categories;

SELECT id FROM Categories Where name = 'Brevets';
insert into Categories(name) values ('Brevets');
insert into Categories(name) values ('droits dauteur');
insert into Categories(name) values ('marques');
insert into Categories(name) values ('dessins industriels');

-- Table: Pays
CREATE TABLE Pays (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) 
);

drop table Pays;

insert into Pays(name)VALUES('Madagascar');
insert into Pays(name)VALUES('France');
-- Table: Art
CREATE TABLE Art (
    id SERIAL PRIMARY KEY,
    idUser INT,
    nom VARCHAR(255) ,
    dateDebut DATE,
    dateFin DATE,
    idCategories int,
     FOREIGN KEY (idCategories) REFERENCES Categories(id),
     FOREIGN KEY (idUser) REFERENCES users(id)
);

select * from Art;

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

SELECT * FROM ArtCategoriesView 



select * from ArtCategoriesView;

drop table Art;
insert into Art(idUser,nom,dateDebut,dateFin)values(1,'song','2025-01-11','2025-01-21');

insert into Art(idUser,nom,dateDebut,dateFin,idCategories)values(1,'film','2025-01-11','2025-01-21',1);

select * from Art;


-- Table: Chanson
CREATE TABLE artPays (
    id SERIAL PRIMARY KEY,
    idPays INT ,
    idArt INT ,
    FOREIGN KEY (idPays) REFERENCES Pays(id),
    FOREIGN KEY (idArt) REFERENCES Art(id)
);

select * from artPays;


-- Table: echeances(Renouvellement,Annuité)
CREATE TABLE echeances (
    id INT PRIMARY KEY,
    nom VARCHAR(255) 
);

select * from  NotificationSame;
-- Table: Notification
CREATE TABLE NotificationSame (
    id SERIAL PRIMARY KEY,
    idUserOriginal INT ,
    idUserCopie INT,
    idArtOrgl INT,
    idArtCopie INT,
    objet TEXT,
    FOREIGN KEY (idUserOriginal) REFERENCES users(id),
    FOREIGN KEY (idUserCopie) REFERENCES users(id),
    FOREIGN KEY (idArtOrgl) REFERENCES Art(id)  
);

drop table NotificationSame;

select * from NotificationSame;
drop table Notification;

insert into Notification(idUser,objet,description) VALUES(1,'blabla','test');
drop table Notification;

-- Table: RaisonArtPays
CREATE TABLE DemandePays (
    id INT PRIMARY KEY,
    idPays INT ,
    idDmd INT ,
    FOREIGN KEY (idPays) REFERENCES Pays(id),
    FOREIGN KEY (idDmd) REFERENCES Demande(id)
);

-- Table: ArtCategories
CREATE TABLE ArtCategories (
    id INT PRIMARY KEY,
    idArt INT ,
    idCategorie INT ,
    FOREIGN KEY (idArt) REFERENCES Art(id),
    FOREIGN KEY (idCategorie) REFERENCES Categories(id)
);

-- Table: MethodePayer
CREATE TABLE MethodePayer (
    id INT PRIMARY KEY,
    methodeName VARCHAR(255) 
);

CREATE VIEW LitigeDetails AS
SELECT
    l.id AS litigeId,
    l.description AS litigeDescription,
    l.dateDebut AS litigeDateDebut,
    l.statut AS litigeStatut,
    a1.nom AS article1Nom,
    a2.nom AS article2Nom
FROM Litige l
JOIN Art a1 ON l.idArt1 = a1.id
JOIN Art a2 ON l.idArt2 = a2.id
LEFT JOIN artPays ap1 ON a1.id = ap1.idArt
LEFT JOIN artPays ap2 ON a2.id = ap2.idArt;



SELECT c.type_licence, c.idUserDM, c.date_debut, c.date_fin, a.nom AS article, 
                  d.statut AS statut_demande, mp.methodeName
           FROM contrats c
           Left JOIN demande d ON c.id = d.idContrat
           left JOIN art a ON d.idArt = a.id
           left JOIN methodePayer mp ON d.idMethodePayer = mp.id
           WHERE c.id = 2;



CREATE VIEW ContratsLicencesTiers AS
SELECT 
    c.id AS contrat_id,
    c.objet AS contrat_objet,
    c.date_debut AS contrat_date_debut,
    c.date_fin AS contrat_date_fin,
    c.territoire AS contrat_territoire,
    c.type_licence AS contrat_type_licence,
    uProp.name AS proprietaire_name,
    uDM.name AS tiers_name
FROM Contrats c
JOIN users uProp ON c.iduserProp = uProp.id
JOIN users uDM ON c.idUserDM = uDM.id;


CREATE TABLE Litige (
    id INT PRIMARY KEY,
    idArt1 INT ,
    idArt2 INT ,
    description TEXT,
    dateDebut DATE,
    statut VARCHAR(255),
    FOREIGN KEY (idArt1) REFERENCES Art(id),
    FOREIGN KEY (idArt2) REFERENCES Art(id)
);

CREATE TABLE Demande (
    id SERIAL PRIMARY KEY,
    idArt INT ,
    idUserDM INT ,
    idUserDMD INT ,
    statut VARCHAR(55),
    idContrat int,
    FOREIGN KEY (idArt) REFERENCES Art(id),
    FOREIGN KEY (idUserDM) REFERENCES users(id),
    FOREIGN KEY (idUserDMD) REFERENCES users(id)
);

drop table Demande;

select * from Demande;

CREATE TABLE EcheancesCategories (
    id INT PRIMARY KEY,
    idEcheances INT ,
    idCategorie INT ,
    FOREIGN KEY (idEcheances) REFERENCES echeances(id),
    FOREIGN KEY (idCategorie) REFERENCES Categories(id)
);



-- Table des contrats
-- Création préalable d'un type ENUM (si nécessaire)
CREATE TYPE licence_type AS ENUM ('Exclusive', 'Non-Exclusive');

-- Création de la table Contrats
CREATE TABLE Contrats (
    id SERIAL PRIMARY KEY,
    objet TEXT ,
    date_debut DATE ,
    date_fin DATE,
    territoire VARCHAR(255),
    type_licence VARCHAR(255) ,
    iduserProp INT ,
    idUserDM INT ,
    statue VARCHAR(50),
    CONSTRAINT fk_userProp FOREIGN KEY (iduserProp) REFERENCES users(id),
    CONSTRAINT fk_userDM FOREIGN KEY (idUserDM) REFERENCES users(id)
);
