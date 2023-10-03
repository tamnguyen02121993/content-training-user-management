-- Create permission group
insert into permission_groups ("id", "name")
values ('ed640177-5c85-4969-80a7-f587ed6ef681', 'user_group'),
('0e6b7893-61f6-468d-b4e0-2201fbcef1df', 'role_groups'),
('ca80cf25-82cc-4af3-aeab-75b997318d37', 'permission_group');

-- Create permissions
insert into permissions ("id", "name", "description", "code", "permissionGroupId")
values 
('986de67c-4133-4499-89d9-71d6af369060', 'ViewUser', 'View User', 'ViewUser', 'ed640177-5c85-4969-80a7-f587ed6ef681'),
('92c7f12e-b1ac-4fb5-beaa-e08979332d78', 'ViewUserByEmail', 'View User By Email', 'ViewUserByEmail', 'ed640177-5c85-4969-80a7-f587ed6ef681'),
('a5eedd16-e673-4718-8357-bdb800cb4b05', 'CreateUser', 'Create User', 'CreateUser', 'ed640177-5c85-4969-80a7-f587ed6ef681'),
('4a109dc7-5bc7-4378-bb80-4cb2e14ec1a3', 'UpdateUser', 'Update User', 'UpdateUser', 'ed640177-5c85-4969-80a7-f587ed6ef681'),
('b1d4c621-aca5-4822-907b-f9a489591a68', 'DeleteUser', 'Delete User', 'DeleteUser', 'ed640177-5c85-4969-80a7-f587ed6ef681'),
('057230e6-e425-45f6-963d-db09dd9ca6b2', 'ViewRole', 'View Role', 'ViewRole', '0e6b7893-61f6-468d-b4e0-2201fbcef1df'),
('92c7f12e-b1ac-4fb5-beaa-e08979332d78', 'ViewRoleById', 'View Role By Id', 'ViewRoleById', '0e6b7893-61f6-468d-b4e0-2201fbcef1df'),
('32cc9d08-80cd-4c16-833d-99c97aad8a90', 'CreateRole', 'Create Role', 'CreateRole', '0e6b7893-61f6-468d-b4e0-2201fbcef1df'),
('1eb8c6f2-5780-4810-a92d-e20d6e6f278d', 'UpdateRole', 'Update Role', 'UpdateRole', '0e6b7893-61f6-468d-b4e0-2201fbcef1df'),
('dff6092d-33b7-4ece-aed8-2191a47d7301', 'DeleteRole', 'Delete Role', 'DeleteRole', '0e6b7893-61f6-468d-b4e0-2201fbcef1df'),
('e19440fc-a554-45b7-9f6a-bf36a610760c', 'ViewPermission', 'View Permission', 'ViewPermission', 'ca80cf25-82cc-4af3-aeab-75b997318d37'),
('6b9bd307-face-4910-94bd-06d6750e2fff', 'ViewPermissionById', 'View Permission By Id', 'ViewPermissionById', 'ca80cf25-82cc-4af3-aeab-75b997318d37'),
('f7f8c947-6b59-4b9e-a5a4-be6beefe853b', 'CreatePermission', 'Create Permission', 'CreatePermission', 'ca80cf25-82cc-4af3-aeab-75b997318d37'),
('76149202-f9ca-4257-9413-110d2e255d23', 'UpdatePermission', 'Update Permission', 'UpdatePermission', 'ca80cf25-82cc-4af3-aeab-75b997318d37'),
('faff365e-6303-415f-837b-041c486f2f25', 'DeletePermission', 'Delete Permission', 'DeletePermission', 'ca80cf25-82cc-4af3-aeab-75b997318d37');

-- Create roles
insert into roles ("id", "name", "description", "created_by", "updated_by") 
values 
('43ece666-bd4d-4b38-88d1-c2aaba1d3bad', 'superadmin', 'Role for Super Administrator', '2c1885ea-8369-4d3c-9371-1f4223f3928a', '2c1885ea-8369-4d3c-9371-1f4223f3928a'),
('eb3823a7-dbbf-4bac-8aa1-2214ad679abd', 'admin', 'Role for Administrator', '2c1885ea-8369-4d3c-9371-1f4223f3928a', '2c1885ea-8369-4d3c-9371-1f4223f3928a'),
('5c28ad36-c6ac-49c4-bb79-a80677be5600', 'user', 'Role for User', '2c1885ea-8369-4d3c-9371-1f4223f3928a', '2c1885ea-8369-4d3c-9371-1f4223f3928a');

-- Assign permissions to role
insert into role_permissions ("permissionId", "roleId")
values 
('986de67c-4133-4499-89d9-71d6af369060', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('a5eedd16-e673-4718-8357-bdb800cb4b05', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('4a109dc7-5bc7-4378-bb80-4cb2e14ec1a3', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('b1d4c621-aca5-4822-907b-f9a489591a68', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('057230e6-e425-45f6-963d-db09dd9ca6b2', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('32cc9d08-80cd-4c16-833d-99c97aad8a90', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('1eb8c6f2-5780-4810-a92d-e20d6e6f278d', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('dff6092d-33b7-4ece-aed8-2191a47d7301', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('e19440fc-a554-45b7-9f6a-bf36a610760c', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('f7f8c947-6b59-4b9e-a5a4-be6beefe853b', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('76149202-f9ca-4257-9413-110d2e255d23', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('faff365e-6303-415f-837b-041c486f2f25', '43ece666-bd4d-4b38-88d1-c2aaba1d3bad'),
('986de67c-4133-4499-89d9-71d6af369060', '5c28ad36-c6ac-49c4-bb79-a80677be5600'),
('057230e6-e425-45f6-963d-db09dd9ca6b2', '5c28ad36-c6ac-49c4-bb79-a80677be5600'),
('e19440fc-a554-45b7-9f6a-bf36a610760c', '5c28ad36-c6ac-49c4-bb79-a80677be5600'),
('986de67c-4133-4499-89d9-71d6af369060', 'eb3823a7-dbbf-4bac-8aa1-2214ad679abd'),
('057230e6-e425-45f6-963d-db09dd9ca6b2', 'eb3823a7-dbbf-4bac-8aa1-2214ad679abd'),
('e19440fc-a554-45b7-9f6a-bf36a610760c', 'eb3823a7-dbbf-4bac-8aa1-2214ad679abd'),
('a5eedd16-e673-4718-8357-bdb800cb4b05', 'eb3823a7-dbbf-4bac-8aa1-2214ad679abd');

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