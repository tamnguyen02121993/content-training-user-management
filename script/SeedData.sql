-- Create roles
insert into roles ("id", "name", "description", "created_by", "updated_by") 
values 
('43ece666-bd4d-4b38-88d1-c2aaba1d3bad', 'superadmin', 'Role for Super Administrator', '2c1885ea-8369-4d3c-9371-1f4223f3928a', '2c1885ea-8369-4d3c-9371-1f4223f3928a'),
('eb3823a7-dbbf-4bac-8aa1-2214ad679abd', 'admin', 'Role for Administrator', '2c1885ea-8369-4d3c-9371-1f4223f3928a', '2c1885ea-8369-4d3c-9371-1f4223f3928a'),
('5c28ad36-c6ac-49c4-bb79-a80677be5600', 'user', 'Role for User', '2c1885ea-8369-4d3c-9371-1f4223f3928a', '2c1885ea-8369-4d3c-9371-1f4223f3928a');


-- Create users
-- Default password: P@ssw0rd
insert
	into
	users (
	"id",
	"email",
	"password",
	"updated_by",
	"firstName",
	"lastName",
	"globalId",
	"officeCode",
	"country")
values 
('2c1885ea-8369-4d3c-9371-1f4223f3928a',
'tamnguyen02121993@gmail.com',
'$2a$10$sNar6HnZev5MgdlAIHjJSuxguJgyTs.XG3qcnRV2LQxd2VR2f9UzC',
'2c1885ea-8369-4d3c-9371-1f4223f3928a',
'Tam',
'Nguyen',
'VN',
'HCM City',
'VN'),
(
'6f7f41a0-5cee-4f57-b324-dd5fdc150395',
'dummy@nomail.com',
'$2a$10$sNar6HnZev5MgdlAIHjJSuxguJgyTs.XG3qcnRV2LQxd2VR2f9UzC',
'2c1885ea-8369-4d3c-9371-1f4223f3928a',
'Tam',
'Nguyen',
'VN',
'HCM City',
'VN'
);

-- Assign roles to user
insert into user_roles ("roleId", "userId", "assigned_at")
values 
('eb3823a7-dbbf-4bac-8aa1-2214ad679abd', '2c1885ea-8369-4d3c-9371-1f4223f3928a', CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE),
('5c28ad36-c6ac-49c4-bb79-a80677be5600', '2c1885ea-8369-4d3c-9371-1f4223f3928a', CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE),
('43ece666-bd4d-4b38-88d1-c2aaba1d3bad', '2c1885ea-8369-4d3c-9371-1f4223f3928a', CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE),
('5c28ad36-c6ac-49c4-bb79-a80677be5600', '6f7f41a0-5cee-4f57-b324-dd5fdc150395', CURRENT_TIMESTAMP(0)::TIMESTAMP WITHOUT TIME ZONE);