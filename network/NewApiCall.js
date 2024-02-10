import axios from 'axios';

const NewsApiCall = async (country) => {
  console.log(country);
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=health&apiKey=639b388fad51469980afa6850ed92688`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data; // Accessing the data property of the Axios response
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Returning null in case of an error, you can adjust this as needed
  }
};

export default NewsApiCall;