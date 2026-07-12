export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'pending' | 'failed';
  enrolled: boolean;
}