
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  CalendarDays, 
  Server, 
  BookOpen, 
  ShieldCheck, 
  Network, 
  HardDrive 
} from 'lucide-react';
import { AppView } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard' as AppView, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'students' as AppView, label: 'Students', icon: <Users size={20} /> },
  { id: 'certificates' as AppView, label: 'Certificates', icon: <Award size={20} /> },
  { id: 'booking' as AppView, label: 'Booking', icon: <CalendarDays size={20} /> },
  { id: 'infrastructure' as AppView, label: 'Infrastructure', icon: <Server size={20} /> },
  { id: 'documentation' as AppView, label: 'Documentation', icon: <BookOpen size={20} /> },
];

export const INFRA_CATEGORIES = [
  { id: 'server', label: 'Server Setup', icon: <Server size={24} /> },
  { id: 'network', label: 'Network Design', icon: <Network size={24} /> },
  { id: 'security', label: 'Security', icon: <ShieldCheck size={24} /> },
  { id: 'backup', label: 'Backup Strategy', icon: <HardDrive size={24} /> },
];
