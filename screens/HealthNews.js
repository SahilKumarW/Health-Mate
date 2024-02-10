// import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import NewsApiCall from "../network/NewApiCall";
import EvilIcon from "react-native-vector-icons/Feather";
import { WebView } from "react-native-webview";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRecoilState } from "recoil";
import { NewsUrl } from "../recoil/NewsScreenState";

const HealthNewsScreen = ({navigation}) => {
  const [newsData, setNewsData] = useState([]);
  const [newsurl, setNewsurl] = useRecoilState(NewsUrl);
  const [isWebView, setIsWebView] = useState(false);
  // const [country, setCountry] = useState("us");
  // const countries = [
  //   "USA",
  //   "Canada",
  //   "UK",
  //   "Germany",
  //   "France",
  //   "Australia",
  //   "Japan",
  //   "India",
  // ];

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const countries = [
    { name: "USA", code: "us" },
    { name: "Canada", code: "ca" },
    { name: "UK", code: "gb" },
    { name: "Germany", code: "de" },
    { name: "France", code: "fr" },
    { name: "Australia", code: "au" },
    { name: "Japan", code: "jp" },
    { name: "India", code: "in" },
  ];

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.code);
    console.log(country.code);
  };

  const fetchData = async () => {
    const cont = selectedCountry ? selectedCountry : "us";
    const Res = await NewsApiCall(cont);

    // console.log(Res.articles, "article");
    const filteredArticles = Res.articles.filter(
      (article) => article.title !== "[Removed]"
    );
    setNewsData(filteredArticles);
  };
  useEffect(() => {
    fetchData();
  }, [selectedCountry]);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setNewsurl(item.url);
        // console.log(newsurl);
        setIsWebView(true);
      }}
    >
      <View style={styles.card}>
        {item.urlToImage && (
          <Image source={{ uri: item.urlToImage }} style={styles.cardImage} />
        )}
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardAuthor}>Author: {item.author}</Text>
        <Text style={styles.cardPublishedAt}>
          Published at: {item.publishedAt}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isWebView ? (
        <SafeAreaView style={{ height: "100%" }}>
          <TouchableOpacity
            onPress={() => setIsWebView(false)}
            style={{
              marginLeft: wp(2),
              // borderWidth: 1,
              height: hp(5),
              marginTop: hp(1),
            }}
          >
            <EvilIcon name="arrow-left-circle" size={30} color="black" />
          </TouchableOpacity>
          <WebView
            source={{
              uri: newsurl,
              // uri: isTwitterApiCall ? twitterResponse : linkDinResponse,
            }}
            // style={styles.webview}
            // onError={syntheticEvent =>
            //   console.log('WebView error: ', syntheticEvent.nativeEvent)
            // }
          />
        </SafeAreaView>
      ) : (
        <View>
          {/* <View>
          <Text>Select by Country</Text>
          <ScrollView horizontal>
            <TouchableOpacity>
              <Text></Text>
            </TouchableOpacity>
          </ScrollView>
          </View> */}
            <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{
              marginLeft: wp(2),
              // borderWidth: 1,
              height: hp(5),
              marginTop: hp(1),
            }}
          >
            <EvilIcon name="arrow-left-circle" size={30} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Select by Country</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {countries.map((country, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.countryButton,
                    selectedCountry === country.code
                      ? {
                          ...styles.selectedCountryButton,
                          backgroundColor: "#739072",
                        }
                      : null,
                  ]}
                  onPress={() => handleCountrySelect(country)}
                >
                  <Text
                    style={[
                      styles.countryText,
                      selectedCountry === country.code
                        ? {
                            ...styles.selectedCountryText,
                            color: "white",
                          }
                        : null,
                    ]}
                  >
                    {country.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* <Text style={styles.selectedCountryText}>{`Selected Country: ${
              selectedCountry || "USA"
            }`}</Text> */}
          </View>

          <FlatList
            data={newsData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false} // Set to false to hide vertical scroll indicator
            showsHorizontalScrollIndicator={false} //
          />
        </View>
      )}
    </View>
  );
};

export default HealthNewsScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // justifyContent: "center",
//         // alignItems: "center",
//         // padding: 20,
//         padding: hp(2),
//         borderWidth: 2,
//         backgroundColor: "#ECF2F3",
//       },
// })

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: hp(2),
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    // marginTop: hp(2),
  },
  countryButton: {
    marginRight: 16,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  countryText: {
    fontSize: 16,
  },
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    height: hp(30),
    width: "100%",
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  cardAuthor: {
    fontSize: 14,
    color: "#555",
    paddingHorizontal: 16,
  },
  cardPublishedAt: {
    fontSize: 12,
    color: "#777",
    paddingHorizontal: 16,
  },
});
