export interface Note {
  id: string;
  userid: string;
  title: string;
  text: string;
  created_timestamp: number;
  modified_timestamp: number;
  isMarked: boolean;
}
