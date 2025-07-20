export interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  reviewCount: number
  experience: number
  consultationFee: number
  image: string
  location: string
  distance: string
  availability: 'available' | 'busy' | 'offline'
  nextAvailable?: string
  about: string
  education: string[]
  languages: string[]
  totalPatients: number
}

export interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  doctorImage: string
  specialty: string
  date: string
  time: string
  location: string
  status: 'upcoming' | 'completed' | 'cancelled'
  type: 'consultation' | 'follow-up' | 'check-up'
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  totalAppointments: number
  totalDoctors: number
  upcomingAppointments: number
}

export interface BookingStep {
  step: number
  title: string
  completed: boolean
}

export interface TimeSlot {
  time: string
  available: boolean
}