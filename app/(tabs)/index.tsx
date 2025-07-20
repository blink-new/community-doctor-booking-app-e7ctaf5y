import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { mockDoctors, specialties } from '../../data/mockData'

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return '#10B981'
      case 'busy': return '#F59E0B'
      case 'offline': return '#EF4444'
      default: return '#64748B'
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-lg text-gray-600">Good morning!</Text>
              <Text className="text-2xl font-bold text-gray-900">Find your doctor</Text>
            </View>
            <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
              <Ionicons name="notifications-outline" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View className="flex-row items-center mb-6">
            <Ionicons name="location-outline" size={20} color="#64748B" />
            <Text className="ml-2 text-gray-600">Downtown, San Francisco</Text>
            <Ionicons name="chevron-down" size={16} color="#64748B" className="ml-1" />
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm mb-6">
            <Ionicons name="search" size={20} color="#64748B" />
            <TextInput
              placeholder="Search doctors, specialties..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-gray-900"
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity>
              <Ionicons name="options-outline" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity 
              className="flex-1 bg-primary rounded-xl p-4 mr-3"
              onPress={() => router.push('/(tabs)/search')}
            >
              <Ionicons name="search" size={24} color="white" />
              <Text className="text-white font-semibold mt-2">Find Doctor</Text>
              <Text className="text-blue-100 text-sm">Search by specialty</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 bg-accent rounded-xl p-4"
              onPress={() => router.push('/(tabs)/appointments')}
            >
              <Ionicons name="calendar" size={24} color="white" />
              <Text className="text-white font-semibold mt-2">Appointments</Text>
              <Text className="text-green-100 text-sm">Manage bookings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Specialties */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Specialties</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {specialties.map((specialty) => (
                <TouchableOpacity
                  key={specialty}
                  onPress={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full mr-3 ${
                    selectedSpecialty === specialty
                      ? 'bg-primary'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      selectedSpecialty === specialty
                        ? 'text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    {specialty}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Doctors List */}
        <View className="px-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">
              Available Doctors ({filteredDoctors.length})
            </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
              <Text className="text-primary font-medium">See all</Text>
            </TouchableOpacity>
          </View>

          {filteredDoctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              onPress={() => router.push(`/doctor/${doctor.id}`)}
              className="bg-white rounded-xl p-4 mb-4 shadow-sm"
            >
              <View className="flex-row">
                <Image
                  source={{ uri: doctor.image }}
                  className="w-16 h-16 rounded-full"
                />
                <View className="flex-1 ml-4">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-lg font-semibold text-gray-900">{doctor.name}</Text>
                    <View
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getAvailabilityColor(doctor.availability) }}
                    />
                  </View>
                  <Text className="text-gray-600 mb-1">{doctor.specialty}</Text>
                  <View className="flex-row items-center mb-2">
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Text className="text-gray-600 ml-1">{doctor.rating} ({doctor.reviewCount})</Text>
                    <Text className="text-gray-400 mx-2">•</Text>
                    <Text className="text-gray-600">{doctor.distance}</Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-gray-500">{doctor.nextAvailable}</Text>
                    <Text className="text-primary font-semibold">${doctor.consultationFee}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  )
}