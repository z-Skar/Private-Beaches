CREATE TABLE Clients (
    CLIENT_NIF                          VARCHAR(15)                 PRIMARY KEY,
    NAME                                VARCHAR(40)                 NOT NULL,
    YEAR_OF_BIRTH                       DATE                        NOT NULL,
    EMAIL                               VARCHAR(255)                NOT NULL,
    CONTACT                             VARCHAR(15)                 NOT NULL  
) COMMENT 'Tabela que armazena as informações dos clientes.';

ALTER TABLE Clients ADD CONSTRAINT CLIENT_EMAIL_UK UNIQUE (EMAIL);



CREATE TABLE Lifeguards (
    LIFEGUARD_NIF                       VARCHAR(15)                 PRIMARY KEY,
    NAME                                VARCHAR(40)                 NOT NULL,
    YEAR_OF_BIRTH                       DATE                        NOT NULL,
    EMAIL                               VARCHAR(255)                NOT NULL,
    CONTACT                             VARCHAR(15)                 NOT NULL,  
    SALARY                              DECIMAL(10, 2)               NOT NULL
) COMMENT 'Tabela com as informações dos nadadores salvadores.';



CREATE TABLE Beaches (
    LOCATION                            VARCHAR(50)                 PRIMARY KEY,
    OPENING_HR                          TIME                        NOT NULL,
    CLOSING_HR                          TIME                        NOT NULL, 
    ADULT_COST                          DECIMAL(10, 2)              NOT NULL,
    MINOR_COST                          DECIMAL(10, 2)              DEFAULT 0.00,
    LIFEGUARD_NIF                       VARCHAR(15)                 NOT NULL
) COMMENT 'Tabela com as informações das praias privadas.';

ALTER TABLE Beaches ADD CONSTRAINT BEACH_LIFEGUARD_NIF_FK
    FOREIGN KEY (LIFEGUARD_NIF) REFERENCES Lifeguards(LIFEGUARD_NIF);



CREATE TABLE Reservations (
    RESERVATION_ID        INT           AUTO_INCREMENT              PRIMARY KEY,
    CLIENT_NIF                          VARCHAR(15)                 NOT NULL,
    LOCATION                            VARCHAR(50)                 NOT NULL,
    RESERVATION_START                   DATETIME                    NOT NULL,
    RESERVATION_END                     DATETIME                    NOT NULL
) COMMENT 'Tabela com as informações das reservas feitas pelos clientes.';

ALTER TABLE Reservations ADD (
    CONSTRAINT RESERVATION_CLIENT_NIF_FK
        FOREIGN KEY (CLIENT_NIF) REFERENCES Clients (CLIENT_NIF),
    CONSTRAINT RESERVATION_LOCATION_FK
        FOREIGN KEY (LOCATION) REFERENCES Beaches (LOCATION)
);



CREATE TABLE Bills (
    BILL_ID               INT           AUTO_INCREMENT              PRIMARY KEY,
    RESERVATION_ID                      INT                         NOT NULL,
    CREDIT_CARD_NUMBER                  VARCHAR(25),                 
    BILL_COST                           DECIMAL(10, 2)              NOT NULL
) COMMENT 'Tabela com as informações do pagamento das reservas.';

ALTER TABLE Bills ADD CONSTRAINT BILLS_RESERVATION_ID_FK
    FOREIGN KEY (RESERVATION_ID) REFERENCES Reservations(RESERVATION_ID);