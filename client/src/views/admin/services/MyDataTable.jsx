import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PRODUCT_API_URL } from '../../../constants/apiUrl';
const MyDataTable = ({ columns }) => {

  const [data, setData] = useState([]);


  const FetchData = async () => {
    try {
      const response = await axios.get(`${PRODUCT_API_URL}/products?limit=100`);
         console.log(response.data.products);    
      setData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export default MyDataTable