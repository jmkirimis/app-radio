import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useRef, useState } from "react";
import { Dimensions, Linking, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width, height } = Dimensions.get("window");

const images = [
  require("@/assets/images/img1.png"),
  require("@/assets/images/img2.png"),
  require("@/assets/images/img3.png"),
  require("@/assets/images/img4.jpg"),
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

  const getThumbnails = () => {
    return [0, 1, 2].map(offset => images[(currentIndex + offset) % images.length]);
  };

  const handleNavigate = (link: string) => {
    Linking.openURL(link).catch(err => {
      console.error("Erro ao abrir o link:", err);
    });
  };

  return (
    <ScrollView style={{backgroundColor: "#b1d6f2"}}>
      <ImageBackground 
        style={styles.header}
        source={require("@/assets/images/fundo-header.jpg")}
      >
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>Programação</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={{alignItems: "center"}}>
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
              <AntDesign name="leftcircle" size={width * 0.06} color="black" />
            </TouchableOpacity>

            <View style={styles.thumbnails}>
              {getThumbnails().map((image, i) => {
                const actualIndex = (currentIndex + i) % images.length;
                return (
                  <TouchableOpacity
                    key={actualIndex}
                    onPress={() => handleThumbnailPress(actualIndex)}
                  >
                    <Image
                      source={image}
                      style={[
                        styles.miniature,
                        currentIndex === actualIndex && styles.activeMiniature,
                      ]}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity onPress={handleNext}>
              <AntDesign name="rightcircle" size={width * 0.06} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerSection}>
          <Text style={styles.title}>Contato</Text>
          <Text style={styles.text}>Comentários, dúvidas ou sugestões de próximos temas, fale com a gente:</Text>
          <View style={styles.containerContact}>

            <View style={{alignItems: "center", gap: height * 0.01}}>
              <TouchableOpacity 
                onPress={() => handleNavigate("https://api.whatsapp.com/send/?phone=5513996325709&text&type=phone_number&app_absent=0")} 
                style={{flexDirection: "row"}}
              >
                <Image 
                  source={require("@/assets/images/whatsapp.png")}
                  style={{width: width * 0.12, aspectRatio: 1/1}}
                />
              </TouchableOpacity>
              <Text style={[styles.text, {fontWeight: "bold"}]}>(13) 99632-5709</Text>
            </View>

            <View style={{alignItems: "center", gap: height * 0.01}}>
              <TouchableOpacity 
                onPress={() => handleNavigate("https://chat.whatsapp.com/KMNcBByEnuEJoQVUj7WI9e")} 
                style={{flexDirection: "row"}}
              >
                <Image 
                  source={require("@/assets/images/whatsapp.png")}
                  style={{width: width * 0.12, aspectRatio: 1/1}}
                />
              </TouchableOpacity>
              <Text style={[styles.text, {fontWeight: "bold"}]}>Grupo da Rádio</Text>
            </View>
            
          </View>
        </View>

        <View style={{alignItems: "center", gap: height * 0.01}}>
          <Text style={styles.title}>Redes Sociais</Text>
          <Text style={styles.text}>Acesse nossas outras redes:</Text>
          <View style={{flexDirection: "row", alignItems: "center", gap: width * 0.05, marginTop: height * 0.01}}>
            
            <TouchableOpacity 
                onPress={() => handleNavigate("https://instagram.com")} 
                style={{flexDirection: "row"}}
              >
              <AntDesign name="instagram" size={width * 0.06} color="#46515c" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleNavigate("https://x.com/radioluz5")} 
              style={{flexDirection: "row"}}
            >
              <FontAwesome6 name="x-twitter" size={width * 0.05} color="#46515c" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleNavigate("https://www.youtube.com/channel/UC40LHuSVunohb5RKcQD19qQ")} 
              style={{flexDirection: "row"}}
            >
              <AntDesign name="youtube" size={width * 0.06} color="#46515c" />
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: height * 0.22,
    overflow: 'hidden',
  },
  headerTitle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: width * 0.08,
    fontWeight: 'bold',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    gap: height * 0.04,
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
  containerSection: {
    alignItems: "center", 
    gap: height * 0.01, 
    paddingHorizontal: width * 0.05
  },
  containerContact: {
    flexDirection: "row", 
    gap: width * 0.05, 
    marginTop: height * 0.01,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#46515c",
  },
  text: {
    fontSize: width * 0.035,
    color: "#46515c",
    textAlign: "center"
  },
});
