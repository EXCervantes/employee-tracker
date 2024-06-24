INSERT INTO department (department_name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Service'),
        ('Sales'),
        ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Engineering Manager', 100000, 1),
        ('Staff Engineer', 90000, 1),
        ('Finance Manager', 85000, 2),
        ('Customer Service Manager', 95000, 3),
        ('Accountant', 80000, 2),
        ('Customer Service', 72000, 3),
        ('Software Engineer', 78000, 1),
        ('Sales Manager', 75000, 4),
        ('Salesperson', 65000, 4),
        ('Legal Manager', 110000, 5),
        ('Lawyer', 95000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Michael', 'Afton',  2, NULL),
        ('James', 'Sunderland',  3, NULL), 
        ('Jennifer', 'Simpson',  4, NULL), 
        ('Issac', 'Clark',  5, 2),
        ('Claire', 'Redfield',  6, 3), 
        ('Jill', 'Valentine',  7, 1), 
        ('Leon', 'Kennedy',  8, NULL), 
        ('Ada', 'Wong',  9, 7), 
        ('Alyssa', 'Hamilton',  10, NULL), 
        ('Chris', 'Redfield',  11, 9),
        ('Heather', 'Mason',  6, 3);  
