
export interface Student {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  course: string;
  enrollmentDate: string;
  status: 'Active' | 'Graduated' | 'On Leave';
  avatar: string;
}

export interface Booking {
  id: string;
  studentId: string;
  courseName: string;
  room: string;
  startTime: string;
  endTime: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  hash: string;
}

export interface InfrastructureMetric {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

export type AppView = 'dashboard' | 'students' | 'certificates' | 'booking' | 'infrastructure' | 'documentation';
