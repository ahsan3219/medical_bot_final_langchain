const { davinci_pure } = require("./pureai");
const axios = require("axios");

async function fetchHospitalsNearby(latitude, longitude) {
  const apiUrl = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=4&apiKey=dc7440ae5c1043f6b2e886aa7ff7c699`;

  try {
    let hospitalInfoList = [];
    const response = await axios.get(apiUrl);

    response.data.features.forEach((element) => {
      const hospital_name_address = {
        name: element.properties.name,
        address: element.properties.formatted
      };

      hospitalInfoList.push(hospital_name_address);
    });
    // console.log("response.data.features", hospitalInfoList);

    const prompt = ` You are doc ethan designed to help users discover nearby hospitals, medical centers, or clinics.Start reply like "Here is the list of medical centers near you ", Send name and address in seperate paragraph with serial number. To get the information you need, please follow this format:

Name:
Address:

Here is the list of names and addresses: ${JSON.stringify(hospitalInfoList)}
send name and address of all.
`;
    const res = await davinci_pure(prompt);
    // console.log("davinci_pure", res);
    return res;
  } catch (error) {
    console.error("Error making the request:", error);
  }
}

export async function getUserLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const response = await fetchHospitalsNearby(latitude, longitude);

    // console.log("response1232", response);
    return response;
  } catch (error) {
    console.error("Error getting user location:", error.message);
  }
}
