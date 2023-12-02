import { Collection, Task } from '@prisma/client';
export default interface ICollection extends Collection {
  tasks: Task[];
}
