export type FileType = {
  id: string;
  filename: string;
  fullName: string;
  timestamp: Date | null | undefined;
  downloadURL: string;
  type: string;
  size: number;
};
