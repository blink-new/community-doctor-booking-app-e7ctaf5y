import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Calendar } from 'react-native-calendars'
import { mockDoctors, timeSlots } from '../../data/mockData'

export default function BookingScreen() {
  const { id } = useLocalSearchParams()
  const doctor = mockDoctors.find(d => d.id === id)
  
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    reason: '',
    notes: ''
  })

  if (!doctor) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Doctor not found</Text>
        </View>
      </SafeAreaView>
    )
  }

  const steps = [
    { number: 1, title: 'Date & Time', completed: currentStep > 1 },
    { number: 2, title: 'Patient Info', completed: currentStep > 2 },
    { number: 3, title: 'Confirmation', completed: false }
  ]

  const handleNext = () => {
    if (currentStep === 1 && (!selectedDate || !selectedTime)) {
      Alert.alert('Error', 'Please select date and time')
      return
    }
    if (currentStep === 2 && (!patientInfo.name || !patientInfo.phone)) {
      Alert.alert('Error', 'Please fill in required fields')
      return
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBooking = () => {
    Alert.alert(
      'Booking Confirmed!',
      `Your appointment with ${doctor.name} has been booked for ${selectedDate} at ${selectedTime}.`,
      [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/appointments')
        }
      ]
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Book Appointment</Text>
        <View className="w-6" />
      </View>

      {/* Progress Steps */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          {steps.map((step, index) => (
            <View key={step.number} className="flex-row items-center flex-1">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  step.completed || currentStep === step.number
                    ? 'bg-primary'
                    : 'bg-gray-200'
                }`}
              >
                {step.completed ? (
                  <Ionicons name="checkmark" size={16} color="white" />
                ) : (
                  <Text
                    className={`font-medium ${
                      currentStep === step.number ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {step.number}
                  </Text>
                )}
              </View>
              <Text
                className={`ml-2 font-medium ${
                  step.completed || currentStep === step.number
                    ? 'text-gray-900'
                    : 'text-gray-500'
                }`}
              >
                {step.title}
              </Text>
              {index < steps.length - 1 && (
                <View className="flex-1 h-px bg-gray-200 mx-4" />
              )}
            </View>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Doctor Info */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <Text className="text-lg font-semibold text-gray-900 mb-2">{doctor.name}</Text>
          <Text className="text-gray-600">{doctor.specialty}</Text>
          <Text className="text-primary font-semibold">${doctor.consultationFee} consultation fee</Text>
        </View>

        {/* Step Content */}
        <View className="px-6 py-6">
          {currentStep === 1 && (
            <View>
              <Text className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</Text>
              
              {/* Calendar */}
              <View className="bg-white rounded-xl mb-6 overflow-hidden">
                <Calendar
                  onDayPress={(day) => setSelectedDate(day.dateString)}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      selectedColor: '#2563EB'
                    }
                  }}
                  minDate={today}
                  maxDate={maxDate.toISOString().split('T')[0]}
                  theme={{
                    selectedDayBackgroundColor: '#2563EB',
                    todayTextColor: '#2563EB',
                    arrowColor: '#2563EB',
                    monthTextColor: '#1F2937',
                    textDayFontWeight: '500',
                    textMonthFontWeight: '600',
                    textDayHeaderFontWeight: '500'
                  }}
                />
              </View>

              {selectedDate && (
                <View>
                  <Text className="text-lg font-semibold text-gray-900 mb-4">
                    Available Times - {formatDate(selectedDate)}
                  </Text>
                  <View className="flex-row flex-wrap">
                    {timeSlots.map((slot) => (
                      <TouchableOpacity
                        key={slot.time}
                        onPress={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`px-4 py-3 rounded-lg mr-3 mb-3 ${
                          selectedTime === slot.time
                            ? 'bg-primary'
                            : slot.available
                            ? 'bg-white border border-gray-200'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Text
                          className={`font-medium ${
                            selectedTime === slot.time
                              ? 'text-white'
                              : slot.available
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                        >
                          {slot.time}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <Text className="text-xl font-semibold text-gray-900 mb-6">Patient Information</Text>
              
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-700 font-medium mb-2">Full Name *</Text>
                  <TextInput
                    value={patientInfo.name}
                    onChangeText={(text) => setPatientInfo({...patientInfo, name: text})}
                    placeholder="Enter your full name"
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                <View className="mt-4">
                  <Text className="text-gray-700 font-medium mb-2">Phone Number *</Text>
                  <TextInput
                    value={patientInfo.phone}
                    onChangeText={(text) => setPatientInfo({...patientInfo, phone: text})}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                <View className="mt-4">
                  <Text className="text-gray-700 font-medium mb-2">Reason for Visit</Text>
                  <TextInput
                    value={patientInfo.reason}
                    onChangeText={(text) => setPatientInfo({...patientInfo, reason: text})}
                    placeholder="Brief description of your concern"
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                <View className="mt-4">
                  <Text className="text-gray-700 font-medium mb-2">Additional Notes</Text>
                  <TextInput
                    value={patientInfo.notes}
                    onChangeText={(text) => setPatientInfo({...patientInfo, notes: text})}
                    placeholder="Any additional information"
                    multiline
                    numberOfLines={3}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                    placeholderTextColor="#94A3B8"
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <Text className="text-xl font-semibold text-gray-900 mb-6">Confirm Appointment</Text>
              
              <View className="bg-white rounded-xl p-4 mb-6">
                <Text className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</Text>
                
                <View className="space-y-3">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Doctor</Text>
                    <Text className="text-gray-900 font-medium">{doctor.name}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Specialty</Text>
                    <Text className="text-gray-900 font-medium">{doctor.specialty}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Date</Text>
                    <Text className="text-gray-900 font-medium">{formatDate(selectedDate)}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Time</Text>
                    <Text className="text-gray-900 font-medium">{selectedTime}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Patient</Text>
                    <Text className="text-gray-900 font-medium">{patientInfo.name}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Phone</Text>
                    <Text className="text-gray-900 font-medium">{patientInfo.phone}</Text>
                  </View>
                  <View className="border-t border-gray-100 pt-3">
                    <View className="flex-row justify-between">
                      <Text className="text-gray-900 font-semibold">Total</Text>
                      <Text className="text-primary font-bold text-lg">${doctor.consultationFee}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="bg-blue-50 rounded-xl p-4 mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="information-circle" size={20} color="#2563EB" />
                  <View className="ml-3 flex-1">
                    <Text className="text-blue-900 font-medium mb-1">Important Information</Text>
                    <Text className="text-blue-800 text-sm">
                      Please arrive 15 minutes early for your appointment. Bring a valid ID and insurance card if applicable.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="bg-white px-6 py-4 border-t border-gray-100">
        <View className="flex-row">
          {currentStep > 1 && (
            <TouchableOpacity
              onPress={() => setCurrentStep(currentStep - 1)}
              className="flex-1 bg-gray-100 py-3 rounded-xl items-center mr-3"
            >
              <Text className="text-gray-700 font-semibold">Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={currentStep === 3 ? handleBooking : handleNext}
            className="flex-1 bg-primary py-3 rounded-xl items-center"
          >
            <Text className="text-white font-semibold">
              {currentStep === 3 ? 'Confirm Booking' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}