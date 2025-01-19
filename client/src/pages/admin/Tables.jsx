import { Breadcrumbs } from "@mui/material";
import TableOne from "../../components/admin/Tables/TableOne";
import TableTwo from "../../components/admin/Tables/TableTwo";
import TableThree from "../../components/admin/Tables/TableThree";


const Tables = () => {
    return (
      <>
        <Breadcrumbs pageName="Tables" />
  
        <div className="flex flex-col gap-10">
          <TableOne />
          <TableTwo />
          <TableThree />
        </div>
      </>
    );
  };
  
  export default Tables;
  