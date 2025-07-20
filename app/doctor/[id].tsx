import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { mockDoctors } from '../../data/mockData'

export default function DoctorProfileScreen() {
  const { id } = useLocalSearchParams()
  const doctor = mockDoctors.find(d => d.id === id)

  if (!doctor) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Doctor not found</Text>
        </View>
      </SafeAreaView>
    )
  }

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
      case 'available': return 'Available Now'
      case 'busy': return 'Busy'
      case 'offline': return 'Offline'
      default: return 'Unknown'
    }
  }

  const reviews = [
    {
      id: '1',
      name: 'Sarah M.',
      rating: 5,
      comment: 'Excellent doctor! Very thorough and caring. Highly recommend.',
      date: '2 days ago'
    },
    {
      id: '2',
      name: 'John D.',
      rating: 4,
      comment: 'Great experience. Dr. Johnson explained everything clearly.',
      date: '1 week ago'
    }
  ]

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Doctor Profile</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Doctor Info */}
        <View className="bg-white px-6 py-6">
          <View className="items-center mb-6">
            <Image
              source={{ uri: doctor.image }}
              className="w-32 h-32 rounded-full mb-4"
            />
            <Text className="text-2xl font-bold text-gray-900 text-center">{doctor.name}</Text>
            <Text className="text-lg text-gray-600 mb-2">{doctor.specialty}</Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text className="text-gray-600 ml-1">{doctor.rating} ({doctor.reviewCount} reviews)</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="items-center flex-1">
              <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center mb-2">
                <Ionicons name="time-outline" size={24} color="#2563EB" />
              </View>
              <Text className="text-lg font-bold text-gray-900">{doctor.experience}+</Text>
              <Text className="text-gray-600 text-sm text-center">Years Experience</Text>
            </View>
            <View className="items-center flex-1">
              <View className="w-16 h-16 bg-green-50 rounded-full items-center justify-center mb-2">
                <Ionicons name="people-outline" size={24} color="#10B981" />
              </View>
              <Text className="text-lg font-bold text-gray-900">{doctor.totalPatients}+</Text>
              <Text className="text-gray-600 text-sm text-center">Patients Treated</Text>
            </View>
            <View className="items-center flex-1">
              <View className="w-16 h-16 bg-purple-50 rounded-full items-center justify-center mb-2">
                <Ionicons name="card-outline" size={24} color="#8B5CF6" />
              </View>
              <Text className="text-lg font-bold text-gray-900">${doctor.consultationFee}</Text>
              <Text className="text-gray-600 text-sm text-center">Consultation Fee</Text>
            </View>
          </View>

          {/* Availability */}
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: getAvailabilityColor(doctor.availability) }}
                />
                <Text className="font-medium text-gray-900">{getAvailabilityText(doctor.availability)}</Text>
              </View>
              {doctor.nextAvailable && (
                <Text className="text-gray-600">Next: {doctor.nextAvailable}</Text>
              )}
            </View>
          </View>
        </View>

        {/* About */}
        <View className="bg-white px-6 py-6 mt-2">
          <Text className="text-lg font-semibold text-gray-900 mb-3">About</Text>
          <Text className="text-gray-600 leading-6 mb-4">{doctor.about}</Text>
          
          <Text className="text-lg font-semibold text-gray-900 mb-3">Education</Text>
          {doctor.education.map((edu, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <Ionicons name="school-outline" size={16} color="#64748B" />
              <Text className="text-gray-600 ml-2">{edu}</Text>
            </View>
          ))}

          <Text className="text-lg font-semibold text-gray-900 mb-3 mt-4">Languages</Text>
          <View className="flex-row flex-wrap">
            {doctor.languages.map((language, index) => (
              <View key={index} className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-gray-700">{language}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Location */}
        <View className="bg-white px-6 py-6 mt-2">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Location</Text>
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="#64748B" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-900 font-medium">{doctor.location}</Text>
              <Text className="text-gray-600">{doctor.distance} from your location</Text>
            </View>
            <TouchableOpacity className="bg-gray-100 px-3 py-2 rounded-lg">
              <Text className="text-gray-700 font-medium">Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reviews */}
        <View className="bg-white px-6 py-6 mt-2">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">Reviews ({doctor.reviewCount})</Text>
            <TouchableOpacity>
              <Text className="text-primary font-medium">See all</Text>
            </TouchableOpacity>
          </View>

          {reviews.map((review) => (
            <View key={review.id} className="mb-4 pb-4 border-b border-gray-100 last:border-b-0">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-medium text-gray-900">{review.name}</Text>
                <Text className="text-gray-500 text-sm">{review.date}</Text>
              </View>
              <View className="flex-row items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={14}
                    color={i < review.rating ? "#F59E0B" : "#E5E7EB"}
                  />
                ))}
              </View>
              <Text className="text-gray-600">{review.comment}</Text>
            </View>
          ))}
        </View>

        <View className="h-32" />
      </ScrollView>

      {/* Bottom Actions */}
      <View className="bg-white px-6 py-4 border-t border-gray-100">
        <View className="flex-row">
          <TouchableOpacity className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-4">
            <Ionicons name="call" size={20} color="#64748B" />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center mr-4">
            <Ionicons name="chatbubble" size={20} color="#64748B" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/booking/${doctor.id}`)}
            className="flex-1 bg-primary py-3 rounded-xl items-center"
          >
            <Text className="text-white font-semibold text-lg">Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}