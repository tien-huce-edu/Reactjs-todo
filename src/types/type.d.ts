export type Todo = {
  id: number;
  status: boolean;
  title: string;
  dueDate: string;
  note: string;
};

export type ModalType = 'Add' | 'Edit' | 'Delete' | null;
