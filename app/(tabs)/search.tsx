import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { mockDoctors, specialties } from '../../data/mockData'

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.location.toLowerCase().includes(searchQuery.toLowerCase())
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

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available'
      case 'busy': return 'Busy'
      case 'offline': return 'Offline'
      default: return 'Unknown'
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-4 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-gray-900">Search Doctors</Text>
          <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
            <Ionicons name="options-outline" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3">
          <Ionicons name="search" size={20} color="#64748B" />
          <TextInput
            placeholder="Search by name, specialty, or location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-gray-900"
            placeholderTextColor="#94A3B8"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      {showFilters && (
        <View className="px-6 py-4 bg-white border-b border-gray-100">
          <Text className="text-sm font-medium text-gray-700 mb-3">Filter by Specialty</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {specialties.map((specialty) => (
                <TouchableOpacity
                  key={specialty}
                  onPress={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full mr-3 ${
                    selectedSpecialty === specialty
                      ? 'bg-primary'
                      : 'bg-gray-100'
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
      )}

      {/* Results */}
      <ScrollView className="flex-1">
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            {filteredDoctors.length} doctors found
          </Text>

          {filteredDoctors.length === 0 ? (
            <View className="items-center py-12">
              <Ionicons name="search" size={64} color="#CBD5E1" />
              <Text className="text-xl font-semibold text-gray-400 mt-4">No doctors found</Text>
              <Text className="text-gray-500 text-center mt-2">
                Try adjusting your search criteria or filters
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('')
                  setSelectedSpecialty('All')
                }}
                className="bg-primary px-6 py-3 rounded-xl mt-4"
              >
                <Text className="text-white font-semibold">Clear filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredDoctors.map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                onPress={() => router.push(`/doctor/${doctor.id}`)}
                className="bg-white rounded-xl p-4 mb-4 shadow-sm"
              >
                <View className="flex-row">
                  <Image
                    source={{ uri: doctor.image }}
                    className="w-20 h-20 rounded-xl"
                  />
                  <View className="flex-1 ml-4">
                    <View className="flex-row items-start justify-between mb-2">
                      <View className="flex-1">
                        <Text className="text-lg font-semibold text-gray-900">{doctor.name}</Text>
                        <Text className="text-gray-600">{doctor.specialty}</Text>
                      </View>
                      <View className="items-end">
                        <View
                          className="px-2 py-1 rounded-full flex-row items-center"
                          style={{ backgroundColor: `${getAvailabilityColor(doctor.availability)}20` }}
                        >
                          <View
                            className="w-2 h-2 rounded-full mr-1"
                            style={{ backgroundColor: getAvailabilityColor(doctor.availability) }}
                          />
                          <Text
                            className="text-xs font-medium"
                            style={{ color: getAvailabilityColor(doctor.availability) }}
                          >
                            {getAvailabilityText(doctor.availability)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="flex-row items-center mb-2">
                      <Ionicons name="star" size={16} color="#F59E0B" />
                      <Text className="text-gray-600 ml-1">{doctor.rating}</Text>
                      <Text className="text-gray-400 mx-1">•</Text>
                      <Text className="text-gray-600">{doctor.reviewCount} reviews</Text>
                      <Text className="text-gray-400 mx-1">•</Text>
                      <Text className="text-gray-600">{doctor.experience} years</Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={16} color="#64748B" />
                        <Text className="text-gray-500 ml-1">{doctor.distance}</Text>
                      </View>
                      <Text className="text-primary font-bold text-lg">${doctor.consultationFee}</Text>
                    </View>

                    {doctor.nextAvailable && (
                      <View className="mt-2 pt-2 border-t border-gray-100">
                        <Text className="text-sm text-accent font-medium">
                          Next available: {doctor.nextAvailable}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  )
}