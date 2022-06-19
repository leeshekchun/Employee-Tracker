INSERT INTO department (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Salesperson', 8000, 1),
        ('Lead Engineer', 150000, 2),
        ('Software Engineer', 120000, 2),
        ('Account Manager', 160000, 3),
        ('Accountant', 125000, 3),
        ('Legal Team Lead', 250000, 4),
        ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('Chirs', 'Lee', 1),
        ('Jed', 'Lee', 2);

UPDATE employee
SET manager_id = 1
WHERE employee.id = 2
