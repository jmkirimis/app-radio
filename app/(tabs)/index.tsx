import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppState } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const sound = useRef(new Audio.Sound());
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [previousVolume, setPreviousVolume] = useState(1.0);

  const radioUrl = 'https://servidor27-4.brlogic.com:8264/live?source=website';

  const playRadio = async () => {
    setLoading(true);
    try {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      const status = await sound.current.getStatusAsync();
      if (!status.isLoaded) {
        await sound.current.loadAsync({ uri: radioUrl }, {}, true);
      }

      await sound.current.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log('Erro ao tocar rádio:', error);
    } finally {
      setLoading(false);
    }
  };

  const stopRadio = async () => {
    setLoading(true);
    await sound.current.stopAsync();
    await sound.current.unloadAsync();
    setIsPlaying(false);
    setLoading(false);
  };

  const handleVolumeChange = async (value: number) => {
    setVolume(value);

    try {
      const status = await sound.current.getStatusAsync();
      if (status.isLoaded) {
        await sound.current.setVolumeAsync(value);
      }
    } catch (error) {
      console.log('Erro ao ajustar volume:', error);
    }
  };

  const toggleMute = async () => {
    if (volume === 0) {
      await handleVolumeChange(previousVolume || 1.0);
    } else {
      setPreviousVolume(volume);
      await handleVolumeChange(0);
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return "volume-x";
    if (volume <= 0.33) return "volume";
    if (volume <= 0.66) return "volume-1";
    return "volume-2";
  };

  const handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === 'active') {
      const status = await sound.current.getStatusAsync();
      if (status.isLoaded && status.isPlaying === false) {
        try {
          await sound.current.playAsync();
        } catch (e) {
          console.log('Erro ao retomar o áudio:', e);
        }
      }
    }
  };

  useEffect(() => {
  const subscription = AppState.addEventListener("change", handleAppStateChange);

  return () => {
    subscription.remove();
  };
}, []);


  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/logo-radio.png')} 
        style={styles.logo}
      />

      <TouchableOpacity onPress={isPlaying ? stopRadio : playRadio} activeOpacity={1} >
        {loading ? (
          <ActivityIndicator size="large" color="#2db2b2" />
        ) : (
          <FontAwesome6 name={isPlaying ? "circle-pause" : "circle-play"} size={width * 0.1} color="#2db2b2" />
        )}
      </TouchableOpacity>

     <View style={styles.viewVolume}>
        <TouchableOpacity onPress={toggleMute}>
          <Feather name={getVolumeIcon()} size={width * 0.08} color="#2db2b2" />
        </TouchableOpacity>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor="#2db2b2"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#2db2b2"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b1d6f2",
    gap: height * 0.03,
  },
  logo: {
    width: width * 0.7,
    height: width * 0.2,
  },
  viewVolume: {
    width: width * 0.8,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: "center",
  },
  slider: {
    width: "60%",
    height: height * 0.05,
  },
});
