import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

const images = [
  require("@/assets/images/img1.png"),
  require("@/assets/images/img2.png"),
  require("@/assets/images/img3.png"),
];

export default function ScheduleScreen() {
  const carouselRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    carouselRef.current?.scrollTo({ index: newIndex, animated: true });
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    carouselRef.current?.scrollTo({ index: newIndex, animated: true });
    setCurrentIndex(newIndex);
  };

  const handleThumbnailPress = (index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Programas Semanais</Text>

      <Carousel
        ref={carouselRef}
        loop
        autoPlay
        autoPlayInterval={3000}
        width={width * 0.8}
        height={height * 0.28}
        data={images}
        pagingEnabled
        snapEnabled
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} resizeMode="contain" />
        )}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePrev}>
          <AntDesign name="leftcircle" size={width * 0.05} color="black" />
        </TouchableOpacity>

        <View style={styles.thumbnails}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => handleThumbnailPress(index)}>
              <Image
                source={image}
                style={[
                  styles.miniature,
                  currentIndex === index && styles.activeMiniature,
                ]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <AntDesign name="rightcircle" size={width * 0.05} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={{alignItems: "center", gap: height * 0.01}}>
        <Text>Comentários, dúvidas ou sugestões de próximos temas, fale com a gente:</Text>
        <Image 
          source={require("@/assets/images/whatsapp.png")}
        />
        <Text>(13) 99632-5709</Text>
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
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#70360c",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.04,
    height: height * 0.05,
  },
  thumbnails: {
    flexDirection: "row",
    gap: width * 0.02,
  },
  miniature: {
    width: width * 0.2,
    height: width * 0.1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "transparent",
    opacity: 0.4,
  },
  activeMiniature: {
    opacity: 1,
  },
});
