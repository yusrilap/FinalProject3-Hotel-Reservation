import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Appbar, Button, Paragraph, Text } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

export default function Detail() {
  const [showFullText, setShowFullText] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { nameHotel, city, imgHotel, price, currency, rates, reviews, Guest } =
    route.params;

  const auth = useSelector((state) => state.auth);

  const handleBack = () => {
    navigation.navigate("Home");
  };

  const handleBooking = () => {
    if (!auth.token) {
      return navigation.navigate("Login", {
        prevRoute: route.name,
        ...route.params,
      });
    }

    navigation.navigate("Booking", {
      nameHotel,
      city,
      imgHotel,
      price,
      currency,
      rates,
      reviews,
      Guest,
    });
  };

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  const createStar = (num, numFloat) =>
    Number(rates) < num
      ? Number(rates) < numFloat
        ? "star-o"
        : "star-half-o"
      : "star";

  return (
    <View className="relative">
      <View>
        <Appbar.Header>
          <Appbar.Action icon="keyboard-backspace" onPress={handleBack} />
          <Appbar.Content
            title={
              <Text className="text-lg">
                <MaterialCommunityIcons name="cards-outline" size={26} />
                Hotel Detail
              </Text>
            }
            mode="center-aligned"
            style={{ alignItems: "center" }}
          />
          <Appbar.Action icon="dots-vertical" />
        </Appbar.Header>

        <View className="relative">
          <Image
            source={{
              uri: imgHotel,
            }}
            style={{
              height: 250,
            }}
          />
          <Text className="font-extrabold ml-3 text-slate-50 text-lg w-[200px] leading-6 absolute bottom-16">
            {nameHotel}
          </Text>
          <View className="flex-row items-center ml-3 absolute bottom-8">
            <Ionicons name="md-location-outline" color="#F7F7F7" size={20} />
            <Text className="font-light ml-1 text-slate-50 text-base max-w-[200px]">
              {city}
            </Text>
          </View>
          <View className="flex-row ml-3 absolute bottom-2 ">
            <FontAwesome
              name={createStar(2, 1)}
              color="orange"
              size={16}
              style={{ marginRight: 5 }}
            />
            <FontAwesome
              name={createStar(4, 3)}
              color="orange"
              size={16}
              style={{ marginRight: 5 }}
            />
            <FontAwesome
              name={createStar(6, 5)}
              color="orange"
              size={16}
              style={{ marginRight: 5 }}
            />
            <FontAwesome
              name={createStar(8, 7)}
              color="orange"
              size={16}
              style={{ marginRight: 5 }}
            />
            <FontAwesome
              name={createStar(10, 9)}
              color="orange"
              size={16}
              style={{ marginRight: 5 }}
            />
            <Text className="ml-1 text-slate-50">
              {rates} | {reviews ?? "Haven't Review Yet"}
            </Text>
          </View>
          <View className="absolute bottom-2 right-0 bg-purple-600 opacity-80 rounded-l-full px-2 pb-1">
            <Text className="font-bold text-lg text-white pl-1">
              {currency} {Number(price).toLocaleString()}
            </Text>
            <Text className="text-right text-white">/per Night</Text>
          </View>
        </View>
        <View className="px-3 mt-2 relative">
          <Text className="text-lg font-bold">About</Text>
          <View>
            <Paragraph
              numberOfLines={showFullText ? undefined : 5}
              ellipsizeMode="tail"
            >
              Leisure and luxury. Sunsets and sea views. From its majestic
              location overlooking the beach, Cross Pattaya Pratamnak offers
              pure comfort for those seeking relaxation along with plenty of
              activities both in and around the hotel The hotels exquisite
              design takes inspiration from colonial-style architecture.
              Situated on Pratamnak Hill, the property features delightful
              interiors and fully modern facilities. A sophisticated, private
              Beach Club, a Spa with Panpuri product treatments, state of the
              art Gym, meeting facilities and a free form salt water Pool are
              only few of the amenities Cross Pattaya Pratamnak has to offer.
            </Paragraph>
            {!showFullText ? (
              <TouchableOpacity
                onPress={toggleShowFullText}
                className="self-end"
              >
                <Text className="text-purple-700 font-bold">Show More</Text>
              </TouchableOpacity>
            ) : (
              showFullText && (
                <TouchableOpacity
                  onPress={toggleShowFullText}
                  className="self-end"
                >
                  <Text className="text-purple-700 font-bold">Show Less</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </View>

      <Button
        className="mx-3 mt-5"
        icon="bookmark-plus-outline"
        mode="contained"
        onPress={handleBooking}
      >
        Book this Hotel
      </Button>
    </View>
  );
}
