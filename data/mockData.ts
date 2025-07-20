import { Doctor, Appointment } from '../types'

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    rating: 4.8,
    reviewCount: 127,
    experience: 8,
    consultationFee: 75,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    location: 'Downtown Medical Center',
    distance: '0.8 km',
    availability: 'available',
    nextAvailable: 'Today 2:30 PM',
    about: 'Dr. Sarah Johnson is a board-certified family medicine physician with over 8 years of experience. She specializes in preventive care, chronic disease management, and patient education.',
    education: ['MD from Harvard Medical School', 'Residency at Johns Hopkins'],
    languages: ['English', 'Spanish'],
    totalPatients: 1250
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    rating: 4.9,
    reviewCount: 203,
    experience: 12,
    consultationFee: 120,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    location: 'Heart Care Clinic',
    distance: '1.2 km',
    availability: 'busy',
    nextAvailable: 'Tomorrow 10:00 AM',
    about: 'Dr. Michael Chen is a renowned cardiologist specializing in interventional cardiology and heart disease prevention. He has published numerous research papers in cardiovascular medicine.',
    education: ['MD from Stanford University', 'Fellowship in Cardiology at Mayo Clinic'],
    languages: ['English', 'Mandarin'],
    totalPatients: 2100
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    rating: 4.7,
    reviewCount: 89,
    experience: 6,
    consultationFee: 90,
    image: 'https://images.unsplash.com/photo-1594824475317-d3e2b4b5e3b5?w=400&h=400&fit=crop&crop=face',
    location: 'Skin Health Institute',
    distance: '2.1 km',
    availability: 'available',
    nextAvailable: 'Today 4:15 PM',
    about: 'Dr. Emily Rodriguez is a dermatologist with expertise in medical and cosmetic dermatology. She focuses on skin cancer prevention and advanced dermatological treatments.',
    education: ['MD from UCLA', 'Dermatology Residency at UCSF'],
    languages: ['English', 'Spanish', 'Portuguese'],
    totalPatients: 850
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Pediatrics',
    rating: 4.9,
    reviewCount: 156,
    experience: 10,
    consultationFee: 80,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
    location: 'Children\'s Health Center',
    distance: '1.5 km',
    availability: 'available',
    nextAvailable: 'Today 3:00 PM',
    about: 'Dr. James Wilson is a pediatrician dedicated to providing comprehensive healthcare for children from infancy through adolescence. He specializes in developmental pediatrics.',
    education: ['MD from Johns Hopkins', 'Pediatric Residency at Children\'s Hospital Boston'],
    languages: ['English', 'French'],
    totalPatients: 1800
  }
]

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    specialty: 'General Medicine',
    date: '2024-01-25',
    time: '10:30 AM',
    location: 'Downtown Medical Center',
    status: 'upcoming',
    type: 'consultation'
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    doctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    specialty: 'Cardiology',
    date: '2024-01-28',
    time: '2:15 PM',
    location: 'Heart Care Clinic',
    status: 'upcoming',
    type: 'follow-up'
  },
  {
    id: '3',
    doctorId: '3',
    doctorName: 'Dr. Emily Rodriguez',
    doctorImage: 'https://images.unsplash.com/photo-1594824475317-d3e2b4b5e3b5?w=400&h=400&fit=crop&crop=face',
    specialty: 'Dermatology',
    date: '2024-01-15',
    time: '11:00 AM',
    location: 'Skin Health Institute',
    status: 'completed',
    type: 'check-up'
  }
]

export const specialties = [
  'All',
  'General Medicine',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Psychiatry'
]

export const timeSlots = [
  { time: '9:00 AM', available: true },
  { time: '9:30 AM', available: false },
  { time: '10:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '11:30 AM', available: true },
  { time: '2:00 PM', available: true },
  { time: '2:30 PM', available: true },
  { time: '3:00 PM', available: false },
  { time: '3:30 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '4:30 PM', available: true }
]