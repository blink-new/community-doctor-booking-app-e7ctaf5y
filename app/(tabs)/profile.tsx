import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { blink } from '../../lib/blink'

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => blink.auth.logout()
        }
      ]
    )
  }

  const menuItems = [
    { icon: 'person-outline', title: 'Personal Information', subtitle: 'Update your details' },
    { icon: 'card-outline', title: 'Payment Methods', subtitle: 'Manage payment options' },
    { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Customize alerts' },
    { icon: 'shield-outline', title: 'Privacy & Security', subtitle: 'Account security settings' },
    { icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: 'information-circle-outline', title: 'About', subtitle: 'App version and info' }
  ]

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="person-circle-outline" size={80} color="#CBD5E1" />
          <Text className="text-2xl font-bold text-gray-900 mt-4">Welcome to DocBook</Text>
          <Text className="text-gray-500 text-center mt-2 mb-8">
            Sign in to access your profile, manage appointments, and book with doctors
          </Text>
          <TouchableOpacity
            onPress={() => blink.auth.login()}
            className="bg-primary px-8 py-4 rounded-xl w-full"
          >
            <Text className="text-white font-semibold text-center text-lg">Sign In</Text>
          </TouchableOpacity>
          <Text className="text-gray-400 text-center mt-4">
            New to DocBook? Sign up to get started
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6 bg-white">
          <Text className="text-2xl font-bold text-gray-900 mb-6">Profile</Text>
          
          {/* User Info */}
          <View className="flex-row items-center mb-6">
            <View className="w-20 h-20 bg-primary rounded-full items-center justify-center">
              <Text className="text-white text-2xl font-bold">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-xl font-semibold text-gray-900">
                {user.displayName || 'User'}
              </Text>
              <Text className="text-gray-600">{user.email}</Text>
              <TouchableOpacity className="mt-1">
                <Text className="text-primary font-medium">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-gray-900">12</Text>
              <Text className="text-gray-600 text-sm">Appointments</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-gray-900">8</Text>
              <Text className="text-gray-600 text-sm">Doctors</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-2xl font-bold text-gray-900">2</Text>
              <Text className="text-gray-600 text-sm">Upcoming</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Settings</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                  <Ionicons name={item.icon as any} size={20} color="#64748B" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-gray-900 font-medium">{item.title}</Text>
                  <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
              </View>
            </TouchableOpacity>
          ))}

          {/* Sign Out */}
          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-white rounded-xl p-4 mt-4 shadow-sm"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-red-600 font-medium">Sign Out</Text>
                <Text className="text-gray-500 text-sm">Sign out of your account</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View className="px-6 py-4 items-center">
          <Text className="text-gray-400 text-sm">DocBook v1.0.0</Text>
          <Text className="text-gray-400 text-sm">Powered by Blink</Text>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  )
}