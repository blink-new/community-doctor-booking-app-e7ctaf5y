import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { mockAppointments } from '../../data/mockData'
import { blink } from '../../lib/blink'

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'upcoming')
  const completedAppointments = mockAppointments.filter(apt => apt.status === 'completed')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#2563EB'
      case 'completed': return '#10B981'
      case 'cancelled': return '#EF4444'
      default: return '#64748B'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <Image
            source={{ uri: appointment.doctorImage }}
            className="w-12 h-12 rounded-full"
          />
          <View className="ml-3 flex-1">
            <Text className="text-lg font-semibold text-gray-900">{appointment.doctorName}</Text>
            <Text className="text-gray-600">{appointment.specialty}</Text>
          </View>
        </View>
        <View
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: `${getStatusColor(appointment.status)}20` }}
        >
          <Text
            className="text-xs font-medium capitalize"
            style={{ color: getStatusColor(appointment.status) }}
          >
            {appointment.status}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center flex-1">
          <Ionicons name="calendar-outline" size={16} color="#64748B" />
          <Text className="text-gray-600 ml-2">{formatDate(appointment.date)}</Text>
        </View>
        <View className="flex-row items-center flex-1">
          <Ionicons name="time-outline" size={16} color="#64748B" />
          <Text className="text-gray-600 ml-2">{appointment.time}</Text>
        </View>
      </View>

      <View className="flex-row items-center mb-4">
        <Ionicons name="location-outline" size={16} color="#64748B" />
        <Text className="text-gray-600 ml-2">{appointment.location}</Text>
      </View>

      <View className="flex-row justify-between">
        {appointment.status === 'upcoming' ? (
          <>
            <TouchableOpacity className="flex-1 bg-gray-100 py-3 rounded-lg mr-2 items-center">
              <View className="flex-row items-center">
                <Ionicons name="call-outline" size={16} color="#64748B" />
                <Text className="text-gray-700 ml-1 font-medium">Call</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-100 py-3 rounded-lg mx-1 items-center">
              <View className="flex-row items-center">
                <Ionicons name="chatbubble-outline" size={16} color="#64748B" />
                <Text className="text-gray-700 ml-1 font-medium">Message</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-primary py-3 rounded-lg ml-2 items-center">
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={16} color="white" />
                <Text className="text-white ml-1 font-medium">Reschedule</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity className="flex-1 bg-gray-100 py-3 rounded-lg mr-2 items-center">
              <View className="flex-row items-center">
                <Ionicons name="document-text-outline" size={16} color="#64748B" />
                <Text className="text-gray-700 ml-1 font-medium">View Report</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-primary py-3 rounded-lg ml-2 items-center">
              <View className="flex-row items-center">
                <Ionicons name="refresh-outline" size={16} color="white" />
                <Text className="text-white ml-1 font-medium">Book Again</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  )

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="calendar-outline" size={64} color="#CBD5E1" />
          <Text className="text-xl font-semibold text-gray-400 mt-4">Sign in to view appointments</Text>
          <Text className="text-gray-500 text-center mt-2">
            Please sign in to access your appointment history and manage bookings
          </Text>
          <TouchableOpacity
            onPress={() => blink.auth.login()}
            className="bg-primary px-6 py-3 rounded-xl mt-6"
          >
            <Text className="text-white font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-4">My Appointments</Text>
        
        {/* Tabs */}
        <View className="flex-row bg-gray-100 rounded-lg p-1">
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 rounded-md ${
              activeTab === 'upcoming' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text
              className={`text-center font-medium ${
                activeTab === 'upcoming' ? 'text-gray-900' : 'text-gray-600'
              }`}
            >
              Upcoming ({upcomingAppointments.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('completed')}
            className={`flex-1 py-2 rounded-md ${
              activeTab === 'completed' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <Text
              className={`text-center font-medium ${
                activeTab === 'completed' ? 'text-gray-900' : 'text-gray-600'
              }`}
            >
              Completed ({completedAppointments.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        <View className="px-6 py-4">
          {activeTab === 'upcoming' ? (
            upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <View className="items-center py-12">
                <Ionicons name="calendar-outline" size={64} color="#CBD5E1" />
                <Text className="text-xl font-semibold text-gray-400 mt-4">No upcoming appointments</Text>
                <Text className="text-gray-500 text-center mt-2">
                  Book your first appointment with a doctor
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/search')}
                  className="bg-primary px-6 py-3 rounded-xl mt-4"
                >
                  <Text className="text-white font-semibold">Find a Doctor</Text>
                </TouchableOpacity>
              </View>
            )
          ) : (
            completedAppointments.length > 0 ? (
              completedAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <View className="items-center py-12">
                <Ionicons name="checkmark-circle-outline" size={64} color="#CBD5E1" />
                <Text className="text-xl font-semibold text-gray-400 mt-4">No completed appointments</Text>
                <Text className="text-gray-500 text-center mt-2">
                  Your appointment history will appear here
                </Text>
              </View>
            )
          )}
        </View>
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  )
}