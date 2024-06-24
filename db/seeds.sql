INSERT INTO department (department_name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Service'),
        ('Sales'),
        ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Engineering Lead', 100000, 1),
        ('Staff Engineer', 80000, 1),
        ('Finance Manager', 85000, 2),
        ('Customer Service Manager', 95000, 3),
        ('Accountant', 70000, 2),
        ('Customer Service', 82000, 3),
        ('Software Engineer', 70000, 3),
        ('Sales Manager', 75000, 4),
        ('Salesperson', 65000, 4),
        ('Legal Manager', 110000, 5),
        ('Lawyer', 95000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Michael', 'Afton',  2, 1),
        ('James', 'Sunderland',  3, 1), 
        ('Jennifer', 'Simpson',  4, NULL), 
        ('Issac', 'Clark',  5, 4),
        ('Claire', 'Redfield',  6, NULL), 
        ('Jill', 'Valentine',  7, 6), 
        ('Leon', 'Kennedy',  8, 6), 
        ('Ada', 'Wong',  9, NULL), 
        ('Alyssa', 'Hamilton',  10, 9), 
        ('Chris', 'Redfield',  11, NULL), 
        ('Heather', 'Mason',  6, 11);    
