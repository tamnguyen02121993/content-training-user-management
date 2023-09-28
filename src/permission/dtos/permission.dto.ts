export class PermissionDto {
  id: string;
  name: string;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
  description: string;
  deletedAt?: Date;
}
