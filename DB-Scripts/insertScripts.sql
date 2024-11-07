INSERT INTO Clients (CLIENT_NIF, NAME, YEAR_OF_BIRTH, EMAIL, CONTACT) VALUES 
('123456789', 'João Silva', '1990-05-15', 'joao.silva@gmail.com', '912345678'),
('987654321', 'Maria Oliveira', '1985-11-30', 'maria.oliveira@gmail.com', '923456789'),
('234567890', 'Pedro Costa', '1992-02-20', 'pedro.costa@gmail.com', '934567890'),
('345678901', 'Ana Pereira', '1995-06-10', 'ana.pereira@gmail.com', '945678901'),
('456789012', 'Luís Ferreira', '1988-08-25', 'luis.ferreira@gmail.com', '956789012'),
('567890123', 'Carla Santos', '1991-03-05', 'carla.santos@gmail.com', '967890123'),
('678901234', 'Tiago Martins', '1989-12-12', 'tiago.martins@gmail.com', '978901234');


INSERT INTO Lifeguards (LIFEGUARD_NIF, NAME, YEAR_OF_BIRTH, EMAIL, CONTACT, SALARY) VALUES 
('111111111', 'Ricardo Almeida', '1990-04-15', 'ricardo.almeida@gmail.com', '912345679', 1500.00),
('222222222', 'Sofia Mendes', '1988-10-22', 'sofia.mendes@gmail.com', '923456780', 1600.50),
('333333333', 'Bruno Sousa', '1992-01-30', 'bruno.sousa@gmail.com', '934567891', 1450.75),
('444444444', 'Tatiana Costa', '1985-07-05', 'tatiana.costa@gmail.com', '945678902', 1550.25),
('555555555', 'Miguel Pereira', '1993-03-14', 'miguel.pereira@gmail.com', '956789013', 1580.00),
('666666666', 'Cláudia Martins', '1991-09-18', 'claudia.martins@gmail.com', '967890124', 1625.00),
('777777777', 'André Ferreira', '1989-12-12', 'andre.ferreira@gmail.com', '978901235', 1500.50);


INSERT INTO Beaches (LOCATION, OPENING_HR, CLOSING_HR, ADULT_COST, MINOR_COST, LIFEGUARD_NIF) VALUES 
('Praia da Rocha', '09:00:00', '18:00:00', 10.50, 5.00, '111111111'),
('Praia do Guincho', '08:30:00', '19:00:00', 12.00, 6.00, '222222222'),
('Praia de Copacabana', '09:00:00', '18:30:00', 15.00, 7.00, '333333333'),
('Praia de Carcavelos', '08:00:00', '20:00:00', 11.50, 5.50, '444444444'),
('Praia de Nazaré', '09:30:00', '18:30:00', 14.00, 6.50, '555555555'),
('Praia do Pôr do Sol', '10:00:00', '17:00:00', 9.00, 4.00, '666666666'),
('Praia de São Julião', '09:00:00', '19:30:00', 13.00, 6.00, '777777777');



INSERT INTO Reservations (CLIENT_NIF, LOCATION, RESERVATION_START, RESERVATION_END) VALUES 
('123456789', 'Praia da Rocha', '2024-07-01 09:00:00', '2024-07-01 18:00:00'),
('987654321', 'Praia do Guincho', '2024-07-02 08:30:00', '2024-07-02 19:00:00'),
('234567890', 'Praia de Copacabana', '2024-07-03 09:00:00', '2024-07-03 18:30:00'),
('345678901', 'Praia de Carcavelos', '2024-07-04 08:00:00', '2024-07-04 20:00:00'),
('456789012', 'Praia de Nazaré', '2024-07-05 09:30:00', '2024-07-05 18:30:00'),
('567890123', 'Praia do Pôr do Sol', '2024-07-06 10:00:00', '2024-07-06 17:00:00'),
('678901234', 'Praia de São Julião', '2024-07-07 09:00:00', '2024-07-07 19:30:00');



INSERT INTO Bills (RESERVATION_ID, CREDIT_CARD_NUMBER, BILL_COST) VALUES 
(1, '4111 1111 1111 1111',  73.50),
(2, NULL,                   60.00),
(3, '3400 0000 0000 009',   120.00),
(4, '6011 0000 0000 0004',  184.00),
(5, NULL,                   195.00),
(6, '4024 0071 1234 5678',  180.00),
(7, '3782 8224 6310 005',   182.00);