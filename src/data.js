import axios from "axios";

const data = async() => {
    const response = await axios.get("http://localhost:4000/1");
    console.log(response) 
    return response;
};

export default data;