import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { isLeftDrawerV } from "../recoil/HomeScreenStates";
import { useRecoilState } from "recoil";
import Drawer from "../components/Drawer";


const ConsultDoctor = () => {
  const [isDrawerV, setIsDrawerV] = useRecoilState(isLeftDrawerV);
  // Dummy data for Top Doctors
  const backgroundColors = ["#edf1fa", "#e3f5ea", "#fde2e4", "#f8f1da"]; // Add more colors as needed
  const topDoctorsData = [
    {
      id: "1",
      name: "Dr. John Doe",
      specialization: "Dental Surgeon",
      img: "https://cdn3.iconfinder.com/data/icons/medical-3d/512/Doctor_Male.png",
    },
    {
      id: "2",
      name: "Dr. Jane Smith",
      specialization: "Heart Surgeon",
      img: "https://cdn3.iconfinder.com/data/icons/medical-3d/512/Doctor_Male.png",
    },
    {
      id: "3",
      name: "Dr. Alex Johnson",
      specialization: "Eye Specialist",
      img: "https://cdn3.iconfinder.com/data/icons/medical-3d/512/Doctor_Male.png",
    },
    {
      id: "4",
      name: "Dr. Emily White",
      specialization: "Dermatologist",
      img: "https://cdn3.iconfinder.com/data/icons/avatar-profession-2/512/Avatar_17_-_Professions_-_Background-02-512.png",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',height:hp(10)}}>
        <TouchableOpacity
          style={{ marginTop: hp(1.5) }}
          onPress={() => setIsDrawerV(true)}
        >
          <MaterialIcons
            name="notification-clear-all"
            color="black"
            size={50}
          />

        </TouchableOpacity>
        <View
          style={{
            marginTop:hp(2.5),
            width: wp(13),
            height: hp(6),
            borderRadius: wp(6.5), // Half of the width
            marginLeft: wp(2),
            // marginTop: hp(1),
          
          }}
        >
          <Image
            source={{
              uri: "https://cdn3.iconfinder.com/data/icons/medical-3d/512/Doctor_Male.png",
            }}
            // source={
            //   selectitem.promiseeProfileImageUrl === ''
            //     ? {
            //         uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
            //       }
            //     :
            //     {uri: selectitem.promiseeProfileImageUrl}
            // }
            style={{
              width: wp(13),
              height: hp(6),
              borderRadius: wp(6.5), // Half of the width
            }}
          />
        </View>
      </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerV}
        onRequestClose={isDrawerV}
      >
        {/* <Drawer /> */}
        <Drawer/>
      </Modal>
      {/* Heading 1 */}
      <Text style={[styles.heading, {fontSize: hp(5)}]}>Find Your Desired Doctor</Text>

      {/* Heading 2 and Categories (4 Cards) */}
      <View>
        <Text style={styles.heading}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Card 1: Dental Surgeon */}
          <View style={{ height: hp(23) }}>
            <View style={styles.categoryCard}>
              <Text style={{fontSize: hp(2.5)}}>Dental Surgeon</Text>
              {/* Add more details or styling as needed */}
            </View>

            <LinearGradient
              colors={["#4980f4", "#4b81fa"]}
              style={[styles.SubcategoryCard]}
            >
              <FontAwesome5 name="teeth-open" color="black" size={40} />
            </LinearGradient>
          </View>
          {/* Card 2: Heart Surgeon */}
          <View>
            <View style={styles.categoryCard}>
            <Text style={{fontSize: hp(2.5)}}>Heart Surgeon</Text>
              {/* Add more details or styling as needed */}
            </View>
            <LinearGradient
              colors={["#feb06b", "#ffb167"]}
              style={[styles.SubcategoryCard]}
            >
              <FontAwesome5 name="heartbeat" color="black" size={40} />
            </LinearGradient>
          </View>

          <View>
            <View style={styles.categoryCard}>
            <Text style={{fontSize: hp(2.3)}}>Orthopedic Surgen</Text>
              {/* Add more details or styling as needed */}
            </View>
            <LinearGradient
              colors={["#f57f6e", "#f47e72"]}
              style={[styles.SubcategoryCard]}
            >
              <FontAwesome5 name="bone" color="black" size={40} />
            </LinearGradient>
          </View>

          <View>
            <View style={styles.categoryCard}>
            <Text style={{fontSize: hp(2.5)}}>Eye Specialist</Text>
              {/* Add more details or styling as needed */}
            </View>
            <LinearGradient
              colors={["#4980f4", "#4b81fa"]}
              style={[styles.SubcategoryCard]}
            >
              <FontAwesome5 name="eye" color="black" size={40} />
            </LinearGradient>
          </View>
        </ScrollView>
      </View>

      {/* Heading 3 and Top Doctors (FlatList) */}
      <View style={{ height: hp(40) }}>
        <Text style={styles.heading}>Top Doctors</Text>
        <FlatList
          data={topDoctorsData}
          showsVerticalScrollIndicator={false} // Set to false to hide vertical scroll indicator
          showsHorizontalScrollIndicator={false} //
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.doctorCard,
                {
                  backgroundColor:
                    backgroundColors[index % backgroundColors.length],
                },
              ]}
            >
              {/* Add more details or styling as needed */}
              <View
                style={{
                  width: wp(13),
                  height: hp(6),
                  borderRadius: wp(6.5), // Half of the width
                  marginLeft: wp(2),
                  // marginTop: hp(1),
                }}
              >
                <Image
                  source={{
                    uri: item.img,
                  }}
                  // source={
                  //   selectitem.promiseeProfileImageUrl === ''
                  //     ? {
                  //         uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                  //       }
                  //     :
                  //     {uri: selectitem.promiseeProfileImageUrl}
                  // }
                  style={{
                    width: wp(13),
                    height: hp(6),
                    borderRadius: wp(6.5), // Half of the width
                  }}
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>{item.name}</Text>
                <Text>{item.specialization}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  heading: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginBottom: hp(2),
    marginTop: hp(2),
  },
  categoryCard: {
    backgroundColor: "#e0e0e0",
    padding: wp(3),
    borderRadius: wp(2),
    marginRight: wp(8),
    width: wp(30),
    height: hp(15),
    // overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    marginTop: wp(8),
    justifyContent: "flex-end",
  },
  SubcategoryCard: {
    backgroundColor: "red",
    width: wp(20),
    height: hp(10),
    position: "absolute",
    right: wp(2),
    zIndex: 1, // Set a higher zIndex for the second View
    justifyContent: "center",
    alignItems: "center",
    // overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // marginTop: wp(8),
    borderRadius: wp(3),
  },
  doctorCard: {
    backgroundColor: "#edf1fa",
    padding: wp(4),
    borderRadius: wp(2),
    marginBottom: hp(2),
    width: wp(90),
    // borderWidth: wp(2),
    flexDirection: "row",
  },
});

export default ConsultDoctor;
