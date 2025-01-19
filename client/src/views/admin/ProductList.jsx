import MyDataTable from "./services/MyDataTable"


const ProductList = () => {
  
    const columns = [
        {
          name: "SNo.",
          selector: (_, index) => index + 1,
        //   cell: (_, index) => (
        //     <span>{(datalist.currentPage - 1) * 1 + (index + 1)}</span>
        //   ),
        },
        { name: "Name", selector: (row) => row.title, sortable: true },
        { name: "Price", selector: (row) => row.price, sortable: true },
        { name: "Stock", selector: (row) => row.stock, sortable: true },
        { name: "Rating", selector: (row) => row.rating, sortable: true },
        {
          name: "Actions",
          cell: (row) => (
            <div className="flex gap-2">
              <button
                onClick={() => {
                //   setisOpen(true);
                //   setEditRow(row);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (
                    !window.confirm("Are you sure you want to delete this product?")
                  )
                    return;
                //   dispatch(asyncDeleteProduct(row));
                }}
              >
                Del
              </button>
            </div>
          ),
          ignoreRowClick: true,
          // allowOverflow: true,
          button: true,
        },
      ];
  return (
    <div>
        <MyDataTable columns={columns} />
    </div>
  )
}

export default ProductList